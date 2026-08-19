import type { Metadata } from "next";
import RecipeExplorer from "@/components/RecipeExplorer";
import { getDict } from "@/lib/i18n";
import { isLang, type Lang } from "@/lib/langs";
import { getRecipes } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");
  return { title: t["recipes.title"], description: t["recipes.subtitle"] };
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
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-basil">{t["recipes.title"]}</h1>
        <p className="mt-2 text-muted">{t["recipes.subtitle"]}</p>
      </header>
      <RecipeExplorer recipes={recipes} initialCategory={cat || "all"} />
    </div>
  );
}
