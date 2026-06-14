import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { NEWS } from "@/lib/data";
import ArticleClient from "./ArticleClient";

export const dynamicParams = true;

const BASE_URL = "https://seajobs.pro";

export async function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.slug }));
}

function loc(field: unknown, lang = "en"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    // Legacy rows may store Ukrainian text under the old "ua" key.
    const ukFallback = lang === "uk" ? obj.ua : undefined;
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
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  // Static news (lib/data) are addressed by slug
  const staticItem = NEWS.find((n) => n.slug === id);

  let titleEn = "";
  let titleRu = "";
  let bodyEn = "";
  let bodyRu = "";
  let date = "";
  let cover = "";

  if (staticItem) {
    titleEn = loc(staticItem.title, "en");
    titleRu = loc(staticItem.title, "ru");
    bodyEn = loc(staticItem.body, "en");
    bodyRu = loc(staticItem.body, "ru");
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
        titleEn = loc(data.title, "en");
        titleRu = loc(data.title, "ru");
        bodyEn = loc(data.body, "en");
        bodyRu = loc(data.body, "ru");
        date = data.published_at ?? data.created_at ?? "";
        cover = data.cover_url ?? "";
      }
    } catch {
      /* fall through to default */
    }
  }

  if (!titleEn && !titleRu) {
    return {
      title: "Maritime News for Seafarers | SeaJobs.pro",
      description:
        "Latest maritime industry news, regulations and crewing updates. / Свежие морские новости, регуляции и обновления для моряков.",
    };
  }

  const title = `${titleEn || titleRu} | SeaJobs.pro`;
  const descParts = [excerpt(bodyEn || bodyRu, 160)];
  if (titleRu && titleRu !== titleEn) descParts.push(titleRu);
  const description = descParts.filter(Boolean).join(" / ").slice(0, 300);

  return {
    title,
    description,
    keywords: [titleEn, titleRu, "maritime news", "морские новости", "seafarer news", "новости для моряков"]
      .filter(Boolean)
      .join(", "),
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "SeaJobs.pro",
      url: `${BASE_URL}/news/${id}`,
      locale: "en_US",
      alternateLocale: ["ru_RU", "uk_UA", "pl_PL"],
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
      canonical: `${BASE_URL}/news/${id}`,
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleClient id={id} />;
}
