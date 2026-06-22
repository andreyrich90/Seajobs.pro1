import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import ForumClient from "./ForumClient";

export const dynamic = "force-dynamic";

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
