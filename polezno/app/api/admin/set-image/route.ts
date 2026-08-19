import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Set a recipe's image to an external URL (for photos already hosted elsewhere).
// Body: JSON { slug, imageUrl }. An empty imageUrl clears it back to the
// category placeholder cover.
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
  const raw = String(b.imageUrl || "").trim();
  if (!slug) return NextResponse.json({ error: "slug-required" }, { status: 400 });

  let image: string | null = null;
  if (raw) {
    try {
      const u = new URL(raw);
      if (u.protocol !== "https:") throw new Error("not-https");
      image = u.toString();
    } catch {
      return NextResponse.json({ error: "url-must-be-https" }, { status: 400 });
    }
  }

  const { error } = await getServerSupabase()
    .from("recipes")
    .update({ image })
    .eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, url: image });
}
