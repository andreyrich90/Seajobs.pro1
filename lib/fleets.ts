// Fleet categories — a broader grouping than exact vessel types, used as a
// quick filter on the jobs board and as chips on the home page. Vessel types
// in the DB are free-form strings from many sources, so a fleet matches by
// keywords against "<vessel_type> <title>" rather than by an exact list.

export type FleetKey = "merchant" | "offshore" | "passenger" | "workboats" | "fishing";

export const FLEETS: {
  key: FleetKey;
  labels: Record<string, string>;
  keywords: string[];
}[] = [
  {
    key: "merchant",
    labels: { en: "Merchant fleet", ru: "Торговый флот", ua: "Торговий флот", pl: "Flota handlowa" },
    keywords: [
      "bulk", "cargo", "container", "tanker", "coaster", "reefer", "roro", "ro-ro",
      "pctc", "car carrier", "pcc", "heavy lift", "mpp", "lng", "lpg", "chemical",
      "crude", "product", "general",
    ],
  },
  {
    key: "offshore",
    labels: { en: "Offshore", ru: "Оффшор", ua: "Офшор", pl: "Offshore" },
    keywords: [
      "psv", "ahts", "osv", "mpsv", "offshore", "drill", "pipe layer", "pipelay",
      "cable", "jack-up", "supply", "support vessel", "survey", "multicat", "w2w",
      "walk-to-work", "dsv", "rock installation", "semi-submersible", "construction",
      "wind", "standby", "crew boat", "fpso", "accommodation barge",
    ],
  },
  {
    key: "passenger",
    labels: { en: "Cruise & passenger", ru: "Круизы и пассажирский", ua: "Круїзи та пасажирський", pl: "Wycieczkowce i pasażerskie" },
    keywords: ["cruise", "ferry", "passenger", "yacht", "ropax"],
  },
  {
    key: "workboats",
    labels: { en: "Tugs & dredging", ru: "Буксиры и дноуглубление", ua: "Буксири та днопоглиблення", pl: "Holowniki i pogłębiarki" },
    keywords: ["tug", "dredg", "hopper", "workboat", "pontoon", "barge", "pusher", "salvage"],
  },
  {
    key: "fishing",
    labels: { en: "Fishing", ru: "Рыболовный", ua: "Рибальський", pl: "Rybołówstwo" },
    keywords: ["fishing", "trawler", "factory vessel", "longliner"],
  },
];

export function fleetLabel(key: string, lang: string): string {
  const fleet = FLEETS.find((f) => f.key === key);
  return fleet?.labels[lang] ?? fleet?.labels.en ?? key;
}

/** True when the vacancy text (vessel_type + title) belongs to the fleet. */
export function fleetMatches(key: string, text: string): boolean {
  const fleet = FLEETS.find((f) => f.key === key);
  if (!fleet) return true; // unknown key → don't filter anything out
  const haystack = text.toLowerCase();
  return fleet.keywords.some((k) => haystack.includes(k));
}
