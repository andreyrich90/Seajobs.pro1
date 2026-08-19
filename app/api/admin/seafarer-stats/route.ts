import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { normalizeNationality, countryOf } from "@/lib/nationality";

export const runtime = "nodejs";
export const maxDuration = 60;

// How many seafarers we have, by country — and which ranks they hold.
//
// A server route for the same two reasons as the import stats: PostgREST has no
// GROUP BY, so the aggregation happens in code, and doing it in the browser
// would mean shipping every seafarer row to the client to count it.
//
// `nationality` is free text (see lib/nationality.ts), so every value goes
// through the normaliser first. Values it cannot place are returned verbatim in
// `unrecognised` rather than folded into an "Other" bucket — a spelling nobody
// anticipated should look like something to fix, not like a country.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = ReturnType<typeof createClient<any, any, any>>;

async function auth(req: Request): Promise<{ db: Db } | { error: NextResponse }> {
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

type Row = { nationality: string | null; rank: string | null };

export async function GET(req: Request) {
  const a = await auth(req);
  if ("error" in a) return a.error;
  const { db } = a;

  try {
    // Paged: PostgREST caps a response at 1000 rows, and an unpaged read would
    // stop at the first thousand and report a total that looks right.
    const rows: Row[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await db
        .from("seafarers")
        .select("nationality, rank")
        .range(from, from + 999);
      if (error) throw new Error(error.message);
      const page = (data ?? []) as unknown as Row[];
      rows.push(...page);
      if (page.length < 1000) break;
    }

    const byCode = new Map<string, { total: number; ranks: Map<string, number> }>();
    const unrecognised = new Map<string, number>();
    let noNationality = 0;

    for (const r of rows) {
      const raw = (r.nationality ?? "").trim();
      if (!raw) { noNationality++; continue; }

      const code = normalizeNationality(raw);
      if (!code) {
        unrecognised.set(raw, (unrecognised.get(raw) ?? 0) + 1);
        continue;
      }
      let entry = byCode.get(code);
      if (!entry) { entry = { total: 0, ranks: new Map() }; byCode.set(code, entry); }
      entry.total++;
      const rank = (r.rank ?? "").trim();
      if (rank) entry.ranks.set(rank, (entry.ranks.get(rank) ?? 0) + 1);
    }

    const countries = [...byCode.entries()]
      .map(([code, e]) => {
        const c = countryOf(code);
        return {
          code, name: c.name, flag: c.flag,
          total: e.total,
          // The three commonest ranks answer "which seafarers", not just how many.
          topRanks: [...e.ranks.entries()]
            .sort((x, y) => y[1] - x[1])
            .slice(0, 3)
            .map(([rank, n]) => ({ rank, n })),
          withoutRank: e.total - [...e.ranks.values()].reduce((s, n) => s + n, 0),
        };
      })
      .sort((x, y) => y.total - x.total);

    return NextResponse.json({
      ok: true,
      totals: {
        seafarers: rows.length,
        placed: rows.length - noNationality - [...unrecognised.values()].reduce((s, n) => s + n, 0),
        noNationality,
        unrecognisedCount: [...unrecognised.values()].reduce((s, n) => s + n, 0),
        countries: countries.length,
      },
      countries,
      // Sorted by how often each unplaceable spelling occurs, so the one worth
      // adding to lib/nationality.ts is at the top.
      unrecognised: [...unrecognised.entries()]
        .sort((x, y) => y[1] - x[1])
        .slice(0, 40)
        .map(([value, n]) => ({ value, n })),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "failed" },
      { status: 500 },
    );
  }
}
