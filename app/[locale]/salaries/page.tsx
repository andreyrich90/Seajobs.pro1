import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import { computeSalaryStats, type StatVacancy } from "@/lib/salaryStats";
import SalariesClient from "./SalariesClient";

export const dynamic = "force-dynamic";

export default async function SalariesPage() {
  await connection(); // render per request (fresh vacancies), not at build time
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  const sb = getServerSupabase();
  // Salary-only query so the comparison sees every salaried vacancy (mirrors
  // the homepage widget's dedicated query).
  const { data: statRows } = await sb
    .from("vacancies")
    .select("rank, vessel_type, title, salary_from, salary_to, salary_period, currency")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
    .or("salary_from.not.is.null,salary_to.not.is.null")
    .limit(5000);

  const salaryStats = computeSalaryStats((statRows ?? []) as StatVacancy[]);

  return <SalariesClient stats={salaryStats} />;
}
