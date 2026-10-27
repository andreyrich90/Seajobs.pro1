import { unstable_cache } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/admin";
import { pageAll, MAX_VACANCY_ROWS } from "@/lib/pageAll";

// The live vacancies every landing page filters, read once and shared.
//
// The rank × vessel pages are a couple of hundred URLs in five languages, and
// the rank and vessel pages now also count them to decide which ones to link.
// Each running its own 1000-row query would be a build of a thousand identical
// reads; this caches the one read for as long as the pages themselves are.

export type LandingVacancy = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  salary_period: string | null;
  currency: string;
  contract_duration: string | null;
  joining_date: string | null;
  companies: { name: string | null; logo_url: string | null; is_verified: boolean } | null;
};

export const getLandingVacancies = unstable_cache(
  async (): Promise<LandingVacancy[]> => {
    // Same window as the listing queries: two weeks past the joining date.
    const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
    const sb = getServerSupabase();
    // Paged (lib/pageAll.ts): one request stops at 1000 rows. pageAll throws
    // rather than returning empty: an outage must not be cached as "no
    // vacancies", which would noindex every combination page for an hour.
    const data = await pageAll((from, to) =>
      sb
        .from("vacancies")
        .select("id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, companies(name, logo_url, is_verified)")
        .eq("is_active", true)
        .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
        .order("created_at", { ascending: false })
        .order("id")
        .range(from, to),
      MAX_VACANCY_ROWS,
    );
    return data as unknown as LandingVacancy[];
  },
  ["landing-vacancies-v1"],
  { revalidate: 10800, tags: ["vacancies"] },
);
