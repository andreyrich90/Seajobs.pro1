import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Post Maritime Jobs Free — Hire Seafarers | For Crewing Companies | SeaJobs.pro",
    description:
      "Crewing companies: post maritime vacancies for free and reach 32,000+ verified seafarers. Google for Jobs included.",
  },
  ru: {
    title: "Размещайте вакансии для моряков бесплатно | Для крюинговых компаний | SeaJobs.pro",
    description:
      "Крюинговые компании: размещайте вакансии бесплатно и охватывайте 32 000+ проверенных моряков.",
  },
  ua: {
    title: "Розміщуйте вакансії для моряків безкоштовно | Для крюїнгових компаній | SeaJobs.pro",
    description:
      "Крюїнгові компанії: розміщуйте вакансії безкоштовно та охоплюйте 32 000+ перевірених моряків.",
  },
  pl: {
    title: "Publikuj oferty pracy dla marynarzy bezpłatnie | Dla firm crewingowych | SeaJobs.pro",
    description:
      "Firmy crewingowe: publikuj oferty pracy bezpłatnie i docieraj do ponad 32 000 zweryfikowanych marynarzy.",
  },
  ro: {
    title: "Publică gratuit joburi pentru marinari | Pentru companii de crewing | SeaJobs.pro",
    description:
      "Companii de crewing: publicați posturi gratuit și ajungeți la peste 32.000 de marinari verificați.",
  },
};

const KEYWORDS =
  "post maritime jobs, hire seafarers, crewing recruitment, post crew vacancy free, find seafarers, maritime recruitment platform, " +
  "разместить вакансию для моряков, найти моряков, крюинговый подбор, бесплатное размещение вакансий, нанять экипаж, " +
  "zatrudnij marynarzy, opublikuj ofertę pracy marynarz";

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
      canonical: canonicalUrl("/for-companies", locale),
      languages: hreflangAlternates("/for-companies"),
    },
  };
}

export default function ForCompaniesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
