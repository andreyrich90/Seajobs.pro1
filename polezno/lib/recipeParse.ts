// Turn a food photo into a complete, unique recipe (RU + EN) with Claude's
// vision. Used by /api/admin/parse-recipe-image. The model reads the picture
// (and any text baked into it) and *rewrites* the recipe in its own words, so
// the description is unique — a verbatim copy of overlay text hurts SEO.
//
// It returns one or more recipes: a single infographic can carry several
// numbered dishes, so we always return an array.

const CATEGORIES = ["breakfast", "soup", "main", "salad", "dessert", "drink", "baking", "snack"] as const;
const DIFFICULTIES = ["easy", "medium", "hard"] as const;

type Category = (typeof CATEGORIES)[number];
type Difficulty = (typeof DIFFICULTIES)[number];

export interface ParsedRecipe {
  category: Category;
  isPp: boolean;
  minutes: number;
  calories: number;
  servings: number;
  difficulty: Difficulty;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  ingredients: { ru: string[]; en: string[] };
  steps: { ru: string[]; en: string[] };
  tags: { ru: string[]; en: string[] };
}

export interface ParseImage {
  base64: string;
  mediaType: string;
}

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const SYSTEM = `You are a bilingual (Russian + English) recipe editor for a cooking website.
You are given one or more food photos. Some photos are infographics with text
baked in (title, ingredient list, steps); others are just a dish. From EACH
distinct dish, produce a complete recipe.

Rules:
- Write EVERYTHING in BOTH Russian (ru) and English (en). Natural, native copy —
  not a machine translation, and never a verbatim copy of text in the image.
- description: 2–3 warm, appetising sentences in your OWN words. Unique — do not
  copy the photo's caption. No emoji.
- ingredients: a clean list with amounts (e.g. "Креветки — 400 г" / "Shrimp — 400 g").
  Keep ru and en items in the same order and count.
- steps: clear numbered actions (as an array, no numbering inside the text).
  Keep ru and en in the same order and count. You may add one short helpful tip
  as the last step.
- category: exactly one of breakfast, soup, main, salad, dessert, drink, baking, snack.
- difficulty: exactly one of easy, medium, hard.
- isPp: true only if the dish is genuinely light/healthy ("ПП"), else false.
- minutes, calories (per serving, your best estimate), servings: integers.
- tags: 3–5 short lowercase tags in each language.
- If specifics (calories, minutes) are not shown, estimate sensibly from the dish.

Record the result by calling the save_recipes tool. Do not write any prose.`;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const arr = (v: unknown) =>
  Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : [];

function normalise(r: any): ParsedRecipe | null {
  const title = { ru: str(r?.title?.ru), en: str(r?.title?.en) };
  if (!title.ru && !title.en) return null;
  // Guarantee both languages have *something* so downstream save never fails.
  if (!title.ru) title.ru = title.en;
  if (!title.en) title.en = title.ru;

  const category: Category = CATEGORIES.includes(r?.category) ? r.category : "main";
  const difficulty: Difficulty = DIFFICULTIES.includes(r?.difficulty) ? r.difficulty : "easy";
  const num = (v: unknown, d: number) => {
    const n = Math.round(Number(v));
    return Number.isFinite(n) && n > 0 ? n : d;
  };

  return {
    category,
    isPp: Boolean(r?.isPp),
    minutes: num(r?.minutes, 20),
    calories: num(r?.calories, 300),
    servings: num(r?.servings, 2),
    difficulty,
    title,
    description: { ru: str(r?.description?.ru), en: str(r?.description?.en) },
    ingredients: { ru: arr(r?.ingredients?.ru), en: arr(r?.ingredients?.en) },
    steps: { ru: arr(r?.steps?.ru), en: arr(r?.steps?.en) },
    tags: { ru: arr(r?.tags?.ru), en: arr(r?.tags?.en) },
  };
}

export async function parseRecipesFromImages(
  apiKey: string,
  images: ParseImage[]
): Promise<ParsedRecipe[]> {
  const valid = images.filter(
    (im) => im && typeof im.base64 === "string" && IMAGE_TYPES.includes(im.mediaType)
  );
  if (!valid.length) throw new Error("no_valid_images");

  const model = process.env.RECIPE_AI_MODEL || "claude-haiku-4-5-20251001";

  const content: any[] = valid.map((im) => ({
    type: "image",
    source: { type: "base64", media_type: im.mediaType, data: im.base64 },
  }));
  content.push({
    type: "text",
    text: "Read the photo(s) and record every distinct dish with the save_recipes tool.",
  });

  // Structured tool use: the model must call save_recipes with a typed object,
  // so we get a real parsed object back — no hand-parsing of free-form JSON,
  // which is what used to break on long or slightly-malformed output.
  const locStr = { type: "object", properties: { ru: { type: "string" }, en: { type: "string" } }, required: ["ru", "en"] };
  const locArrSchema = {
    type: "object",
    properties: { ru: { type: "array", items: { type: "string" } }, en: { type: "array", items: { type: "string" } } },
    required: ["ru", "en"],
  };
  const tools = [
    {
      name: "save_recipes",
      description: "Record one or more complete recipes read from the photo(s).",
      input_schema: {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category: { type: "string", enum: [...CATEGORIES] },
                isPp: { type: "boolean" },
                minutes: { type: "integer" },
                calories: { type: "integer" },
                servings: { type: "integer" },
                difficulty: { type: "string", enum: [...DIFFICULTIES] },
                title: locStr,
                description: locStr,
                ingredients: locArrSchema,
                steps: locArrSchema,
                tags: locArrSchema,
              },
              required: ["category", "difficulty", "title", "description", "ingredients", "steps", "tags"],
            },
          },
        },
        required: ["recipes"],
      },
    },
  ];

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 8000,
      system: SYSTEM,
      tools,
      tool_choice: { type: "tool", name: "save_recipes" },
      messages: [{ role: "user", content }],
    }),
  });

  if (!r.ok) {
    throw new Error(`anthropic_${r.status}: ${(await r.text()).slice(0, 200)}`);
  }

  const data = await r.json();

  if (data.stop_reason === "max_tokens") {
    throw new Error("response_truncated: too many recipes at once — upload fewer photos");
  }

  const toolUse = (data.content ?? []).find(
    (b: { type?: string; name?: string }) => b.type === "tool_use" && b.name === "save_recipes"
  );
  const parsed = toolUse?.input;
  const list = Array.isArray(parsed?.recipes) ? parsed.recipes : [];
  const recipes = list.map(normalise).filter(Boolean) as ParsedRecipe[];
  if (!recipes.length) throw new Error("no_recipe_parsed");
  return recipes;
}
