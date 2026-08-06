import { getServerSupabase } from "@/lib/supabase/admin";

// Shared Resend sender for every transactional email the site sends.
//
// Two problems this solves over the previous per-route `sendEmail` copies:
//  1. Failures were swallowed (`.catch(() => {})`, response status ignored), so
//     a rate-limit rejection silently dropped mail — including CVs headed to a
//     crewing agency — with nothing in the logs.
//  2. Nothing counted volume, so the unbounded job-alert fan-out could burn the
//     whole daily quota (Resend's free tier allows 100 emails/day).
//
// Every send is now recorded in `email_log`, which gives both a daily budget to
// check against and a trail for debugging "did that email actually go out?".

export const DEFAULT_FROM = "SeaJobs.pro <noreply@seajobs.pro>";

/** What the email was for — used for budgeting and log filtering. */
export type EmailKind =
  | "application_received"
  | "external_application"
  | "status_changed"
  | "new_message"
  | "new_vacancy"
  | "unread_digest"
  | "referral_reminder"
  | "contact"
  | "outreach";

export type SendResult = { ok: boolean; id?: string; error?: string };

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  kind: EmailKind;
  from?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY not set" };

  let ok = false;
  let id: string | undefined;
  let error: string | undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: opts.from ?? DEFAULT_FROM,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    const payload = (await res.json().catch(() => ({}))) as { id?: string };
    ok = res.ok;
    if (ok) {
      id = payload.id;
    } else {
      // Resend returns 429 once the plan's daily/monthly quota is exhausted —
      // surface it instead of failing silently.
      error = `HTTP ${res.status}: ${JSON.stringify(payload).slice(0, 300)}`;
      console.error(`[email:${opts.kind}] send to ${opts.to} failed — ${error}`);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "network error";
    console.error(`[email:${opts.kind}] send to ${opts.to} threw — ${error}`);
  }

  // Best-effort audit row. Never let logging break sending — in particular the
  // table may not exist yet if the migration hasn't been run.
  try {
    await getServerSupabase()
      .from("email_log")
      .insert({ to_email: opts.to, kind: opts.kind, ok, error: error ?? null });
  } catch {
    /* ignore */
  }

  return { ok, id, error };
}

/**
 * How many emails of a given kind were sent (successfully) since midnight UTC.
 * Returns null when the count can't be read — callers should then fall back to
 * their per-request cap rather than blocking mail entirely.
 */
export async function sentTodayCount(kind: EmailKind): Promise<number | null> {
  try {
    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const { count, error } = await getServerSupabase()
      .from("email_log")
      .select("id", { count: "exact", head: true })
      .eq("kind", kind)
      .eq("ok", true)
      .gte("created_at", since.toISOString());
    if (error) return null;
    return count ?? 0;
  } catch {
    return null;
  }
}
