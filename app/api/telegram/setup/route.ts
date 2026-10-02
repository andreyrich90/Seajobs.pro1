import { NextResponse } from "next/server";
import { adminChatIds, botLang, botUsername, channelId, telegramConfigured, tgApi } from "@/lib/telegramBot";

export const runtime = "nodejs";

// One-time (and re-runnable) wiring: points the bot's webhook at this
// deployment and reports back everything needed to tell whether the setup is
// actually complete. Open it in a browser after setting the env vars —
// registering a webhook otherwise means a hand-written curl with the bot token
// in the URL, which tends to end up in a shell history.
//
//   /api/telegram/setup?secret=<CRON_SECRET>          register + report
//   /api/telegram/setup?secret=...&check=1            report only
//
// The report covers the webhook, the public channel, and every chat in
// TELEGRAM_ADMIN_CHAT_ID — the last one because a recipient the bot cannot
// reach fails silently: the request is saved, the notification is dropped, and
// the only trace is a log line.
//
// Gated by TELEGRAM_WEBHOOK_SECRET or CRON_SECRET: whoever can call this can
// redirect the bot's traffic.

export async function GET(req: Request) {
  const url = new URL(req.url);
  const expected = process.env.TELEGRAM_SETUP_SECRET || process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Set CRON_SECRET (or TELEGRAM_SETUP_SECRET) before using this route" },
      { status: 503 },
    );
  }
  const provided = url.searchParams.get("secret") ?? req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!telegramConfigured()) {
    return NextResponse.json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not set" }, { status: 503 });
  }

  const webhookUrl = `${url.origin}/api/telegram/webhook`;
  const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  // The webhook refuses every update without this, so registering one first
  // would just produce a bot that silently ignores people.
  if (!secretToken) {
    return NextResponse.json(
      { ok: false, error: "TELEGRAM_WEBHOOK_SECRET is not set — set it (any long random string) and redeploy first" },
      { status: 503 },
    );
  }

  let registered: unknown = "skipped (check=1)";
  if (url.searchParams.get("check") !== "1") {
    const res = await tgApi("setWebhook", {
      url: webhookUrl,
      secret_token: secretToken,
      allowed_updates: ["message"],
      drop_pending_updates: true,
    });
    registered = res.ok ? "ok" : res.error;
  }

  const info = await tgApi<Record<string, unknown>>("getWebhookInfo");
  const chat = channelId();

  // Posting rights are the usual thing people miss: the bot has to be an admin
  // of the channel with "post messages" on, which the API only reveals when you
  // ask about the chat.
  let channel: unknown = "TELEGRAM_CHANNEL_ID is not set";
  if (chat) {
    const res = await tgApi<{ title?: string; type?: string }>("getChat", { chat_id: chat });
    channel = res.ok ? { id: chat, title: res.result.title, type: res.result.type } : res.error;
  }

  return NextResponse.json({
    ok: true,
    bot: await botUsername(),
    webhook: { url: webhookUrl, registered, info: info.ok ? info.result : info },
    channel,
    admins: await checkAdmins(),
    language: botLang(),
  });
}

/**
 * Can the bot actually reach every chat in TELEGRAM_ADMIN_CHAT_ID?
 *
 * Worth a line of its own because the failure is silent where it matters: a
 * request arrives, the row is written, the notification is dropped, and the
 * only trace is a line in the Vercel log nobody is reading. Before this, the
 * way to find out was to submit a real request through the form — which also
 * costs one of the five an address is allowed per hour.
 *
 * `getChat` is the probe rather than a test message: it answers with the same
 * "chat not found" a send would, and it does not put anything in the chat.
 */
async function checkAdmins() {
  const ids = adminChatIds();
  if (ids.length === 0) {
    return { count: 0, note: "TELEGRAM_ADMIN_CHAT_ID is not set — nobody is notified about CV-distribution requests", chats: [] };
  }

  const chats = [];
  for (const id of ids) {
    const res = await tgApi<{ title?: string; type?: string; first_name?: string; username?: string }>(
      "getChat",
      { chat_id: id },
    );
    if (res.ok) {
      chats.push({
        id,
        reachable: true,
        type: res.result.type,
        name: res.result.title ?? res.result.first_name ?? res.result.username ?? null,
      });
    } else {
      chats.push({ id, reachable: false, error: res.error, fix: hint(id, res.error) });
    }
  }
  return { count: ids.length, reachable: chats.filter((c) => c.reachable).length, chats };
}

/** The two ways this goes wrong look identical from Telegram; the id tells them apart. */
function hint(id: string, error: string): string | undefined {
  if (!/not found|chat_id is empty|invalid/i.test(error)) return undefined;
  return id.startsWith("-")
    ? "A group: either the bot is not a member of it, or the id changed when Telegram promoted the group to a supergroup (-123… becomes -100123…). Add the bot, then ask it /id in the group again."
    : "A person: they have never pressed Start on this bot, so the chat does not exist yet — a bot cannot open one. Ask them to open the bot, press Start, then send /id.";
}
