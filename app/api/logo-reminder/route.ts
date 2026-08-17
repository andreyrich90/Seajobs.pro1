import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUBJECT, FROM, REPLY_TO, logoReminderHtml } from "@/lib/logoReminder";
import { sendEmail as send } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

// Browser-triggered "add your company logo" mailer for registered companies.
//
// Modelled on /api/outreach, which the owner already drives from a URL, and
// gated the same way. The difference is where the recipients come from: not a
// checked-in JSON list but the `companies` table — every company whose
// `logo_url` is still empty. That means the list shrinks by itself as companies
// comply, and a company that uploads a logo before the next batch is simply no
// longer a recipient.
//
//   /api/logo-reminder?secret=XXX                     → dry run (who would get it)
//   /api/logo-reminder?secret=XXX&test=you@mail.com   → send yourself a preview
//   /api/logo-reminder?secret=XXX&send=1&limit=10     → send to the next 10
//   /api/logo-reminder?secret=XXX&send=1&only=baltic  → only matching name/email
//
// Who is skipped, and why:
//   · a logo is already set — nothing to ask for
//   · this email already went to that address successfully — read from
//     `email_log`, so no extra bookkeeping table and no double-sending
//   · the account has no email address in auth (should not happen, but a send
//     without a recipient is not worth a crash)

/** Resend's free tier is 100 a day, shared with the CVs seafarers send to
 *  agencies. That path earns the site its keep, so this one refuses to eat the
 *  last of the quota. */
const DAILY_TOTAL_CEILING = 80;

async function sendOne(to: string, html: string): Promise<{ ok: boolean; info: string }> {
  const res = await send({ to, subject: SUBJECT, html, kind: "logo_reminder", from: FROM, replyTo: REPLY_TO });
  return { ok: res.ok, info: res.ok ? res.id ?? "sent" : res.error ?? "failed" };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Target = { id: string; company: string; email: string };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // One answer for "no secret configured" and "wrong secret", because a
  // stranger has no business learning which of the two it is. The owner needs
  // to know, so the misconfiguration goes to the server log instead — readable
  // in the Vercel dashboard, not over HTTP.
  const secret = process.env.OUTREACH_SECRET || process.env.CRON_SECRET;
  if (!secret) {
    console.error("[logo-reminder] refused: set OUTREACH_SECRET (or CRON_SECRET) in the environment");
  }
  if (!secret || searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // Preview: send one copy to the given address and log nothing against the
  // real recipients. Uses a sample name so the greeting can be checked too.
  const test = searchParams.get("test");
  if (test) {
    const r = await sendOne(test, logoReminderHtml("Example Crewing Ltd"));
    return NextResponse.json({ ok: r.ok, mode: "test", to: test, status: r.ok ? "sent" : r.info });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const doSend = searchParams.get("send") === "1";
  const only = searchParams.get("only")?.toLowerCase();
  const limit = searchParams.get("limit") ? Math.max(1, parseInt(searchParams.get("limit")!, 10)) : 10;

  // Companies still without a logo. An empty string counts as missing: the
  // profile form writes `logo_url: form.logo_url || null`, but a row edited by
  // hand could hold "".
  const { data: rows, error: cErr } = await admin
    .from("companies")
    .select("id, name, logo_url")
    .or("logo_url.is.null,logo_url.eq.")
    .order("name", { ascending: true });
  if (cErr) {
    return NextResponse.json({ ok: false, error: `companies read failed: ${cErr.message}` }, { status: 500 });
  }

  // Emails live in auth.users, not in `companies`, so they need the
  // service-role admin API. Page through it and keep only the ids we care about.
  const wanted = new Set((rows ?? []).map((r) => r.id as string));
  const emails = new Map<string, string>();
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      return NextResponse.json({ ok: false, error: `auth listUsers failed: ${error.message}` }, { status: 500 });
    }
    for (const u of data.users) {
      if (u.email && wanted.has(u.id)) emails.set(u.id, u.email);
    }
    if (data.users.length < 1000) break;
  }

  // Who already received this particular email. `email_log` is written by
  // lib/email.ts for every send, so it doubles as the sent-list here.
  const { data: logRows, error: lErr } = await admin
    .from("email_log")
    .select("to_email")
    .eq("kind", "logo_reminder")
    .eq("ok", true);
  if (lErr) {
    return NextResponse.json({ ok: false, error: `email_log read failed: ${lErr.message}` }, { status: 500 });
  }
  const alreadySent = new Set((logRows ?? []).map((r) => (r.to_email as string).toLowerCase()));

  const noEmail: string[] = [];
  let queue: Target[] = [];
  for (const r of rows ?? []) {
    const id = r.id as string;
    const email = emails.get(id);
    const company = ((r.name as string | null) ?? "").trim();
    if (!email) { noEmail.push(company || id); continue; }
    if (alreadySent.has(email.toLowerCase())) continue;
    queue.push({ id, company, email });
  }
  if (only) queue = queue.filter((t) => `${t.company} ${t.email}`.toLowerCase().includes(only));

  const remaining = queue.length;
  const batch = queue.slice(0, limit);

  if (!doSend) {
    return NextResponse.json({
      ok: true,
      mode: "dry-run",
      companiesWithoutLogo: (rows ?? []).length,
      alreadyEmailed: alreadySent.size,
      noEmailOnAccount: noEmail,
      remaining,
      wouldSend: batch.map((t) => ({ company: t.company || "(no name)", email: t.email })),
      hint: "Add &send=1 to actually send this batch.",
    });
  }

  // Budget guard: count everything sent today, not just this kind, because the
  // quota is shared with the CVs going out to crewing agencies.
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  const { count: sentToday } = await admin
    .from("email_log")
    .select("id", { count: "exact", head: true })
    .eq("ok", true)
    .gte("created_at", since.toISOString());
  const used = sentToday ?? 0;
  const room = Math.max(0, DAILY_TOTAL_CEILING - used);
  if (room === 0) {
    return NextResponse.json({
      ok: false,
      error: `${used} emails already went out today; holding back to leave the daily quota for seafarers' CVs. Try again tomorrow.`,
      ceiling: DAILY_TOTAL_CEILING,
    });
  }
  const toSend = batch.slice(0, room);

  const results: { company: string; email: string; status: string }[] = [];
  let okCount = 0;
  for (const t of toSend) {
    const res = await sendOne(t.email, logoReminderHtml(t.company));
    if (res.ok) okCount++;
    results.push({ company: t.company || "(no name)", email: t.email, status: res.ok ? "sent" : res.info });
    await sleep(600);
  }

  return NextResponse.json({
    ok: true,
    mode: "send",
    sent: okCount,
    failed: toSend.length - okCount,
    trimmedByDailyCeiling: batch.length - toSend.length,
    remainingAfter: remaining - okCount,
    results,
  });
}
