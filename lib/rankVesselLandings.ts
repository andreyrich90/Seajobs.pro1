import type { Lang } from "@/lib/langs";
import {
  RANK_LANDINGS, vacancyMatchesRank, type RankLanding,
} from "@/lib/rankLandings";
import {
  VESSEL_LANDINGS, vacancyMatchesVessel, type VesselLanding,
} from "@/lib/vesselLandings";

// Rank × vessel-type landing pages, at /jobs/rank/<rank>/<vessel> — the
// "chief engineer bulk carrier jobs" searches. Search Console shows these as
// the largest pool of impressions with no clicks: Google had only a vacancy or
// a single-axis landing to offer for a two-axis question.
//
// 19 ranks × 11 vessel types is 209 combinations, most of them empty on any
// given day, and an empty or one-line page is the thin content Google demotes
// a whole site for. So a combination is **indexable only while it holds at
// least `MIN_COMBO_VACANCIES` live postings**: only those are linked from the
// parent pages, listed in the sitemap and prerendered. The rest still answer —
// a link may outlive its vacancies — but with `noindex`, pointing to the two
// parent pages.

export const MIN_COMBO_VACANCIES = 2;

/** "on bulk carriers", "на балкере" — the vessel as the end of a phrase. */
export const VESSEL_ON: Record<string, Record<Lang, string>> = {
  "tanker": { en: "on tankers", ru: "на танкере", ua: "на танкері", pl: "na zbiornikowcu", ro: "pe tancuri petroliere" },
  "chemical-tanker": { en: "on chemical tankers", ru: "на химовозе", ua: "на хімовозі", pl: "na chemikaliowcu", ro: "pe tancuri chimice" },
  "bulk-carrier": { en: "on bulk carriers", ru: "на балкере", ua: "на балкері", pl: "na masowcu", ro: "pe vrachiere" },
  "container-ship": { en: "on container ships", ru: "на контейнеровозе", ua: "на контейнеровозі", pl: "na kontenerowcu", ro: "pe portcontainere" },
  "general-cargo": { en: "on general cargo / MPP vessels", ru: "на судах генерального груза / MPP", ua: "на суднах генерального вантажу / MPP", pl: "na drobnicowcu / MPP", ro: "pe nave de marfă generală / MPP" },
  "gas-carrier": { en: "on gas carriers (LNG / LPG)", ru: "на газовозе (LNG / LPG)", ua: "на газовозі (LNG / LPG)", pl: "na gazowcu (LNG / LPG)", ro: "pe nave de gaz (LNG / LPG)" },
  "car-carrier": { en: "on car carriers (PCTC)", ru: "на автовозе (PCTC)", ua: "на автовозі (PCTC)", pl: "na samochodowcu (PCTC)", ro: "pe nave auto (PCTC)" },
  "offshore": { en: "on offshore vessels", ru: "на оффшорных судах", ua: "на офшорних суднах", pl: "na statkach offshore", ro: "pe nave offshore" },
  "cruise-ship": { en: "on cruise ships", ru: "на круизных судах", ua: "на круїзних суднах", pl: "na wycieczkowcach", ro: "pe nave de croazieră" },
  "ferry": { en: "on ferries (RoPax)", ru: "на пароме (RoPax)", ua: "на поромі (RoPax)", pl: "na promie (RoPax)", ro: "pe feriboturi (RoPax)" },
  "tug": { en: "on tugs", ru: "на буксире", ua: "на буксирі", pl: "na holowniku", ro: "pe remorchere" },
};

export function vesselOn(v: VesselLanding, lang: Lang): string {
  return VESSEL_ON[v.slug]?.[lang] ?? VESSEL_ON[v.slug]?.en ?? v.names.en;
}

type Matchable = { rank: string | null; vessel_type: string | null; title: string };

export function inCombo(v: Matchable, r: RankLanding, s: VesselLanding): boolean {
  return vacancyMatchesRank(v.rank, r.rank) && vacancyMatchesVessel(v.vessel_type, v.title, s.keywords);
}

export type Combo = { rank: RankLanding; vessel: VesselLanding; count: number };

/** Every combination that currently clears the bar, busiest first. */
export function liveCombos(vacancies: Matchable[]): Combo[] {
  const out: Combo[] = [];
  for (const rank of RANK_LANDINGS) {
    const ofRank = vacancies.filter((v) => vacancyMatchesRank(v.rank, rank.rank));
    if (ofRank.length < MIN_COMBO_VACANCIES) continue;
    for (const vessel of VESSEL_LANDINGS) {
      const count = ofRank.filter((v) => vacancyMatchesVessel(v.vessel_type, v.title, vessel.keywords)).length;
      if (count >= MIN_COMBO_VACANCIES) out.push({ rank, vessel, count });
    }
  }
  return out.sort((a, b) => b.count - a.count);
}

// ── Localized copy ───────────────────────────────────────────────────────────

/** Slavic plural: 1 / 21 → one; 2–4 / 22–24 → few; 5–20, 11–14 → many. */
function slavic(n: number, one: string, few: string, many: string): string {
  const d = n % 10, h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
}

// `r` is the rank as named on its own landing, `on` the vessel phrase above.
type Copy = {
  metaTitle: (r: string, on: string) => string;
  metaDesc: (r: string, on: string, n: number) => string;
  h1: (r: string, on: string) => string;
  countLine: (n: number, r: string, on: string) => string;
  companiesLine: (names: string) => string;
  soonestLine: (date: string) => string;
  sameRankHeading: (r: string) => string;
  sameVesselHeading: (on: string) => string;
  /** On the parent rank page: "Chief Engineer by vessel type". */
  byVesselHeading: (r: string) => string;
  /** On the parent vessel page: "Ranks on bulk carriers". */
  byRankHeading: (on: string) => string;
  noneYet: (r: string, on: string) => string;
  seeRank: (r: string) => string;
  seeVessel: (on: string) => string;
};

export const COMBO_COPY: Record<Lang, Copy> = {
  en: {
    metaTitle: (r, on) => `${r} jobs ${on} — current vacancies | SeaJobs.pro`,
    metaDesc: (r, on, n) => `${n} open ${r} ${n === 1 ? "vacancy" : "vacancies"} ${on} from crewing agencies: salary, contract length and joining date for each. Apply free on SeaJobs.pro.`,
    h1: (r, on) => `${r} jobs ${on}`,
    countLine: (n, r, on) => `There ${n === 1 ? "is" : "are"} ${n} open ${r} ${n === 1 ? "vacancy" : "vacancies"} ${on} on SeaJobs.pro right now.`,
    companiesLine: (c) => `Hiring now: ${c}.`,
    soonestLine: (d) => `Earliest joining date: ${d}.`,
    sameRankHeading: (r) => `${r} on other vessel types`,
    sameVesselHeading: (on) => `Other ranks ${on}`,
    byVesselHeading: (r) => `${r} by vessel type`,
    byRankHeading: (on) => `Ranks ${on}`,
    noneYet: (r, on) => `No open ${r} vacancies ${on} right now.`,
    seeRank: (r) => `All ${r} jobs`,
    seeVessel: (on) => `All jobs ${on}`,
  },
  ru: {
    metaTitle: (r, on) => `${r} ${on} — вакансии, работа в море | SeaJobs.pro`,
    metaDesc: (r, on, n) => `${r} ${on}: ${n} ${slavic(n, "актуальная вакансия", "актуальные вакансии", "актуальных вакансий")} от крюинговых агентств — зарплата, длительность контракта и дата посадки. Отклик бесплатно на SeaJobs.pro.`,
    h1: (r, on) => `${r} ${on} — вакансии`,
    countLine: (n, r, on) => `${r} ${on}: сейчас на SeaJobs.pro ${slavic(n, "открыта", "открыто", "открыто")} ${n} ${slavic(n, "вакансия", "вакансии", "вакансий")}.`,
    companiesLine: (c) => `Сейчас набирают: ${c}.`,
    soonestLine: (d) => `Ближайшая посадка: ${d}.`,
    sameRankHeading: (r) => `${r} на других типах судов`,
    sameVesselHeading: (on) => `Другие должности ${on}`,
    byVesselHeading: (r) => `${r}: вакансии по типам судов`,
    byRankHeading: (on) => `Должности ${on}`,
    noneYet: (r, on) => `${r} ${on}: сейчас открытых вакансий нет.`,
    seeRank: (r) => `${r}: все вакансии`,
    seeVessel: (on) => `Все вакансии ${on}`,
  },
  ua: {
    metaTitle: (r, on) => `${r} ${on} — вакансії, робота в морі | SeaJobs.pro`,
    metaDesc: (r, on, n) => `${r} ${on}: ${n} ${slavic(n, "актуальна вакансія", "актуальні вакансії", "актуальних вакансій")} від крюїнгових агентств — зарплата, тривалість контракту й дата посадки. Відгук безкоштовно на SeaJobs.pro.`,
    h1: (r, on) => `${r} ${on} — вакансії`,
    countLine: (n, r, on) => `${r} ${on}: зараз на SeaJobs.pro ${slavic(n, "відкрита", "відкрито", "відкрито")} ${n} ${slavic(n, "вакансія", "вакансії", "вакансій")}.`,
    companiesLine: (c) => `Зараз набирають: ${c}.`,
    soonestLine: (d) => `Найближча посадка: ${d}.`,
    sameRankHeading: (r) => `${r} на інших типах суден`,
    sameVesselHeading: (on) => `Інші посади ${on}`,
    byVesselHeading: (r) => `${r}: вакансії за типами суден`,
    byRankHeading: (on) => `Посади ${on}`,
    noneYet: (r, on) => `${r} ${on}: зараз відкритих вакансій немає.`,
    seeRank: (r) => `${r}: усі вакансії`,
    seeVessel: (on) => `Усі вакансії ${on}`,
  },
  pl: {
    metaTitle: (r, on) => `${r} ${on} — oferty pracy | SeaJobs.pro`,
    metaDesc: (r, on, n) => `${r} ${on}: ${n} ${n === 1 ? "aktualna oferta" : slavic(n, "aktualnych ofert", "aktualne oferty", "aktualnych ofert")} pracy od agencji crewingowych — wynagrodzenie, długość kontraktu i data zaokrętowania. Aplikuj za darmo na SeaJobs.pro.`,
    h1: (r, on) => `${r} ${on} — oferty pracy`,
    countLine: (n, r, on) => `${r} ${on}: obecnie na SeaJobs.pro ${n === 1 ? "jest 1 oferta" : `${slavic(n, "jest", "są", "jest")} ${n} ${slavic(n, "ofert", "oferty", "ofert")}`} pracy.`,
    companiesLine: (c) => `Teraz rekrutują: ${c}.`,
    soonestLine: (d) => `Najbliższe zaokrętowanie: ${d}.`,
    sameRankHeading: (r) => `${r} na innych typach statków`,
    sameVesselHeading: (on) => `Inne stanowiska ${on}`,
    byVesselHeading: (r) => `${r}: oferty według typu statku`,
    byRankHeading: (on) => `Stanowiska ${on}`,
    noneYet: (r, on) => `${r} ${on}: obecnie brak ofert pracy.`,
    seeRank: (r) => `${r}: wszystkie oferty`,
    seeVessel: (on) => `Wszystkie oferty ${on}`,
  },
  ro: {
    metaTitle: (r, on) => `${r} ${on} — posturi actuale | SeaJobs.pro`,
    metaDesc: (r, on, n) => `${r} ${on}: ${n} ${n === 1 ? "post" : "posturi"} de la agenții de crewing — salariu, durata contractului și data îmbarcării. Aplică gratuit pe SeaJobs.pro.`,
    h1: (r, on) => `${r} ${on} — posturi`,
    countLine: (n, r, on) => `${r} ${on}: în prezent, pe SeaJobs.pro ${n === 1 ? "este 1 post deschis" : `sunt ${n} posturi deschise`}.`,
    companiesLine: (c) => `Recrutează acum: ${c}.`,
    soonestLine: (d) => `Cea mai apropiată îmbarcare: ${d}.`,
    sameRankHeading: (r) => `${r} pe alte tipuri de nave`,
    sameVesselHeading: (on) => `Alte funcții ${on}`,
    byVesselHeading: (r) => `${r}: posturi după tipul navei`,
    byRankHeading: (on) => `Funcții ${on}`,
    noneYet: (r, on) => `${r} ${on}: momentan nu există posturi deschise.`,
    seeRank: (r) => `${r}: toate posturile`,
    seeVessel: (on) => `Toate posturile ${on}`,
  },
};
