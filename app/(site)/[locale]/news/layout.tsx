import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Maritime News for Seafarers — Industry, Regulations, Salaries | SeaJobs.pro",
    description:
      "Latest maritime news for seafarers: STCW regulations, officer salaries, crew shortages, vessel safety.",
  },
  ru: {
    title: "Морские новости для моряков — индустрия, правила, зарплаты | SeaJobs.pro",
    description:
      "Свежие морские новости для моряков: регуляции STCW, зарплаты офицеров, нехватка экипажей, безопасность судов.",
  },
  ua: {
    title: "Морські новини для моряків — індустрія, правила, зарплати | SeaJobs.pro",
    description:
      "Свіжі морські новини для моряків: регуляції STCW, зарплати офіцерів, нехватка екіпажів, безпека суден.",
  },
  pl: {
    title: "Wiadomości morskie dla marynarzy — branża, przepisy, wynagrodzenia | SeaJobs.pro",
    description:
      "Najnowsze wiadomości morskie dla marynarzy: przepisy STCW, wynagrodzenia oficerów, niedobór załóg, bezpieczeństwo statków.",
  },
  ro: {
    title: "Știri maritime pentru marinari — industrie, reglementări, salarii | SeaJobs.pro",
    description:
      "Cele mai noi știri maritime pentru marinari: reglementări STCW, salariile ofițerilor, lipsa de echipaje, siguranța navelor.",
  },
};

const KEYWORDS =
  "maritime news, seafarer news, shipping news, crew news, maritime industry updates, " +
  "морские новости, новости для моряков, новости судоходства, новости крюинга, " +
  "новини для моряків, wiadomości morskie";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = SITE_META[locale] ?? SITE_META.en;

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
      canonical: canonicalUrl("/news", locale),
      languages: hreflangAlternates("/news"),
    },
  };
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
