import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const BASE = "https://seajobs.pro";

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  ua: "uk_UA",
  pl: "pl_PL",
  ro: "ro_RO",
};

// The "ua" route prefix is a product choice; the correct hreflang language
// tag for Ukrainian is the ISO 639-1 code "uk". Also used for <html lang>.
export const HREFLANG: Record<string, string> = {
  en: "en",
  ru: "ru",
  ua: "uk",
  pl: "pl",
  ro: "ro",
};

/**
 * Builds the `alternates.languages` map (hreflang) for a given pathname,
 * pointing to every locale variant of the same page plus an x-default.
 */
export function hreflangAlternates(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const href = getPathname({ locale, href: pathname });
    languages[HREFLANG[locale] ?? locale] = `${BASE}${href}`;
  }
  languages["x-default"] = languages[HREFLANG[routing.defaultLocale] ?? routing.defaultLocale];

  return languages;
}

export function alternateOgLocales(current: string): string[] {
  return routing.locales.filter((l) => l !== current).map((l) => OG_LOCALE[l]);
}

/**
 * Absolute canonical/og:url for a pathname in a given ROUTE locale ("en", "ru",
 * "ua", "pl"). Built straight from the localized path so it never depends on the
 * hreflang map keying — `hreflangAlternates(...)[locale]` returns undefined for
 * "ua" because that map is keyed by the language code "uk", not the route.
 */
export function canonicalUrl(pathname: string, locale: string): string {
  return `${BASE}${getPathname({ locale, href: pathname })}`;
}

/**
 * Locales in which a DB-driven record's *body text* is actually distinct.
 * Vacancies and company profiles are stored in a single language (English), so
 * their `/pl/...` and `/ro/...` URLs are duplicates of the English page — only
 * the UI chrome differs. We keep en/ru/ua (our core audience, and enough
 * localization to justify an hreflang cluster) as real indexable variants and
 * fold pl/ro onto the English canonical, which is what Google does anyway — this
 * just states it explicitly so those pages stop showing up as "duplicate,
 * no user-selected canonical". News, guides and forum posts ARE translated
 * per-locale, so they keep all five languages and must NOT use these helpers.
 */
export const CONTENT_LOCALES: readonly string[] = ["en", "ru", "ua"];

const isContentLocale = (locale: string) => CONTENT_LOCALES.includes(locale);

/**
 * Canonical for a single-language DB-detail page: the page itself for en/ru/ua,
 * but the default-locale (English) URL for pl/ro so Google consolidates the
 * near-duplicate locale variants instead of flagging them.
 */
export function contentCanonicalUrl(pathname: string, locale: string): string {
  const target = isContentLocale(locale) ? locale : routing.defaultLocale;
  return `${BASE}${getPathname({ locale: target, href: pathname })}`;
}

/** hreflang cluster limited to the locales that carry a real indexable variant. */
export function contentHreflangAlternates(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of CONTENT_LOCALES) {
    languages[HREFLANG[locale] ?? locale] = `${BASE}${getPathname({ locale, href: pathname })}`;
  }
  languages["x-default"] = languages[HREFLANG[routing.defaultLocale] ?? routing.defaultLocale];
  return languages;
}
