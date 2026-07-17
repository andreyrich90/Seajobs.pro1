// Derive a company name from a crewing contact email when the source gives no
// company name of its own. E.g. alfie.smart@selectoffshore.com → "Selectoffshore",
// cv@ariesnav.com → "Ariesnav". Used as a fallback across every import path
// (admin form, screenshot/text parse, Telegram collector, draft approval).

// Free/public mailbox providers — a vacancy posted from one of these tells us
// nothing about the agency, so we don't turn the provider into a company name.
const FREE_PROVIDERS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "ymail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com",
  "aol.com", "gmx.com", "gmx.net", "proton.me", "protonmail.com", "pm.me",
  "mail.ru", "inbox.ru", "list.ru", "bk.ru", "internet.ru", "yandex.ru",
  "yandex.com", "ukr.net", "i.ua", "meta.ua", "qq.com", "163.com", "126.com",
  "zoho.com", "fastmail.com",
]);

// Two-part public suffixes so "crewing.co.uk" → "crewing", not "co".
const MULTI_TLDS = [
  "co.uk", "org.uk", "me.uk", "com.ua", "co.ua", "in.ua", "com.br", "com.au",
  "co.in", "com.sg", "co.jp", "com.tr", "com.gr", "com.cy", "com.hk", "com.ph",
  "com.pl", "co.nz", "com.mx", "com.ar", "co.za", "com.ng", "gr.jp",
];

/** Returns a company name derived from the email's domain, or null. */
export function companyFromEmail(email?: string | null): string | null {
  if (!email) return null;
  const at = email.indexOf("@");
  if (at < 0) return null;

  const domain = email
    .slice(at + 1)
    .toLowerCase()
    .trim()
    .replace(/[/\s>].*$/, ""); // strip anything after the domain
  if (!domain || !domain.includes(".")) return null;
  if (FREE_PROVIDERS.has(domain)) return null;

  const parts = domain.split(".").filter(Boolean);
  if (parts.length < 2) return null;

  // Drop the public suffix (two-part like ".co.uk", otherwise the last label).
  const lastTwo = parts.slice(-2).join(".");
  const label = MULTI_TLDS.includes(lastTwo) ? parts[parts.length - 3] : parts[parts.length - 2];
  if (!label) return null;

  return label.charAt(0).toUpperCase() + label.slice(1);
}
