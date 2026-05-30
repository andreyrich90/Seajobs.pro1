export type Lang = "ua" | "pl" | "ru" | "en";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "ua", label: "UA", flag: "🇺🇦" },
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "ru", label: "RU", flag: "🌐" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export const T: Record<Lang, Record<string, string>> = {
  ua: {
    nav_jobs: "Вакансії",
    nav_forum: "Форум",
    nav_news: "Новини",
    login: "Увійти",
    tagline: "Гавань для морської кар'єри",
  },
  pl: {
    nav_jobs: "Oferty",
    nav_forum: "Forum",
    nav_news: "Aktualności",
    login: "Zaloguj",
    tagline: "Port kariery morskiej",
  },
  ru: {
    nav_jobs: "Вакансии",
    nav_forum: "Форум",
    nav_news: "Новости",
    login: "Войти",
    tagline: "Гавань для морской карьеры",
  },
  en: {
    nav_jobs: "Vacancies",
    nav_forum: "Forum",
    nav_news: "News",
    login: "Log in",
    tagline: "The harbour for maritime careers",
  },
};
