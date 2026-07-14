// Day rates are stored as-is in salary_from/salary_to with salary_period="day"
// and shown on cards as "300 EUR/day". When salaries are AGGREGATED or COMPARED
// across vacancies (e.g. the rank landing salary range), a day rate must first
// be converted to its monthly equivalent — otherwise 300/day looks smaller than
// a 6,850/month figure. 30 working days is the convention the board uses
// (300/day ≈ 9,000/month).
export const DAYS_PER_MONTH = 30;

export function monthlyEquivalent(amount: number, period: string | null | undefined): number {
  return period === "day" ? amount * DAYS_PER_MONTH : amount;
}
