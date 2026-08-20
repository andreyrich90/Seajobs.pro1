import { pick, type Lang } from "./langs";
import type { Recipe } from "./types";
import { SITE_URL, localePath } from "./seo";

// schema.org structured data. Google reads these to build recipe rich results
// (the card with photo, time and calories) and breadcrumbs in search.

const HREFLANG: Record<Lang, string> = { ru: "ru", en: "en", ua: "uk" };
const BRAND = "Recepto";

function isoDuration(minutes: number): string | undefined {
  if (!minutes || minutes <= 0) return undefined;
  return `PT${Math.round(minutes)}M`;
}

// schema.org/Recipe for a recipe detail page.
export function recipeJsonLd(recipe: Recipe, lang: Lang) {
  const url = `${SITE_URL}${localePath(lang, `/recipes/${recipe.slug}`)}`;
  const steps = pick(recipe.steps, lang);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: pick(recipe.title, lang),
    description: pick(recipe.description, lang),
    image: recipe.image ? [recipe.image] : undefined,
    inLanguage: HREFLANG[lang],
    author: { "@type": "Organization", name: BRAND, url: SITE_URL },
    publisher: { "@type": "Organization", name: BRAND, url: SITE_URL },
    datePublished: recipe.createdAt,
    recipeCategory: pick(recipe.tags, lang)[0],
    recipeYield: recipe.servings ? `${recipe.servings}` : undefined,
    totalTime: isoDuration(recipe.minutes),
    keywords: pick(recipe.tags, lang).join(", ") || undefined,
    recipeIngredient: pick(recipe.ingredients, lang),
    recipeInstructions: steps.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
    nutrition: recipe.calories
      ? { "@type": "NutritionInformation", calories: `${recipe.calories} kcal` }
      : undefined,
    mainEntityOfPage: url,
    url,
  };
  // Drop undefined keys so the emitted JSON stays clean.
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);
  return data;
}

// schema.org/BreadcrumbList — Home / <section> / <leaf>.
export function breadcrumbJsonLd(
  lang: Lang,
  trail: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${localePath(lang, c.path)}`,
    })),
  };
}

// schema.org/ItemList for a collection page (ordered list of recipe URLs).
export function itemListJsonLd(
  lang: Lang,
  name: string,
  slugs: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: slugs.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${localePath(lang, `/recipes/${slug}`)}`,
    })),
  };
}

// schema.org/WebSite with a sitelinks search box + Organization, for the home page.
export function siteJsonLd(lang: Lang) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND,
      url: SITE_URL,
      inLanguage: HREFLANG[lang],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}${localePath(lang, "/recipes")}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BRAND,
      url: SITE_URL,
    },
  ];
}

// Render helper: a <script type="application/ld+json"> string-safe payload.
export function jsonLdScript(data: unknown): string {
  // Escape "<" to avoid breaking out of the <script> tag.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
