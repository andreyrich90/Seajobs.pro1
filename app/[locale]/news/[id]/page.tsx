import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { NEWS } from "@/lib/data";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates } from "@/lib/seo";
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

  // Static news (lib/data) are addressed by slug
  const staticItem = NEWS.find((n) => n.slug === id);

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
  } else {
    // DB articles are addressed by UUID
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from("news_articles")
        .select("title, body, published_at, created_at, cover_url")
        .eq("id", id)
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
  const languages = hreflangAlternates(`/news/${id}`);

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
      url: languages[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
      ...(date ? { publishedTime: new Date(date).toISOString() } : {}),
      ...(cover ? { images: [{ url: cover }] } : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title,
      description,
      ...(cover ? { images: [cover] } : {}),
    },
    alternates: {
      canonical: languages[locale],
      languages,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleClient id={id} />;
}
