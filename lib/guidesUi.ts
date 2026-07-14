import type { Lang } from "@/lib/i18n";

// Localized chrome for the /guides section (blog). Guide articles themselves
// live in the news_articles table with category = 'guide'; their title/body are
// already multilingual jsonb (admin-authored + auto-translated).
export const GUIDES_UI: Record<Lang, {
  nav: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  home: string;
  crumb: string;
  empty: string;
  readMore: string;
}> = {
  en: {
    nav: "Guides",
    h1: "Maritime career guides",
    metaTitle: "Maritime career guides for seafarers | SeaJobs.pro",
    metaDesc: "Expert guides for seafarers — certificates, ranks, salaries and how to build a career at sea.",
    home: "Home",
    crumb: "Guides",
    empty: "Guides are coming soon.",
    readMore: "Read guide",
  },
  ru: {
    nav: "Гайды",
    h1: "Гайды по морской карьере",
    metaTitle: "Гайды по морской карьере для моряков | SeaJobs.pro",
    metaDesc: "Экспертные гайды для моряков — сертификаты, должности, зарплаты и как строить карьеру в море.",
    home: "Главная",
    crumb: "Гайды",
    empty: "Гайды скоро появятся.",
    readMore: "Читать гайд",
  },
  ua: {
    nav: "Гайди",
    h1: "Гайди з морської кар'єри",
    metaTitle: "Гайди з морської кар'єри для моряків | SeaJobs.pro",
    metaDesc: "Експертні гайди для моряків — сертифікати, посади, зарплати та як будувати кар'єру в морі.",
    home: "Головна",
    crumb: "Гайди",
    empty: "Гайди скоро з'являться.",
    readMore: "Читати гайд",
  },
  pl: {
    nav: "Poradniki",
    h1: "Poradniki kariery morskiej",
    metaTitle: "Poradniki kariery morskiej dla marynarzy | SeaJobs.pro",
    metaDesc: "Eksperckie poradniki dla marynarzy — certyfikaty, stanowiska, wynagrodzenia i jak budować karierę na morzu.",
    home: "Strona główna",
    crumb: "Poradniki",
    empty: "Poradniki wkrótce.",
    readMore: "Czytaj poradnik",
  },
  ro: {
    nav: "Ghiduri",
    h1: "Ghiduri de carieră maritimă",
    metaTitle: "Ghiduri de carieră maritimă pentru marinari | SeaJobs.pro",
    metaDesc: "Ghiduri de specialitate pentru marinari — certificate, funcții, salarii și cum să-ți construiești o carieră pe mare.",
    home: "Acasă",
    crumb: "Ghiduri",
    empty: "Ghidurile vor apărea în curând.",
    readMore: "Citește ghidul",
  },
};
