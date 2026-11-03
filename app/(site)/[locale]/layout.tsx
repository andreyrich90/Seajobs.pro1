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
import { publicDict } from "@/lib/i18n";
import type { Lang } from "@/lib/langs";
import { DictProvider } from "@/components/DictProvider";
import CookieBanner from "@/components/CookieBanner";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The home page's search snippet and share text. It speaks to both sides of
// the board: seafarers come for the vacancies, crewing companies for the
// seafarers — and, like the hero, it pitches the board as European. The
// country list names where the companies with live vacancies are based.
// The vacancy figure is a floor of the live count — raise it now
// and then, never above what the database holds.
const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "European Maritime Jobs for Seafarers & Crewing Companies | SeaJobs",
    description:
      "1,500+ live vacancies from crewing agencies across Europe — Poland, Greece, the UK, Scandinavia, the Baltics. Search by rank, vessel type and salary. Crewing companies: post jobs free and reach a large seafarer base.",
  },
  ru: {
    title: "Работа в море у крюингов Европы — вакансии для моряков | SeaJobs",
    description:
      "1 500+ актуальных вакансий от крюинговых компаний Европы — Польша, Греция, Великобритания, Скандинавия, Балтия. Поиск по должности, типу судна и зарплате. Крюингам: бесплатные вакансии и большая база моряков.",
  },
  ua: {
    title: "Робота в морі у крюїнгів Європи — вакансії для моряків | SeaJobs",
    description:
      "1 500+ актуальних вакансій від крюїнгових компаній Європи — Польща, Греція, Велика Британія, Скандинавія, Балтія. Пошук за посадою, типом судна та зарплатою. Крюїнгам: безкоштовні вакансії та велика база моряків.",
  },
  pl: {
    title: "Praca na morzu w europejskich agencjach crewingowych | SeaJobs",
    description:
      "1 500+ aktualnych ofert od agencji crewingowych z całej Europy — Polska, Grecja, Wielka Brytania, Skandynawia, kraje bałtyckie. Szukaj według stanowiska, typu statku i stawki. Agencje: darmowe ogłoszenia i duża baza marynarzy.",
  },
  ro: {
    title: "Joburi pe mare la agențiile de crewing din Europa | SeaJobs",
    description:
      "1.500+ posturi active de la agenții de crewing din toată Europa — Polonia, Grecia, Regatul Unit, Scandinavia, țările baltice. Caută după rang, tip de navă și salariu. Agențiile: anunțuri gratuite și o bază mare de marinari.",
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
  // And only the public part of it (publicDict): the cabinets, /about and
  // /for-companies add the rest in their own layouts.
  // Everything below reads it through `useT()`.
  //
  // No `messages` on the next-intl provider on purpose. Nothing in the app
  // calls `useTranslations`/`useMessages` — next-intl owns the URL structure and
  // the metadata, not the copy — so passing them serialised another 23-34 KB of
  // strings into every page for nobody to read. The provider itself stays:
  // `Link`/`useRouter` from `@/i18n/navigation` need its locale.
  // It has to be `messages={null}`, not just no prop: next-intl 4's server
  // provider fills a missing `messages` in from i18n/request.ts, and until
  // October 2026 that put the whole dictionary into every cached page anyway.
  // This layout owns <html> for every localized page. It is the whole reason
  // the app has two root layouts: `lang` must be the reader's language, and
  // only a layout under the [locale] segment can know it without reading the
  // request — which is what used to make every page dynamic.
  return (
    <HtmlShell lang={HREFLANG[locale] ?? locale}>
      <NextIntlClientProvider locale={locale} messages={null}>
        <DictProvider dict={publicDict(locale as Lang)}>{children}</DictProvider>
        {/* Inside the provider: the banner links through @/i18n/navigation. */}
        <CookieBanner />
      </NextIntlClientProvider>
    </HtmlShell>
  );
}
