import { connection } from "next/server";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates } from "@/lib/seo";
import ForumClient from "./ForumClient";

export const dynamic = "force-dynamic";

const TITLES: Record<string, string> = {
  ua: "Морський форум для моряків | SeaJobs.pro",
  pl: "Forum morskie dla marynarzy | SeaJobs.pro",
  ru: "Морской форум для моряков | SeaJobs.pro",
  en: "Maritime Forum for Seafarers | SeaJobs.pro",
};
const DESCS: Record<string, string> = {
  ua: "Обговорення роботи в морі, крюінгу, контрактів та життя моряка.",
  pl: "Dyskusje o pracy na morzu, crewingu, kontraktach i życiu marynarza.",
  ru: "Обсуждение работы в море, крюинга, контрактов и жизни моряка.",
  en: "Discussions on maritime jobs, crewing, contracts and life at sea.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const languages = hreflangAlternates("/forum");
  return {
    title: TITLES[locale] ?? TITLES.en,
    description: DESCS[locale] ?? DESCS.en,
    alternates: { canonical: languages[locale], languages },
  };
}

export default async function ForumPage() {
  await connection(); // render per request so new topics appear immediately
  const sb = getServerSupabase();
  const [{ data: topics }, { data: posts }, { data: cats }] = await Promise.all([
    sb.from("forum_topics").select("*").order("is_pinned", { ascending: false }).order("created_at", { ascending: false }),
    sb.from("forum_posts").select("topic_id"),
    sb.from("forum_categories").select("*").order("sort_order").order("name"),
  ]);

  const counts: Record<string, number> = {};
  for (const p of posts ?? []) counts[p.topic_id] = (counts[p.topic_id] ?? 0) + 1;

  return (
    <ForumClient
      initialTopics={topics ?? []}
      initialCategories={cats ?? []}
      initialCounts={counts}
    />
  );
}
