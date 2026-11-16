import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates, canonicalUrl } from "@/lib/seo";
import ForumClient from "./ForumClient";
import type { ForumTopic } from "@/lib/supabase/types";


// Ten minutes. It was one, so that a new topic showed up while its author was
// still looking — but every refresh is a billed ISR write in five languages,
// and crawlers ask for this page around the clock. The author does not need
// the refresh: the board adds a new topic in the browser at once.
export const revalidate = 600;

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
    alternates: { canonical: canonicalUrl("/forum", locale), languages },
  };
}

export default async function ForumPage() {
  const sb = getServerSupabase();
  const [{ data: topics }, { data: posts }, { data: cats }] = await Promise.all([
    // Not "*": the board shows titles only, and `content` (every topic's full
    // text in every language) made this page ~700 KB, rewritten to the ISR
    // cache on each refresh.
    sb.from("forum_topics")
      .select("id, user_id, author_name, title, is_pinned, created_at, updated_at, category_id, is_anonymous")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false }),
    sb.from("forum_posts").select("topic_id"),
    sb.from("forum_categories").select("*").order("sort_order").order("name"),
  ]);

  const counts: Record<string, number> = {};
  for (const p of posts ?? []) counts[p.topic_id] = (counts[p.topic_id] ?? 0) + 1;

  return (
    <ForumClient
      initialTopics={(topics ?? []) as unknown as ForumTopic[]}
      initialCategories={cats ?? []}
      initialCounts={counts}
    />
  );
}
