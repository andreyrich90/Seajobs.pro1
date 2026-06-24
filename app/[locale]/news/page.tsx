import { connection } from "next/server";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates } from "@/lib/seo";
import NewsClient, { type DbArticle } from "./NewsClient";

export const dynamic = "force-dynamic";

const TITLES: Record<string, string> = {
  ua: "Морські новини для моряків | SeaJobs.pro",
  pl: "Wiadomości morskie dla marynarzy | SeaJobs.pro",
  ru: "Морские новости для моряков | SeaJobs.pro",
  en: "Maritime News for Seafarers | SeaJobs.pro",
};
const DESCS: Record<string, string> = {
  ua: "Останні новини морської індустрії, регуляції та оновлення крюінгу.",
  pl: "Najnowsze wiadomości z branży morskiej, regulacje i aktualności crewingowe.",
  ru: "Свежие новости морской отрасли, регуляции и обновления крюинга.",
  en: "Latest maritime industry news, regulations and crewing updates.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const languages = hreflangAlternates("/news");
  return {
    title: TITLES[locale] ?? TITLES.en,
    description: DESCS[locale] ?? DESCS.en,
    alternates: { canonical: languages[locale], languages },
  };
}

export default async function NewsPage() {
  await connection();
  const { data } = await getServerSupabase()
    .from("news_articles")
    .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return <NewsClient initialDbArticles={(data ?? []) as DbArticle[]} />;
}
