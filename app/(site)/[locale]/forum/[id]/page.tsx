import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/admin";
import { extractId, slugId } from "@/lib/slug";
import { OG_LOCALE, alternateOgLocales, hreflangAlternates, canonicalUrl } from "@/lib/seo";
import TopicClient from "./TopicClient";


// A minute. The author of a reply sees it instantly — TopicClient appends it
// locally — so this delay only applies to other readers.
export const revalidate = 60;

// Empty on purpose. A dynamic segment with no generateStaticParams is rendered
// per request and never cached, so `revalidate` above would do nothing. An
// empty list says "prerender none of them at build, cache each one the first
// time it is asked for" — which keeps the build cheap and still serves the
// second visitor from the cache.
export function generateStaticParams() {
  return [];
}


// Localized text maps ({en, ru, ...}) → a single string for the requested locale.
function loc(field: unknown, lang = "en"): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const obj = field as Record<string, unknown>;
    const ukFallback = lang === "ua" ? obj.uk : undefined;
    return loc(obj[lang] ?? ukFallback ?? obj.en ?? obj.ru ?? Object.values(obj)[0], lang);
  }
  return "";
}

function excerpt(text: string, max = 160): string {
  const clean = text
    .replace(/^#+ .*/gm, "")
    .replace(/[*_>#`[\]]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string; locale: string }> }
): Promise<Metadata> {
  const { id: param, locale } = await params;
  const uuid = extractId(param) ?? param;

  const sb = getServerSupabase();
  const { data: topic } = await sb
    .from("forum_topics")
    .select("title, content")
    .eq("id", uuid)
    .single();

  if (!topic) return { title: "Forum | SeaJobs.pro" };

  const titleLoc = loc(topic.title, locale) || loc(topic.title, "en");
  const titleEn = loc(topic.title, "en") || titleLoc;
  const description = excerpt(loc(topic.content, locale) || loc(topic.content, "en"), 160);

  // Stable canonical slug from the English title so every slug-variant of the
  // same topic (routing is slug-agnostic, matched by the trailing UUID) points
  // to one canonical URL — otherwise Google flags duplicates with no canonical.
  const path = `/forum/${slugId(titleEn, uuid)}`;

  return {
    title: `${titleLoc || "Topic"} | SeaJobs.pro Forum`,
    description,
    openGraph: {
      title: titleLoc,
      description,
      type: "article",
      siteName: "SeaJobs.pro",
      url: canonicalUrl(path, locale),
      locale: OG_LOCALE[locale],
      alternateLocale: alternateOgLocales(locale),
    },
    alternates: {
      canonical: canonicalUrl(path, locale),
      languages: hreflangAlternates(path),
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: param } = await params;
  const id = extractId(param) ?? param;
  const sb = getServerSupabase();

  const [{ data: topic }, { data: posts }, { data: cats }] = await Promise.all([
    sb.from("forum_topics").select("*").eq("id", id).single(),
    sb.from("forum_posts").select("*").eq("topic_id", id).order("created_at", { ascending: true }),
    sb.from("forum_categories").select("*").order("sort_order").order("name"),
  ]);

  if (!topic) notFound();

  return <TopicClient initialTopic={topic} initialPosts={posts ?? []} initialCategories={cats ?? []} />;
}
