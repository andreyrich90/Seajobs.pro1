import { NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary diagnostics: reports whether Supabase env vars are present and
// whether a live query works — WITHOUT exposing any key value. Delete after.
export async function GET() {
  const env = {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    urlHost: (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^https?:\/\//, "").split(".")[0] || null,
    hasAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
    configured: isSupabaseConfigured(),
  };

  let query: any = { attempted: false };
  if (isSupabaseConfigured()) {
    query = { attempted: true };
    try {
      const { count, error } = await getServerSupabase()
        .from("recipes")
        .select("*", { count: "exact", head: true });
      query.ok = !error;
      query.count = count ?? null;
      query.error = error ? error.message : null;
    } catch (e: any) {
      query.ok = false;
      query.error = String(e?.message || e);
    }
  }

  const reading = query.ok && (query.count ?? 0) > 0 ? "supabase" : "seed-fallback";

  return NextResponse.json({ env, query, reading }, { status: 200 });
}
