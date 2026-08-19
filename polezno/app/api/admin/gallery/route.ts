import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin, IMAGE_BUCKET } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// Append one step photo to a recipe's gallery (in step order). Optimises to
// WebP ≤1280px like the cover upload. Body: multipart with `file` and `slug`.
export async function POST(req: Request) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "supabase-not-configured" }, { status: 503 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const slug = String(form.get("slug") || "").trim();
  if (!(file instanceof Blob) || !slug) {
    return NextResponse.json({ error: "file-and-slug-required" }, { status: 400 });
  }
  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json({ error: "unsupported-type" }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: "file-too-large (max 15 MB)" }, { status: 400 });
  }

  const input = Buffer.from(await file.arrayBuffer());
  let optimised: Buffer;
  try {
    optimised = await sharp(input)
      .rotate()
      .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "image-processing-failed" }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const path = `${slug}-step-${Date.now()}.webp`;
  const up = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, optimised, { contentType: "image/webp", upsert: true });
  if (up.error) {
    return NextResponse.json(
      { error: up.error.message, hint: "create a public bucket named 'recipe-images'" },
      { status: 500 }
    );
  }
  const { data: pub } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  const url = pub.publicUrl;

  // Append to the existing gallery array.
  const cur = await supabase.from("recipes").select("gallery").eq("slug", slug).single();
  if (cur.error) return NextResponse.json({ error: cur.error.message }, { status: 500 });
  const gallery: string[] = Array.isArray(cur.data?.gallery) ? cur.data.gallery : [];
  gallery.push(url);

  const upd = await supabase.from("recipes").update({ gallery }).eq("slug", slug);
  if (upd.error) return NextResponse.json({ error: upd.error.message }, { status: 500 });

  return NextResponse.json({ ok: true, gallery });
}
