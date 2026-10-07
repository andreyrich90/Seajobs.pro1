import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { FLEET_IDS, isFleetId } from "@/lib/cvFleets";
import { maritimeCvCopy } from "@/lib/maritimeCv";
import { fleetPagesCopy } from "@/lib/maritimeCvFleets";
import type { Lang } from "@/lib/langs";
import MaritimeCvView from "../View";

// /maritime-cv/offshore and its siblings: the CV page for one fleet, written
// to that fleet's searches. Five fleets × five languages, all prerendered —
// the list is fixed, so nothing is left for the first reader to wait on.
export const revalidate = 86400;
// No `dynamicParams = false`: it sends an unknown fleet past the [locale]
// layout to the root not-found, which has no layout of its own. The page calls
// notFound() itself, the way every other detail page here does.

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => FLEET_IDS.map((fleet) => ({ locale, fleet })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; fleet: string }>;
}): Promise<Metadata> {
  const { locale, fleet } = await params;
  if (!hasLocale(routing.locales, locale) || !isFleetId(fleet)) return {};
  const p = fleetPagesCopy(locale as Lang).pages[fleet];
  const path = `/maritime-cv/${fleet}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    keywords: p.keywords,
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      type: "website",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: { card: "summary", title: p.metaTitle, description: p.metaDescription },
    alternates: { canonical: canonicalUrl(path, locale), languages: hreflangAlternates(path) },
  };
}

export default async function MaritimeCvFleetPage({
  params,
}: {
  params: Promise<{ locale: string; fleet: string }>;
}) {
  const { locale, fleet } = await params;
  if (!hasLocale(routing.locales, locale) || !isFleetId(fleet)) notFound();
  return (
    <MaritimeCvView
      c={maritimeCvCopy(locale as Lang)}
      fleets={fleetPagesCopy(locale as Lang)}
      locale={locale}
      fleet={fleet}
    />
  );
}
