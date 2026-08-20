import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { getDict } from "@/lib/i18n";
import { isLang, pick, LOCALES, type Lang } from "@/lib/langs";
import { href } from "@/lib/nav";
import { alternates } from "@/lib/seo";
import { breadcrumbJsonLd, itemListJsonLd, jsonLdScript } from "@/lib/jsonld";
import { COLLECTIONS, findCollection } from "@/lib/collections";
import { getCollectionCover, getCollectionRecipes } from "@/lib/content";

export const revalidate = 30;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => COLLECTIONS.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const c = findCollection(slug);
  if (!c) return { title: "404" };
  return {
    title: pick(c.title, lang),
    description: pick(c.description, lang),
    alternates: alternates(`/collections/${c.slug}`, lang),
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang: Lang = isLang(locale) ? locale : "ru";
  const t = getDict(lang);
  const collection = findCollection(slug);
  if (!collection) notFound();

  const [recipes, cover] = await Promise.all([
    getCollectionRecipes(collection.recipeSlugs),
    getCollectionCover(collection.slug),
  ]);

  const jsonLd = [
    breadcrumbJsonLd(lang, [
      { name: t["nav.home"], path: "/" },
      { name: t["collections.title"], path: "/collections" },
      { name: pick(collection.title, lang), path: `/collections/${collection.slug}` },
    ]),
    itemListJsonLd(lang, pick(collection.title, lang), recipes.map((r) => r.slug)),
  ];

  return (
    <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Link
        href={href(lang, "/collections")}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft size={16} /> {t["collections.back"]}
      </Link>

      <header className="mt-4 max-w-2xl">
        <div className="text-5xl">{collection.emoji}</div>
        <h1 className="mt-3 font-display text-4xl font-semibold text-basil sm:text-5xl">
          {pick(collection.title, lang)}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(collection.description, lang)}</p>
        <p className="mt-2 text-sm font-semibold text-clay">
          {recipes.length} {t["collections.count"]}
        </p>
      </header>

      {cover && (
        <div className="mt-6 overflow-hidden rounded-xl2 border border-line bg-cream2 shadow-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover}
            alt={pick(collection.title, lang)}
            className="mx-auto max-h-[520px] w-full object-contain"
          />
        </div>
      )}

      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}
