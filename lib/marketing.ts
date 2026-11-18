import { createHmac, timingSafeEqual } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { brevoConfigured, brevoUnlist, brevoUpsertContact } from "@/lib/brevo";
import { CONSENT_VERSION, MARKETING_KIND } from "@/lib/consent";
import { pageAll } from "@/lib/pageAll";

// Marketing e-mail: the seafarer's yes or no, and what follows from it.
//
// The yes/no is a `user_consents` row of kind 'marketing' (the latest wins),
// so it sits in the same journal as the other consents, with time, IP and
// language. A yes puts the address on the Brevo list and opens a
// `marketing_digest` row for the weekly digest; a no — from the cabinet, the
// unsubscribe link or Brevo's own unsubscribe — takes it off both.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

export type MarketingMeta = { source: string; locale?: string | null; ip?: string | null; userAgent?: string | null };

/** The latest marketing answer: true, false, or null when never asked. */
export async function marketingState(db: Db, userId: string): Promise<boolean | null> {
  const { data } = await db
    .from("user_consents")
    .select("granted")
    .eq("user_id", userId)
    .eq("kind", MARKETING_KIND)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? !!data.granted : null;
}

async function emailOf(db: Db, userId: string): Promise<string | null> {
  const { data } = await db.auth.admin.getUserById(userId);
  return data?.user?.email ?? null;
}

/**
 * Records the answer and syncs Brevo. The journal row is the part that must
 * not fail; the list and the digest row are best-effort and logged.
 */
export async function setMarketing(db: Db, userId: string, granted: boolean, meta: MarketingMeta): Promise<boolean> {
  const { error } = await db.from("user_consents").insert({
    user_id: userId,
    kind: MARKETING_KIND,
    version: CONSENT_VERSION,
    granted,
    source: meta.source,
    locale: meta.locale ?? null,
    ip: meta.ip ?? null,
    user_agent: meta.userAgent ?? null,
  });
  if (error) {
    console.error("[marketing] journal", error.message);
    return false;
  }

  try {
    if (granted) {
      const email = await emailOf(db, userId);
      if (!email) return true;
      const { data: sf } = await db.from("seafarers").select("first_name, last_name, rank").eq("id", userId).maybeSingle();
      let synced: string | null = null;
      if (brevoConfigured()) {
        const r = await brevoUpsertContact({
          email, firstName: sf?.first_name, lastName: sf?.last_name, rank: sf?.rank, lang: meta.locale ?? "en",
        });
        if (r.ok) synced = new Date().toISOString();
        else console.error("[marketing] brevo upsert", r.status, JSON.stringify(r.body).slice(0, 300));
      }
      const { error: e2 } = await db.from("marketing_digest").upsert(
        { user_id: userId, email, lang: meta.locale ?? "en", ...(synced ? { synced_at: synced } : {}) },
        { onConflict: "user_id" },
      );
      if (e2) console.error("[marketing] digest row", e2.message);
    } else {
      const { data: row } = await db.from("marketing_digest").select("email").eq("user_id", userId).maybeSingle();
      const email = row?.email ?? (await emailOf(db, userId));
      if (email && brevoConfigured()) {
        const r = await brevoUnlist(email);
        if (!r.ok) console.error("[marketing] brevo unlist", r.status, JSON.stringify(r.body).slice(0, 300));
      }
      await db.from("marketing_digest").delete().eq("user_id", userId);
    }
  } catch (e) {
    console.error("[marketing] sync", e);
  }
  return true;
}

// ---- The unsubscribe link -------------------------------------------------
//
// One per seafarer, signed so a stranger cannot unsubscribe someone else by
// guessing an id. It never expires: an unsubscribe link in an old e-mail must
// still work. MARKETING_SECRET, or CRON_SECRET when that is not set.

function secret(): string {
  return process.env.MARKETING_SECRET || process.env.CRON_SECRET || "";
}

export function unsubscribeToken(userId: string): string {
  return createHmac("sha256", secret()).update(`unsub:${userId}`).digest("base64url").slice(0, 32);
}

export function verifyUnsubscribe(userId: string, token: string): boolean {
  if (!secret() || !userId || !token) return false;
  const a = Buffer.from(unsubscribeToken(userId));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unsubscribeUrl(userId: string, lang: string): string {
  return `https://seajobs.pro/api/marketing/unsubscribe?u=${userId}&t=${unsubscribeToken(userId)}&l=${lang}`;
}

/**
 * Everyone whose latest marketing answer is yes, with the language of that
 * answer. Paged: the journal grows with every confirmation.
 */
export async function optedIn(db: Db): Promise<Map<string, string>> {
  const rows = await pageAll<{ user_id: string; granted: boolean; locale: string | null }>((from, to) =>
    db
      .from("user_consents")
      .select("user_id, granted, locale")
      .eq("kind", MARKETING_KIND)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(from, to),
  );
  const seen = new Set<string>();
  const out = new Map<string, string>();
  for (const r of rows) {
    if (seen.has(r.user_id)) continue;
    seen.add(r.user_id);
    if (r.granted) out.set(r.user_id, r.locale || "en");
  }
  return out;
}
