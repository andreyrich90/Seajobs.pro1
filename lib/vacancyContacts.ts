// Crewing contacts written into a vacancy's own text.
//
// The agency's e-mail and phone are shown only to a seafarer whose profile
// says who they are (lib/profileGate.ts). The vacancy page is cached and the
// same for every visitor, so it may not carry them at all — yet some imported
// postings still have the address in "How to apply". `redactContacts` blanks
// those for the page and its JSON-LD; `contactsInText` hands the same strings
// to api/vacancy-contact, so a reader who passes the gate loses nothing that
// was blanked.

const EMAIL_IN_TEXT = /(?:mailto:)?[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// "+38 (097) 522-74-88", "0932905862": a + or a leading 0, nine digits or more.
// Date ranges, DWT figures and IMO numbers start otherwise or are shorter.
const PHONE_IN_TEXT = /(?:\+|\b0)\d[\d \t\-()]{7,}\d/g;
const isPhone = (m: string) => m.replace(/\D/g, "").length >= 9;

const HIDDEN = "🔒 (contacts below)";

export function redactContacts(text: string | null): string | null {
  if (!text) return text;
  return text
    .replace(EMAIL_IN_TEXT, HIDDEN)
    .replace(PHONE_IN_TEXT, (m) => (isPhone(m) ? HIDDEN : m));
}

/** Every e-mail and phone number written in the text, as written, deduplicated. */
export function contactsInText(text: string | null): { emails: string[]; phones: string[] } {
  if (!text) return { emails: [], phones: [] };
  const emails = (text.match(EMAIL_IN_TEXT) ?? []).map((e) => e.replace(/^mailto:/i, ""));
  const phones = (text.match(PHONE_IN_TEXT) ?? []).filter(isPhone).map((p) => p.trim());
  return { emails: [...new Set(emails)], phones: [...new Set(phones)] };
}
