import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail, sentTodayCount } from "@/lib/email";

// Job-alert fan-out for a newly posted vacancy. Shared by every path that puts
// a vacancy on the board: the company dashboard (via /api/notify) and the admin
// importer. It used to live inside /api/notify only, so imported vacancies —
// which is most of the board — never triggered a single alert.

// Resend's free tier allows 100 mails a day and the whole product shares it, so
// alerts get a slice rather than the lot. Subscribers skipped by the budget
// still get the in-app notification.
export const ALERT_DAILY_BUDGET = 50;
export const ALERT_PER_VACANCY_CAP = 25;

/* eslint-disable @typescript-eslint/no-explicit-any */
type Admin = SupabaseClient<any, any, any>;

type Alert = { seafarer_id: string; rank: string | null };

/**
 * Ranks are free text on both sides — a vacancy's rank comes from the screenshot
 * parser, an alert's from the seafarer's profile — so compare them on a
 * normalised form: lowercased, parenthetical qualifiers dropped, punctuation and
 * repeated spaces collapsed. "Master (Captain)" and "master" then agree.
 */
function normRank(s: string | null | undefined): string {
  return (s ?? "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * Does this vacancy match a subscriber's alert?
 *
 * Primary: the normalised ranks are equal. Fallback: when the parser could not
 * map the posting to a known rank at all (`rank` empty), look for the alert's
 * rank as a whole phrase in the title — that is how an "AB Excavator Operator"
 * posting still reaches its subscribers. The fallback needs a multi-word rank,
 * so a single common word like "cook" can never match half the board.
 */
export function alertMatchesVacancy(
  alertRank: string | null,
  vacancyRank: string | null,
  vacancyTitle: string | null,
): boolean {
  const a = normRank(alertRank);
  if (!a) return false;

  const v = normRank(vacancyRank);
  if (v) return v === a;

  if (a.split(" ").length < 2) return false;
  const title = normRank(vacancyTitle);
  return title === a || title.startsWith(`${a} `) || title.endsWith(` ${a}`) || title.includes(` ${a} `);
}

export type AlertResult = { matched: number; emailed: number; skipped: number };

/** Notifies every seafarer subscribed to this vacancy's rank. Never throws. */
export async function dispatchJobAlerts(admin: Admin, vacancyId: string): Promise<AlertResult> {
  const empty: AlertResult = { matched: 0, emailed: 0, skipped: 0 };
  try {
    const { data: vacancy } = await admin
      .from("vacancies")
      .select("title, rank, companies(name)")
      .eq("id", vacancyId)
      .single();
    if (!vacancy) return empty;

    const { data: alerts } = await admin.from("job_alerts").select("seafarer_id, rank");
    const matched = ((alerts ?? []) as Alert[]).filter((a) =>
      alertMatchesVacancy(a.rank, vacancy.rank, vacancy.title),
    );
    if (matched.length === 0) return empty;

    const companyName =
      (vacancy.companies as unknown as { name: string | null } | null)?.name ?? "A company";
    const rankLabel = vacancy.rank?.trim() || vacancy.title;

    // In-app notifications go to everyone who matched — they cost nothing.
    await admin.from("notifications").insert(
      matched.map((a) => ({
        user_id: a.seafarer_id,
        type: "new_vacancy",
        title: "New Job Match",
        body: `${companyName} posted a new ${rankLabel} position: "${vacancy.title}"`,
        link: `/jobs/${vacancyId}`,
      })),
    );

    // Email only within the daily budget.
    const alreadySent = await sentTodayCount("new_vacancy");
    const remainingToday =
      alreadySent === null
        ? ALERT_PER_VACANCY_CAP // can't read the log → fall back to the per-vacancy cap
        : Math.max(0, ALERT_DAILY_BUDGET - alreadySent);
    const quota = Math.min(ALERT_PER_VACANCY_CAP, remainingToday);

    const recipients = matched.slice(0, quota);
    const skipped = matched.length - recipients.length;
    if (skipped > 0) {
      console.warn(
        `[job-alerts] emailed ${recipients.length}/${matched.length} subscribers for "${vacancy.title}" — ${skipped} skipped to stay within the daily alert budget (in-app notifications still went to all).`,
      );
    }

    for (const a of recipients) {
      const { data: { user } } = await admin.auth.admin.getUserById(a.seafarer_id);
      if (!user?.email) continue;
      await sendEmail({
        to: user.email,
        subject: `New ${rankLabel} job: "${vacancy.title}"`,
        kind: "new_vacancy",
        html: `<p>Hello,</p>
<p><strong>${companyName}</strong> posted a new <strong>${rankLabel}</strong> position:</p>
<p style="font-size:18px"><strong>${vacancy.title}</strong></p>
<p><a href="https://seajobs.pro/jobs/${vacancyId}" style="background:#c9a227;color:#000;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">View Vacancy →</a></p>
<hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
<p style="color:#999;font-size:12px;">You receive this because you set up a job alert for <strong>${a.rank ?? rankLabel}</strong> on SeaJobs.pro. <a href="https://seajobs.pro/seafarer/dashboard">Manage alerts →</a></p>`,
      });
    }

    return { matched: matched.length, emailed: recipients.length, skipped };
  } catch (e) {
    // An alert failure must never fail the import or the vacancy creation.
    console.error("[job-alerts] dispatch failed:", e instanceof Error ? e.message : e);
    return empty;
  }
}
