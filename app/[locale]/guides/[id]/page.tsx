import { connection } from "next/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { extractId } from "@/lib/slug";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { GUIDES_UI } from "@/lib/guidesUi";
import type { Lang } from "@/lib/i18n";
import GuideArticle, { type ResolvedGuide } from "./GuideArticle";

export const dynamic = "force-dynamic";

const BASE_URL = "https://seajobs.pro";

function loc(field: unknown, locale: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  const obj = field as Record<string, string>;
  const uk = locale === "ua" ? obj.uk : undefined;
  return obj[locale] || uk || obj.en || obj.ru || Object.values(obj)[0] || "";
}

function excerpt(text: string, max = 160): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

async function resolveGuide(id: string, locale: string): Promise<ResolvedGuide | null> {
  const uuid = extractId(id);
  if (!uuid) return null;
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data } = await supabase.from("news_articles").select("*").eq("id", uuid).single();
    if (!data || data.category !== "guide" || !data.is_published) return null;
    return {
      id,
      title: loc(data.title, locale),
      body: loc(data.body, locale),
      tag: data.tag ?? null,
      gradient: data.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
      coverUrl: data.cover_url ?? null,
      date: data.published_at ?? data.created_at,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const guide = await resolveGuide(id, locale);
  if (!guide) return { title: "Guide not found — SeaJobs.pro" };
  const title = `${guide.title} | SeaJobs.pro`;
  const description = excerpt(guide.body, 160);
  const canonical = canonicalUrl(`/guides/${id}`, locale);
  return {
    title,
    description,
    openGraph: {
      title, description, type: "article", siteName: "SeaJobs.pro", url: canonical,
      locale: OG_LOCALE[locale], alternateLocale: alternateOgLocales(locale),
      ...(guide.coverUrl ? { images: [guide.coverUrl] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical, languages: hreflangAlternates(`/guides/${id}`) },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  await connection();
  const { id, locale } = await params;
  const guide = await resolveGuide(id, locale);
  if (!guide) redirect(locale === "en" ? "/guides" : `/${locale}/guides`);

  const ui = GUIDES_UI[locale as Lang] ?? GUIDES_UI.en;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const published = guide.date ? new Date(guide.date).toISOString() : undefined;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: excerpt(guide.body, 200),
    ...(published ? { datePublished: published, dateModified: published } : {}),
    ...(guide.coverUrl ? { image: [guide.coverUrl] } : {}),
    author: { "@type": "Organization", name: "SeaJobs.pro", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "SeaJobs.pro",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-oauth.png`, width: 120, height: 120 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl(`/guides/${id}`, locale) },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.home, item: `${BASE_URL}${prefix}/` },
      { "@type": "ListItem", position: 2, name: ui.crumb, item: `${BASE_URL}${prefix}/guides` },
      { "@type": "ListItem", position: 3, name: guide.title, item: canonicalUrl(`/guides/${id}`, locale) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GuideArticle guide={guide} />
    </>
  );
}
