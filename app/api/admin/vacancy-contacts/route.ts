import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// The crewing e-mail of every vacancy that carries one, for /admin/companies.
//
// The browser can no longer read `vacancies.contact_email` — column privileges
// close it to anon and authenticated alike (lib/vacancyColumns.ts), and an
// admin's browser is just another authenticated session. So the admin screen
// asks here, and this route checks `is_admin` before reading with the service
// role.

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = ReturnType<typeof createClient<any, any, any>>;

const NO_STORE = { "Cache-Control": "no-store" };

async function auth(req: Request): Promise<{ db: Db } | { error: NextResponse }> {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return { error: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE }) };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { error: NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500, headers: NO_STORE }) };
  }
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user }, error } = await db.auth.getUser(token);
  if (error || !user) return { error: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE }) };

  const { data: profile } = await db.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return { error: NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403, headers: NO_STORE }) };

  return { db };
}

export async function GET(req: Request) {
  const a = await auth(req);
  if ("error" in a) return a.error;

  // Paged: PostgREST caps a response at 1000 rows.
  const emails: Record<string, string> = {};
  for (let from = 0; ; from += 1000) {
    const { data, error } = await a.db
      .from("vacancies")
      .select("id, contact_email")
      .not("contact_email", "is", null)
      .order("id")
      .range(from, from + 999);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500, headers: NO_STORE });
    const page = (data ?? []) as { id: string; contact_email: string | null }[];
    for (const r of page) if (r.contact_email?.trim()) emails[r.id] = r.contact_email.trim();
    if (page.length < 1000) break;
  }
  return NextResponse.json({ ok: true, emails }, { headers: NO_STORE });
}
