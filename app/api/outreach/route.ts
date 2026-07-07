import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { RECIPIENTS, TEMPLATES, SUBJECTS, FROM, REPLY_TO, pickLang, type OutreachLang } from "@/lib/outreach";

export const runtime = "nodejs";
export const maxDuration = 60;

// Browser-triggered crewing-agency outreach mailer.
// Open a URL to send — no terminal needed. Each agency gets ONE personalised
// email in its own language (never BCC), so nobody sees anyone else's address.
//
//   /api/outreach?secret=XXX                      → dry run (lists who would be sent)
//   /api/outreach?secret=XXX&test=you@mail.com    → send EN/PL/UK previews to you
//   /api/outreach?secret=XXX&send=1&limit=10      → send to next 10 not-yet-sent
//   /api/outreach?secret=XXX&send=1&only=baltimex → send only to matching company/email
//
// Already-sent addresses are tracked in the `outreach_log` table and skipped
// on the next run, so you can safely re-open the URL to send the next batch.

async function sendEmail(to: string, subject: string, html: string): Promise<{ ok: boolean; info: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, info: "no RESEND_API_KEY" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, reply_to: REPLY_TO, subject, html }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, info: `${res.status} ${JSON.stringify(body)}` };
    return { ok: true, info: (body as { id?: string }).id ?? "sent" };
  } catch (err) {
    return { ok: false, info: String(err) };
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Auth: dedicated OUTREACH_SECRET, or fall back to the existing CRON_SECRET.
  const secret = process.env.OUTREACH_SECRET || process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Set OUTREACH_SECRET (or CRON_SECRET) in the environment first." }, { status: 500 });
  }
  if (searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Preview mode — send all three languages to one address, log nothing.
  const test = searchParams.get("test");
  if (test) {
    const results: Record<string, string> = {};
    for (const lang of ["en", "pl", "uk"] as OutreachLang[]) {
      const r = await sendEmail(test, `[${lang.toUpperCase()}] ${SUBJECTS[lang]}`, TEMPLATES[lang]);
      results[lang] = r.ok ? "sent" : r.info;
      await sleep(600);
    }
    return NextResponse.json({ ok: true, mode: "test", to: test, results });
  }

  const send = searchParams.get("send") === "1";
  const only = searchParams.get("only")?.toLowerCase();
  const limit = searchParams.get("limit") ? Math.max(1, parseInt(searchParams.get("limit")!, 10)) : 10;

  // Which addresses already went out (skip them).
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: logRows, error: logErr } = await admin.from("outreach_log").select("email");
  if (logErr) {
    return NextResponse.json({ ok: false, error: `outreach_log missing? ${logErr.message}. Run supabase/outreach_log.sql once.` }, { status: 500 });
  }
  const sent = new Set((logRows ?? []).map((r) => (r.email as string).toLowerCase()));

  let queue = RECIPIENTS.filter((r) => !sent.has(r.email.toLowerCase()));
  if (only) queue = queue.filter((r) => (r.company + " " + r.email).toLowerCase().includes(only));
  const remaining = queue.length;
  queue = queue.slice(0, limit);

  if (!send) {
    return NextResponse.json({
      ok: true, mode: "dry-run", alreadySent: sent.size, remaining,
      wouldSend: queue.map((r) => ({ company: r.company, email: r.email, lang: r.lang ?? pickLang(r.email) })),
      hint: "Add &send=1 to actually send this batch.",
    });
  }

  const results: { company: string; email: string; lang: string; status: string }[] = [];
  let okCount = 0;
  for (const r of queue) {
    const lang = r.lang ?? pickLang(r.email);
    const res = await sendEmail(r.email, SUBJECTS[lang], TEMPLATES[lang]);
    if (res.ok) {
      okCount++;
      await admin.from("outreach_log").insert({ email: r.email, company: r.company, lang, resend_id: res.info });
    }
    results.push({ company: r.company, email: r.email, lang, status: res.ok ? "sent" : res.info });
    await sleep(600);
  }

  return NextResponse.json({
    ok: true, mode: "send", sent: okCount, failed: queue.length - okCount,
    remainingAfter: remaining - okCount, results,
  });
}
