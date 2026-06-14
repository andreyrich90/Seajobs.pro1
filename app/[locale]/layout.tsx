import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates } from "@/lib/seo";

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
  uk: {
    title: "Вакансії для моряків та крюїнгових компаній | SeaJobs",
    description:
      "Вакансії для моряків по всьому світу — пошук за рангом, типом судна та зарплатою. Безкоштовна платформа для моряків та крюїнгових компаній.",
  },
  pl: {
    title: "Praca dla marynarzy i firm crewingowych | SeaJobs",
    description:
      "Oferty pracy dla marynarzy na całym świecie — szukaj według rangi, typu statku i wynagrodzenia. Bezpłatna platforma dla marynarzy i firm crewingowych.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const meta = SITE_META[locale];

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
      canonical: hreflangAlternates("/")[locale],
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
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
