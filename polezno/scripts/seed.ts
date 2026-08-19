/*
  Populate the Supabase `recipes` and `lifehacks` tables from the built-in seed
  content. Run once after applying supabase/migrations/0001_init.sql:

    NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run db:seed

  Idempotent: upserts on `slug`.
*/
import { createClient } from "@supabase/supabase-js";
import { SEED_LIFEHACKS, SEED_RECIPES } from "../lib/data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in the environment."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

async function main() {
  const recipeRows = SEED_RECIPES.map((r) => ({
    id: r.id,
    slug: r.slug,
    category: r.category,
    is_pp: r.isPp,
    image: r.image,
    minutes: r.minutes,
    calories: r.calories,
    servings: r.servings,
    difficulty: r.difficulty,
    title: r.title,
    description: r.description,
    ingredients: r.ingredients,
    steps: r.steps,
    tags: r.tags,
    created_at: r.createdAt,
  }));

  const lifehackRows = SEED_LIFEHACKS.map((l) => ({
    id: l.id,
    slug: l.slug,
    category: l.category,
    image: l.image,
    title: l.title,
    summary: l.summary,
    body: l.body,
    created_at: l.createdAt,
  }));

  const { error: rErr } = await supabase
    .from("recipes")
    .upsert(recipeRows, { onConflict: "slug" });
  if (rErr) throw rErr;
  console.log(`✓ upserted ${recipeRows.length} recipes`);

  const { error: lErr } = await supabase
    .from("lifehacks")
    .upsert(lifehackRows, { onConflict: "slug" });
  if (lErr) throw lErr;
  console.log(`✓ upserted ${lifehackRows.length} lifehacks`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
