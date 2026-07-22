import type { Lang } from "@/lib/i18n";

// Categorised vessel-type filter (tabs → checkboxes) used on /jobs and the
// homepage. Multi-select: a vacancy matches if any selected item's keywords
// appear in its vessel_type or title (many imported vacancies name the ship
// only in the title). Names are en/ru/ua; pl/ro fall back to en.

export type VesselItem = { key: string; keywords: string[]; names: Partial<Record<Lang, string>> };
export type VesselCategory = { key: string; names: Record<Lang, string>; items: VesselItem[] };

const n = (en: string, ru: string, ua: string): Partial<Record<Lang, string>> => ({ en, ru, ua });

export const VESSEL_CATEGORIES: VesselCategory[] = [
  {
    key: "dry",
    names: { en: "Dry cargo", ru: "Сухогруз", ua: "Суховантаж", pl: "Dry cargo", ro: "Marfă uscată" },
    items: [
      { key: "bulk", keywords: ["bulk", "bulker", "handysize", "handymax", "supramax", "ultramax", "kamsarmax", "panamax", "capesize"], names: n("Bulk Carrier", "Балкер", "Балкер") },
      { key: "container", keywords: ["container", "containership", "feeder", "boxship", "box ship"], names: n("Container Ship", "Контейнеровоз", "Контейнеровоз") },
      { key: "gc", keywords: ["general cargo", "multipurpose", "multi-purpose", "mpp", "cargo ship"], names: n("General Cargo / MPP", "Генеральный груз / MPP", "Генеральний вантаж / MPP") },
      { key: "coaster", keywords: ["coaster"], names: n("Coaster", "Каботажник", "Каботажник") },
      { key: "reefer", keywords: ["reefer", "refrigerated"], names: n("Reefer", "Рефрижератор", "Рефрижератор") },
      { key: "roro", keywords: ["ro-ro", "roro", "ro/ro", "pctc", "pcc", "car carrier", "vehicle carrier", "con-ro", "ro-lo"], names: n("Ro-Ro / Car Carrier", "Ро-Ро / Автовоз", "Ро-Ро / Автовоз") },
      { key: "heavylift", keywords: ["heavy lift", "heavylift", "project cargo"], names: n("Heavy Lift / Project", "Тяжеловоз / Проектный", "Важковаговоз / Проектний") },
    ],
  },
  {
    key: "tanker",
    names: { en: "Tanker", ru: "Танкер", ua: "Танкер", pl: "Zbiornikowiec", ro: "Tanc" },
    items: [
      { key: "oil", keywords: ["oil tanker", "crude", "vlcc", "suezmax", "aframax", "shuttle tanker"], names: n("Oil Tanker", "Нефтяной танкер", "Нафтовий танкер") },
      { key: "chemical", keywords: ["chemical", "chem tanker", "oil/chem", "oil / chem"], names: n("Chemical Tanker", "Химовоз", "Хімовоз") },
      { key: "product", keywords: ["product tanker", "products tanker", "clean petroleum", "cpp", "lr1", "lr2", "mr tanker"], names: n("Product Tanker", "Продуктовоз", "Продуктовоз") },
      { key: "gas", keywords: ["lng", "lpg", "gas carrier", "gas tanker", "ethylene", "ethane", "ammonia", "vlgc", "vlec"], names: n("Gas Carrier (LNG/LPG)", "Газовоз (LNG/LPG)", "Газовоз (LNG/LPG)") },
      { key: "bunker", keywords: ["bunker", "bitumen", "asphalt"], names: n("Bunker / Bitumen", "Бункеровщик / Битумовоз", "Бункерувальник / Бітумовоз") },
    ],
  },
  {
    key: "offshore",
    names: { en: "Offshore", ru: "Оффшор", ua: "Офшор", pl: "Offshore", ro: "Offshore" },
    items: [
      { key: "ahts", keywords: ["ahts", "anchor handling"], names: n("AHTS", "AHTS", "AHTS") },
      { key: "psv", keywords: ["psv", "platform supply"], names: n("PSV", "PSV", "PSV") },
      { key: "osv", keywords: ["osv", "supply vessel", "supply ship"], names: n("OSV / Supply", "OSV / Снабженец", "OSV / Постачальник") },
      { key: "dsv", keywords: ["dsv", "diving support", "diving"], names: n("Diving Support (DSV)", "Водолазное (DSV)", "Водолазне (DSV)") },
      { key: "csv", keywords: ["csv", "construction vessel", "construction support"], names: n("Construction (CSV)", "Монтажное (CSV)", "Монтажне (CSV)") },
      { key: "fpso", keywords: ["fpso", "fso", "flng"], names: n("FPSO / FSO", "FPSO / FSO", "FPSO / FSO") },
      { key: "drilling", keywords: ["drill", "drillship", "rig", "jack-up", "jackup", "semi-sub", "semisub"], names: n("Drilling / Rig", "Буровое / Платформа", "Бурове / Платформа") },
      { key: "cable", keywords: ["cable lay", "cable-lay", "pipe lay", "pipelay", "cable layer", "pipe layer"], names: n("Cable / Pipe Layer", "Кабелеукладчик / Трубоукладчик", "Кабелеукладач / Трубоукладач") },
      { key: "survey", keywords: ["survey", "seismic", "rov", "sov", "wind", "ctv", "w2w", "walk to work"], names: n("Survey / Wind / ROV", "Съёмка / Ветер / ROV", "Зйомка / Вітер / ROV") },
      { key: "tug", keywords: ["tug", "asd tug", "towage"], names: n("Tug", "Буксир", "Буксир") },
    ],
  },
  {
    key: "passenger",
    names: { en: "Passenger", ru: "Пассажирский", ua: "Пасажирський", pl: "Pasażerski", ro: "Pasageri" },
    items: [
      { key: "cruise", keywords: ["cruise"], names: n("Cruise Ship", "Круизное судно", "Круїзне судно") },
      { key: "ferry", keywords: ["ferry", "ro-pax", "ropax", "ro-ro ferry"], names: n("Ferry / Ro-Pax", "Паром / Ro-Pax", "Пором / Ro-Pax") },
      { key: "fastferry", keywords: ["fast ferry", "hsc", "high-speed", "high speed craft"], names: n("Fast Ferry / HSC", "Быстрый паром / HSC", "Швидкий пором / HSC") },
      { key: "passenger", keywords: ["passenger"], names: n("Passenger Vessel", "Пассажирское судно", "Пасажирське судно") },
    ],
  },
  {
    key: "general",
    names: { en: "General", ru: "Прочие", ua: "Інші", pl: "Ogólne", ro: "General" },
    items: [
      { key: "fishing", keywords: ["fishing", "trawler", "fishery"], names: n("Fishing Vessel", "Рыболовное судно", "Риболовне судно") },
      { key: "dredger", keywords: ["dredger", "hopper", "dredging"], names: n("Dredger", "Дноуглубитель", "Днопоглиблювач") },
      { key: "research", keywords: ["research", "scientific"], names: n("Research Vessel", "Научное судно", "Наукове судно") },
      { key: "yacht", keywords: ["yacht", "superyacht", "super yacht"], names: n("Yacht / Superyacht", "Яхта / Суперяхта", "Яхта / Суперяхта") },
      { key: "icebreaker", keywords: ["ice breaker", "icebreaker"], names: n("Ice Breaker", "Ледокол", "Криголам") },
      { key: "training", keywords: ["training ship", "training vessel", "sailing"], names: n("Training / Sailing", "Учебное / Парусное", "Навчальне / Вітрильне") },
    ],
  },
];

// Flat lookup: item key → keywords.
const ITEM_KEYWORDS: Record<string, string[]> = Object.fromEntries(
  VESSEL_CATEGORIES.flatMap((c) => c.items.map((i) => [i.key, i.keywords]))
);

/** True if the haystack (vessel_type + title) matches any of the selected item keys. */
export function vesselFilterMatches(selectedKeys: string[], haystack: string): boolean {
  if (selectedKeys.length === 0) return true;
  const s = haystack.toLowerCase();
  return selectedKeys.some((key) => (ITEM_KEYWORDS[key] ?? []).some((k) => s.includes(k)));
}

export function itemName(item: VesselItem, lang: Lang): string {
  return item.names[lang] ?? item.names.en ?? item.key;
}
