import type { Lang } from "./langs";

// Contact address shown on the Contacts page and in the privacy policy.
// Override with NEXT_PUBLIC_CONTACT_EMAIL once the domain email exists.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@recepto.io";

export interface LegalSection {
  heading: string;
  body: string[];
}

// Plain-language privacy policy covering cookies, third-party advertising
// (Google AdSense) and analytics — the pages AdSense requires.
// This is a standard template, not legal advice.
const ru: LegalSection[] = [
  {
    heading: "Кто мы",
    body: [
      `Recepto — сайт с рецептами, меню правильного питания и кухонными лайфхаками. По вопросам обработки данных пишите на ${CONTACT_EMAIL}.`,
    ],
  },
  {
    heading: "Какие данные мы обрабатываем",
    body: [
      "Мы не требуем регистрации для просмотра рецептов. Персональные данные вы передаёте добровольно — например, оставляя email в форме подписки или обращаясь в контакты.",
      "Автоматически собираются технические данные: тип устройства и браузера, страна, просмотренные страницы и источник перехода — в обезличенном виде, для статистики и улучшения сайта.",
    ],
  },
  {
    heading: "Файлы cookie",
    body: [
      "Cookie — небольшие файлы, которые сайт сохраняет в вашем браузере. Мы используем их для работы сайта (например, выбранная тема и язык), аналитики и показа рекламы.",
      "Вы можете отключить cookie в настройках браузера, но часть функций может работать некорректно.",
    ],
  },
  {
    heading: "Реклама третьих сторон",
    body: [
      "На сайте может показываться реклама через сервис Google AdSense. Он использует собственные cookie, чтобы показывать более релевантную рекламу.",
      "Google, как сторонний поставщик, использует cookie для показа объявлений на основе прежних посещений вами этого и других сайтов. Вы можете отключить персонализированную рекламу в настройках Google: https://www.google.com/settings/ads.",
    ],
  },
  {
    heading: "Аналитика",
    body: [
      "Мы можем использовать сервисы веб-аналитики (например, Google Analytics), чтобы понимать, какие рецепты популярны. Данные собираются в агрегированном виде и не позволяют вас идентифицировать.",
    ],
  },
  {
    heading: "Хранение и защита",
    body: [
      "Мы храним данные не дольше, чем это необходимо, и принимаем разумные меры для их защиты. Мы не продаём ваши персональные данные третьим лицам.",
    ],
  },
  {
    heading: "Дети",
    body: [
      "Сайт не предназначен для детей младше 13 лет, и мы сознательно не собираем их данные.",
    ],
  },
  {
    heading: "Изменения",
    body: [
      "Мы можем обновлять эту политику. Актуальная версия всегда доступна на этой странице с датой обновления.",
    ],
  },
];

const en: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      `Recepto is a website with recipes, healthy-eating menus and kitchen lifehacks. For any data question, write to ${CONTACT_EMAIL}.`,
    ],
  },
  {
    heading: "What data we process",
    body: [
      "You don't need an account to read recipes. You share personal data voluntarily — for example, by leaving your email in the newsletter form or contacting us.",
      "We automatically collect technical data: device and browser type, country, pages viewed and referral source — in anonymised form, for statistics and to improve the site.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "Cookies are small files a site stores in your browser. We use them to run the site (for example, your chosen theme and language), for analytics and to serve ads.",
      "You can disable cookies in your browser settings, but some features may not work correctly.",
    ],
  },
  {
    heading: "Third-party advertising",
    body: [
      "The site may show ads via Google AdSense. This service uses its own cookies to show more relevant ads.",
      "Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this and other websites. You can opt out of personalised advertising in Google Ads Settings: https://www.google.com/settings/ads.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "We may use web-analytics services (such as Google Analytics) to understand which recipes are popular. Data is aggregated and does not identify you.",
    ],
  },
  {
    heading: "Storage and security",
    body: [
      "We keep data no longer than necessary and take reasonable measures to protect it. We do not sell your personal data to third parties.",
    ],
  },
  {
    heading: "Children",
    body: ["The site is not intended for children under 13, and we do not knowingly collect their data."],
  },
  {
    heading: "Changes",
    body: [
      "We may update this policy. The current version is always available on this page with the update date.",
    ],
  },
];

const ua: LegalSection[] = [
  {
    heading: "Хто ми",
    body: [
      `Recepto — сайт із рецептами, меню правильного харчування та кухонними лайфхаками. З питань обробки даних пишіть на ${CONTACT_EMAIL}.`,
    ],
  },
  {
    heading: "Які дані ми обробляємо",
    body: [
      "Ми не вимагаємо реєстрації для перегляду рецептів. Персональні дані ви передаєте добровільно — наприклад, залишаючи email у формі підписки або звертаючись у контакти.",
      "Автоматично збираються технічні дані: тип пристрою та браузера, країна, переглянуті сторінки й джерело переходу — у знеособленому вигляді, для статистики та покращення сайту.",
    ],
  },
  {
    heading: "Файли cookie",
    body: [
      "Cookie — невеликі файли, які сайт зберігає у вашому браузері. Ми використовуємо їх для роботи сайту (наприклад, обрана тема й мова), аналітики та показу реклами.",
      "Ви можете вимкнути cookie в налаштуваннях браузера, але частина функцій може працювати некоректно.",
    ],
  },
  {
    heading: "Реклама третіх сторін",
    body: [
      "На сайті може показуватися реклама через сервіс Google AdSense. Він використовує власні cookie, щоб показувати релевантнішу рекламу.",
      "Google, як сторонній постачальник, використовує cookie для показу оголошень на основі попередніх відвідувань вами цього та інших сайтів. Ви можете вимкнути персоналізовану рекламу в налаштуваннях Google: https://www.google.com/settings/ads.",
    ],
  },
  {
    heading: "Аналітика",
    body: [
      "Ми можемо використовувати сервіси вебаналітики (наприклад, Google Analytics), щоб розуміти, які рецепти популярні. Дані збираються в агрегованому вигляді й не дозволяють вас ідентифікувати.",
    ],
  },
  {
    heading: "Зберігання та захист",
    body: [
      "Ми зберігаємо дані не довше, ніж це потрібно, і вживаємо розумних заходів для їх захисту. Ми не продаємо ваші персональні дані третім особам.",
    ],
  },
  {
    heading: "Діти",
    body: [
      "Сайт не призначений для дітей молодших за 13 років, і ми свідомо не збираємо їхні дані.",
    ],
  },
  {
    heading: "Зміни",
    body: [
      "Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на цій сторінці з датою оновлення.",
    ],
  },
];

export function privacySections(lang: Lang): LegalSection[] {
  if (lang === "en") return en;
  if (lang === "ua") return ua;
  return ru;
}

export const PRIVACY_UPDATED = "2026-08-20";
