import type { Lang } from "@/lib/langs";
import { money } from "@/lib/format";
import { slavic } from "@/lib/plural";

// The home hero's line with figures: live vacancies and the crewing companies
// behind them (lib/homeReach.ts). It lives here rather than in lib/i18n.ts
// because the noun has to agree with the number, which a flat string cannot.
// The country list after the dash opens with Ukraine, Poland and Romania,
// where most of our European seafarers come from (the owner's order), then
// where the companies with live vacancies are based. Keep it to places that
// hold true, and keep lib/i18n.ts's hero_sub (the line without figures) in step.

/** 322 → "320+": a floor, so the hero never claims more than there is. */
function companiesFloor(n: number): string {
  return n < 10 ? String(n) : `${money(Math.floor(n / 10) * 10)}+`;
}

function polish(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const d = n % 10, h = n % 100;
  return d >= 2 && d <= 4 && (h < 12 || h > 14) ? few : many;
}

export function heroReachLine(lang: Lang, vacancies: number, companies: number): string {
  const v = money(vacancies);
  const c = companiesFloor(companies);
  switch (lang) {
    case "ru":
      return `${v} ${slavic(vacancies, "актуальная вакансия", "актуальные вакансии", "актуальных вакансий")} от ${c} крюинговых компаний — Украина, Польша, Румыния, Греция, Великобритания, Скандинавия, Балтия и не только.`;
    case "ua":
      return `${v} ${slavic(vacancies, "актуальна вакансія", "актуальні вакансії", "актуальних вакансій")} від ${c} крюїнгових компаній — Україна, Польща, Румунія, Греція, Велика Британія, Скандинавія, Балтія та інші.`;
    case "pl":
      return `${v} ${polish(vacancies, "aktualna oferta", "aktualne oferty", "aktualnych ofert")} od ${c} agencji crewingowych — Ukraina, Polska, Rumunia, Grecja, Wielka Brytania, Skandynawia, kraje bałtyckie i nie tylko.`;
    case "ro":
      return `${v} ${vacancies === 1 ? "post activ" : "de posturi active"} de la ${c} companii de crewing — Ucraina, Polonia, România, Grecia, Regatul Unit, Scandinavia, țările baltice și nu numai.`;
    default:
      return `${v} live ${vacancies === 1 ? "vacancy" : "vacancies"} from ${c} crewing companies — Ukraine, Poland, Romania, Greece, the UK, Scandinavia, the Baltics and beyond.`;
  }
}
