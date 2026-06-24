import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const BASE = "https://seajobs.pro";

export const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  ua: "uk_UA",
  pl: "pl_PL",
};

// The "ua" route prefix is a product choice; the correct hreflang language
// tag for Ukrainian is the ISO 639-1 code "uk". Also used for <html lang>.
export const HREFLANG: Record<string, string> = {
  en: "en",
  ru: "ru",
  ua: "uk",
  pl: "pl",
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
