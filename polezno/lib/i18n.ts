import type { Lang } from "./langs";

// Flat UI dictionaries. Add new interface copy here. Content (recipe text,
// lifehack bodies) is NOT here — that lives in the data layer as Localized
// fields, because it is authored per-item, not per-app.
export type Dict = Record<string, string>;

const ru: Dict = {
  "brand": "Recepto",
  "brand.tagline": "Рецепты, ПП и кухонные лайфхаки",

  "nav.recipes": "Рецепты",
  "nav.pp": "ПП",
  "nav.collections": "Подборки",
  "nav.lifehacks": "Лайфхаки",
  "nav.about": "О проекте",
  "header.profile": "Мой профиль",

  "collections.title": "Подборки",
  "collections.subtitle": "Готовые наборы рецептов под случай — выбирайте и готовьте.",
  "collections.back": "Все подборки",
  "collections.count": "рецептов",
  "collections.open": "Открыть подборку",
  "home.collections.title": "Подборки",
  "home.collections.subtitle": "Наборы рецептов под настроение и повод",
  "home.collections.cta": "Все подборки",

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
    "«Recepto» — коллекция домашних рецептов, ПП-меню и проверенных кухонных лайфхаков. Мы собираем только то, что действительно работает: понятные шаги, честные калории и никакой воды.",

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
  "footer.link.privacy": "Политика конфиденциальности",
  "footer.rights": "Все права защищены.",
  "footer.made": "Сделано с любовью к еде.",

  "privacy.title": "Политика конфиденциальности",
  "privacy.updated": "Обновлено",
  "contacts.title": "Контакты",
  "contacts.subtitle": "Пишите нам по любым вопросам — о рецептах, сотрудничестве или ошибках на сайте.",
  "contacts.email": "Электронная почта",
  "contacts.reply": "Отвечаем обычно в течение пары дней.",

  "cookie.text": "Мы используем cookie для работы сайта, аналитики и показа рекламы.",
  "cookie.accept": "Принять",
  "cookie.more": "Подробнее",
};

const en: Dict = {
  "brand": "Recepto",
  "brand.tagline": "Recipes, healthy eating & kitchen lifehacks",

  "nav.recipes": "Recipes",
  "nav.pp": "Healthy",
  "nav.collections": "Collections",
  "nav.lifehacks": "Lifehacks",
  "nav.about": "About",
  "header.profile": "My profile",

  "collections.title": "Collections",
  "collections.subtitle": "Ready recipe sets for the occasion — pick one and cook.",
  "collections.back": "All collections",
  "collections.count": "recipes",
  "collections.open": "Open collection",
  "home.collections.title": "Collections",
  "home.collections.subtitle": "Recipe sets for the mood and the occasion",
  "home.collections.cta": "All collections",

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
    "Recepto is a collection of home recipes, healthy-eating menus and tested kitchen lifehacks. We keep only what actually works: clear steps, honest calories and no filler.",

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
  "footer.link.privacy": "Privacy Policy",
  "footer.rights": "All rights reserved.",
  "footer.made": "Made with love for food.",

  "privacy.title": "Privacy Policy",
  "privacy.updated": "Updated",
  "contacts.title": "Contacts",
  "contacts.subtitle": "Get in touch about recipes, partnerships or any issue on the site.",
  "contacts.email": "Email",
  "contacts.reply": "We usually reply within a couple of days.",

  "cookie.text": "We use cookies to run the site, for analytics and to serve ads.",
  "cookie.accept": "Accept",
  "cookie.more": "Learn more",
};

const ua: Dict = {
  "brand": "Recepto",
  "brand.tagline": "Рецепти, ПХ та кухонні лайфхаки",

  "nav.recipes": "Рецепти",
  "nav.pp": "ПХ",
  "nav.collections": "Добірки",
  "nav.lifehacks": "Лайфхаки",
  "nav.about": "Про проєкт",
  "header.profile": "Мій профіль",

  "collections.title": "Добірки",
  "collections.subtitle": "Готові набори рецептів під випадок — обирайте й готуйте.",
  "collections.back": "Усі добірки",
  "collections.count": "рецептів",
  "collections.open": "Відкрити добірку",
  "home.collections.title": "Добірки",
  "home.collections.subtitle": "Набори рецептів під настрій і привід",
  "home.collections.cta": "Усі добірки",

  "home.eyebrow": "Перевірені рецепти · ПХ · лайфхаки",
  "home.hero.line1": "Готуємо просто.",
  "home.hero.line2pre": "Їмо ",
  "home.hero.accent": "усвідомлено",
  "home.hero.subtitle":
    "Рецепти для правильного харчування, швидкі вечері на будні, десерти без цукру та лайфхаки, що реально економлять час на кухні.",
  "home.hero.cta": "Дивитися рецепти",
  "home.hero.cta2": "Рецепти ПХ",
  "home.hero.badge": "100% ПХ",

  "home.stats.recipes": "рецептів",
  "home.stats.pp": "страв ПХ",
  "home.stats.lifehacks": "лайфхаків",

  "home.popular.title": "Популярне цього тижня",
  "home.popular.subtitle": "Те, що найчастіше готують просто зараз",
  "home.popular.cta": "Усі рецепти",

  "home.lifehacks.title": "Лайфхаки тижня",
  "home.lifehacks.subtitle": "Маленькі хитрощі, що заощаджують час і продукти",
  "home.lifehacks.cta": "Усі лайфхаки",

  "home.plan.eyebrow": "Меню на тиждень",
  "home.plan.title": "Готові ПХ-добірки під вашу мету",
  "home.plan.body":
    "Набори рецептів на тиждень: легкий сніданок, обід із собою та вечеря без готування годинами — зі збалансованим КБЖВ.",
  "home.plan.f1": "Баланс КБЖВ під вашу мету",
  "home.plan.f2": "Список покупок одним списком",
  "home.plan.f3": "Заміни за алергій та смаків",
  "home.plan.cta": "Дивитися рецепти ПХ",
  "home.plan.week": "Приклад тижня",

  "home.news.eyebrow": "Раз на тиждень, без спаму",
  "home.news.title": "3 нові рецепти й один лайфхак щоп’ятниці — прямо на пошту",
  "home.news.placeholder": "Ваш email",
  "home.news.button": "Підписатися",
  "home.news.done": "Готово! Перевірте пошту.",

  "chips.title": "Куди зазирнути",

  "recipes.title": "Рецепти",
  "recipes.subtitle": "Знайдіть страву за категорією, часом або запитом.",
  "recipes.search.placeholder": "Що приготувати? Наприклад: паста, салат…",
  "recipes.filter.all": "Усі",
  "recipes.filter.ppOnly": "Лише ПХ",
  "recipes.empty": "Нічого не знайдено. Спробуйте інший запит.",
  "recipes.count": "Знайдено страв:",

  "recipe.time": "Час",
  "recipe.calories": "Калорії",
  "recipe.servings": "Порції",
  "recipe.difficulty": "Складність",
  "recipe.ingredients": "Інгредієнти",
  "recipe.steps": "Приготування",
  "recipe.tags": "Теги",
  "recipe.back": "До всіх рецептів",
  "recipe.pp.badge": "ПХ",
  "recipe.min": "хв",
  "recipe.kcal": "ккал",
  "recipe.portions": "порц.",

  "lifehacks.title": "Кухонні лайфхаки",
  "lifehacks.subtitle": "Хитрощі, що знадобляться щодня.",
  "lifehack.back": "До всіх лайфхаків",

  "about.title": "Про проєкт",
  "about.body":
    "«Recepto» — колекція домашніх рецептів, ПХ-меню та перевірених кухонних лайфхаків. Ми збираємо лише те, що справді працює: зрозумілі кроки, чесні калорії та жодної води.",

  "difficulty.easy": "Легко",
  "difficulty.medium": "Середньо",
  "difficulty.hard": "Складно",

  "cat.breakfast": "Сніданки",
  "cat.soup": "Супи",
  "cat.main": "Основні страви",
  "cat.salad": "Салати",
  "cat.dessert": "Десерти",
  "cat.drink": "Напої",
  "cat.baking": "Випічка",
  "cat.snack": "Перекуси",

  "lcat.storage": "Зберігання",
  "lcat.cooking": "Готування",
  "lcat.cleaning": "Прибирання",
  "lcat.saving": "Економія",

  "day.mon": "Понеділок",
  "day.tue": "Вівторок",
  "day.wed": "Середа",
  "day.thu": "Четвер",
  "day.fri": "П’ятниця",

  "footer.about":
    "Рецепти, ПХ-меню та кухонні лайфхаки для тих, хто хоче готувати смачно й без зайвої складності.",
  "footer.col.sections": "Розділи",
  "footer.col.about": "Про проєкт",
  "footer.col.social": "Соцмережі",
  "footer.link.about": "Про нас",
  "footer.link.contacts": "Контакти",
  "footer.link.partners": "Партнерам",
  "footer.link.privacy": "Політика конфіденційності",
  "footer.rights": "Усі права захищені.",
  "footer.made": "Зроблено з любов’ю до їжі.",

  "privacy.title": "Політика конфіденційності",
  "privacy.updated": "Оновлено",
  "contacts.title": "Контакти",
  "contacts.subtitle": "Пишіть нам із будь-яких питань — про рецепти, співпрацю чи помилки на сайті.",
  "contacts.email": "Електронна пошта",
  "contacts.reply": "Відповідаємо зазвичай упродовж кількох днів.",

  "cookie.text": "Ми використовуємо cookie для роботи сайту, аналітики та показу реклами.",
  "cookie.accept": "Прийняти",
  "cookie.more": "Докладніше",
};

export const T: Record<Lang, Dict> = { ru, en, ua };

export function getDict(lang: Lang): Dict {
  return T[lang] ?? T.ru;
}
