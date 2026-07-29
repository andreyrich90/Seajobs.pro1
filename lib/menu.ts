import type { Lang } from "@/lib/i18n";

// Galley cook book — simple, cheap dishes crews actually cook on board.
// Rendered at /menu and shareable by QR code so a printed code in the galley
// opens this page. Recipe bodies are provided in EN + RU (the core audience);
// ua/pl/ro fall back to EN. Page chrome (labels/headings) is localised in all
// five site languages.

export type Recipe = {
  title: string;
  ingredients: string;
  steps: string;
};

export type MenuCategory = {
  key: string;
  title: string;
  recipes: Recipe[];
  tip: string;
};

export type MenuChrome = {
  h1: string;
  sub: string;
  ingredientsLabel: string;
  howLabel: string;
  tipLabel: string;
  qrTitle: string;
  qrSub: string;
};

export const MENU_CHROME: Record<Lang, MenuChrome> = {
  en: {
    h1: "Galley Menu",
    sub: "Simple, budget-friendly dishes for the crew — potatoes, rice, pasta and grains. Everything cooks with basic galley stores.",
    ingredientsLabel: "Ingredients",
    howLabel: "How to cook",
    tipLabel: "Pro tip",
    qrTitle: "Share this menu",
    qrSub: "Scan the QR code to open this menu on any phone.",
  },
  ru: {
    h1: "Меню камбуза",
    sub: "Простые и недорогие блюда для экипажа — картофель, рис, паста и крупы. Всё готовится из базовых продуктов на борту.",
    ingredientsLabel: "Ингредиенты",
    howLabel: "Как готовить",
    tipLabel: "Совет",
    qrTitle: "Поделиться меню",
    qrSub: "Отсканируйте QR-код, чтобы открыть это меню на любом телефоне.",
  },
  ua: {
    h1: "Меню камбуза",
    sub: "Прості та недорогі страви для екіпажу — картопля, рис, паста та крупи. Усе готується з базових продуктів на борту.",
    ingredientsLabel: "Інгредієнти",
    howLabel: "Як готувати",
    tipLabel: "Порада",
    qrTitle: "Поділитися меню",
    qrSub: "Відскануйте QR-код, щоб відкрити це меню на будь-якому телефоні.",
  },
  pl: {
    h1: "Menu kambuza",
    sub: "Proste i tanie dania dla załogi — ziemniaki, ryż, makaron i kasze. Wszystko z podstawowych zapasów.",
    ingredientsLabel: "Składniki",
    howLabel: "Jak gotować",
    tipLabel: "Wskazówka",
    qrTitle: "Udostępnij menu",
    qrSub: "Zeskanuj kod QR, aby otworzyć to menu na dowolnym telefonie.",
  },
  ro: {
    h1: "Meniul cambuzei",
    sub: "Preparate simple și ieftine pentru echipaj — cartofi, orez, paste și cereale. Totul din provizii de bază.",
    ingredientsLabel: "Ingrediente",
    howLabel: "Cum se gătește",
    tipLabel: "Sfat",
    qrTitle: "Distribuie meniul",
    qrSub: "Scanează codul QR pentru a deschide acest meniu pe orice telefon.",
  },
};

const MENU_EN: MenuCategory[] = [
  {
    key: "potatoes",
    title: "Potatoes",
    tip: "Use starchy potatoes for mashed; use waxy for boiled & salads.",
    recipes: [
      {
        title: "Draniki (Potato Pancakes)",
        ingredients: "Potatoes, onion, egg, flour, oil",
        steps: "Grate and drain potatoes. Mix with other ingredients. Fry in small patties until golden and crispy.",
      },
      {
        title: "Roasted Potato Wedges",
        ingredients: "Potatoes, olive oil, rosemary, paprika, garlic",
        steps: "Slice potatoes, toss with oil and spices. Bake at 200°C until tender and crispy.",
      },
      {
        title: "Creamy Mashed Potatoes",
        ingredients: "Potatoes, butter, warm milk, salt",
        steps: "Boil potatoes, drain, and mash while hot. Stir in butter and milk.",
      },
      {
        title: "Fry with Mushrooms",
        ingredients: "Potatoes, mushrooms, onion, oil",
        steps: "Slice and fry potatoes. Sauté mushrooms and onions, combine, and fry together.",
      },
      {
        title: "Spanish Tortilla",
        ingredients: "Potatoes, onion, eggs, olive oil",
        steps: "Slice and slow-cook potatoes and onions in oil. Mix with beaten eggs, pour into a pan, and cook both sides.",
      },
      {
        title: "Boiled Potatoes with Onions",
        ingredients: "Potatoes, onions, oil",
        steps: "Boil potatoes until tender. Slice and caramelize onions. Pour onions and oil over the potatoes.",
      },
      {
        title: "Boiled Potatoes with Dill",
        ingredients: "Potatoes, butter, fresh dill",
        steps: "Boil potatoes and drain. While hot, toss with butter and chopped fresh dill.",
      },
      {
        title: "Simple Skillet Fried Potatoes with Onions",
        ingredients: "Potatoes, onion, oil, salt, pepper",
        steps: "Heat oil in a heavy skillet. Add diced or sliced potatoes and fry over medium heat without much stirring until golden. Add onions and keep frying until both are done. Season and serve from the skillet.",
      },
    ],
  },
  {
    key: "grains",
    title: "Rice, Pasta & Grains",
    tip: "Always cook pasta al dente. Rinse buckwheat thoroughly. Add garlic last to rice.",
    recipes: [
      {
        title: "Fried Rice (Carrots & Onion)",
        ingredients: "Jasmine rice, carrots, onion, oil, salt",
        steps: "Sauté diced carrots and onions. Add cooked rice and stir-fry. Season.",
      },
      {
        title: "Uzbek Beef Plov",
        ingredients: "Rice, beef, carrots, onion, garlic, cumin",
        steps: "Brown the meat, then the vegetables. Add rice and water, cover, and steam until the rice is tender.",
      },
      {
        title: "Navy-Style Macaroni",
        ingredients: "Macaroni pasta, ground meat, onion, butter",
        steps: "Cook the pasta. Sauté meat and onions. Combine, toss with butter, add cheese.",
      },
      {
        title: "Pasta Carbonara",
        ingredients: "Spaghetti, pancetta/guanciale, eggs, Pecorino Romano, black pepper",
        steps: "Cook the pasta and the guanciale. Mix egg, cheese and pepper. Toss pasta in the guanciale, then in the egg mixture off the heat.",
      },
      {
        title: "Pasta Bolognese",
        ingredients: "Tagliatelle, ground beef, tomato, carrots, celery, onion",
        steps: "Make a sofrito, add meat and brown, add tomato and simmer. Serve over pasta.",
      },
      {
        title: "Chicken Alfredo",
        ingredients: "Fettuccine, chicken breast, cream, Parmesan, butter",
        steps: "Sauté the chicken. Make a cream-butter-cheese sauce. Toss cooked pasta and chicken in the sauce.",
      },
      {
        title: "Pasta Primavera",
        ingredients: "Penne, broccoli, cherry tomatoes, zucchini, peas",
        steps: "Cook the pasta. Roast or sauté the spring vegetables in olive oil. Combine.",
      },
      {
        title: "Buckwheat with Mushrooms",
        ingredients: "Buckwheat, mushrooms, onions, oil",
        steps: "Boil the buckwheat. Sauté mushrooms and onions. Mix together and garnish.",
      },
    ],
  },
];

const MENU_RU: MenuCategory[] = [
  {
    key: "potatoes",
    title: "Картофель",
    tip: "Для пюре берите крахмалистый картофель, для отварного и салатов — восковой.",
    recipes: [
      {
        title: "Драники",
        ingredients: "Картофель, лук, яйцо, мука, масло",
        steps: "Натрите и отожмите картофель. Смешайте с остальными ингредиентами. Жарьте небольшими оладьями до золотистой корочки.",
      },
      {
        title: "Дольки картофеля в духовке",
        ingredients: "Картофель, оливковое масло, розмарин, паприка, чеснок",
        steps: "Нарежьте картофель дольками, смешайте с маслом и специями. Запекайте при 200 °C до мягкости и румяности.",
      },
      {
        title: "Нежное картофельное пюре",
        ingredients: "Картофель, сливочное масло, тёплое молоко, соль",
        steps: "Отварите картофель, слейте воду и разомните горячим. Вмешайте масло и молоко.",
      },
      {
        title: "Жареный картофель с грибами",
        ingredients: "Картофель, грибы, лук, масло",
        steps: "Нарежьте и обжарьте картофель. Отдельно обжарьте грибы с луком, соедините и дожарьте вместе.",
      },
      {
        title: "Испанская тортилья",
        ingredients: "Картофель, лук, яйца, оливковое масло",
        steps: "Нарежьте и медленно потушите картофель с луком в масле. Смешайте со взбитыми яйцами, вылейте на сковороду и обжарьте с двух сторон.",
      },
      {
        title: "Отварной картофель с луком",
        ingredients: "Картофель, лук, масло",
        steps: "Отварите картофель до готовности. Нарежьте и карамелизуйте лук. Полейте картофель луком с маслом.",
      },
      {
        title: "Отварной картофель с укропом",
        ingredients: "Картофель, сливочное масло, свежий укроп",
        steps: "Отварите картофель и слейте воду. Горячим перемешайте с маслом и рубленым укропом.",
      },
      {
        title: "Жареный картофель с луком на сковороде",
        ingredients: "Картофель, лук, масло, соль, перец",
        steps: "Разогрейте масло в тяжёлой сковороде. Выложите нарезанный картофель и жарьте на среднем огне, почти не мешая, до румяности. Добавьте лук и дожарьте вместе. Посолите, поперчите и подавайте прямо со сковороды.",
      },
    ],
  },
  {
    key: "grains",
    title: "Рис, паста и крупы",
    tip: "Пасту всегда варите аль денте. Гречку тщательно промывайте. Чеснок в рис добавляйте в последнюю очередь.",
    recipes: [
      {
        title: "Жареный рис (морковь и лук)",
        ingredients: "Рис жасмин, морковь, лук, масло, соль",
        steps: "Обжарьте нарезанные морковь и лук. Добавьте отварной рис и обжарьте, помешивая. Посолите.",
      },
      {
        title: "Узбекский плов с говядиной",
        ingredients: "Рис, говядина, морковь, лук, чеснок, зира",
        steps: "Обжарьте мясо, затем овощи. Добавьте рис и воду, накройте и томите до готовности риса.",
      },
      {
        title: "Макароны по-флотски",
        ingredients: "Макароны, фарш, лук, сливочное масло",
        steps: "Отварите макароны. Обжарьте фарш с луком. Соедините, заправьте маслом и добавьте сыр.",
      },
      {
        title: "Паста карбонара",
        ingredients: "Спагетти, панчетта/гуанчиале, яйца, пекорино романо, чёрный перец",
        steps: "Отварите пасту, обжарьте гуанчиале. Смешайте яйцо, сыр и перец. Соедините пасту с гуанчиале, затем с яичной смесью, сняв с огня.",
      },
      {
        title: "Паста болоньезе",
        ingredients: "Тальятелле, говяжий фарш, помидоры, морковь, сельдерей, лук",
        steps: "Приготовьте зажарку (софрито), добавьте мясо и обжарьте, добавьте томаты и тушите. Подавайте с пастой.",
      },
      {
        title: "Курица альфредо",
        ingredients: "Феттучине, куриное филе, сливки, пармезан, сливочное масло",
        steps: "Обжарьте курицу. Приготовьте сливочно-сырный соус на масле. Соедините с пастой и курицей.",
      },
      {
        title: "Паста примавера",
        ingredients: "Пенне, брокколи, помидоры черри, цукини, горошек",
        steps: "Отварите пасту. Запеките или обжарьте овощи на оливковом масле. Соедините.",
      },
      {
        title: "Гречка с грибами",
        ingredients: "Гречка, грибы, лук, масло",
        steps: "Отварите гречку. Обжарьте грибы с луком. Смешайте и украсьте зеленью.",
      },
    ],
  },
];

export const MENU: Record<Lang, MenuCategory[]> = {
  en: MENU_EN,
  ru: MENU_RU,
  ua: MENU_EN,
  pl: MENU_EN,
  ro: MENU_EN,
};
