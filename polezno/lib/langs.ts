// The supported UI languages. `ru` is the default. Kept apart from the
// dictionaries so client components can import the tiny language list without
// dragging every translation into their bundle.
export const LANGS = [
  { code: "ru", label: "Русский", short: "RU" },
  { code: "en", label: "English", short: "EN" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

export const LOCALES: Lang[] = LANGS.map((l) => l.code);
export const DEFAULT_LANG: Lang = "ru";

export function isLang(v: string | undefined | null): v is Lang {
  return v === "ru" || v === "en";
}

// A value that carries every locale (e.g. a title). Reading it always falls
// back to the default language so nothing renders blank.
export type Localized<T = string> = Record<Lang, T>;

export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value[DEFAULT_LANG];
}
