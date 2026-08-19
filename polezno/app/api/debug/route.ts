import { NextResponse } from "next/server";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Temporary diagnostics: reports whether Supabase env vars are present and
// whether a live query works — WITHOUT exposing any key value. Delete after.
export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let urlClean: string | null = null;
  try { urlClean = new URL(rawUrl).origin; } catch { urlClean = null; }
  const env = {
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    urlRaw: rawUrl,
    urlClean,
    urlHost: rawUrl.replace(/^https?:\/\//, "").split(".")[0] || null,
    hasAnon: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
    configured: isSupabaseConfigured(),
  };

  let query: any = { attempted: false };
  if (isSupabaseConfigured()) {
    query = { attempted: true };
    try {
      // Mirror what the app actually does: fetch rows, not just a count.
      const { data, error } = await getServerSupabase()
        .from("recipes")
        .select("slug, minutes")
        .order("created_at", { ascending: false })
        .limit(5);
      query.ok = !error;
      query.error = error ? error.message : null;
      query.returned = data?.length ?? 0;
      query.sample = (data ?? []).map((r: any) => `${r.slug} (${r.minutes}m)`);
    } catch (e: any) {
      query.ok = false;
      query.error = String(e?.message || e);
    }
  }

  const reading = query.ok && (query.returned ?? 0) > 0 ? "supabase" : "seed-fallback";

  return NextResponse.json({ env, query, reading }, { status: 200 });
}
