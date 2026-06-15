import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Seafarer Jobs & Vacancies — Search by Rank, Vessel Type | SeaJobs.pro",
    description:
      "Browse maritime job vacancies for all ranks and vessel types — Captains, Officers, Engineers, Ratings.",
  },
  ru: {
    title: "Вакансии для моряков — поиск по рангу и типу судна | SeaJobs.pro",
    description:
      "Вакансии для моряков всех рангов и типов судов — поиск по рангу, типу судна и зарплате.",
  },
  ua: {
    title: "Вакансії для моряків — пошук за рангом та типом судна | SeaJobs.pro",
    description:
      "Вакансії для моряків усіх рангів та типів суден — пошук за рангом, типом судна та зарплатою.",
  },
  pl: {
    title: "Praca dla marynarzy — szukaj według rangi i typu statku | SeaJobs.pro",
    description:
      "Oferty pracy dla marynarzy wszystkich rang i typów statków — szukaj według rangi, typu statku i wynagrodzenia.",
  },
};

const KEYWORDS =
  "seafarer jobs, maritime vacancies, crew jobs, ship vacancies, jobs for seamen, able seaman jobs, chief officer jobs, chief engineer jobs, deck cadet jobs, crewing agency jobs, " +
  "вакансии для моряков, работа на судне, работа в море, крюинг вакансии, вакансии моряк, работа матрос, работа механик на судне, " +
  "робота для моряків, вакансії моряк";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = SITE_META[locale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS,
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
      canonical: hreflangAlternates("/jobs")[locale],
      languages: hreflangAlternates("/jobs"),
    },
  };
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
