import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin, IMAGE_BUCKET } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// Upload a photo, auto-optimise it, and set it as the recipe's image in one
// call. Body: multipart/form-data with `file` and `slug`.
// The image is resized to max 1280px and re-encoded as WebP (~q80), so files
// stay ~150–250 KB — the 1 GB free Storage bucket then holds thousands of them.
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
      .rotate() // respect EXIF orientation
      .resize({ width: 1280, height: 1280, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "image-processing-failed" }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const path = `${slug}-${Date.now()}.webp`;

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
  const imageUrl = pub.publicUrl;

  const upd = await supabase.from("recipes").update({ image: imageUrl }).eq("slug", slug);
  if (upd.error) {
    return NextResponse.json({ error: upd.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: imageUrl, bytes: optimised.length });
}
