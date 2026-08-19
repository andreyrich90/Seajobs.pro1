import type { Lang } from "./langs";

// Flat UI dictionaries. Add new interface copy here. Content (recipe text,
// lifehack bodies) is NOT here — that lives in the data layer as Localized
// fields, because it is authored per-item, not per-app.
export type Dict = Record<string, string>;

const ru: Dict = {
  "brand": "Свежо",
  "brand.tagline": "Рецепты, ПП и кухонные лайфхаки",

  "nav.recipes": "Рецепты",
  "nav.pp": "ПП",
  "nav.lifehacks": "Лайфхаки",
  "nav.about": "О проекте",
  "header.profile": "Мой профиль",

  "home.eyebrow": "Проверенные рецепты · ПП · лайфхаки",
  "home.hero.line1": "Готовим просто.",
  "home.hero.line2pre": "Едим ",
  "home.hero.accent": "осознанно",
  "home.hero.subtitle":
    "Рецепты для ПП, быстрые ужины на будни, десерты без сахара и лайфхаки, которые реально экономят время на кухне.",
  "home.hero.cta": "Смотреть рецепты",
  "home.hero.cta2": "Рецепты ПП",
  "home.hero.badge": "100% ПП",

  "home.stats.recipes": "рецептов",
  "home.stats.pp": "ПП-блюд",
  "home.stats.lifehacks": "лайфхаков",

  "home.popular.title": "Популярное на этой неделе",
  "home.popular.subtitle": "То, что чаще всего готовят прямо сейчас",
  "home.popular.cta": "Все рецепты",

  "home.lifehacks.title": "Лайфхаки недели",
  "home.lifehacks.subtitle": "Маленькие хитрости, которые экономят время и продукты",
  "home.lifehacks.cta": "Все лайфхаки",

  "home.plan.eyebrow": "Меню на неделю",
  "home.plan.title": "Готовые ПП-подборки под вашу цель",
  "home.plan.body":
    "Наборы рецептов на неделю: лёгкий завтрак, обед с собой и ужин без готовки часами — с балансом КБЖУ.",
  "home.plan.f1": "Баланс КБЖУ под вашу цель",
  "home.plan.f2": "Список покупок одним списком",
  "home.plan.f3": "Замены при аллергиях и вкусах",
  "home.plan.cta": "Смотреть ПП-рецепты",
  "home.plan.week": "Пример недели",

  "home.news.eyebrow": "Раз в неделю, без спама",
  "home.news.title": "3 новых рецепта и один лайфхак каждую пятницу — прямо в почту",
  "home.news.placeholder": "Ваш email",
  "home.news.button": "Подписаться",
  "home.news.done": "Готово! Проверьте почту.",

  "chips.title": "Куда заглянуть",

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
  "recipe.portions": "порц.",

  "lifehacks.title": "Кухонные лайфхаки",
  "lifehacks.subtitle": "Хитрости, которые пригодятся каждый день.",
  "lifehack.back": "Ко всем лайфхакам",

  "about.title": "О проекте",
  "about.body":
    "«Свежо» — коллекция домашних рецептов, ПП-меню и проверенных кухонных лайфхаков. Мы собираем только то, что действительно работает: понятные шаги, честные калории и никакой воды.",

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

  "day.mon": "Понедельник",
  "day.tue": "Вторник",
  "day.wed": "Среда",
  "day.thu": "Четверг",
  "day.fri": "Пятница",

  "footer.about":
    "Рецепты, ПП-меню и кухонные лайфхаки для тех, кто хочет готовить вкусно и без лишней сложности.",
  "footer.col.sections": "Разделы",
  "footer.col.about": "О проекте",
  "footer.col.social": "Соцсети",
  "footer.link.about": "О нас",
  "footer.link.contacts": "Контакты",
  "footer.link.partners": "Партнёрам",
  "footer.rights": "Все права защищены.",
  "footer.made": "Сделано с любовью к еде.",
};

const en: Dict = {
  "brand": "Свежо",
  "brand.tagline": "Recipes, healthy eating & kitchen lifehacks",

  "nav.recipes": "Recipes",
  "nav.pp": "Healthy",
  "nav.lifehacks": "Lifehacks",
  "nav.about": "About",
  "header.profile": "My profile",

  "home.eyebrow": "Tested recipes · healthy · lifehacks",
  "home.hero.line1": "Cook simple.",
  "home.hero.line2pre": "Eat ",
  "home.hero.accent": "mindfully",
  "home.hero.subtitle":
    "Healthy recipes, quick weeknight dinners, sugar-free desserts and lifehacks that genuinely save you time in the kitchen.",
  "home.hero.cta": "Browse recipes",
  "home.hero.cta2": "Healthy recipes",
  "home.hero.badge": "100% healthy",

  "home.stats.recipes": "recipes",
  "home.stats.pp": "healthy dishes",
  "home.stats.lifehacks": "lifehacks",

  "home.popular.title": "Popular this week",
  "home.popular.subtitle": "What people are cooking right now",
  "home.popular.cta": "All recipes",

  "home.lifehacks.title": "Lifehacks of the week",
  "home.lifehacks.subtitle": "Small tricks that save time and groceries",
  "home.lifehacks.cta": "All lifehacks",

  "home.plan.eyebrow": "Weekly menu",
  "home.plan.title": "Ready healthy sets for your goal",
  "home.plan.body":
    "Weekly recipe sets: a light breakfast, lunch to go and a dinner that doesn't take hours — with balanced macros.",
  "home.plan.f1": "Macros balanced for your goal",
  "home.plan.f2": "Shopping list in one tap",
  "home.plan.f3": "Swaps for allergies and tastes",
  "home.plan.cta": "Browse healthy recipes",
  "home.plan.week": "Sample week",

  "home.news.eyebrow": "Once a week, no spam",
  "home.news.title": "3 new recipes and one lifehack every Friday — straight to your inbox",
  "home.news.placeholder": "Your email",
  "home.news.button": "Subscribe",
  "home.news.done": "Done! Check your inbox.",

  "chips.title": "Where to start",

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
  "recipe.portions": "serv.",

  "lifehacks.title": "Kitchen lifehacks",
  "lifehacks.subtitle": "Tricks you will use every day.",
  "lifehack.back": "All lifehacks",

  "about.title": "About",
  "about.body":
    "Свежо is a collection of home recipes, healthy-eating menus and tested kitchen lifehacks. We keep only what actually works: clear steps, honest calories and no filler.",

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

  "day.mon": "Monday",
  "day.tue": "Tuesday",
  "day.wed": "Wednesday",
  "day.thu": "Thursday",
  "day.fri": "Friday",

  "footer.about":
    "Recipes, healthy menus and kitchen lifehacks for people who want to cook well without the fuss.",
  "footer.col.sections": "Sections",
  "footer.col.about": "About",
  "footer.col.social": "Social",
  "footer.link.about": "About us",
  "footer.link.contacts": "Contacts",
  "footer.link.partners": "Partners",
  "footer.rights": "All rights reserved.",
  "footer.made": "Made with love for food.",
};

export const T: Record<Lang, Dict> = { ru, en };

export function getDict(lang: Lang): Dict {
  return T[lang] ?? T.ru;
}
