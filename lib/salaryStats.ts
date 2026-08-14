import type { Lang } from "@/lib/i18n";
import { RANK_LANDINGS, vacancyMatchesRank, type RankLanding } from "@/lib/rankLandings";
import { DAYS_PER_MONTH, monthlyEquivalent } from "@/lib/salary";

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
      "offshore", "ahts", "aht", "anchor handling", "psv", "osv", "mpsv", "ocv", "supply vessel", "supply ship",
      "dp1", "dp2", "dp3", "dynamic position",
      "platform", "wind", "windfarm", "wind farm", "ctv", "sov", "csv", "rov", "diving", "dsv", "construction vessel",
      // "jack up" without the hyphen is how crewing agencies actually write it,
      // and it was the spelling that fell through — a Jack Up Barge posting only
      // reached this column when the title happened to mention DP2.
      "jack-up", "jackup", "jack up", "liftboat", "lift boat", "crane barge", "flat top barge",
      "drill", "drillship", "rig", "fpso", "fso", "flng", "cable lay", "cable-lay", "pipe lay", "pipelay",
      "subsea", "well intervention", "errv", "standby vessel", "emergency response",
      "seismic", "survey vessel", "accommodation", "walk to work", "w2w", "semi-sub", "semisub", "tug", "asd tug",
    ],
    names: { en: "Offshore", ru: "Оффшор", ua: "Офшор", pl: "Offshore", ro: "Offshore" },
  },
];

// Fleets that get no column in the homepage table (it is deliberately six
// headline fleets wide) but must still be recognised for the per-vacancy salary
// comparison — otherwise a Ro-Ro or reefer posting has nothing to compare
// against. Appended AFTER the six above, so the existing precedence is intact:
// a "Ro-Pax ferry" still lands in Passenger, only cargo ro-ro falls through here.
export const CONTEXT_ONLY_VESSELS: VesselCol[] = [
  {
    key: "ro-ro",
    keywords: ["ro-ro", "roro", "ro/ro", "ro ro", "car carrier", "pctc", "pcc", "vehicle carrier", "con-ro", "conro"],
    names: { en: "Ro-Ro / Car Carrier", ru: "Ро-Ро / автовоз", ua: "Ро-Ро / автовоз", pl: "Ro-Ro / samochodowiec", ro: "Ro-Ro / transport auto" },
  },
  {
    key: "reefer",
    keywords: ["reefer", "refrigerated"],
    names: { en: "Reefer", ru: "Рефрижератор", ua: "Рефрижератор", pl: "Chłodniowiec", ro: "Navă frigorifică" },
  },
  {
    key: "dredger",
    keywords: ["dredger", "dredging", "hopper"],
    names: { en: "Dredger", ru: "Земснаряд", ua: "Земснаряд", pl: "Pogłębiarka", ro: "Dragă" },
  },
  {
    key: "fishing",
    keywords: ["fishing", "trawler", "seiner", "longliner", "factory vessel"],
    names: { en: "Fishing", ru: "Рыболовное", ua: "Рибальське", pl: "Rybacki", ro: "Pescuit" },
  },
  {
    key: "yacht",
    keywords: ["yacht", "superyacht", "megayacht", "sailing vessel"],
    names: { en: "Yacht", ru: "Яхта", ua: "Яхта", pl: "Jacht", ro: "Iaht" },
  },
];

/** Every fleet the per-vacancy comparison can recognise (table columns + extras). */
export const CONTEXT_VESSELS: VesselCol[] = [...SALARY_VESSELS, ...CONTEXT_ONLY_VESSELS];

// Rank spelling variants seen in vacancy `rank` fields (abbreviations, full
// forms), so every rank row catches its postings regardless of how they were
// entered. Matched as case-insensitive substrings, on top of the exact matcher.
const RANK_SYNONYMS: Record<string, string[]> = {
  "master": ["master", "captain"],
  "chief-officer": ["chief officer", "chief mate", "chief off", "ch. officer", "ch off", "1st officer", "first officer", "c/o", "cheif officer"],
  "2nd-officer": ["2nd officer", "second officer", "2/o", "2nd mate", "second mate", "second oow", "2nd oow"],
  "chief-engineer": ["chief engineer", "chief eng", "ch. engineer", "ch eng", "c/e"],
  "2nd-engineer": ["2nd engineer", "second engineer", "2/e", "2nd eng"],
  "3rd-officer": ["3rd officer", "third officer", "3/o", "3rd mate", "third mate", "3rd oow", "third oow"],
  "3rd-engineer": ["3rd engineer", "third engineer", "3/e", "3rd eng"],
  "4th-engineer": ["4th engineer", "fourth engineer", "4/e", "4th eng"],
  "eto": ["eto", "electro-technical", "electro technical", "electrical engineer", "electro-technician", "electrotechnical"],
  "electrician": ["electrician", "electro-mechanic", "electro mechanic"],
  "able-seaman": ["able seaman", "able-bodied", "a/b seaman", "ab seaman"],
  "ordinary-seaman": ["ordinary seaman", "ordinary-seaman", "deck boy", "deck hand", "deckhand"],
  "bosun": ["bosun", "boatswain", "bos'n", "bos n", "bos'un"],
  "motorman": ["motorman", "motor man", "wiper"],
  "oiler": ["oiler", "greaser"],
  "fitter": ["fitter", "welder", "turner"],
  "cook": ["cook", "chief cook", "chef", "galley"],
  "messman": ["messman", "mess man", "messboy", "steward", "stewardess", "waiter"],
  "deck-cadet": [
    "deck cadet", "cadet deck", "deck trainee", "trainee officer deck", "trainee deck officer",
    "navigational cadet", "nautical cadet", "deck apprentice",
  ],
  "engine-cadet": [
    "engine cadet", "cadet engine", "engineering cadet", "engineer cadet", "motor cadet",
    "engine trainee", "trainee officer engine", "trainee engineer", "engine apprentice",
    // Electrical/ETO cadets have no landing page of their own; they are engine
    // department trainees, so their pay belongs in this row rather than nowhere.
    "electrical cadet", "electro-technical cadet", "eto cadet",
  ],
};

const CADET_SLUGS = new Set(["deck-cadet", "engine-cadet"]);
const CADET_WORDS = /cadet|trainee|apprentice|курсант|кадет/;

function rankMatches(vacancyRank: string | null, r: RankLanding): boolean {
  if (vacancyMatchesRank(vacancyRank, r.rank)) return true;
  if (!vacancyRank) return false;
  const s = vacancyRank.toLowerCase();
  // A cadet posting must never be counted as the qualified rank it trains for.
  // "ETO Cadet" contains "eto" and "Electro-technical cadet" contains
  // "electro-technical", so without this guard a trainee allowance would be
  // pulled into an officer's range and dragged its floor down.
  if (CADET_WORDS.test(s) && !CADET_SLUGS.has(r.slug)) return false;
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
function vesselKeyOf(v: StatVacancy, cols: VesselCol[] = SALARY_VESSELS): string | null {
  const s = `${v.vessel_type ?? ""} ${v.title ?? ""}`.toLowerCase();
  if (!s.trim()) return null;
  // Gas is the most specific match: an LPG/LNG carrier is often loosely called
  // a "... tanker", so a generic "tanker" keyword would otherwise swallow it.
  // Check gas keywords BEFORE the general loop so gas carriers land in the Gas
  // column, not Tanker.
  const gas = cols.find((c) => c.key === "gas-carrier");
  if (gas && gas.keywords.some((k) => s.includes(k))) return "gas-carrier";
  for (const col of cols) {
    if (col.keywords.some((k) => s.includes(k))) return col.key;
  }
  return null;
}

// Rounding to the nearest €50 reads well for officer pay but mangles a cadet
// allowance (€120 would show as €100), so small figures round to €10.
const round = (n: number) => (n < 500 ? Math.round(n / 10) * 10 : Math.round(n / 50) * 50);

// Sane monthly EUR band. Anything outside is a data error (a day rate stored as
// monthly, an annual/total-contract figure, or a typo like "45000") — dropping
// it keeps a single bad posting from blowing up a cell.
//
// The band has to be PER RANK, because what counts as an error depends on the
// rank: €250/month is obviously wrong for a Master and completely ordinary for
// a cadet, whose pay is a training allowance and routinely runs $100–300. A
// single flat floor silently emptied the cadet cells even though the vacancies
// were there — which is exactly what happened to Deck Cadet on tanker and gas.
// A Master cannot earn €400 a month and a cadet cannot earn €8,000, so the
// floor and ceiling are tiered by seniority.
type Band = { min: number; max: number };
const SENIOR_SLUGS = new Set(["master", "chief-engineer", "chief-officer", "2nd-engineer"]);
const JUNIOR_SLUGS = new Set(["2nd-officer", "3rd-officer", "3rd-engineer", "4th-engineer", "eto", "electrician"]);

function bandFor(slug: string): Band {
  if (CADET_SLUGS.has(slug)) return { min: 40, max: 4000 };
  if (SENIOR_SLUGS.has(slug)) return { min: 1200, max: 30000 };
  if (JUNIOR_SLUGS.has(slug)) return { min: 800, max: 20000 };
  return { min: 350, max: 12000 }; // ratings and catering
}

// Widest ceiling any rank can use — figures above it are dropped up front, so
// the per-rank band only ever narrows what survives.
//
// Day rates need their own, much higher ceiling. A monthly wage of €30,000 is
// a typo; a day rate of $1,430 on a DP2 jack-up barge is an ordinary offshore
// contract, and its 30-day equivalent (€39,500) sailed straight past the
// monthly ceiling and was thrown away as a data error. That is not an edge
// case — everything above roughly $1,090/day was being discarded, which is a
// large part of what the offshore column is supposed to show.
//
// The comparison is still apples to apples: both figures are pay *while
// onboard*. Offshore day rates are high precisely because the rotation is
// equal-time and the leave is unpaid.
const ABS_MAX_EUR = 30000;
const DAY_RATE_MAX_EUR = 60000; // ≈ $2,170/day — beyond that it is a contract total, not a rate
const maxFor = (isDayRate: boolean) => (isDayRate ? DAY_RATE_MAX_EUR : ABS_MAX_EUR);
const inBand = (x: number, isDayRate = false) => x > 0 && x <= maxFor(isDayRate);

// Offshore, tug, dredger and yacht postings quote a DAY rate. Until the
// importer learned to store `salary_period`, every one of them was written as a
// monthly figure — so a €450/day Master read as a €450/month wage: too low to
// be a real monthly salary, so it was dropped as a data error and the offshore
// column came out empty. Where a stored "monthly" figure is below what the rank
// can possibly earn in a month, but its 30-day equivalent lands inside the
// band, read it as the day rate it plainly is.
const DAY_RATE_FLEETS = new Set(["offshore", "dredger", "yacht", "fishing"]);

function fitToBand(x: number, band: Band, period: string | null, fleet: string): number | null {
  // A figure that is already an explicit day rate keeps the day-rate ceiling —
  // the per-rank monthly max would throw away every senior offshore contract.
  const isDayRate = period === "day" && DAY_RATE_FLEETS.has(fleet);
  const max = isDayRate ? Math.max(band.max, DAY_RATE_MAX_EUR) : band.max;
  if (x >= band.min && x <= max) return x;
  if (period !== "day" && x < band.min && DAY_RATE_FLEETS.has(fleet)) {
    // Stored as monthly but plainly a day rate (see DAY_RATE_FLEETS above).
    // Recovered figures get the day-rate ceiling for the same reason.
    const asDay = x * DAYS_PER_MONTH;
    if (asDay >= band.min && asDay <= Math.max(band.max, DAY_RATE_MAX_EUR)) return asDay;
  }
  return null;
}

// Fewest comparable postings needed before we present a "market range" on a
// vacancy page (see buildSalaryContext).
const MIN_CONTEXT_SAMPLE = 2;

function buildRows(ranks: RankLanding[], vacancies: StatVacancy[], cols: VesselCol[] = SALARY_VESSELS): StatRow[] {
  // Resolve each vacancy's fleet and its in-band EUR figures ONCE. Doing it
  // inside the rank × fleet loops meant rescanning every posting for every
  // cell — fine at 6 fleets, wasteful at 11 fleets × 19 ranks.
  const prepared: { rank: string | null; key: string; period: string | null; points: number[] }[] = [];
  for (const v of vacancies) {
    const key = vesselKeyOf(v, cols);
    if (!key) continue;
    // Monthly-equivalent, then convert the currency to EUR. The pre-filter has
    // to know it is looking at a day rate too, otherwise it drops the posting
    // at the monthly ceiling before fitToBand ever sees it.
    const isDayRate = v.salary_period === "day" && DAY_RATE_FLEETS.has(key);
    const points: number[] = [];
    for (const raw of [v.salary_from, v.salary_to]) {
      if (raw == null) continue;
      const x = toEur(monthlyEquivalent(raw, v.salary_period), v.currency);
      if (inBand(x, isDayRate)) points.push(x);
    }
    if (points.length === 0) continue; // all out of band / missing
    prepared.push({ rank: v.rank, key, period: v.salary_period, points });
  }

  return ranks.map((r) => {
    // Observed salary RANGE: lowest and highest in-band figure across all
    // matching vacancies. Using min/max (not an average) means a real
    // high-paying posting — e.g. a Master on a bulker at 10,044 USD — shows
    // at the top of the range instead of being averaged away.
    const band = bandFor(r.slug);
    const acc: Record<string, { lo: number; hi: number; count: number }> = {};
    for (const p of prepared) {
      if (!rankMatches(p.rank, r)) continue;
      let lo = Infinity, hi = -Infinity;
      for (const raw of p.points) {
        const x = fitToBand(raw, band, p.period, p.key);
        if (x == null) continue;
        if (x < lo) lo = x;
        if (x > hi) hi = x;
      }
      if (lo === Infinity) continue; // every figure out of band for this rank
      const a = acc[p.key] ?? (acc[p.key] = { lo: Infinity, hi: -Infinity, count: 0 });
      if (lo < a.lo) a.lo = lo;
      if (hi > a.hi) a.hi = hi;
      a.count++;
    }
    const cells: Record<string, Cell> = {};
    for (const col of cols) {
      const a = acc[col.key];
      cells[col.key] = a ? { from: round(a.lo), to: round(a.hi), count: a.count } : null;
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
  /**
   * "fleet" — the range is for this rank on this fleet.
   * "rank"  — too few postings for that pair, so the range covers the rank
   *           across all fleets and `vesselNames` must not be shown.
   */
  scope: "fleet" | "rank";
  /** Portal-wide min/max, EUR per month. */
  range: { from: number; to: number; count: number };
  /** This vacancy's own figure, EUR per month (midpoint when it's a range). */
  thisEur: number | null;
  /** Where `thisEur` falls relative to the portal range. */
  position: "below" | "low" | "mid" | "high" | "above" | null;
};

export function buildSalaryContext(index: SalaryIndex, v: StatVacancy): SalaryContext | null {
  const vesselKey = vesselKeyOf(v, CONTEXT_VESSELS);
  if (!vesselKey) return null;

  const row = index.rows.find((r) => {
    const landing = RANK_LANDINGS.find((l) => l.slug === r.slug);
    return landing ? rankMatches(v.rank, landing) : false;
  }) ?? null;
  if (!row) return null;

  const vessel = CONTEXT_VESSELS.find((c) => c.key === vesselKey);
  if (!vessel) return null;

  // A "range" built from one posting is just the vacancy quoting itself back,
  // so require a real sample. When this rank × fleet is too thin, widen to the
  // rank across all fleets rather than dropping the comparison entirely.
  const fleetCell = row.cells[vesselKey];
  let scope: SalaryContext["scope"] = "fleet";
  let cell = fleetCell && fleetCell.count >= MIN_CONTEXT_SAMPLE ? fleetCell : null;
  if (!cell) {
    let lo = Infinity, hi = -Infinity, count = 0;
    for (const c of Object.values(row.cells)) {
      if (!c) continue;
      if (c.from < lo) lo = c.from;
      if (c.to > hi) hi = c.to;
      count += c.count;
    }
    if (count < MIN_CONTEXT_SAMPLE) return null;
    scope = "rank";
    cell = { from: lo, to: hi, count };
  }

  // This vacancy's own figure, normalised the same way the stats are — using
  // this rank's band, so a cadet's own allowance isn't filtered out of the
  // comparison the row was just built from.
  const band = bandFor(row.slug);
  const points: number[] = [];
  for (const raw of [v.salary_from, v.salary_to]) {
    if (raw == null) continue;
    const x = fitToBand(
      toEur(monthlyEquivalent(raw, v.salary_period), v.currency),
      band, v.salary_period, vesselKey,
    );
    if (x != null) points.push(x);
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
    scope,
    range: cell,
    thisEur,
    position,
  };
}

/**
 * Every rank × every recognised fleet — the lookup behind the per-vacancy
 * comparison. Wider than `SalaryStats` on both axes: the homepage table shows a
 * curated 6 fleets × 13 ranks, but a vacancy page must be able to compare a 3rd
 * Officer on a Ro-Ro, an Oiler, a Messman, and so on.
 */
export type SalaryIndex = { rows: StatRow[] };

export function computeSalaryIndex(all: StatVacancy[]): SalaryIndex {
  const usable = all.filter((v) => v.salary_from != null || v.salary_to != null);
  return { rows: buildRows(RANK_LANDINGS, usable, CONTEXT_VESSELS) };
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
