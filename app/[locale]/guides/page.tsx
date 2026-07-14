import { connection } from "next/server";
import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { GUIDES_UI } from "@/lib/guidesUi";
import type { Lang } from "@/lib/i18n";
import GuidesClient, { type GuideCard } from "./GuidesClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ui = GUIDES_UI[locale as Lang] ?? GUIDES_UI.en;
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: { canonical: canonicalUrl("/guides", locale), languages: hreflangAlternates("/guides") },
  };
}

export default async function GuidesPage() {
  await connection();
  const { data } = await getServerSupabase()
    .from("news_articles")
    .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
    .eq("is_published", true)
    .eq("category", "guide")
    .order("published_at", { ascending: false });

  return <GuidesClient initialGuides={(data ?? []) as GuideCard[]} />;
}
