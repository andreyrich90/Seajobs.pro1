import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import { computeSalaryStats } from "@/lib/salaryStats";
import HomeClient, { type DbVacancy, type DbNews } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connection(); // render per request (fresh vacancies), not at build time
  // Keep vacancies visible for 2 weeks after the joining date (grace period);
  // the crewing can close one earlier via is_active.
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  const sb = getServerSupabase();
  // Fetch vacancies + latest news on the server so they're in the initial HTML.
  // Hide vacancies whose joining date passed more than 2 weeks ago.
  // `statRows` is a separate, salary-only query so the comparison widget sees
  // EVERY salaried vacancy (not just the newest 500 shown on the page) —
  // otherwise older rank×vessel combos show empty cells even though vacancies
  // exist on /jobs.
  const [{ data: vacancies }, { data: news }, { data: statRows }] = await Promise.all([
    sb.from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, joining_date, companies(name, is_verified)")
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
      .order("created_at", { ascending: false })
      .limit(500),
    sb.from("news_articles")
      .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
      .eq("is_published", true)
      .neq("category", "guide")
      .order("published_at", { ascending: false })
      .limit(6),
    sb.from("vacancies")
      .select("rank, vessel_type, title, salary_from, salary_to, salary_period, currency")
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
      .or("salary_from.not.is.null,salary_to.not.is.null")
      .limit(5000),
  ]);

  const salaryStats = computeSalaryStats((statRows ?? []) as DbVacancy[]);

  return (
    <HomeClient
      initialVacancies={(vacancies ?? []) as DbVacancy[]}
      initialNews={(news ?? []) as DbNews[]}
      salaryStats={salaryStats}
    />
  );
}
