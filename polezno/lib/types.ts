import type { Localized } from "./langs";

export type RecipeCategory =
  | "breakfast"
  | "soup"
  | "main"
  | "salad"
  | "dessert"
  | "drink"
  | "baking"
  | "snack";

export type LifehackCategory = "storage" | "cooking" | "cleaning" | "saving";

export type Difficulty = "easy" | "medium" | "hard";

export interface Recipe {
  id: string;
  slug: string;
  category: RecipeCategory;
  isPp: boolean; // правильное питание / healthy
  image: string;
  minutes: number;
  calories: number; // per serving
  servings: number;
  difficulty: Difficulty;
  title: Localized;
  description: Localized;
  ingredients: Localized<string[]>;
  steps: Localized<string[]>;
  tags: Localized<string[]>;
  createdAt: string; // ISO
}

export interface Lifehack {
  id: string;
  slug: string;
  category: LifehackCategory;
  image: string;
  title: Localized;
  summary: Localized;
  body: Localized<string[]>; // paragraphs
  createdAt: string;
}

export const RECIPE_CATEGORIES: RecipeCategory[] = [
  "breakfast",
  "soup",
  "main",
  "salad",
  "dessert",
  "baking",
  "snack",
  "drink",
];

export const LIFEHACK_CATEGORIES: LifehackCategory[] = [
  "storage",
  "cooking",
  "cleaning",
  "saving",
];
