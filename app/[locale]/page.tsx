import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import { getSalaryStats } from "@/lib/salaryStatsCached";
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
  // The salary comparison is computed by `getSalaryStats`, which caches its
  // 5,000-row scan for 15 minutes — that scan used to run on every request and
  // dominated TTFB/LCP here. The lists below stay per-request fresh.
  const [{ data: vacancies }, { data: news }, salaryStats] = await Promise.all([
    sb.from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, companies(name, logo_url, is_verified)")
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
    getSalaryStats(),
  ]);

  return (
    <HomeClient
      initialVacancies={(vacancies ?? []) as DbVacancy[]}
      initialNews={(news ?? []) as DbNews[]}
      salaryStats={salaryStats}
    />
  );
}
