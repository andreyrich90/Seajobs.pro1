import type { Lang } from "@/lib/i18n";
import { RANK_LANDINGS, vacancyMatchesRank, type RankLanding } from "@/lib/rankLandings";
import { monthlyEquivalent } from "@/lib/salary";

// Live salary comparison shown on the homepage. Averages the from/to salaries of
// current portal vacancies per rank × vessel type, so seafarers can compare pay
// across fleets. Each rank links to its landing page (SEO article + vacancies).

export type VesselCol = {
  key: string;   // rank landing slug for the vessel (used for links + column id)
  keywords: string[];
  names: Record<Lang, string>;
};

// Five headline fleets the user asked for. Tanker folds in oil/chemical/product;
// gas is LPG/LNG. Keywords match against a vacancy's vessel_type string.
export const SALARY_VESSELS: VesselCol[] = [
  {
    key: "bulk-carrier",
    // Bulk carriers + general cargo / MPP grouped together (per product decision).
    keywords: [
      "bulk", "bulker", "handysize", "handymax", "supramax", "ultramax", "kamsarmax", "panamax", "capesize", "newcastlemax",
      "general cargo", "multipurpose", "multi-purpose", "mpp", "coaster", "heavy lift", "heavylift", "project cargo",
      "cargo ship", "self-unloader", "wood chip", "woodchip", "cement carrier", "log carrier", "obo carrier",
    ],
    names: { en: "Bulk / GC", ru: "Балкер / GC", ua: "Балкер / GC", pl: "Masowiec / GC", ro: "Vrachier / GC" },
  },
  {
    key: "tanker",
    keywords: [
      "tanker", "crude", "oil tanker", "oil/chem", "oil / chem", "product tanker", "products tanker",
      "chemical", "chem tanker", "vlcc", "suezmax", "aframax", "panamax tanker", "lr1", "lr2", "mr tanker", "handy tanker",
      "bitumen", "asphalt", "bunker", "shuttle tanker", "clean petroleum", "cpp",
    ],
    names: { en: "Tanker", ru: "Танкер", ua: "Танкер", pl: "Zbiornikowiec", ro: "Tanc" },
  },
  {
    key: "gas-carrier",
    keywords: ["lng", "lpg", "lng carrier", "lpg carrier", "gas carrier", "gas tanker", "ethylene", "ethane", "ammonia carrier", "vlgc", "vlec", "co2 carrier"],
    names: { en: "Gas (LNG/LPG)", ru: "Газовоз", ua: "Газовоз", pl: "Gazowiec", ro: "Gaz" },
  },
  {
    key: "container-ship",
    keywords: ["container", "containership", "container ship", "feeder", "boxship", "box ship", "teu", "post-panamax container", "ulcs"],
    names: { en: "Container", ru: "Контейнеровоз", ua: "Контейнеровоз", pl: "Kontenerowiec", ro: "Portcontainer" },
  },
  {
    // Passenger fleet: cruise ships + ferries/ro-pax. Links to the ferry landing.
    // Note: keep "ro-ro"/"car carrier" OUT of here — those are cargo, and this
    // column sits after "tanker" so "chemical tanker and ro-ro" still lands in
    // the tanker column.
    key: "ferry",
    keywords: ["cruise", "ferry", "ro-pax", "ropax", "ro pax", "passenger", "ro-pax ferry", "roro ferry", "ro-ro ferry"],
    names: { en: "Passenger", ru: "Пассажир.", ua: "Пасажир.", pl: "Pasażerski", ro: "Pasageri" },
  },
  {
    key: "offshore",
    keywords: [
      "offshore", "ahts", "anchor handling", "psv", "osv", "supply vessel", "supply ship", "dp1", "dp2", "dp3", "dynamic position",
      "platform", "wind", "windfarm", "wind farm", "ctv", "sov", "csv", "rov", "diving", "dsv", "construction vessel",
      "jack-up", "jackup", "drill", "drillship", "rig", "fpso", "fso", "flng", "cable lay", "cable-lay", "pipe lay", "pipelay",
      "seismic", "survey vessel", "accommodation", "walk to work", "w2w", "semi-sub", "semisub", "tug", "asd tug",
    ],
    names: { en: "Offshore", ru: "Оффшор", ua: "Офшор", pl: "Offshore", ro: "Offshore" },
  },
];

// Rank spelling variants seen in vacancy `rank` fields (abbreviations, full
// forms), so every rank row catches its postings regardless of how they were
// entered. Matched as case-insensitive substrings, on top of the exact matcher.
const RANK_SYNONYMS: Record<string, string[]> = {
  "master": ["master", "captain"],
  "chief-officer": ["chief officer", "chief mate", "chief off", "ch. officer", "ch off", "1st officer", "first officer", "c/o", "cheif officer"],
  "2nd-officer": ["2nd officer", "second officer", "2/o", "2nd mate", "second mate", "second oow", "2nd oow"],
  "chief-engineer": ["chief engineer", "chief eng", "ch. engineer", "ch eng", "c/e"],
  "2nd-engineer": ["2nd engineer", "second engineer", "2/e", "2nd eng"],
  "eto": ["eto", "electro-technical", "electro technical", "electrical engineer", "electro-technician", "electrotechnical"],
  "able-seaman": ["able seaman", "able-bodied", "a/b seaman", "ab seaman"],
  "bosun": ["bosun", "boatswain", "bos'n", "bos n", "bos'un"],
  "motorman": ["motorman", "motor man", "wiper"],
  "fitter": ["fitter", "welder", "turner"],
  "cook": ["cook", "chief cook", "chef", "galley"],
  "deck-cadet": ["deck cadet", "deck trainee", "trainee officer deck"],
  "engine-cadet": ["engine cadet", "engine trainee", "trainee officer engine"],
};

function rankMatches(vacancyRank: string | null, r: RankLanding): boolean {
  if (vacancyMatchesRank(vacancyRank, r.rank)) return true;
  if (!vacancyRank) return false;
  const s = vacancyRank.toLowerCase();
  return (RANK_SYNONYMS[r.slug] ?? []).some((k) => s.includes(k));
}

// Rank rows, split into two tabs. Slugs map to existing /jobs/rank/<slug> pages.
const OFFICER_SLUGS = ["master", "chief-officer", "2nd-officer", "chief-engineer", "2nd-engineer", "eto"];
const RATING_SLUGS = ["able-seaman", "bosun", "motorman", "fitter", "cook", "deck-cadet", "engine-cadet"];

// Approximate average FX rates to EUR — salaries are quoted in a mix of
// currencies; we normalise everything to EUR so the comparison is apples-to-
// apples. These are rough averages (not live rates); good enough for a salary
// range. Unknown/blank currencies are treated as USD (the column default).
const TO_EUR: Record<string, number> = {
  EUR: 1,
  USD: 0.92,
  GBP: 1.17,
  NOK: 0.086,
  DKK: 0.134,
  SEK: 0.088,
  SGD: 0.68,
  AUD: 0.60,
  CAD: 0.67,
  CHF: 1.04,
  PLN: 0.23,
  AED: 0.25,
};

function toEur(amount: number, currency: string | null): number {
  const rate = TO_EUR[(currency ?? "USD").toUpperCase()] ?? TO_EUR.USD;
  return amount * rate;
}

/** Inverse of `toEur` — render a EUR-normalised figure back in a given currency. */
export function fromEur(amountEur: number, currency: string | null): number {
  const rate = TO_EUR[(currency ?? "USD").toUpperCase()] ?? TO_EUR.USD;
  return amountEur / rate;
}

function pickRanks(slugs: string[]): RankLanding[] {
  return slugs
    .map((s) => RANK_LANDINGS.find((r) => r.slug === s))
    .filter((r): r is RankLanding => !!r);
}

export type StatVacancy = {
  rank: string | null;
  vessel_type: string | null;
  title?: string | null;
  salary_from: number | null;
  salary_to: number | null;
  salary_period: string | null;
  currency: string | null;
};

export type Cell = { from: number; to: number; count: number } | null;
export type StatRow = { slug: string; names: Record<Lang, string>; cells: Record<string, Cell> };
export type SalaryStats = {
  vessels: VesselCol[];
  officers: StatRow[];
  ratings: StatRow[];
  currency: string;
  hasData: boolean;
};

// Match against the vessel_type field AND the title — many imported vacancies
// leave vessel_type blank and only name the ship in the title (e.g. "3rd Eng ||
// LPG || Yara"), so title is a needed fallback.
function vesselKeyOf(v: StatVacancy): string | null {
  const s = `${v.vessel_type ?? ""} ${v.title ?? ""}`.toLowerCase();
  if (!s.trim()) return null;
  // Gas is the most specific match: an LPG/LNG carrier is often loosely called
  // a "... tanker", so a generic "tanker" keyword would otherwise swallow it.
  // Check gas keywords BEFORE the general loop so gas carriers land in the Gas
  // column, not Tanker.
  const gas = SALARY_VESSELS.find((c) => c.key === "gas-carrier");
  if (gas && gas.keywords.some((k) => s.includes(k))) return "gas-carrier";
  for (const col of SALARY_VESSELS) {
    if (col.keywords.some((k) => s.includes(k))) return col.key;
  }
  return null;
}

const round = (n: number) => Math.round(n / 50) * 50;

// Sane monthly EUR band. Anything outside is a data error (a day rate stored as
// monthly, an annual/total-contract figure, or a typo like "45000") — dropping
// it keeps a single bad posting from blowing up a cell. The floor is low enough
// to keep real cadet/rating wages (e.g. a 450 USD ≈ €414 engine-cadet salary),
// which a €500 floor was wrongly excluding.
const MIN_EUR = 250;
const MAX_EUR = 25000;
const inBand = (x: number) => x >= MIN_EUR && x <= MAX_EUR;

function buildRows(ranks: RankLanding[], vacancies: StatVacancy[]): StatRow[] {
  return ranks.map((r) => {
    const cells: Record<string, Cell> = {};
    for (const col of SALARY_VESSELS) {
      // Observed salary RANGE: lowest and highest in-band figure across all
      // matching vacancies. Using min/max (not an average) means a real
      // high-paying posting — e.g. a Master on a bulker at 10,044 USD — shows
      // at the top of the range instead of being averaged away.
      let lo = Infinity, hi = -Infinity, count = 0;
      for (const v of vacancies) {
        if (vesselKeyOf(v) !== col.key) continue;
        if (!rankMatches(v.rank, r)) continue;
        // Monthly-equivalent, then convert the currency to EUR.
        const points: number[] = [];
        if (v.salary_from != null) {
          const x = toEur(monthlyEquivalent(v.salary_from, v.salary_period), v.currency);
          if (inBand(x)) points.push(x);
        }
        if (v.salary_to != null) {
          const x = toEur(monthlyEquivalent(v.salary_to, v.salary_period), v.currency);
          if (inBand(x)) points.push(x);
        }
        if (points.length === 0) continue; // all out of band / missing
        for (const x of points) { if (x < lo) lo = x; if (x > hi) hi = x; }
        count++;
      }
      cells[col.key] = count > 0 ? { from: round(lo), to: round(hi), count } : null;
    }
    return { slug: r.slug, names: r.names, cells };
  });
}

/**
 * Where a single vacancy sits inside the portal-wide range for its rank ×
 * vessel type. Used on the vacancy page to add our own analysis on top of the
 * (often imported) listing: "this rank on this fleet pays X–Y here; this offer
 * is at Z".
 *
 * Figures are EUR/month internally — use `fromEur` to display them in the
 * vacancy's own currency. Returns null when the rank or vessel can't be
 * matched, or when we have no comparable postings.
 */
export type SalaryContext = {
  rankSlug: string;
  rankNames: Record<Lang, string>;
  vesselKey: string;
  vesselNames: Record<Lang, string>;
  /** Portal-wide min/max for this rank × vessel, EUR per month. */
  range: { from: number; to: number; count: number };
  /** This vacancy's own figure, EUR per month (midpoint when it's a range). */
  thisEur: number | null;
  /** Where `thisEur` falls relative to the portal range. */
  position: "below" | "low" | "mid" | "high" | "above" | null;
};

export function buildSalaryContext(stats: SalaryStats, v: StatVacancy): SalaryContext | null {
  const vesselKey = vesselKeyOf(v);
  if (!vesselKey) return null;

  const row =
    [...stats.officers, ...stats.ratings].find((r) => {
      const landing = RANK_LANDINGS.find((l) => l.slug === r.slug);
      return landing ? rankMatches(v.rank, landing) : false;
    }) ?? null;
  if (!row) return null;

  const cell = row.cells[vesselKey];
  if (!cell) return null;

  const vessel = SALARY_VESSELS.find((c) => c.key === vesselKey);
  if (!vessel) return null;

  // This vacancy's own figure, normalised the same way the stats are.
  const points: number[] = [];
  for (const raw of [v.salary_from, v.salary_to]) {
    if (raw == null) continue;
    const x = toEur(monthlyEquivalent(raw, v.salary_period), v.currency);
    if (inBand(x)) points.push(x);
  }
  const thisEur = points.length ? points.reduce((s, x) => s + x, 0) / points.length : null;

  let position: SalaryContext["position"] = null;
  if (thisEur != null) {
    if (thisEur < cell.from) position = "below";
    else if (thisEur > cell.to) position = "above";
    else {
      const span = cell.to - cell.from;
      // A flat range (single observed figure) can't be split into thirds.
      const t = span > 0 ? (thisEur - cell.from) / span : 0.5;
      position = t < 0.34 ? "low" : t < 0.67 ? "mid" : "high";
    }
  }

  return {
    rankSlug: row.slug,
    rankNames: row.names,
    vesselKey,
    vesselNames: vessel.names,
    range: cell,
    thisEur,
    position,
  };
}

/** Average from/to salaries per rank × vessel, normalised to EUR/month. */
export function computeSalaryStats(all: StatVacancy[]): SalaryStats {
  // Any vacancy with a salary counts — every currency is converted to EUR.
  const usable = all.filter((v) => v.salary_from != null || v.salary_to != null);
  const officers = buildRows(pickRanks(OFFICER_SLUGS), usable);
  const ratings = buildRows(pickRanks(RATING_SLUGS), usable);
  const hasData =
    officers.some((r) => Object.values(r.cells).some(Boolean)) ||
    ratings.some((r) => Object.values(r.cells).some(Boolean));
  return { vessels: SALARY_VESSELS, officers, ratings, currency: "EUR", hasData };
}
