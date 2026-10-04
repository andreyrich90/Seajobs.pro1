import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { CV_MAKER_COPY } from "@/lib/cvMaker";
import type { Lang } from "@/lib/langs";

// Title, description and keywords come from the same copy file as the page, so
// the thing Google is told about the page and the thing on it cannot drift.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const c = CV_MAKER_COPY[locale as Lang] ?? CV_MAKER_COPY.en;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: "website",
      siteName: "SeaJobs.pro",
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    twitter: { card: "summary", title: c.metaTitle, description: c.metaDescription },
    alternates: {
      canonical: canonicalUrl("/cv-builder", locale),
      languages: hreflangAlternates("/cv-builder"),
    },
  };
}

export default function CvBuilderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
