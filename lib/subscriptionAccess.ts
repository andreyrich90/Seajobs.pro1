import type { SupabaseClient } from "@supabase/supabase-js";
import { SUB_SELLING } from "@/lib/subscription";

// Server-side answers to "may this seafarer do that", for the routes that are
// the subscription's real boundary (lib/subscription.ts says what it opens).
// Every caller passes a service-role client: the pages only explain the lock,
// these checks are the lock.
//
// A missing table — the migration has not been run yet — reads as "no
// subscription" rather than as a crash. The paid features then stay closed,
// which is the safe way round; nothing that was free before needs a table.
//
// And nothing is locked before a plan is on sale (`SUB_SELLING`): a lock with
// no way to buy the key would only take away what used to be free. Pasting
// the first checkout link into SUB_PLANS is what switches the locks on.

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

/** May see contacts and use the mailbox route: a subscription — or no plan on sale yet. */
export async function hasToolAccess(db: Db, seafarerId: string): Promise<boolean> {
  if (!SUB_SELLING) return true;
  return hasActiveSubscription(db, seafarerId);
}

/** May download their CV as PDF, image or Word. An admin may too, to check what a buyer gets. */
export async function hasCvAccess(db: Db, seafarerId: string): Promise<boolean> {
  if (!SUB_SELLING) return true;
  const [sub, word, { data: profile }] = await Promise.all([
    hasActiveSubscription(db, seafarerId),
    hasLegacyWord(db, seafarerId),
    db.from("profiles").select("is_admin").eq("id", seafarerId).maybeSingle(),
  ]);
  return sub || word || !!profile?.is_admin;
}
