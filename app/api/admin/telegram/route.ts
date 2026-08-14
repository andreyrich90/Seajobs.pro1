import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

// Telegram adoption, and the one-off nudge that drives it.
//
// GET  — how many seafarers have linked, and how many are subscribed to a rank.
// POST — writes an in-app announcement asking the unlinked ones to connect.
//
// This has to be a server route: `seafarer_telegram` is readable only by its
// owner, so an admin counting it from the browser gets zero rows, not a count.

const ANNOUNCEMENT_TYPE = "telegram_invite";

// English on purpose, and stored as-is: NotificationBell falls through to the
// stored strings for a type it doesn't localise, so every seafarer sees this
// exact wording whatever locale they browse in.
const ANNOUNCEMENT = {
  title: "Connect Telegram to keep receiving job alerts",
  body:
    "Email delivery of job alerts is temporarily unavailable. To continue receiving vacancies that match your rank, please connect Telegram in your dashboard. Alerts are delivered instantly, at no cost, and you can follow several positions at once.",
  link: "/seafarer/dashboard",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = ReturnType<typeof createClient<any, any, any>>;

/**
 * Collects one column into a Set. PostgREST caps a response at 1000 rows, so
 * every sweep has to page — an unpaged read would quietly stop at the first
 * thousand and report a wrong number with nothing in the logs.
 */
async function allIds(
  db: Db,
  table: string,
  column: string,
  where?: { column: string; value: string },
): Promise<Set<string>> {
  const out = new Set<string>();
  for (let from = 0; ; from += 1000) {
    let q = db.from(table).select(column).range(from, from + 999);
    if (where) q = q.eq(where.column, where.value);
    const { data } = await q;
    const rows = (data ?? []) as unknown as Record<string, string>[];
    for (const r of rows) out.add(r[column]);
    if (rows.length < 1000) break;
  }
  return out;
}

const announcedIds = (db: Db) =>
  allIds(db, "notifications", "user_id", { column: "type", value: ANNOUNCEMENT_TYPE });

async function auth(req: Request): Promise<{ db: Db } | { error: NextResponse }> {
  // Establish who is asking before reporting anything about how the server is
  // configured — an anonymous caller has no business learning either.
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return { error: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }) };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { error: NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 }) };
  }
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) return { error: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }) };

  const { data: profile } = await db.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return { error: NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 }) };

  return { db };
}

export async function GET(req: Request) {
  const a = await auth(req);
  if ("error" in a) return a.error;
  const { db } = a;

  const [{ count: seafarers }, { count: linked }, { count: subscriptions }] = await Promise.all([
    db.from("seafarers").select("*", { count: "exact", head: true }),
    db.from("seafarer_telegram").select("*", { count: "exact", head: true }),
    db.from("job_alerts").select("*", { count: "exact", head: true }),
  ]);

  // job_alerts holds one row per rank now, so its count is subscriptions, not
  // people — the distinct set is what "how many are subscribed" actually means.
  const [subscribers, linkedIds, announced] = await Promise.all([
    allIds(db, "job_alerts", "seafarer_id"),
    allIds(db, "seafarer_telegram", "seafarer_id"),
    announcedIds(db),
  ]);

  // The number worth acting on: subscribed to something, but with no way to
  // hear about it now that alert email is paused.
  let subscribedButUnlinked = 0;
  for (const id of subscribers) if (!linkedIds.has(id)) subscribedButUnlinked++;

  return NextResponse.json({
    ok: true,
    seafarers: seafarers ?? 0,
    linked: linked ?? 0,
    subscriptions: subscriptions ?? 0,
    subscribers: subscribers.size,
    subscribedButUnlinked,
    announced: announced.size,
  });
}

export async function POST(req: Request) {
  const a = await auth(req);
  if ("error" in a) return a.error;
  const { db } = a;

  const linked = await allIds(db, "seafarer_telegram", "seafarer_id");

  // Already told once is enough. Re-running the broadcast must not stack a
  // second copy in anyone's bell.
  const announced = await announcedIds(db);

  const targets: string[] = [];
  for (let from = 0; ; from += 1000) {
    const { data } = await db.from("seafarers").select("id").range(from, from + 999);
    const rows = (data ?? []) as { id: string }[];
    // Someone who already connected does not need to be asked to connect.
    for (const r of rows) if (!linked.has(r.id) && !announced.has(r.id)) targets.push(r.id);
    if (rows.length < 1000) break;
  }

  let inserted = 0;
  for (let i = 0; i < targets.length; i += 500) {
    const batch = targets.slice(i, i + 500);
    const { error } = await db.from("notifications").insert(
      batch.map((id) => ({
        user_id: id,
        type: ANNOUNCEMENT_TYPE,
        title: ANNOUNCEMENT.title,
        body: ANNOUNCEMENT.body,
        link: ANNOUNCEMENT.link,
      })),
    );
    if (error) {
      console.error("[admin/telegram] announce batch failed:", error.message);
      return NextResponse.json({ ok: false, error: error.message, inserted }, { status: 500 });
    }
    inserted += batch.length;
  }

  return NextResponse.json({
    ok: true,
    inserted,
    skippedLinked: linked.size,
    skippedAlreadyAnnounced: announced.size,
  });
}
