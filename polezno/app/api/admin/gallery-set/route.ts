import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Overwrite a recipe's step-photo gallery — used to remove or reorder photos.
// Body: JSON { slug, gallery: string[] } (each an http(s) URL).
export async function POST(req: Request) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "supabase-not-configured" }, { status: 503 });
  }

  let b: any;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "bad-json" }, { status: 400 });
  }
  const slug = String(b.slug || "").trim();
  if (!slug) return NextResponse.json({ error: "slug-required" }, { status: 400 });

  const gallery = Array.isArray(b.gallery)
    ? b.gallery
        .map((u: any) => String(u).trim())
        .filter((u: string) => /^https?:\/\//.test(u))
    : [];

  const { error } = await getServerSupabase()
    .from("recipes")
    .update({ gallery })
    .eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, gallery });
}
