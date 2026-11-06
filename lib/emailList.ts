// A vacancy may carry several crewing e-mails: an agency that prints
// "crew@agency.com, hr@agency.com" on its post wants applications at both.
// `vacancies.contact_email` stays one text column and holds them as a list,
// "a@x.com, b@y.com", in the order the source printed them. Everything that
// reads the column goes through `emailList()`, so a single address and a list
// are handled alike, and so does everything that writes it (`joinEmails`).

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)*\.[A-Z]{2,}/gi;

/** At most this many: every address is a Resend send against the 100-a-day
 *  quota, and a post with more than three is a signature block, not a list. */
export const MAX_AGENCY_EMAILS = 3;

/** The addresses in a stored or typed value, each once, in their order. */
export function emailList(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of raw.match(EMAIL) ?? []) {
    const key = m.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(m);
    if (out.length >= MAX_AGENCY_EMAILS) break;
  }
  return out;
}

/** The value to store: "a@x.com, b@y.com", or null when there is none. */
export function joinEmails(list: string[]): string | null {
  return list.length ? list.join(", ") : null;
}

/** Normalise a typed or parsed value in one step. */
export function cleanEmails(raw: string | null | undefined): string | null {
  return joinEmails(emailList(raw));
}
