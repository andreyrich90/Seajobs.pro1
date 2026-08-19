import { SEED_LIFEHACKS, SEED_RECIPES } from "./data";
import { getServerSupabase, isSupabaseConfigured } from "./supabase/admin";
import type { Lifehack, Recipe } from "./types";

// Single content-access layer. If Supabase is configured it reads the live
// tables; otherwise it serves the built-in seed content so the site works with
// zero setup. Row shape mirrors lib/types.ts (see supabase/migrations).

// Placeholder cover shown until a photo is attached (e.g. a SQL insert with a
// NULL image, before an image is added from the admin panel).
function coverFor(category: string, image?: string | null): string {
  return image && image.trim() ? image : `/img/recipes/${category}.svg`;
}

function mapRecipe(row: any): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    isPp: row.is_pp,
    image: coverFor(row.category, row.image),
    minutes: row.minutes,
    calories: row.calories,
    servings: row.servings,
    difficulty: row.difficulty,
    title: row.title,
    description: row.description,
    ingredients: row.ingredients,
    steps: row.steps,
    tags: row.tags,
    createdAt: row.created_at,
  };
}

function mapLifehack(row: any): Lifehack {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    image: row.image,
    title: row.title,
    summary: row.summary,
    body: row.body,
    createdAt: row.created_at,
  };
}

export async function getRecipes(): Promise<Recipe[]> {
  if (!isSupabaseConfigured()) return SEED_RECIPES;
  try {
    const { data, error } = await getServerSupabase()
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return SEED_RECIPES;
    return data.map(mapRecipe);
  } catch {
    return SEED_RECIPES;
  }
}

export async function getRecipe(slug: string): Promise<Recipe | null> {
  const all = await getRecipes();
  return all.find((r) => r.slug === slug) ?? null;
}

export async function getPpRecipes(): Promise<Recipe[]> {
  return (await getRecipes()).filter((r) => r.isPp);
}

// Resolve a collection's recipe slugs to live Recipe objects, in the curated
// order, skipping any slug that no longer exists.
export async function getCollectionRecipes(slugs: string[]): Promise<Recipe[]> {
  const all = await getRecipes();
  const bySlug = new Map(all.map((r) => [r.slug, r]));
  return slugs.map((s) => bySlug.get(s)).filter((r): r is Recipe => Boolean(r));
}

export async function getLifehacks(): Promise<Lifehack[]> {
  if (!isSupabaseConfigured()) return SEED_LIFEHACKS;
  try {
    const { data, error } = await getServerSupabase()
      .from("lifehacks")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return SEED_LIFEHACKS;
    return data.map(mapLifehack);
  } catch {
    return SEED_LIFEHACKS;
  }
}

export async function getLifehack(slug: string): Promise<Lifehack | null> {
  const all = await getLifehacks();
  return all.find((l) => l.slug === slug) ?? null;
}
