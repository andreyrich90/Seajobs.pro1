import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

// Per-channel yield for the auto-collector: how many posts each Telegram source
// produced, how many became vacancies, and how many of those are still live.
//
// A server route rather than a browser query for two reasons. PostgREST has no
// GROUP BY, so the aggregation has to happen in code; and doing it in the
// browser would mean shipping every draft row to the client to count them.
//
// The numbers this answers: which channels are worth keeping. A source with 200
// posts and 15% published is costing moderation time and Claude calls to filter
// out spam; one with 60 posts and 80% published is the one to find more of.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = ReturnType<typeof createClient<any, any, any>>;

async function auth(req: Request): Promise<{ db: Db } | { error: NextResponse }> {
  // Identify the caller before touching config, so an anonymous request learns
  // nothing about how the server is set up.
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

/**
 * Read every row of a table, a page at a time. PostgREST caps a response at
 * 1000 rows, so an unpaged read would silently stop at the first thousand and
 * report numbers that look plausible and are wrong.
 */
async function allRows<T>(db: Db, table: string, columns: string, filter?: (q: any) => any): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    let q = db.from(table).select(columns).range(from, from + 999);
    if (filter) q = filter(q);
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    const rows = (data ?? []) as unknown as T[];
    out.push(...rows);
    if (rows.length < 1000) break;
  }
  return out;
}

type SourceRow = {
  id: string; handle: string; label: string | null; is_active: boolean;
  auto_publish: boolean; last_checked_at: string | null; last_error: string | null;
};
type DraftRow = { source_id: string | null; status: string; vacancy_id: string | null; created_at: string };

export async function GET(req: Request) {
  const a = await auth(req);
  if ("error" in a) return a.error;
  const { db } = a;

  try {
    const [sources, drafts, liveIds] = await Promise.all([
      allRows<SourceRow>(db, "import_sources",
        "id, handle, label, is_active, auto_publish, last_checked_at, last_error",
        (q) => q.eq("kind", "telegram")),
      allRows<DraftRow>(db, "vacancy_drafts", "source_id, status, vacancy_id, created_at"),
      // Only the active ones, so "live now" separates a channel that produced
      // vacancies from one whose vacancies have all expired.
      allRows<{ id: string }>(db, "vacancies", "id", (q) => q.eq("is_active", true))
        .then((rows) => new Set(rows.map((r) => r.id))),
    ]);

    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;

    const rows = sources.map((s) => {
      const mine = drafts.filter((d) => d.source_id === s.id);
      const recent = mine.filter((d) => new Date(d.created_at).getTime() >= cutoff);
      const published = mine.filter((d) => d.vacancy_id);
      const lastPostAt = mine.reduce<string | null>(
        (max, d) => (!max || d.created_at > max ? d.created_at : max), null);

      return {
        id: s.id,
        handle: s.handle,
        label: s.label,
        isActive: s.is_active,
        autoPublish: s.auto_publish,
        lastCheckedAt: s.last_checked_at,
        lastError: s.last_error,
        posts: mine.length,
        published: published.length,
        // Counted against the current vacancies table, so a published draft
        // whose vacancy was later deleted does not inflate this.
        live: published.filter((d) => liveIds.has(d.vacancy_id as string)).length,
        rejected: mine.filter((d) => d.status === "rejected").length,
        pending: mine.filter((d) => d.status === "pending").length,
        posts30d: recent.length,
        published30d: recent.filter((d) => d.vacancy_id).length,
        lastPostAt,
      };
    });

    // Best first, by what actually reached the board.
    rows.sort((x, y) => y.published - x.published || y.posts - x.posts);

    // Drafts whose source row was deleted still count towards the totals, which
    // is why these are summed from the drafts table and not from `rows`.
    return NextResponse.json({
      ok: true,
      sources: rows,
      totals: {
        posts: drafts.length,
        published: drafts.filter((d) => d.vacancy_id).length,
        pending: drafts.filter((d) => d.status === "pending").length,
        orphaned: drafts.filter((d) => !d.source_id).length,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 },
    );
  }
}
