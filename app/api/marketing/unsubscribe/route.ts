import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { setMarketing, verifyUnsubscribe } from "@/lib/marketing";
import { digestCopy } from "@/lib/marketingCopy";

export const runtime = "nodejs";

// The unsubscribe link in every digest (lib/marketing.ts, unsubscribeUrl).
//
//   GET  — from the link in the e-mail: records "no", answers a small page.
//   POST — the one-click unsubscribe mail apps send for the List-Unsubscribe
//          header (RFC 8058); same effect, no page.
//
// The signed token is the whole check, so nobody can unsubscribe someone else
// by guessing an id. Pressing it twice records a second "no" — harmless.

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function unsubscribe(req: Request) {
  const q = new URL(req.url).searchParams;
  const userId = q.get("u") ?? "";
  const lang = q.get("l") ?? "en";
  const ok = /^[0-9a-f-]{36}$/i.test(userId) && verifyUnsubscribe(userId, q.get("t") ?? "");
  if (!ok) return { ok: false, lang };
  const client = db();
  if (!client) return { ok: false, lang };
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || null;
  const done = await setMarketing(client, userId, false, {
    source: "unsubscribe_link", locale: lang, ip, userAgent: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
  });
  return { ok: done, lang };
}

function page(ok: boolean, lang: string) {
  const c = digestCopy(lang);
  const home = lang === "en" ? "https://seajobs.pro" : `https://seajobs.pro/${lang}`;
  const title = ok ? c.doneTitle : c.badTitle;
  const body = ok ? c.doneBody : c.badBody;
  return `<!doctype html><html lang="${lang === "ua" ? "uk" : lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} — SeaJobs.pro</title></head>
<body style="margin:0;background:#0a1f33;color:#e4edf1;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:520px;margin:12vh auto;padding:32px 24px;background:#12304c;border:1px solid rgba(201,162,39,.4);border-radius:18px;">
<div style="font-size:22px;font-weight:bold;color:#fff;">Sea<span style="color:#e3c04a;">Jobs</span>.pro</div>
<h1 style="font-size:22px;margin:22px 0 10px;color:#fff;">${title}</h1>
<p style="font-size:15px;line-height:1.6;color:#c4d3de;margin:0 0 24px;">${body}</p>
<a href="${home}" style="display:inline-block;background:#e3c04a;color:#0a1f33;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:10px;">${c.back}</a>
</div></body></html>`;
}

export async function GET(req: Request) {
  const r = await unsubscribe(req);
  return new NextResponse(page(r.ok, r.lang), {
    status: r.ok ? 200 : 400,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function POST(req: Request) {
  const r = await unsubscribe(req);
  return NextResponse.json({ ok: r.ok }, { status: r.ok ? 200 : 400 });
}
