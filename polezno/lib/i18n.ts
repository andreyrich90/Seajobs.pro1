import type { Lang } from "./langs";

// Flat UI dictionaries. Add new interface copy here. Content (recipe text,
// lifehack bodies) is NOT here — that lives in the data layer as Localized
// fields, because it is authored per-item, not per-app.
export type Dict = Record<string, string>;

const ru: Dict = {
  "brand": "Просто Полезно",
  "brand.tagline": "Рецепты, правильное питание и лайфхаки для кухни",

  "nav.home": "Главная",
  "nav.recipes": "Рецепты",
  "nav.pp": "ПП-питание",
  "nav.lifehacks": "Лайфхаки",
  "nav.about": "О проекте",
  "nav.search": "Поиск",

  "home.hero.title": "Готовить вкусно и с пользой — просто",
  "home.hero.subtitle":
    "Проверенные рецепты, меню правильного питания и кухонные лайфхаки, которые экономят время и деньги.",
  "home.hero.cta": "Смотреть рецепты",
  "home.hero.ctaPp": "Рецепты ПП",
  "home.featured": "Популярные рецепты",
  "home.pp.title": "Правильное питание",
  "home.pp.subtitle": "Лёгкие блюда до 500 ккал — вкусно и без чувства вины.",
  "home.pp.cta": "Все ПП-рецепты",
  "home.lifehacks.title": "Кухонные лайфхаки",
  "home.lifehacks.subtitle": "Маленькие хитрости, которые меняют готовку.",
  "home.lifehacks.cta": "Все лайфхаки",
  "home.stats.recipes": "рецептов",
  "home.stats.pp": "ПП-блюд",
  "home.stats.lifehacks": "лайфхаков",

  "recipes.title": "Рецепты",
  "recipes.subtitle": "Найдите блюдо по категории, времени или запросу.",
  "recipes.search.placeholder": "Что приготовить? Например: паста, салат…",
  "recipes.filter.all": "Все",
  "recipes.filter.ppOnly": "Только ПП",
  "recipes.empty": "Ничего не нашлось. Попробуйте другой запрос.",
  "recipes.count": "Найдено блюд:",

  "recipe.time": "Время",
  "recipe.calories": "Калории",
  "recipe.servings": "Порции",
  "recipe.difficulty": "Сложность",
  "recipe.ingredients": "Ингредиенты",
  "recipe.steps": "Приготовление",
  "recipe.tags": "Теги",
  "recipe.back": "Ко всем рецептам",
  "recipe.pp.badge": "ПП",
  "recipe.min": "мин",
  "recipe.kcal": "ккал",

  "lifehacks.title": "Кухонные лайфхаки",
  "lifehacks.subtitle": "Хитрости, которые пригодятся каждый день.",
  "lifehack.back": "Ко всем лайфхакам",

  "about.title": "О проекте",
  "about.body":
    "«Просто Полезно» — это коллекция домашних рецептов, меню правильного питания и проверенных кухонных лайфхаков. Мы собираем только то, что действительно работает: понятные шаги, честные калории и никакой воды.",

  "difficulty.easy": "Легко",
  "difficulty.medium": "Средне",
  "difficulty.hard": "Сложно",

  "cat.breakfast": "Завтраки",
  "cat.soup": "Супы",
  "cat.main": "Основные блюда",
  "cat.salad": "Салаты",
  "cat.dessert": "Десерты",
  "cat.drink": "Напитки",
  "cat.baking": "Выпечка",
  "cat.snack": "Перекусы",

  "lcat.storage": "Хранение",
  "lcat.cooking": "Готовка",
  "lcat.cleaning": "Уборка",
  "lcat.saving": "Экономия",

  "footer.rights": "Все права защищены.",
  "footer.madeWith": "Сделано с любовью к еде.",
};

const en: Dict = {
  "brand": "Simply Healthy",
  "brand.tagline": "Recipes, healthy eating and kitchen lifehacks",

  "nav.home": "Home",
  "nav.recipes": "Recipes",
  "nav.pp": "Healthy",
  "nav.lifehacks": "Lifehacks",
  "nav.about": "About",
  "nav.search": "Search",

  "home.hero.title": "Cooking well and healthy — made simple",
  "home.hero.subtitle":
    "Tested recipes, healthy-eating menus and kitchen lifehacks that save you time and money.",
  "home.hero.cta": "Browse recipes",
  "home.hero.ctaPp": "Healthy recipes",
  "home.featured": "Popular recipes",
  "home.pp.title": "Healthy eating",
  "home.pp.subtitle": "Light dishes under 500 kcal — tasty and guilt-free.",
  "home.pp.cta": "All healthy recipes",
  "home.lifehacks.title": "Kitchen lifehacks",
  "home.lifehacks.subtitle": "Small tricks that change the way you cook.",
  "home.lifehacks.cta": "All lifehacks",
  "home.stats.recipes": "recipes",
  "home.stats.pp": "healthy dishes",
  "home.stats.lifehacks": "lifehacks",

  "recipes.title": "Recipes",
  "recipes.subtitle": "Find a dish by category, time or keyword.",
  "recipes.search.placeholder": "What to cook? e.g. pasta, salad…",
  "recipes.filter.all": "All",
  "recipes.filter.ppOnly": "Healthy only",
  "recipes.empty": "Nothing found. Try another query.",
  "recipes.count": "Dishes found:",

  "recipe.time": "Time",
  "recipe.calories": "Calories",
  "recipe.servings": "Servings",
  "recipe.difficulty": "Difficulty",
  "recipe.ingredients": "Ingredients",
  "recipe.steps": "Method",
  "recipe.tags": "Tags",
  "recipe.back": "All recipes",
  "recipe.pp.badge": "Healthy",
  "recipe.min": "min",
  "recipe.kcal": "kcal",

  "lifehacks.title": "Kitchen lifehacks",
  "lifehacks.subtitle": "Tricks you will use every day.",
  "lifehack.back": "All lifehacks",

  "about.title": "About",
  "about.body":
    "Simply Healthy is a collection of home recipes, healthy-eating menus and tested kitchen lifehacks. We keep only what actually works: clear steps, honest calories and no filler.",

  "difficulty.easy": "Easy",
  "difficulty.medium": "Medium",
  "difficulty.hard": "Hard",

  "cat.breakfast": "Breakfast",
  "cat.soup": "Soups",
  "cat.main": "Main dishes",
  "cat.salad": "Salads",
  "cat.dessert": "Desserts",
  "cat.drink": "Drinks",
  "cat.baking": "Baking",
  "cat.snack": "Snacks",

  "lcat.storage": "Storage",
  "lcat.cooking": "Cooking",
  "lcat.cleaning": "Cleaning",
  "lcat.saving": "Saving",

  "footer.rights": "All rights reserved.",
  "footer.madeWith": "Made with love for food.",
};

export const T: Record<Lang, Dict> = { ru, en };

export function getDict(lang: Lang): Dict {
  return T[lang] ?? T.ru;
}
