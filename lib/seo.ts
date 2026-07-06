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
