import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { NEWS } from "@/lib/data";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { extractId, slugId } from "@/lib/slug";
import ArticleClient from "./ArticleClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.slug }));
}

function loc(field: unknown, lang = "en"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    // Legacy rows may store Ukrainian text under the old "ua" key.
    const ukFallback = lang === "ua" ? obj.uk : undefined;
    return loc(obj[lang] ?? ukFallback ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
}

function excerpt(text: string, max = 160): string {
  const clean = text
    .replace(/^#+ .*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; locale: string }> }
): Promise<Metadata> {
  const { id, locale } = await params;
  const uuid = extractId(id); // db articles → "<slug>-<uuid>" or legacy "db-<uuid>"

  // Static news (lib/data) are addressed by slug (no trailing UUID)
  const staticItem = uuid ? undefined : NEWS.find((n) => n.slug === id);

  let titleLoc = "";
  let titleEn = "";
  let bodyLoc = "";
  let bodyEn = "";
  let date = "";
  let cover = "";

  if (staticItem) {
    titleLoc = loc(staticItem.title, locale);
    titleEn = loc(staticItem.title, "en");
    bodyLoc = loc(staticItem.body, locale);
    bodyEn = loc(staticItem.body, "en");
    date = staticItem.date;
    cover = staticItem.coverUrl ?? "";
  } else if (uuid) {
    // DB articles are addressed by UUID
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from("news_articles")
        .select("title, body, published_at, created_at, cover_url")
        .eq("id", uuid)
        .single();
      if (data) {
        titleLoc = loc(data.title, locale);
        titleEn = loc(data.title, "en");
        bodyLoc = loc(data.body, locale);
        bodyEn = loc(data.body, "en");
        date = data.published_at ?? data.created_at ?? "";
        cover = data.cover_url ?? "";
      }
    } catch {
      /* fall through to default */
    }
  }

  if (!titleLoc && !titleEn) {
    return {
      title: "Maritime News for Seafarers | SeaJobs.pro",
      description:
        "Latest maritime industry news, regulations and crewing updates. / Свежие морские новости, регуляции и обновления для моряков.",
    };
  }

  const title = `${titleLoc || titleEn} | SeaJobs.pro`;
  const description = excerpt(bodyLoc || bodyEn, 160);
  // Normalise the canonical to a stable slug built from the English title, so
  // every slug-variant of the same article (routing is slug-agnostic, matched
  // by the trailing UUID) points to one canonical URL — otherwise Google sees
  // duplicates with no user-selected canonical.
  const path = uuid ? `/news/${slugId(titleEn || titleLoc, uuid)}` : `/news/${id}`;
  const languages = hreflangAlternates(path);

  return {
    title,
    description,
    keywords: [titleLoc, titleEn, "maritime news", "морские новости", "seafarer news", "новости для моряков"]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "SeaJobs.pro",
      url: canonicalUrl(path, locale),
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
      ...(date ? { publishedTime: new Date(date).toISOString() } : {}),
      // og:image comes from the file-based opengraph-image.tsx (generated card).
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages,
    },
  };
}

type InitialArticle = {
  id: string;
  title: string;
  slugTitle: string; // English title used for the stable canonical slug
  body: string;
  tag: string;
  gradient: string;
  coverUrl: string | null;
  date: string;
} | null;

async function resolveArticle(id: string, locale: string): Promise<InitialArticle> {
  const uuid = extractId(id); // "<slug>-<uuid>" or legacy "db-<uuid>" → db article
  const found = uuid ? undefined : NEWS.find((n) => n.slug === id || `static-${n.id}` === id || n.id === parseInt(id));
  if (found) {
    return {
      id,
      title: loc(found.title, locale),
      slugTitle: loc(found.title, "en") || loc(found.title, locale),
      body: loc(found.body, locale),
      tag: found.tag,
      gradient: found.gradient,
      coverUrl: found.coverUrl ?? null,
      date: found.date,
    };
  }
  if (uuid) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { data } = await supabase.from("news_articles").select("*").eq("id", uuid).single();
      if (data) {
        return {
          id,
          title: loc(data.title, locale),
          slugTitle: loc(data.title, "en") || loc(data.title, locale),
          body: loc(data.body, locale),
          tag: data.tag ?? "News",
          gradient: data.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
          coverUrl: data.cover_url ?? null,
          date: data.published_at ?? data.created_at,
        };
      }
    } catch {
      /* fall through */
    }
  }
  return null;
}

const BASE_URL = "https://seajobs.pro";

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const initialArticle = await resolveArticle(id, locale);
  if (!initialArticle) return <ArticleClient id={id} initialArticle={initialArticle} />;

  const nUuid = extractId(id);
  const canonicalPath = nUuid ? `/news/${slugId(initialArticle.slugTitle, nUuid)}` : `/news/${id}`;

  const publishedDate = initialArticle.date ? new Date(initialArticle.date) : null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": initialArticle.title,
    "description": excerpt(initialArticle.body, 200),
    ...(publishedDate ? { "datePublished": publishedDate.toISOString(), "dateModified": publishedDate.toISOString() } : {}),
    ...(initialArticle.coverUrl ? { "image": [initialArticle.coverUrl] } : {}),
    "author": { "@type": "Organization", "name": "SeaJobs.pro", "url": BASE_URL },
    "publisher": {
      "@type": "Organization",
      "name": "SeaJobs.pro",
      "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo-oauth.png`, "width": 120, "height": 120 },
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl(canonicalPath, locale) },
  };

  const NEWS_CRUMB: Record<string, { home: string; news: string }> = {
    en: { home: "Home", news: "News" },
    ru: { home: "Главная", news: "Новости" },
    ua: { home: "Головна", news: "Новини" },
    pl: { home: "Strona główna", news: "Aktualności" },
    ro: { home: "Acasă", news: "Știri" },
  };
  const nc = NEWS_CRUMB[locale] ?? NEWS_CRUMB.en;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nc.home, item: `${BASE_URL}${prefix}/` },
      { "@type": "ListItem", position: 2, name: nc.news, item: `${BASE_URL}${prefix}/news` },
      { "@type": "ListItem", position: 3, name: initialArticle.title, item: canonicalUrl(canonicalPath, locale) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ArticleClient id={id} initialArticle={initialArticle} />
    </>
  );
}

