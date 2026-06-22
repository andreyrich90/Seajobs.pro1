import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import HomeClient, { type DbVacancy, type DbNews } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connection(); // render per request (fresh vacancies), not at build time
  const today = new Date().toISOString().slice(0, 10);
  const sb = getServerSupabase();
  // Fetch vacancies + latest news on the server so they're in the initial HTML.
  // Hide vacancies whose joining date has already passed.
  const [{ data: vacancies }, { data: news }] = await Promise.all([
    sb.from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, currency, joining_date, companies(name, is_verified)")
      .eq("is_active", true)
      .or(`joining_date.is.null,joining_date.gte.${today}`)
      .order("created_at", { ascending: false })
      .limit(500),
    sb.from("news_articles")
      .select("id, title, tag, cover_gradient, cover_url, published_at, created_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <HomeClient
      initialVacancies={(vacancies ?? []) as DbVacancy[]}
      initialNews={(news ?? []) as DbNews[]}
    />
  );
}
