import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import HtmlShell, { SITE_METADATA } from "@/components/HtmlShell";
import { HREFLANG, DEFAULT_OG_IMAGE } from "@/lib/seo";
// The one place in the app that may import the full dictionary map on the
// client side of the tree: this is a Server Component, so only the single
// dictionary it selects below is serialised into the page.
import { T } from "@/lib/i18n";
import type { Lang } from "@/lib/langs";
import { DictProvider } from "@/components/DictProvider";
import CookieBanner from "@/components/CookieBanner";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The home page's search snippet and share text. It speaks to both sides of
// the board: seafarers come for the vacancies, crewing companies for the
// seafarers. The figures are floors of the real counts, like the social card's
// (lib/siteCard.tsx) — keep the two in step and never above the database.
const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description:
      "1,400+ live vacancies from crewing agencies — search by rank, vessel type and salary, apply free. Crewing companies: post jobs free and reach 1,500+ seafarers.",
  },
  ru: {
    title: "Вакансии для моряков и крюинговых компаний | SeaJobs",
    description:
      "1 400+ актуальных вакансий от крюинговых компаний — поиск по должности, типу судна и зарплате, отклик бесплатно. Крюингам: бесплатные вакансии и 1 500+ моряков.",
  },
  ua: {
    title: "Вакансії для моряків та крюїнгових компаній | SeaJobs",
    description:
      "1 400+ актуальних вакансій від крюїнгових компаній — пошук за посадою, типом судна та зарплатою, відгук безкоштовно. Крюїнгам: безкоштовні вакансії та 1 500+ моряків.",
  },
  pl: {
    title: "Praca dla marynarzy i firm crewingowych | SeaJobs",
    description:
      "1 400+ aktualnych ofert od agencji crewingowych — szukaj według stanowiska, typu statku i stawki, aplikuj za darmo. Agencje: darmowe ogłoszenia i 1 500+ marynarzy.",
  },
  ro: {
    title: "Joburi maritime pentru marinari și companii de crewing | SeaJobs",
    description:
      "1.400+ posturi active de la agenții de crewing — caută după rang, tip de navă și salariu, aplici gratuit. Agențiile: anunțuri gratuite și 1.500+ marinari.",
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
    ...SITE_METADATA,
    title: meta.title,
    description: meta.description,
    openGraph: {
      images: [DEFAULT_OG_IMAGE],
      title: meta.title,
      description: meta.description,
      type: "website",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: {
      card: "summary_large_image",
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
  // This layout owns <html> for every localized page. It is the whole reason
  // the app has two root layouts: `lang` must be the reader's language, and
  // only a layout under the [locale] segment can know it without reading the
  // request — which is what used to make every page dynamic.
  return (
    <HtmlShell lang={HREFLANG[locale] ?? locale}>
      <NextIntlClientProvider locale={locale}>
        <DictProvider dict={T[locale as Lang]}>{children}</DictProvider>
        {/* Inside the provider: the banner links through @/i18n/navigation. */}
        <CookieBanner />
      </NextIntlClientProvider>
    </HtmlShell>
  );
}
