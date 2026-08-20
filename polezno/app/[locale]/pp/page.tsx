import type { Metadata } from "next";
import RecipeExplorer from "@/components/RecipeExplorer";
import { getDict } from "@/lib/i18n";
import { alternates } from "@/lib/seo";
import { isLang, type Lang } from "@/lib/langs";
import { getPpRecipes } from "@/lib/content";

// Re-read from the database in the background at most every 30s (ISR),
// so new recipes added via SQL appear without a redeploy.
export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  return {
    title: t["home.pp.title"],
    description: t["home.pp.subtitle"],
    alternates: alternates("/pp", lang),
  };
}

export default async function PpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  const recipes = await getPpRecipes();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-bold text-ink">
          🥗 {t["home.pp.title"]}
        </h1>
        <p className="mt-2 text-muted">{t["home.pp.subtitle"]}</p>
      </header>
      <RecipeExplorer recipes={recipes} initialPpOnly />
    </div>
  );
}
