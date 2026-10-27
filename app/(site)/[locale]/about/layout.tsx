import { T } from "@/lib/i18n";
import type { Lang } from "@/lib/langs";
import { DictProvider } from "@/components/DictProvider";
import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

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
  ro: {
    title: "Despre SeaJobs.pro — platforma de carieră maritimă pentru marinari | SeaJobs.pro",
    description:
      "SeaJobs.pro conectează marinarii cu agenții de crewing verificate din Europa și din întreaga lume.",
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

  const meta = SITE_META[locale] ?? SITE_META.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: KEYWORDS,
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
      canonical: canonicalUrl("/about", locale),
      languages: hreflangAlternates("/about"),
    },
  };
}

// This page reads strings the locale layout leaves out of its lighter
// dictionary (publicDict in lib/i18n.ts), so it gets the whole one here.
export default async function AboutLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <DictProvider dict={T[locale as Lang] ?? T.en}>{children}</DictProvider>;
}
