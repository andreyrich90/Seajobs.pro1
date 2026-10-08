import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { HREFLANG } from "@/lib/seo";
import { slugId } from "@/lib/slug";

// The URLs of one guide in every language, worked out the one way the page,
// the sitemap and the hreflang tags must all agree on.
//
// A guide's slug comes from its title *in that language*, so /ru/guides/… and
// /pl/guides/… differ in more than the prefix. The page used to build its
// hreflang map from the slug of whichever language was rendering it, so the
// Russian page announced a Polish URL the Polish page did not consider its own
// canonical — and Google drops hreflang clusters whose targets are not
// canonical. The sitemap made the same mistake with the English slug.
//
// A language the guide has no text in shows the English body under a /pl/ or
// /ro/ prefix: a duplicate, not a translation. Those URLs canonicalise to the
// English page and stay out of the hreflang cluster, so a Polish reader is
// sent to a Polish version only when one exists.

const BASE = "https://seajobs.pro";

type Localized = Record<string, string> | string | null | undefined;

/** The value for `locale`, with the same fallbacks the page renders with. */
export function pick(field: Localized, locale: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  const uk = locale === "ua" ? field.uk : undefined;
  return field[locale] || uk || field.en || field.ru || Object.values(field)[0] || "";
}

/** Locales the guide actually has text in — its own body, not a fallback. */
export function guideLocales(body: Localized): string[] {
  if (!body || typeof body === "string") return [routing.defaultLocale];
  const have = routing.locales.filter((l) => !!(body[l] || (l === "ua" && body.uk)));
  return have.length ? have : [routing.defaultLocale];
}

export function guidePath(title: Localized, uuid: string, locale: string): string {
  return `/guides/${slugId(pick(title, locale), uuid)}`;
}

export function guideUrl(title: Localized, uuid: string, locale: string): string {
  return `${BASE}${getPathname({ locale, href: guidePath(title, uuid, locale) })}`;
}

/** hreflang map over the languages the guide really has, each at its own canonical. */
export function guideAlternates(title: Localized, body: Localized, uuid: string): Record<string, string> {
  const locales = guideLocales(body);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[HREFLANG[l] ?? l] = guideUrl(title, uuid, l);
  const fallback = locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0];
  languages["x-default"] = guideUrl(title, uuid, fallback);
  return languages;
}

/** The page's own URL when it has its own text; otherwise the English one. */
export function guideCanonical(title: Localized, body: Localized, uuid: string, locale: string): string {
  const locales = guideLocales(body);
  const target = locales.includes(locale)
    ? locale
    : locales.includes(routing.defaultLocale) ? routing.defaultLocale : locales[0];
  return guideUrl(title, uuid, target);
}
