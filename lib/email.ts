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
  | "outreach"
  | "logo_reminder";

/**
 * Resend's free tier: 100 emails a day across the whole account. Used to tell
 * a seafarer *before* they press "send" that today's portal mail is spent, so
 * the mailbox route is offered first instead of after a failure.
 */
export const DAILY_EMAIL_LIMIT = 100;

/**
 * `quota` is set when the provider refused because the plan's allowance is
 * spent — the one failure a seafarer can do something about, by sending from
 * their own mailbox. Any other failure keeps `quota` unset.
 */
export type SendResult = { ok: boolean; id?: string; error?: string; quota?: boolean };

/** Resend says which 429 it is: a spent allowance, or too many calls per second. */
function isQuotaRefusal(status: number, payload: { name?: string; message?: string }): boolean {
  if (status !== 429) return false;
  const what = `${payload.name ?? ""} ${payload.message ?? ""}`.toLowerCase();
  // A per-second rate limit is not a spent quota — it clears in a second.
  if (what.includes("rate_limit") || what.includes("too many requests")) return false;
  return true;
}

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
  let quota = false;

  const post = () =>
    fetch("https://api.resend.com/emails", {
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

  try {
    let res = await post();
    let payload = (await res.json().catch(() => ({}))) as { id?: string; name?: string; message?: string };
    // A per-second limit clears almost at once; one retry saves a CV that would
    // otherwise be bounced to the mailbox route for no lasting reason.
    if (res.status === 429 && !isQuotaRefusal(res.status, payload)) {
      await new Promise((r) => setTimeout(r, 1100));
      res = await post();
      payload = (await res.json().catch(() => ({}))) as typeof payload;
    }
    ok = res.ok;
    if (ok) {
      id = payload.id;
    } else {
      // Resend returns 429 once the plan's daily/monthly quota is exhausted —
      // surface it instead of failing silently.
      quota = isQuotaRefusal(res.status, payload);
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

  return { ok, id, error, ...(quota ? { quota } : {}) };
}

/**
 * Has today's allowance already gone? Counts every successful send since
 * midnight UTC — Resend's daily window — whatever it was for, because the
 * provider counts them all against the same 100.
 *
 * A guess, not a promise: mail sent outside `sendEmail` (Supabase's own auth
 * mail, if it is routed through the same account) is invisible here. So this
 * only decides which route to *offer first*; the real refusal is still caught
 * when a send fails. An unreadable count answers `false` — better one failed
 * attempt than hiding the portal button from everyone over a database hiccup.
 */
export async function emailQuotaExhausted(): Promise<boolean> {
  try {
    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const { count, error } = await getServerSupabase()
      .from("email_log")
      .select("id", { count: "exact", head: true })
      .eq("ok", true)
      .gte("created_at", since.toISOString());
    if (error) return false;
    if ((count ?? 0) >= DAILY_EMAIL_LIMIT) return true;
    // A refusal for quota today means Resend has said so itself, which beats
    // our own count — it sees mail we do not.
    const { count: refused } = await getServerSupabase()
      .from("email_log")
      .select("id", { count: "exact", head: true })
      .eq("ok", false)
      .like("error", "HTTP 429%")
      .not("error", "ilike", "%rate_limit%")
      .gte("created_at", since.toISOString());
    return (refused ?? 0) > 0;
  } catch {
    return false;
  }
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
