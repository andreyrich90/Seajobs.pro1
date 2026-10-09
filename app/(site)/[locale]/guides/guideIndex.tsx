import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { GUIDE_SECTIONS, type GuideSection } from "@/lib/guidesUi";
import type { Lang } from "@/lib/langs";
import GuidesClient, { type GuideCard } from "./GuidesClient";

// The index for both /guides and /handbook — see ./[id]/guidePage.tsx.

export function guideIndexMetadata(locale: string, section: GuideSection): Metadata {
  const { path, ui: uiMap } = GUIDE_SECTIONS[section];
  const ui = uiMap[locale as Lang] ?? uiMap.en;
  return {
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: { canonical: canonicalUrl(path, locale), languages: hreflangAlternates(path) },
  };
}

export async function GuideIndexView({ section }: { section: GuideSection }) {
  const { data } = await getServerSupabase()
    .from("news_articles")
    .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
    .eq("is_published", true)
    .eq("category", section)
    .order("published_at", { ascending: false });

  return <GuidesClient initialGuides={(data ?? []) as GuideCard[]} section={section} />;
}
