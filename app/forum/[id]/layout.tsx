import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("forum_topics")
    .select("title, content")
    .eq("id", id)
    .single();

  if (!data) return { title: "Forum | SeaJobs.pro" };

  const description = data.content
    .replace(/^#+ .*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: `${data.title} | SeaJobs.pro`,
    description,
    openGraph: {
      title: `${data.title} | SeaJobs.pro`,
      description,
      type: "article",
      siteName: "SeaJobs.pro",
    },
    twitter: {
      card: "summary",
      title: `${data.title} | SeaJobs.pro`,
      description,
    },
  };
}

export default function ForumTopicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
