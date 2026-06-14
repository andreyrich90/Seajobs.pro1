import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

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

  const titleStr = loc(data.title);
  const contentStr = loc(data.content);

  const description = contentStr
    .replace(/^#+ .*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 160);

  return {
    title: `${titleStr} | SeaJobs.pro`,
    description,
    openGraph: {
      title: `${titleStr} | SeaJobs.pro`,
      description,
      type: "article",
      siteName: "SeaJobs.pro",
    },
    twitter: {
      card: "summary",
      title: `${titleStr} | SeaJobs.pro`,
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
