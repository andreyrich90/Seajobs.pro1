import type { Lang } from "@/lib/langs";

// Which crew a company would rather hire for a vacancy: a region, or one or
// more countries. Stored as codes in vacancies.crew_preference (text[]); an
// empty list means no preference. It is a preference the company states, not a
// filter: every seafarer can still read and apply to the vacancy.
//
// Countries are ISO codes; adding one is one line in LABELS, whose order is
// the display order. Labels are written out rather than
// taken from Intl.DisplayNames: the vacancy page renders on the server and
// hydrates in the browser, and the two ICU builds need not name a country the
// same way.
const LABELS: Record<string, Record<Lang, string>> = {
  europe: { en: "Europe", ru: "Европа", ua: "Європа", pl: "Europa", ro: "Europa" },
  asia: { en: "Asia", ru: "Азия", ua: "Азія", pl: "Azja", ro: "Asia" },
  ua: { en: "Ukraine", ru: "Украина", ua: "Україна", pl: "Ukraina", ro: "Ucraina" },
  pl: { en: "Poland", ru: "Польша", ua: "Польща", pl: "Polska", ro: "Polonia" },
  ro: { en: "Romania", ru: "Румыния", ua: "Румунія", pl: "Rumunia", ro: "România" },
  bg: { en: "Bulgaria", ru: "Болгария", ua: "Болгарія", pl: "Bułgaria", ro: "Bulgaria" },
  hr: { en: "Croatia", ru: "Хорватия", ua: "Хорватія", pl: "Chorwacja", ro: "Croația" },
  ge: { en: "Georgia", ru: "Грузия", ua: "Грузія", pl: "Gruzja", ro: "Georgia" },
  lv: { en: "Latvia", ru: "Латвия", ua: "Латвія", pl: "Łotwa", ro: "Letonia" },
  lt: { en: "Lithuania", ru: "Литва", ua: "Литва", pl: "Litwa", ro: "Lituania" },
  ph: { en: "Philippines", ru: "Филиппины", ua: "Філіппіни", pl: "Filipiny", ro: "Filipine" },
  in: { en: "India", ru: "Индия", ua: "Індія", pl: "Indie", ro: "India" },
};

export const CREW_OPTIONS: readonly string[] = Object.keys(LABELS);

/** Known codes only, each once, in display order. */
export function cleanCrewPreference(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  const picked = new Set(list.map((v) => String(v).trim().toLowerCase()));
  return CREW_OPTIONS.filter((c) => picked.has(c));
}

export function crewLabel(code: string, lang: Lang): string {
  const l = LABELS[code];
  return l ? l[lang] ?? l.en : code.toUpperCase();
}

/** "Ukraine, Poland" — or "" when there is no preference. */
export function crewPreferenceText(list: unknown, lang: Lang): string {
  return cleanCrewPreference(list).map((c) => crewLabel(c, lang)).join(", ");
}

export const CREW_UI: Record<Lang, { title: string; hint: string; any: string }> = {
  en: {
    title: "Preferred crew",
    hint: "Optional. Pick a region or countries; leave empty if any nationality suits. Every seafarer can still see and apply.",
    any: "Any",
  },
  ru: {
    title: "Предпочтительный экипаж",
    hint: "Необязательно. Выберите регион или страны; оставьте пустым, если подходит любое гражданство. Вакансию по-прежнему видят и откликаются все моряки.",
    any: "Любой",
  },
  ua: {
    title: "Бажаний екіпаж",
    hint: "Необов'язково. Оберіть регіон або країни; залиште порожнім, якщо підходить будь-яке громадянство. Вакансію, як і раніше, бачать і відгукуються всі моряки.",
    any: "Будь-який",
  },
  pl: {
    title: "Preferowana załoga",
    hint: "Opcjonalnie. Wybierz region lub kraje; zostaw puste, jeśli pasuje każda narodowość. Ofertę nadal widzą i mogą na nią odpowiedzieć wszyscy marynarze.",
    any: "Dowolna",
  },
  ro: {
    title: "Echipaj preferat",
    hint: "Opțional. Alege o regiune sau țări; lasă gol dacă se potrivește orice naționalitate. Toți navigatorii pot vedea și aplica în continuare.",
    any: "Oricare",
  },
};
