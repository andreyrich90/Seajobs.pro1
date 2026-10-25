import { getServerSupabase } from "@/lib/supabase/admin";
import { getSalaryStats } from "@/lib/salaryStatsCached";
import { getSignupPulse } from "@/lib/signupPulse";
import HomeClient, { type DbVacancy, type DbNews } from "./HomeClient";


// Cached and refreshed every fifteen minutes rather than rendered per request.
// The home page shows the latest vacancies and news; being a quarter of an hour
// behind costs a reader nothing, while a function per view was the single
// biggest line on the hosting bill. Same reasoning on every public page below —
// the numbers differ only by how fast that page's content actually changes.
//
// Every refresh is also an ISR write, billed by size, in each of five
// languages. At five minutes, with 500 vacancies embedded (~600 KB a page),
// this one page was most of October 2026's Vercel overage.
export const revalidate = 900;

/**
 * Vacancies embedded in the page: three pages of 30. The full board is /jobs,
 * linked above and below the list; every extra row here is paid for again on
 * each refresh in every language.
 */
const HOME_VACANCIES = 90;

export default async function Home() {
  // Keep vacancies visible for 2 weeks after the joining date (grace period);
  // the crewing can close one earlier via is_active.
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  const sb = getServerSupabase();
  // Fetch vacancies + latest news on the server so they're in the initial HTML.
  // Hide vacancies whose joining date passed more than 2 weeks ago.
  // The salary comparison is computed by `getSalaryStats`, which caches its
  // 5,000-row scan for 15 minutes — that scan used to run on every request and
  // dominated TTFB/LCP here. The lists below stay per-request fresh.
  // The "joined today" strip is decoration: if its count fails, the hero
  // simply goes without it rather than taking the page down.
  const [{ data: vacancies }, { data: news }, salaryStats, signups, live] = await Promise.all([
    sb.from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, companies(name, logo_url, is_verified)")
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
      .order("created_at", { ascending: false })
      .limit(HOME_VACANCIES),
    sb.from("news_articles")
      .select("id, title, body, tag, cover_gradient, cover_url, published_at, created_at")
      .eq("is_published", true)
      // Guides and the handbook have sections of their own.
      .not("category", "in", "(guide,handbook)")
      .order("published_at", { ascending: false })
      .limit(6),
    getSalaryStats(),
    getSignupPulse().catch((e) => {
      console.error("[home] signup pulse", e);
      return null;
    }),
    // Live vacancies for the strip: the same filter as the list below and
    // /jobs, counted rather than fetched (the list stops at HOME_VACANCIES).
    sb.from("vacancies")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${cutoff}`),
  ]);

  return (
    <HomeClient
      initialVacancies={(vacancies ?? []) as DbVacancy[]}
      initialNews={(news ?? []) as DbNews[]}
      salaryStats={salaryStats}
      signups={signups}
      liveVacancies={live.error ? null : live.count}
      // Read from `revalidate` itself, so the strip's "updates every N minutes"
      // cannot drift from the interval the page is actually cached for.
      refreshMinutes={revalidate / 60}
    />
  );
}
