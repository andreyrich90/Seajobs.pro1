import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { extractId } from "@/lib/slug";
import { OG_LOCALE, alternateOgLocales } from "@/lib/seo";
import { guideAlternates, guideCanonical } from "@/lib/guideUrls";
import { GUIDE_SECTIONS, type GuideSection } from "@/lib/guidesUi";
import type { Lang } from "@/lib/langs";
import GuideArticle, { type ResolvedGuide } from "./GuideArticle";

// One article page for both /guides/[id] and /handbook/[id]. They read the
// same table and differ only in `category`, the base path and the chrome, so
// the route files hold just their segment config and call into here.

const BASE_URL = "https://seajobs.pro";

function loc(field: unknown, locale: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  const obj = field as Record<string, string>;
  const uk = locale === "ua" ? obj.uk : undefined;
  return obj[locale] || uk || obj.en || obj.ru || Object.values(obj)[0] || "";
}

function excerpt(text: string, max = 160): string {
  const clean = text
    .replace(/^#{1,6}\s.*$/gm, "")
    .replace(/^(::|!!|\?\?|=>)\s?/gm, "")
    .replace(/[#*_>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

// The raw multilingual title and body stay on the server: they are needed to
// build every language's URL, and the client component only needs one.
type ServerGuide = ResolvedGuide & { rawTitle: Record<string, string> | string; rawBody: Record<string, string> | string };

async function resolveGuide(id: string, locale: string, section: GuideSection): Promise<ServerGuide | null> {
  const uuid = extractId(id);
  if (!uuid) return null;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const { data, error } = await supabase.from("news_articles").select("*").eq("id", uuid).single();
  // PGRST116 is "no rows" — genuinely gone, and null here becomes a 404. Every
  // other failure used to be swallowed into that same null, which would now
  // tell Google a live guide had vanished; let it throw instead.
  if (error && error.code !== "PGRST116") {
    throw new Error(`guide lookup failed: ${error.message}`);
  }
  // A guide's id under /handbook (or the reverse) is not that page: 404.
  if (!data || data.category !== section || !data.is_published) return null;
  return {
    id,
    rawTitle: data.title,
    rawBody: data.body,
    title: loc(data.title, locale),
    body: loc(data.body, locale),
    tag: data.tag ?? null,
    gradient: data.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
    coverUrl: data.cover_url ?? null,
    date: data.published_at ?? data.created_at,
  };
}

export async function guideMetadata(id: string, locale: string, section: GuideSection): Promise<Metadata> {
  const guide = await resolveGuide(id, locale, section);
  if (!guide) return { title: "Guide not found — SeaJobs.pro" };
  const base = GUIDE_SECTIONS[section].path;
  const title = `${guide.title} | SeaJobs.pro`;
  const description = excerpt(guide.body, 160);
  // Every language's URL from its own title, the same way the sitemap and the
  // other language versions build it — see lib/guideUrls.ts. A language the
  // guide has no text in canonicalises to English and is left out of hreflang.
  const uuid = extractId(id)!;
  const canonical = guideCanonical(guide.rawTitle, guide.rawBody, uuid, locale, base);
  return {
    title,
    description,
    openGraph: {
      title, description, type: "article", siteName: "SeaJobs.pro", url: canonical,
      locale: OG_LOCALE[locale], alternateLocale: alternateOgLocales(locale),
      ...(guide.coverUrl ? { images: [guide.coverUrl] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical, languages: guideAlternates(guide.rawTitle, guide.rawBody, uuid, base) },
  };
}

export async function GuidePageView({ id, locale, section }: { id: string; locale: string; section: GuideSection }) {
  const guide = await resolveGuide(id, locale, section);
  // 404, not a redirect to the index: a guide that is gone has not moved to
  // /guides, and telling Google it did is what fills the "page with redirect"
  // report. Same reasoning as the vacancy page.
  if (!guide) notFound();

  const { rawTitle: _t, rawBody: _b, ...clientGuide } = guide;
  void _t; void _b;
  const { path: base, ui: uiMap } = GUIDE_SECTIONS[section];
  const ui = uiMap[locale as Lang] ?? uiMap.en;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const published = guide.date ? new Date(guide.date).toISOString() : undefined;
  const gCanonical = guideCanonical(guide.rawTitle, guide.rawBody, extractId(id)!, locale, base);

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
    mainEntityOfPage: { "@type": "WebPage", "@id": gCanonical },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.home, item: `${BASE_URL}${prefix}/` },
      { "@type": "ListItem", position: 2, name: ui.crumb, item: `${BASE_URL}${prefix}${base}` },
      { "@type": "ListItem", position: 3, name: guide.title, item: gCanonical },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <GuideArticle guide={clientGuide} shareUrl={gCanonical} section={section} />
    </>
  );
}
