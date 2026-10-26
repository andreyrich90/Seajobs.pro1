import type { SupabaseClient } from "@supabase/supabase-js";

// Server-side answers to "may this seafarer do that", for the routes that are
// the subscription's real boundary (lib/subscription.ts says what it opens).
// Every caller passes a service-role client: the pages only explain the lock,
// these checks are the lock.
//
// A missing table — the migration has not been run yet — reads as "no
// subscription" rather than as a crash. The paid features then stay closed,
// which is the safe way round; nothing that was free before needs a table.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

/** The end of the seafarer's latest paid window, past or future; null when there has never been one. */
export async function subscriptionUntil(db: Db, seafarerId: string): Promise<Date | null> {
  const { data, error } = await db
    .from("seafarer_subscriptions")
    .select("paid_until")
    .eq("seafarer_id", seafarerId)
    .eq("status", "paid")
    .not("paid_until", "is", null)
    .order("paid_until", { ascending: false })
    .limit(1);
  if (error) {
    console.error("[subscription] lookup", error.message);
    return null;
  }
  const until = data?.[0]?.paid_until as string | undefined;
  return until ? new Date(until) : null;
}

export async function hasActiveSubscription(db: Db, seafarerId: string): Promise<boolean> {
  const until = await subscriptionUntil(db, seafarerId);
  return !!until && until.getTime() > Date.now();
}

/**
 * Bought the Word export before the subscription replaced it. That purchase
 * was sold as "yours for good", so it keeps opening the CV files — all of
 * them, since PDF and image were free when it was bought. It does not open
 * contacts: nobody paid for those.
 */
export async function hasLegacyWord(db: Db, seafarerId: string): Promise<boolean> {
  const { data, error } = await db
    .from("cv_word_purchases")
    .select("id")
    .eq("seafarer_id", seafarerId)
    .not("paid_at", "is", null)
    .limit(1);
  if (error) return false;
  return (data?.length ?? 0) > 0;
}

/** May download their CV as PDF, image or Word. An admin may too, to check what a buyer gets. */
export async function hasCvAccess(db: Db, seafarerId: string): Promise<boolean> {
  const [sub, word, { data: profile }] = await Promise.all([
    hasActiveSubscription(db, seafarerId),
    hasLegacyWord(db, seafarerId),
    db.from("profiles").select("is_admin").eq("id", seafarerId).maybeSingle(),
  ]);
  return sub || word || !!profile?.is_admin;
}
