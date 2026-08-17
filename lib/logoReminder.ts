// The "add your company logo" email sent to registered crewing companies.
//
// The reason it exists: a company's logo now appears on every vacancy card
// across the site — homepage, job board, and the rank/vessel/country landing
// pages — not only on the vacancy page. A company with no logo is drawn as a
// plain letter block, which reads as a placeholder next to competitors that
// have one. So this is a genuine offer of visibility, not a chore.
//
// Shares its chrome with the crewing-agency invite via `lib/emailShell.ts`.

import { emailShell } from "./emailShell";

export const FROM = "SeaJobs.pro <partners@seajobs.pro>";
export const REPLY_TO = "partners@seajobs.pro";

export const SUBJECT = "Add your logo — it now shows on every vacancy listing";

export const PROFILE_URL = "https://seajobs.pro/company/profile";

/**
 * The email body. `company` is the registered company name, used for the
 * greeting; it may be missing, in which case the greeting stays generic rather
 * than saying "Hello (no name)".
 */
export function logoReminderHtml(company?: string | null): string {
  const name = (company ?? "").trim();
  const greeting = name
    ? `Thank you for registering ${escapeHtml(name)} on SeaJobs.pro — we are glad to have you on the platform.`
    : "Thank you for registering your company on SeaJobs.pro — we are glad to have you on the platform.";

  return emailShell(
    "en",
    "Maritime jobs portal — Eastern Europe &amp; the Baltics",
    "Your logo now appears on every vacancy listing",
    `${greeting} One small thing will make a visible difference to your postings: add your company logo. ` +
      "We have just changed how listings are displayed — a logo now appears on every vacancy card across the site, " +
      "not only on the vacancy page itself. Companies without one are shown as a plain letter block.",
    [
      ["🎯", "Sign in and open your company profile",
        `Go to <a href="${PROFILE_URL}" style="color:#1b4f8a;">seajobs.pro/company/profile</a> — the same details you filled in when you registered.`],
      ["⬆️", "Upload the logo",
        "Find the “Company Logo” section and press Upload. JPG, PNG or WEBP, up to 5 MB. A square image works best, since the card shows it as a rounded square."],
      ["💾", "Press Save",
        "That is all. Your logo appears on your existing vacancies straight away — there is no need to repost anything."],
      ["📝", "While you are there",
        "It is worth checking that your description, website and contact details are filled in. Seafarers open the company profile before they apply, and a complete one gets more applications."],
    ],
    "Add your logo",
    "Takes about two minutes. Free, like everything else for crewing companies on SeaJobs.pro.",
    "SeaJobs.pro — maritime jobs portal, built for seafarers",
    PROFILE_URL,
  );
}

/** Company names are free text from the profile form — never trust them raw. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
