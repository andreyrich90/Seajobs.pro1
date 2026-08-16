// The language list, kept apart from the strings on purpose.
//
// `lib/i18n.ts` holds all five dictionaries — about 140 KB. Anything that
// imports from it pulls that weight in, so a client component that only wants
// the picker list used to ship every string in every language to every reader.
// Importing `Lang`/`LANGS` from here costs a few hundred bytes instead.
//
// The dictionaries now reach the browser one at a time, as a prop from the
// server: see `components/DictProvider.tsx`.

export type Lang = "ua" | "pl" | "ru" | "en" | "ro";

/** Display order of the language picker. */
export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "ua", label: "UA", flag: "🇺🇦" },
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "ru", label: "RU", flag: "🌐" },
  { code: "ro", label: "RO", flag: "🇷🇴" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

/** One language's strings — the shape every component reads through `useT()`. */
export type Dict = Record<string, string>;
