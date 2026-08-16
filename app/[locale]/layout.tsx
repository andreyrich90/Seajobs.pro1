import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
// The one place in the app that may import the full dictionary map on the
// client side of the tree: this is a Server Component, so only the single
// dictionary it selects below is serialised into the page.
import { T } from "@/lib/i18n";
import type { Lang } from "@/lib/langs";
import { DictProvider } from "@/components/DictProvider";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description:
      "Find maritime jobs worldwide. Search vacancies by rank, vessel type and salary. Free platform for seafarers and crewing companies.",
  },
  ru: {
    title: "Вакансии для моряков и крюинговых компаний | SeaJobs",
    description:
      "Вакансии для моряков по всему миру — поиск по рангу, типу судна и зарплате. Бесплатная платформа для моряков и крюинговых компаний.",
  },
  ua: {
    title: "Вакансії для моряків та крюїнгових компаній | SeaJobs",
    description:
      "Вакансії для моряків по всьому світу — пошук за рангом, типом судна та зарплатою. Безкоштовна платформа для моряків та крюїнгових компаній.",
  },
  pl: {
    title: "Praca dla marynarzy i firm crewingowych | SeaJobs",
    description:
      "Oferty pracy dla marynarzy na całym świecie — szukaj według rangi, typu statku i wynagrodzenia. Bezpłatna platforma dla marynarzy i firm crewingowych.",
  },
  ro: {
    title: "Joburi maritime pentru marinari și companii de crewing | SeaJobs",
    description:
      "Găsește joburi maritime în întreaga lume — caută după rang, tip de navă și salariu. Platformă gratuită pentru marinari și companii de crewing.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const meta = SITE_META[locale] ?? SITE_META.en;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: canonicalUrl("/", locale),
      languages: hreflangAlternates("/"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  // The whole point of doing this here: this is a Server Component, so picking
  // one dictionary out of `T` costs the browser nothing for the other four.
  // Everything below reads it through `useT()`.
  //
  // No `messages` on the next-intl provider on purpose. Nothing in the app
  // calls `useTranslations`/`useMessages` — next-intl owns the URL structure and
  // the metadata, not the copy — so passing them serialised another 23-34 KB of
  // strings into every page for nobody to read. The provider itself stays:
  // `Link`/`useRouter` from `@/i18n/navigation` need its locale.
  return (
    <NextIntlClientProvider locale={locale}>
      <DictProvider dict={T[locale as Lang]}>{children}</DictProvider>
    </NextIntlClientProvider>
  );
}
