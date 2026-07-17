import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 30;

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Probe whether a public Telegram channel's web preview (t.me/s/<handle>) is
// readable server-side from this host (Vercel). Decides if a cron collector is
// feasible via Telegram, or whether we need the email-inbox route instead.
export async function GET(req: Request) {
  try {
    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    const url = new URL(req.url);
    const handle = (url.searchParams.get("handle") ?? "").trim().replace(/^@/, "").replace(/\s+/g, "");
    if (!handle || !/^[A-Za-z0-9_]{3,64}$/.test(handle)) {
      return NextResponse.json({ ok: false, error: "bad_handle" }, { status: 400 });
    }

    const target = `https://t.me/s/${handle}`;
    const started = Date.now();
    let res: Response;
    try {
      res = await fetch(target, {
        headers: {
          // A real browser UA — plain fetch UA is often what gets blocked.
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml",
          "Accept-Language": "en,ru;q=0.8",
        },
        redirect: "follow",
      });
    } catch (e) {
      return NextResponse.json({
        ok: false, reachable: false, target,
        error: "fetch_failed",
        detail: e instanceof Error ? e.message : String(e),
      });
    }

    const html = await res.text();
    const ms = Date.now() - started;

    // Message text lives in <div class="tgme_widget_message_text ...">…</div>.
    const matches = [...html.matchAll(/tgme_widget_message_text[^>]*>([\s\S]*?)<\/div>/g)];
    const messages = matches.slice(-5).map((m) =>
      m[1].replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim()
    ).filter(Boolean);

    // Telegram serves a private/empty page for non-existent or private channels.
    const looksBlocked = res.status !== 200 || (html.length < 2000 && messages.length === 0);

    return NextResponse.json({
      ok: true,
      target,
      status: res.status,
      ms,
      htmlBytes: html.length,
      messageCount: matches.length,
      readable: messages.length > 0,
      looksBlocked,
      sampleMessages: messages,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "server_error", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
