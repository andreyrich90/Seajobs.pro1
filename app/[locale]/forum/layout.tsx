import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Seafarers Forum — Maritime Community, Jobs & Crewing Discussions | SeaJobs.pro",
    description:
      "Join the seafarers community: discuss crewing agencies, contracts, vessels, salaries and life at sea.",
  },
  ru: {
    title: "Форум моряков — сообщество, вакансии и обсуждение крюинга | SeaJobs.pro",
    description:
      "Сообщество моряков: обсуждение крюинговых агентств, контрактов, судов, зарплат и жизни в море.",
  },
  ua: {
    title: "Форум моряків — спільнота, вакансії та обговорення крюїнгу | SeaJobs.pro",
    description:
      "Спільнота моряків: обговорення крюїнгових агентств, контрактів, суден, зарплат та життя в морі.",
  },
  pl: {
    title: "Forum marynarzy — społeczność, oferty pracy i dyskusje o crewingu | SeaJobs.pro",
    description:
      "Dołącz do społeczności marynarzy: dyskusje o agencjach crewingowych, kontraktach, statkach, wynagrodzeniach i życiu na morzu.",
  },
};

const KEYWORDS =
  "seafarers forum, maritime forum, crew community, sailor discussions, crewing agencies reviews, " +
  "форум моряков, морской форум, обсуждение крюинга, отзывы о крюинговых агентствах, жизнь в море, " +
  "форум моряків, forum marynarzy";

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
      canonical: canonicalUrl("/forum", locale),
      languages: hreflangAlternates("/forum"),
    },
  };
}

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
