import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import NewsClient, { type DbArticle } from "./NewsClient";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  await connection();
  const { data } = await getServerSupabase()
    .from("news_articles")
    .select("id, title, tag, cover_gradient, cover_url, published_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return <NewsClient initialDbArticles={(data ?? []) as DbArticle[]} />;
}
