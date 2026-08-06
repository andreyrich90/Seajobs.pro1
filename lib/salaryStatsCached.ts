import { unstable_cache } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/admin";
import {
  computeSalaryIndex, computeSalaryStats,
  type SalaryIndex, type SalaryStats, type StatVacancy,
} from "@/lib/salaryStats";

// The salary comparison scans up to 5,000 salaried vacancies. Running that on
// every request dominated TTFB (and therefore LCP) on the homepage and
// /salaries, both of which are force-dynamic for their *vacancy* lists.
//
// Salary ranges move slowly — a new posting shifts a min/max by a little, not
// by much — so the computed stats are cached for 15 minutes. The vacancy lists
// on those pages stay per-request fresh; only this aggregate is cached.
//
// The homepage table (`stats`) and the per-vacancy comparison (`index`) are
// derived from the same scan and cached together, so widening the comparison to
// every rank × fleet costs no extra query.
const getSalaryData = unstable_cache(
  async (): Promise<{ stats: SalaryStats; index: SalaryIndex }> => {
    // Keep vacancies counted for 2 weeks past their joining date, matching the
    // grace period used by the listing queries.
    const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
    const sb = getServerSupabase();
    const { data } = await sb
      .from("vacancies")
      .select("rank, vessel_type, title, salary_from, salary_to, salary_period, currency")
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
      .or("salary_from.not.is.null,salary_to.not.is.null")
      .limit(5000);
    const rows = (data ?? []) as StatVacancy[];
    return { stats: computeSalaryStats(rows), index: computeSalaryIndex(rows) };
  },
  ["salary-stats-v2"],
  { revalidate: 900, tags: ["salary-stats"] }
);

/** Curated 6 fleets × 13 ranks table, for the homepage and /salaries. */
export async function getSalaryStats(): Promise<SalaryStats> {
  return (await getSalaryData()).stats;
}

/** Every rank × every recognised fleet, for the per-vacancy salary comparison. */
export async function getSalaryIndex(): Promise<SalaryIndex> {
  return (await getSalaryData()).index;
}
