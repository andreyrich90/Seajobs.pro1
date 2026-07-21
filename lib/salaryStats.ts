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
    keywords: ["bulk", "bulker", "handysize", "handymax", "supramax", "panamax", "capesize"],
    names: { en: "Bulk", ru: "Балкер", ua: "Балкер", pl: "Masowiec", ro: "Vrachier" },
  },
  {
    key: "tanker",
    keywords: ["tanker", "crude", "oil", "product", "chemical", "vlcc", "suezmax", "aframax", "bitumen"],
    names: { en: "Tanker", ru: "Танкер", ua: "Танкер", pl: "Zbiornikowiec", ro: "Tanc" },
  },
  {
    key: "gas-carrier",
    keywords: ["lng", "lpg", "gas carrier", "gas tanker", "ethylene", "vlgc"],
    names: { en: "Gas (LNG/LPG)", ru: "Газовоз", ua: "Газовоз", pl: "Gazowiec", ro: "Gaz" },
  },
  {
    key: "container-ship",
    keywords: ["container", "feeder", "boxship"],
    names: { en: "Container", ru: "Контейнеровоз", ua: "Контейнеровоз", pl: "Kontenerowiec", ro: "Portcontainer" },
  },
  {
    key: "offshore",
    keywords: ["offshore", "ahts", "psv", "osv", "supply vessel", "dp2", "dp3", "platform", "wind", "ctv", "sov", "rov", "diving", "construction vessel", "jack-up", "drill"],
    names: { en: "Offshore", ru: "Оффшор", ua: "Офшор", pl: "Offshore", ro: "Offshore" },
  },
];

// Rank rows, split into two tabs. Slugs map to existing /jobs/rank/<slug> pages.
const OFFICER_SLUGS = ["master", "chief-officer", "2nd-officer", "chief-engineer", "2nd-engineer", "eto"];
const RATING_SLUGS = ["able-seaman", "bosun", "motorman", "fitter", "cook"];

function pickRanks(slugs: string[]): RankLanding[] {
  return slugs
    .map((s) => RANK_LANDINGS.find((r) => r.slug === s))
    .filter((r): r is RankLanding => !!r);
}

export type StatVacancy = {
  rank: string | null;
  vessel_type: string | null;
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

function vesselKeyOf(vesselType: string | null): string | null {
  if (!vesselType) return null;
  const s = vesselType.toLowerCase();
  for (const col of SALARY_VESSELS) {
    if (col.keywords.some((k) => s.includes(k))) return col.key;
  }
  return null;
}

const round = (n: number) => Math.round(n / 50) * 50;

function buildRows(ranks: RankLanding[], vacancies: StatVacancy[]): StatRow[] {
  return ranks.map((r) => {
    const cells: Record<string, Cell> = {};
    for (const col of SALARY_VESSELS) {
      let fromSum = 0, fromN = 0, toSum = 0, toN = 0, count = 0;
      for (const v of vacancies) {
        if (vesselKeyOf(v.vessel_type) !== col.key) continue;
        if (!vacancyMatchesRank(v.rank, r.rank)) continue;
        const from = v.salary_from != null ? monthlyEquivalent(v.salary_from, v.salary_period) : null;
        const to = v.salary_to != null ? monthlyEquivalent(v.salary_to, v.salary_period) : null;
        if (from == null && to == null) continue;
        if (from != null) { fromSum += from; fromN++; }
        if (to != null) { toSum += to; toN++; }
        count++;
      }
      cells[col.key] = count > 0
        ? {
            from: round(fromN ? fromSum / fromN : toSum / toN),
            to: round(toN ? toSum / toN : fromSum / fromN),
            count,
          }
        : null;
    }
    return { slug: r.slug, names: r.names, cells };
  });
}

/** Average from/to salaries per rank × vessel, from USD-quoted active vacancies. */
export function computeSalaryStats(all: StatVacancy[]): SalaryStats {
  // Only USD figures are comparable across the board (the vast majority of
  // maritime salaries are quoted in USD); skip other currencies and blanks.
  const usable = all.filter(
    (v) => (v.currency ?? "USD").toUpperCase() === "USD" && (v.salary_from != null || v.salary_to != null)
  );
  const officers = buildRows(pickRanks(OFFICER_SLUGS), usable);
  const ratings = buildRows(pickRanks(RATING_SLUGS), usable);
  const hasData =
    officers.some((r) => Object.values(r.cells).some(Boolean)) ||
    ratings.some((r) => Object.values(r.cells).some(Boolean));
  return { vessels: SALARY_VESSELS, officers, ratings, currency: "USD", hasData };
}
