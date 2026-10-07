import { hasLocale } from "next-intl";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { maritimeCvCopy } from "@/lib/maritimeCv";
import type { Lang } from "@/lib/langs";

// Title, description and keywords come from the page's own copy file, so what
// Google is told and what the reader finds cannot drift apart.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const c = maritimeCvCopy(locale as Lang);

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
      canonical: canonicalUrl("/maritime-cv", locale),
      languages: hreflangAlternates("/maritime-cv"),
    },
  };
}

export default function MaritimeCvLayout({ children }: { children: React.ReactNode }) {
  return children;
}
