import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { hreflangAlternates, canonicalUrl } from "@/lib/seo";
import { GUIDE_SECTIONS, type GuideSection } from "@/lib/guidesUi";
import type { Lang } from "@/lib/langs";
import { slugId } from "@/lib/slug";
import GuidesClient, { type GuideCard } from "./GuidesClient";

type Row = {
  id: string;
  title: Record<string, string> | null;
  body: Record<string, string> | null;
  tag: string | null;
  cover_gradient: string | null;
  cover_url: string | null;
  published_at: string | null;
  created_at: string;
};

function excerpt(text: string, max = 140): string {
  const clean = text.replace(/^#{1,6}\s.*$/gm, "").replace(/^(::|!!|\?\?|=>)\s?/gm, "").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}
function readMins(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));
}

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

// The cards are built here, in the reader's language, and only they reach the
// browser. The page used to hand every article's full body in all five
// languages to the client component, which cut the excerpt there: /guides
// weighed 1.6 MB and /handbook 0.8 MB, rewritten to the ISR cache on every
// refresh in every language.
export async function GuideIndexView({ section, locale }: { section: GuideSection; locale: string }) {
  const lang = locale as Lang;
  const ukKey = lang === "ua" ? "uk" : lang;
  const { data } = await getServerSupabase()
    .from("news_articles")
    .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
    .eq("is_published", true)
    .eq("category", section)
    .order("published_at", { ascending: false });

  const cards: GuideCard[] = ((data ?? []) as Row[]).map((g) => {
    const body = g.body?.[lang] || g.body?.[ukKey] || g.body?.en || "";
    const title = g.title?.[lang] || g.title?.[ukKey] || g.title?.en || "";
    return {
      id: slugId(title, g.id),
      title,
      tag: g.tag,
      date: g.published_at ?? g.created_at,
      gradient: g.cover_gradient ?? "linear-gradient(135deg,#0c4a6e,#155e75)",
      coverUrl: g.cover_url ?? null,
      excerpt: excerpt(body),
      readMins: readMins(body),
    };
  });

  return <GuidesClient cards={cards} section={section} />;
}
