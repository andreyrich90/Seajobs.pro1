import { Suspense } from "react";
import { connection } from "next/server";
import { getServerSupabase } from "@/lib/supabase/admin";
import JobsClient, { type VacancyWithCompany } from "./JobsClient";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  await connection(); // render per request (fresh vacancies), not at build time
  // Keep vacancies visible for 2 weeks after the joining date (grace period).
  const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
  // Fetch vacancies on the server so the listing is in the initial HTML
  // (SEO + faster first paint). Search/filters/pagination stay client-side.
  // Hide vacancies whose joining date passed more than 2 weeks ago.
  const { data } = await getServerSupabase()
    .from("vacancies")
    .select("id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, created_at, companies(name, logo_url, location, is_verified)")
    .eq("is_active", true)
    .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
    .order("created_at", { ascending: false })
    .limit(1000);

  return (
    <Suspense>
      <JobsClient initialVacancies={(data ?? []) as VacancyWithCompany[]} />
    </Suspense>
  );
}
