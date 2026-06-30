import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";

const SITE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: "About SeaJobs.pro — Maritime Career Platform for Seafarers | SeaJobs.pro",
    description:
      "SeaJobs.pro connects seafarers with verified crewing agencies across Europe and worldwide.",
  },
  ru: {
    title: "О SeaJobs.pro — платформа морской карьеры для моряков | SeaJobs.pro",
    description:
      "SeaJobs.pro соединяет моряков с проверенными крюинговыми агентствами по всей Европе и миру.",
  },
  ua: {
    title: "Про SeaJobs.pro — платформа морської кар'єри для моряків | SeaJobs.pro",
    description:
      "SeaJobs.pro з'єднує моряків з перевіреними крюїнговими агентствами по всій Європі та світу.",
  },
  pl: {
    title: "O SeaJobs.pro — platforma kariery morskiej dla marynarzy | SeaJobs.pro",
    description:
      "SeaJobs.pro łączy marynarzy ze zweryfikowanymi agencjami crewingowymi w Europie i na całym świecie.",
  },
};

const KEYWORDS =
  "about SeaJobs, maritime job board, seafarer platform, crewing platform, " +
  "о SeaJobs, морская платформа, платформа для моряков, крюинговая платформа, " +
  "о нас, про нас";

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
      canonical: canonicalUrl("/about", locale),
      languages: hreflangAlternates("/about"),
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
