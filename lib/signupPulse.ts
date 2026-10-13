import { getServerSupabase } from "@/lib/supabase/admin";
import { pageAll, MAX_USER_ROWS } from "@/lib/pageAll";

// How many seafarers joined today, for the strip in the home page's hero.
//
// "Today" is the calendar day in Kyiv, where most of the board's seafarers and
// its operator are; a UTC day would roll over at 3 a.m. there and show "0"
// to the morning's readers. Sign-ups run 11–30 a day (October 2026), but only
// a handful arrive before 9 a.m., so right after midnight today is genuinely
// empty — the strip then shows yesterday rather than a zero (`useYesterday`).
//
// Counted from `profiles` with role 'seafarer', the same figure the admin
// dashboard calls Seafarers. The home page is cached for five minutes, so the
// number is at most five minutes behind.

export type SignupPulse = {
  /** Sign-ups on the day shown (today, or yesterday when today has none yet). */
  count: number;
  /** True when `count` is yesterday's. */
  useYesterday: boolean;
  /** The last seven Kyiv days, oldest first, today last. */
  days: { date: string; n: number }[];
  /** Sum of `days`. */
  week: number;
};

const ZONE = "Europe/Kyiv";

/** The Kyiv calendar date of an instant, as YYYY-MM-DD. */
function kyivDate(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: ZONE });
}

/**
 * The `n` calendar days ending with `last`, oldest first. Stepped on the date
 * itself, not by subtracting 24 hours from an instant: a 23-hour day at the
 * spring clock change would make that skip a date.
 */
function daysEnding(last: string, n: number): string[] {
  const noon = new Date(`${last}T12:00:00Z`).getTime();
  return Array.from({ length: n }, (_, i) => new Date(noon - (n - 1 - i) * 864e5).toISOString().slice(0, 10));
}

export async function getSignupPulse(): Promise<SignupPulse | null> {
  const sb = getServerSupabase();
  // Eight days back covers seven Kyiv days whatever the hour.
  const since = new Date(Date.now() - 8 * 864e5).toISOString();

  const recent = await pageAll(
    (from, to) =>
      sb
        .from("profiles")
        .select("created_at")
        .eq("role", "seafarer")
        .gte("created_at", since)
        .order("created_at")
        .order("id")
        .range(from, to),
    MAX_USER_ROWS,
  );

  const keys = daysEnding(kyivDate(new Date()), 7);
  const perDay = new Map(keys.map((k) => [k, 0]));
  for (const r of recent as { created_at: string }[]) {
    const k = kyivDate(new Date(r.created_at));
    if (perDay.has(k)) perDay.set(k, perDay.get(k)! + 1);
  }
  const days = keys.map((date) => ({ date, n: perDay.get(date)! }));
  const today = days[6].n;
  const useYesterday = today === 0;

  return {
    count: useYesterday ? days[5].n : today,
    useYesterday,
    days,
    week: days.reduce((s, d) => s + d.n, 0),
  };
}
