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
];

export function findCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
