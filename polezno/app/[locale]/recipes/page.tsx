import type { Metadata } from "next";
import RecipeExplorer from "@/components/RecipeExplorer";
import CategoryChips from "@/components/CategoryChips";
import { getDict } from "@/lib/i18n";
import { isLang, type Lang } from "@/lib/langs";
import { alternates } from "@/lib/seo";
import { getRecipes } from "@/lib/content";

// Re-read from the database in the background at most every 30s (ISR),
// so new recipes added via SQL appear without a redeploy.
export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  return {
    title: t["recipes.title"],
    description: t["recipes.subtitle"],
    alternates: alternates("/recipes", lang),
  };
}

export default async function RecipesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ cat?: string }>;
}) {
  const { locale } = await params;
  const { cat } = await searchParams;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  const recipes = await getRecipes();

  return (
    <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
      <header className="mb-6">
        <h1 className="font-display text-4xl font-semibold text-basil">{t["recipes.title"]}</h1>
        <p className="mt-2 text-muted">{t["recipes.subtitle"]}</p>
      </header>
      <div className="mb-8">
        <CategoryChips />
      </div>
      <RecipeExplorer recipes={recipes} initialCategory={cat || "all"} />
    </div>
  );
}
