import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/admin";
import { extractId } from "@/lib/slug";
import TopicClient from "./TopicClient";

export const dynamic = "force-dynamic";

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  const { id: param } = await params;
  const id = extractId(param) ?? param;
  const sb = getServerSupabase();

  const [{ data: topic }, { data: posts }] = await Promise.all([
    sb.from("forum_topics").select("*").eq("id", id).single(),
    sb.from("forum_posts").select("*").eq("topic_id", id).order("created_at", { ascending: true }),
  ]);

  if (!topic) notFound();

  return <TopicClient initialTopic={topic} initialPosts={posts ?? []} />;
}
