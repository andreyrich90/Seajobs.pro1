import type { SupabaseClient } from "@supabase/supabase-js";
import { normalizeNationality } from "@/lib/nationality";
import { MAX_USER_ROWS, MAX_VACANCY_ROWS, pageAll } from "@/lib/pageAll";

// The two figures the home page's hero quotes beside the live-vacancy count:
// how many crewing companies have a live vacancy, and what share of the
// seafarers who named a nationality are European.
//
// Both are counted, never written into copy, so the hero cannot claim more
// than the database holds. The hero shows "more than half of our seafarers are
// European" only while `europeShare` is above 0.5; below it the sentence goes.
//
// Europe here is geographic: the EU and EEA, the UK, Switzerland, the Balkans,
// Ukraine, Moldova, Belarus and Russia. Turkey, Georgia and Azerbaijan are left
// out, so the share is the cautious reading.

const EUROPE = new Set(
  (
    "UA PL RO BG HR LV LT EE GR IT ES PT DE FR NL BE LU AT IE GB NO SE FI DK IS CH LI " +
    "SI SK HU CZ CY MT ME RS MK AL BA XK MD BY RU MC SM AD"
  ).split(" "),
);

export type HomeReach = { companies: number; europeShare: number | null };

/** Distinct companies behind the live vacancies, and the European share. */
export async function getHomeReach(sb: SupabaseClient, cutoff: string): Promise<HomeReach> {
  const [live, nats] = await Promise.all([
    pageAll<{ id: string; company_id: string | null }>(
      (from, to) =>
        sb.from("vacancies")
          .select("id, company_id")
          .eq("is_active", true)
          .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
          .order("id")
          .range(from, to),
      MAX_VACANCY_ROWS,
    ),
    pageAll<{ id: string; nationality: string | null }>(
      (from, to) =>
        sb.from("seafarers")
          .select("id, nationality")
          .not("nationality", "is", null)
          .order("id")
          .range(from, to),
      MAX_USER_ROWS,
    ),
  ]);

  const companies = new Set(live.map((v) => v.company_id).filter(Boolean)).size;

  let known = 0;
  let europe = 0;
  for (const s of nats) {
    const code = normalizeNationality(s.nationality);
    if (!code) continue;
    known++;
    if (EUROPE.has(code)) europe++;
  }
  return { companies, europeShare: known ? europe / known : null };
}
