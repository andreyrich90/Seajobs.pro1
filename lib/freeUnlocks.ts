import type { SupabaseClient } from "@supabase/supabase-js";
import { FREE_UNLOCKS_PER_WEEK } from "@/lib/subscription";
import { hasToolAccess } from "@/lib/subscriptionAccess";
import { kyivToInstant, kyivWall } from "@/lib/publishQueue";

// The free tier under the seafarer subscription: three vacancies a week.
//
// A seafarer without a subscription presses "open this vacancy" and spends one
// of the week's three; the vacancy then shows the agency's e-mail and phone
// and may be applied to, through the portal or from their own mailbox. It
// stays open for that seafarer for good — coming back to it, or applying a
// day later, costs nothing. Opening is a button, never a page view: browsing
// the board must not use the week up.
//
// The week starts on Monday at 00:00 Kyiv time, like everything else on the
// site that has a calendar. Rows live in `contact_unlocks`
// (20261027000000_contact_unlocks.sql), written only here, with the service
// role. A missing table reads as "nothing opened, nothing can be" — the free
// tier is then closed and the subscription still works.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

export type FreeState = {
  limit: number;
  used: number;
  left: number;
  /** When the next week's three arrive: Monday 00:00 Kyiv, as ISO. */
  resetsAt: string;
};

/** The Kyiv week `now` falls in: from Monday 00:00 to the next Monday 00:00. */
export function kyivWeek(now: Date): { start: Date; next: Date } {
  const w = kyivWall(now);
  const sinceMonday = (new Date(Date.UTC(w.y, w.m - 1, w.d)).getUTCDay() + 6) % 7;
  // Stepped on the calendar date, not by subtracting hours: a week with a
  // clock change is not 168 hours long.
  const at = (offsetDays: number) => {
    const day = new Date(Date.UTC(w.y, w.m - 1, w.d - sinceMonday + offsetDays));
    return kyivToInstant({ y: day.getUTCFullYear(), m: day.getUTCMonth() + 1, d: day.getUTCDate(), h: 0, mi: 0 });
  };
  return { start: at(0), next: at(7) };
}

export async function freeState(db: Db, seafarerId: string, now = new Date()): Promise<FreeState> {
  const { start, next } = kyivWeek(now);
  const { count, error } = await db
    .from("contact_unlocks")
    .select("id", { count: "exact", head: true })
    .eq("seafarer_id", seafarerId)
    .gte("created_at", start.toISOString());
  if (error) console.error("[free-unlocks] count", error.message);
  // An unreadable table must not hand out free unlocks it cannot record.
  const used = error ? FREE_UNLOCKS_PER_WEEK : count ?? 0;
  return {
    limit: FREE_UNLOCKS_PER_WEEK,
    used,
    left: Math.max(0, FREE_UNLOCKS_PER_WEEK - used),
    resetsAt: next.toISOString(),
  };
}

export async function isUnlocked(db: Db, seafarerId: string, vacancyId: string): Promise<boolean> {
  const { data, error } = await db
    .from("contact_unlocks")
    .select("id")
    .eq("seafarer_id", seafarerId)
    .eq("vacancy_id", vacancyId)
    .limit(1);
  if (error) return false;
  return (data?.length ?? 0) > 0;
}

/**
 * Spend one of the week's free unlocks on a vacancy. Opening one already open
 * succeeds and spends nothing. Two presses landing together could both pass
 * the count and open a fourth; that is cheaper than a lock, and the unique
 * key still stops the same vacancy being counted twice.
 */
export async function unlockVacancy(
  db: Db,
  seafarerId: string,
  vacancyId: string,
): Promise<{ ok: boolean; state: FreeState }> {
  if (await isUnlocked(db, seafarerId, vacancyId)) return { ok: true, state: await freeState(db, seafarerId) };
  const before = await freeState(db, seafarerId);
  if (before.left <= 0) return { ok: false, state: before };
  const { error } = await db.from("contact_unlocks").insert({ seafarer_id: seafarerId, vacancy_id: vacancyId });
  if (error && error.code !== "23505") {
    console.error("[free-unlocks] insert", error.message);
    return { ok: false, state: before };
  }
  return { ok: true, state: await freeState(db, seafarerId) };
}

/**
 * May this seafarer act on this vacancy — see its contacts, apply to it, write
 * to it from their own mailbox: a subscription (or nothing on sale yet), or
 * this vacancy opened with a free unlock.
 */
export async function mayUseVacancy(db: Db, seafarerId: string, vacancyId: string): Promise<boolean> {
  if (await hasToolAccess(db, seafarerId)) return true;
  return isUnlocked(db, seafarerId, vacancyId);
}
