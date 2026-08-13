import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { botLang, esc, TG_COPY, tgSend } from "@/lib/telegramBot";

export const runtime = "nodejs";

// The bot's inbox. Telegram POSTs every update here; we only care about three
// things a seafarer can do in a private chat:
//
//   /start <code>  link this Telegram account to the profile that minted <code>
//   /stop          unlink
//   anything else  a one-paragraph explanation of what the bot is for
//
// Telegram retries an update until it gets a 2xx, so this route answers 200 for
// everything it understood — including the cases it deliberately ignores.
// A non-200 is reserved for "this request was not from Telegram".

type Update = {
  message?: {
    chat?: { id?: number; type?: string };
    from?: { id?: number; language_code?: string; is_bot?: boolean };
    text?: string;
  };
};

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(req: Request) {
  // Telegram echoes the secret set with setWebhook. It is required, not
  // optional: this URL is guessable, and without the check anyone could forge a
  // /stop for a chat id and silently unsubscribe someone — or replay a /start.
  // Failing closed means a missing secret breaks the bot loudly instead of
  // leaving it open quietly; /api/telegram/setup reports whether it is set.
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[telegram-webhook] TELEGRAM_WEBHOOK_SECRET is not set — refusing all updates");
    return NextResponse.json({ ok: false }, { status: 503 });
  }
  if (req.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const update = (await req.json().catch(() => null)) as Update | null;
  const msg = update?.message;
  const chatId = msg?.chat?.id;
  const text = msg?.text?.trim() ?? "";

  // Channel posts, edits, joins, bots — nothing to do, but acknowledge so
  // Telegram stops resending.
  if (!chatId || msg?.chat?.type !== "private" || msg.from?.is_bot || !text) {
    return NextResponse.json({ ok: true });
  }

  const db = admin();
  if (!db) return NextResponse.json({ ok: true });

  // The bot speaks one language, the same one it posts vacancies in — see
  // botLang(). Nothing here depends on who is writing.
  const c = TG_COPY[botLang()];

  try {
    if (text.startsWith("/start")) {
      const code = text.slice("/start".length).trim().split(/\s+/)[0] ?? "";
      await handleStart(db, chatId, code, c);
    } else if (text.startsWith("/stop")) {
      await handleStop(db, chatId, c);
    } else {
      await tgSend(chatId, esc(c.help));
    }
  } catch (e) {
    console.error("[telegram-webhook]", e instanceof Error ? e.message : e);
  }

  return NextResponse.json({ ok: true });
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = ReturnType<typeof createClient<any, any, any>>;

type Copy = (typeof TG_COPY)[keyof typeof TG_COPY];

async function handleStart(db: Db, chatId: number, code: string, c: Copy) {
  // Bare /start — someone found the bot without a deep link.
  if (!code) {
    await tgSend(chatId, esc(c.help));
    return;
  }

  const { data: row } = await db
    .from("telegram_link_codes")
    .select("code, seafarer_id, lang, expires_at, used_at")
    .eq("code", code)
    .maybeSingle();

  const expired = !row || row.used_at || new Date(row.expires_at as string) < new Date();
  if (expired) {
    await tgSend(chatId, esc(c.badCode));
    return;
  }

  // The unique constraint on chat_id is what actually enforces "one Telegram
  // account, one profile". Re-linking the same chat to the same profile is a
  // no-op upsert; pointing it at someone else's profile is refused.
  const { data: owner } = await db
    .from("seafarer_telegram")
    .select("seafarer_id")
    .eq("chat_id", chatId)
    .maybeSingle();
  if (owner && owner.seafarer_id !== row.seafarer_id) {
    await tgSend(chatId, esc(c.alreadyLinked));
    return;
  }

  const { error } = await db.from("seafarer_telegram").upsert(
    // `lang` records the locale they linked from. Messages no longer use it —
    // the bot writes in one language — but it is the only trace of which site
    // language a subscriber came from, so it stays.
    { seafarer_id: row.seafarer_id, chat_id: chatId, lang: row.lang, linked_at: new Date().toISOString() },
    { onConflict: "seafarer_id" },
  );
  if (error) {
    console.error("[telegram-webhook] link failed:", error.message);
    await tgSend(chatId, esc(c.badCode));
    return;
  }

  // Single use: the code is a bearer credential for someone's account.
  await db.from("telegram_link_codes").update({ used_at: new Date().toISOString() }).eq("code", code);

  await tgSend(chatId, `${esc(c.linked)}\n\n${esc(c.linkedHint)}`);
}

async function handleStop(db: Db, chatId: number, c: Copy) {
  const { data } = await db
    .from("seafarer_telegram")
    .select("seafarer_id")
    .eq("chat_id", chatId)
    .maybeSingle();

  if (!data) {
    await tgSend(chatId, esc(c.notLinked));
    return;
  }

  await db.from("seafarer_telegram").delete().eq("seafarer_id", data.seafarer_id);
  await tgSend(chatId, esc(c.unlinked));
}
