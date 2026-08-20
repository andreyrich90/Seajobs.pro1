import type { Localized } from "./langs";

// Editorial recipe collections — curated groupings shown as "Подборки".
// Recipes themselves live in the DB; a collection just references them by slug,
// in display order. Add a new collection by appending here.
export interface Collection {
  slug: string;
  emoji: string;
  title: Localized;
  description: Localized;
  recipeSlugs: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "zakuski-k-pivu",
    emoji: "🍺",
    title: { ru: "Закуски к пиву", en: "Beer snacks" },
    description: {
      ru: "Пять хрустящих закусок для дружеской компании — от золотых луковых колец до крыльев в медовой глазури. Выбирайте любую.",
      en: "Five crunchy snacks for good company — from golden onion rings to honey-glazed wings. Pick any of them.",
    },
    recipeSlugs: [
      "zolotye-lukovye-kolca-v-pivnom-klyare",
      "kurinye-krylya-v-medovo-chesnochnoy-glazuri",
      "syrnye-palochki-v-dvoynoy-panirovke",
      "kartofelnye-dolki-s-paprikoy",
      "rzhanye-grenki-s-chesnokom-i-syrnym-dipom",
    ],
  },
  {
    slug: "pp-uzhiny",
    emoji: "🍽️",
    title: { ru: "ПП-ужины", en: "Healthy dinners" },
    description: {
      ru: "Лёгкие ужины без готовки часами — белок, овощи и ничего лишнего. Выбирайте любой.",
      en: "Light dinners that don't take hours — protein, veg and nothing extra. Pick any.",
    },
    recipeSlugs: [
      "kurinye-oladi-s-kabachkom",
      "kurica-s-kinoa-bowl",
      "grecheskiy-salat",
      "tomatnyy-krem-sup",
    ],
  },
  {
    slug: "9-vidov-kotlet",
    emoji: "🍖",
    title: { ru: "9 видов котлет", en: "9 kinds of cutlets" },
    description: {
      ru: "Шпаргалка на любой вкус: от классических мясных до постных гречневых и капустных с тянущимся сыром. Выбирайте любой рецепт.",
      en: "A cheat-sheet for every taste: from classic meat to lean buckwheat and cheesy cabbage. Pick any recipe.",
    },
    recipeSlugs: [
      "domashnie-myasnye-kotlety",
      "pozharskie-kotlety",
      "kurinye-kotlety-s-syrom",
      "kotlety-iz-indeyki-s-kabachkom",
      "rybnye-kotlety-iz-mintaya",
      "pechenochnye-kotlety-s-risom",
      "kartofelnye-kotlety-s-gribami",
      "grechnevye-kotlety-s-gribami",
      "kapustnye-kotlety-s-syrom",
    ],
  },
  {
    slug: "8-receptov-krevetok",
    emoji: "🦐",
    title: { ru: "8 рецептов креветок", en: "8 shrimp recipes" },
    description: {
      ru: "Быстро, сочно и невероятно вкусно: от креветок в чесночном масле до пасты «как в ресторане». Выбирайте любой рецепт.",
      en: "Fast, juicy and unbelievably good: from garlic-butter shrimp to restaurant-style pasta. Pick any recipe.",
    },
    recipeSlugs: [
      "krevetki-v-chesnochnom-masle",
      "krevetki-medovo-chili",
      "krevetki-v-slivochnom-souse",
      "hrustyaschie-krevetki",
      "kokosovoe-karri-s-krevetkami",
      "krevetki-teriyaki",
      "limonno-perechnye-krevetki",
      "pasta-s-krevetkami",
    ],
  },
];

export function findCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
