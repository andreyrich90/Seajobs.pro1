import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import HomeClient, { type DbVacancy } from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connection(); // render per request (fresh vacancies), not at build time
  const today = new Date().toISOString().slice(0, 10);
  // Fetch vacancies on the server so they're in the initial HTML (SEO + speed).
  // Hide vacancies whose joining date has already passed.
  const { data } = await getServerSupabase()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, currency, joining_date, companies(name, is_verified)")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${today}`)
    .order("created_at", { ascending: false })
    .limit(500);

  return <HomeClient initialVacancies={(data ?? []) as DbVacancy[]} />;
}
