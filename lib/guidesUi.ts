import type { Lang } from "@/lib/langs";

// Localized chrome for the /guides section (blog). Guide articles themselves
// live in the news_articles table with category = 'guide'; their title/body are
// already multilingual jsonb (admin-authored + auto-translated).
export type GuideUi = {
  nav: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  home: string;
  crumb: string;
  empty: string;
  readMore: string;
};

export const GUIDES_UI: Record<Lang, GuideUi> = {
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

// The seafarer's handbook (/handbook): conventions, codes and onboard rules,
// written around what an interview or a CES test asks. Same table, category
// 'handbook', same pages — only the chrome and the base path differ.
export const HANDBOOK_UI: Record<Lang, GuideUi> = {
  en: {
    nav: "Handbook",
    h1: "Seafarer's handbook",
    metaTitle: "Seafarer's handbook — MARPOL, ISGOTT and other codes explained | SeaJobs.pro",
    metaDesc: "Conventions, codes and onboard rules explained the way interviews and CES tests ask about them — key numbers, common traps, self-check questions.",
    home: "Home",
    crumb: "Handbook",
    empty: "Handbook articles are coming soon.",
    readMore: "Read",
  },
  ru: {
    nav: "Справочник",
    h1: "Справочник моряка",
    metaTitle: "Справочник моряка — MARPOL, ISGOTT и другие кодексы простыми словами | SeaJobs.pro",
    metaDesc: "Конвенции, кодексы и правила на борту так, как о них спрашивают на собеседовании и в CES: ключевые цифры, частые ошибки, вопросы для самопроверки.",
    home: "Главная",
    crumb: "Справочник",
    empty: "Статьи справочника скоро появятся.",
    readMore: "Читать",
  },
  ua: {
    nav: "Довідник",
    h1: "Довідник моряка",
    metaTitle: "Довідник моряка — MARPOL, ISGOTT та інші кодекси простими словами | SeaJobs.pro",
    metaDesc: "Конвенції, кодекси та правила на борту так, як про них питають на співбесіді й у CES: ключові цифри, типові помилки, питання для самоперевірки.",
    home: "Головна",
    crumb: "Довідник",
    empty: "Статті довідника скоро з'являться.",
    readMore: "Читати",
  },
  pl: {
    nav: "Kompendium",
    h1: "Kompendium marynarza",
    metaTitle: "Kompendium marynarza — MARPOL, ISGOTT i inne kodeksy w prostych słowach | SeaJobs.pro",
    metaDesc: "Konwencje, kodeksy i zasady na statku tak, jak pytają o nie na rozmowie i w teście CES: kluczowe liczby, typowe pułapki, pytania kontrolne.",
    home: "Strona główna",
    crumb: "Kompendium",
    empty: "Artykuły kompendium wkrótce.",
    readMore: "Czytaj",
  },
  ro: {
    nav: "Manual",
    h1: "Manualul marinarului",
    metaTitle: "Manualul marinarului — MARPOL, ISGOTT și alte coduri pe înțeles | SeaJobs.pro",
    metaDesc: "Convenții, coduri și reguli de la bord explicate așa cum sunt întrebate la interviu și la testul CES: cifre cheie, capcane frecvente, întrebări de verificare.",
    home: "Acasă",
    crumb: "Manual",
    empty: "Articolele manualului vor apărea în curând.",
    readMore: "Citește",
  },
};

/** `news_articles.category` → where it lives and what its chrome says. */
export type GuideSection = "guide" | "handbook";

export const GUIDE_SECTIONS: Record<GuideSection, { path: string; ui: Record<Lang, GuideUi> }> = {
  guide: { path: "/guides", ui: GUIDES_UI },
  handbook: { path: "/handbook", ui: HANDBOOK_UI },
};
