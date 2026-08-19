import { NextResponse } from "next/server";
import { requireAdmin, IMAGE_BUCKET } from "@/lib/adminAuth";
import { getServerSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

// Upload a photo to Storage and set it as the recipe's image in one call.
// Body: multipart/form-data with `file` and `slug`.
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
  const ext = EXT[file.type];
  if (!ext) {
    return NextResponse.json({ error: "unsupported-type" }, { status: 400 });
  }
  if (file.size > 6 * 1024 * 1024) {
    return NextResponse.json({ error: "file-too-large" }, { status: 400 });
  }

  const supabase = getServerSupabase();
  const path = `${slug}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const up = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: true });
  if (up.error) {
    return NextResponse.json({ error: up.error.message, hint: "create a public bucket named 'recipe-images'" }, { status: 500 });
  }

  const { data: pub } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
  const imageUrl = pub.publicUrl;

  const upd = await supabase.from("recipes").update({ image: imageUrl }).eq("slug", slug);
  if (upd.error) {
    return NextResponse.json({ error: upd.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: imageUrl });
}
