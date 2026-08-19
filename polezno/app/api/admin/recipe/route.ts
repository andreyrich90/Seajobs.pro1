import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CATEGORIES = ["breakfast", "soup", "main", "salad", "dessert", "drink", "baking", "snack"];
const DIFFICULTIES = ["easy", "medium", "hard"];

// Create (or update) a recipe from the admin form — no SQL required.
// image is left NULL; attach a photo afterwards via the upload route.
export async function POST(req: Request) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "supabase-not-configured" }, { status: 503 });
  }

  let b: any;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }

  const loc = (v: any) => ({ ru: String(v?.ru ?? "").trim(), en: String(v?.en ?? "").trim() });
  const locArr = (v: any) => ({
    ru: Array.isArray(v?.ru) ? v.ru.map((s: any) => String(s).trim()).filter(Boolean) : [],
    en: Array.isArray(v?.en) ? v.en.map((s: any) => String(s).trim()).filter(Boolean) : [],
  });

  const title = loc(b.title);
  if (!title.ru || !title.en) {
    return NextResponse.json({ error: "title-ru-and-en-required" }, { status: 400 });
  }
  const category = CATEGORIES.includes(b.category) ? b.category : "snack";
  const difficulty = DIFFICULTIES.includes(b.difficulty) ? b.difficulty : "easy";
  const slug = (String(b.slug || "").trim() || slugify(title.en || title.ru)).toLowerCase();

  const row = {
    slug,
    category,
    is_pp: Boolean(b.isPp),
    image: null as string | null,
    minutes: Number(b.minutes) || 0,
    calories: Number(b.calories) || 0,
    servings: Number(b.servings) || 1,
    difficulty,
    title,
    description: loc(b.description),
    ingredients: locArr(b.ingredients),
    steps: locArr(b.steps),
    tags: locArr(b.tags),
  };

  const { error } = await getServerSupabase()
    .from("recipes")
    .upsert(row, { onConflict: "slug" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, slug });
}
