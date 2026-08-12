import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { botUsername, telegramConfigured, tgLang } from "@/lib/telegramBot";

export const runtime = "nodejs";

// Mints the one-time code behind the "Connect Telegram" button and returns the
// deep link that carries it (t.me/<bot>?start=<code>).
//
// The code has to be minted server-side: it is the only thing proving to the
// bot that whoever opens the chat is the person who was signed in here. The
// caller is re-derived from their bearer token — never trusted from the body.

export async function POST(req: Request) {
  // Authenticate before reporting anything about how the server is configured.
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  if (!telegramConfigured()) {
    return NextResponse.json({ ok: false, error: "Telegram bot is not configured" }, { status: 503 });
  }

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
  if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  // Only seafarers get job alerts, so only a seafarer row can be linked.
  const { data: seafarer } = await admin.from("seafarers").select("id").eq("id", caller.id).maybeSingle();
  if (!seafarer) return NextResponse.json({ ok: false, error: "Not a seafarer profile" }, { status: 403 });

  const username = await botUsername();
  if (!username) {
    return NextResponse.json({ ok: false, error: "Telegram bot is unreachable" }, { status: 503 });
  }

  const body = (await req.json().catch(() => ({}))) as { lang?: string };
  const lang = tgLang(body.lang);

  // Telegram's start payload allows [A-Za-z0-9_-] only, and caps at 64 chars.
  const code = randomBytes(24).toString("base64url");

  // One live code per seafarer: pressing the button twice should not leave the
  // first link working, or a screenshot of an old dashboard would still bind.
  await admin.from("telegram_link_codes").delete().eq("seafarer_id", caller.id).is("used_at", null);

  const { error } = await admin.from("telegram_link_codes").insert({
    code,
    seafarer_id: caller.id,
    lang,
    expires_at: new Date(Date.now() + 30 * 60_000).toISOString(),
  });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, url: `https://t.me/${username}?start=${code}` });
}
