import type { Metadata } from "next";
import CollectionCard from "@/components/CollectionCard";
import { getDict } from "@/lib/i18n";
import { isLang } from "@/lib/langs";
import { COLLECTIONS } from "@/lib/collections";
import { getCollectionCovers, getRecipes } from "@/lib/content";

export const revalidate = 30;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");
  return { title: t["collections.title"], description: t["collections.subtitle"] };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDict(isLang(locale) ? locale : "ru");

  const [all, covers] = await Promise.all([getRecipes(), getCollectionCovers()]);
  const bySlug = new Map(all.map((r) => [r.slug, r]));

  const cards = COLLECTIONS.map((c) => {
    const recipes = c.recipeSlugs.map((s) => bySlug.get(s)).filter(Boolean);
    const cover =
      covers[c.slug] || (recipes[0] as any)?.image || "/img/recipes/snack.svg";
    return { c, cover, count: recipes.length };
  });

  return (
    <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold text-basil">{t["collections.title"]}</h1>
        <p className="mt-2 text-muted">{t["collections.subtitle"]}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ c, cover, count }) => (
          <CollectionCard
            key={c.slug}
            slug={c.slug}
            emoji={c.emoji}
            title={c.title}
            description={c.description}
            cover={cover}
            count={count}
          />
        ))}
      </div>
    </div>
  );
}
