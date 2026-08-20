import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { parseRecipesFromImages, type ParseImage } from "@/lib/recipeParse";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
// Anthropic rejects a single image over ~5 MB (base64). Keep a margin.
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

// Read one or more food photos and return complete, unique RU+EN recipe drafts.
// This route only PARSES — it does not write to the DB. The admin reviews the
// drafts, then saves them via /api/admin/recipe and attaches the photo via
// /api/admin/upload. Body: multipart/form-data with one or more `files`.
export async function POST(req: Request) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ai-not-configured", hint: "set ANTHROPIC_API_KEY to enable photo import" },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "bad-form" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) {
    return NextResponse.json({ error: "no-files" }, { status: 400 });
  }

  const images: ParseImage[] = [];
  for (const file of files) {
    if (!ACCEPTED.includes(file.type)) {
      return NextResponse.json(
        { error: "unsupported-type", detail: file.type || "unknown" },
        { status: 400 }
      );
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "image-too-large", detail: "each photo must be under 5 MB — save as JPEG or resize" },
        { status: 413 }
      );
    }
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
    images.push({ base64, mediaType: file.type });
  }

  try {
    const recipes = await parseRecipesFromImages(apiKey, images);
    return NextResponse.json({ ok: true, recipes });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[parse-recipe-image]", msg);
    const status = msg.startsWith("anthropic_") ? 502 : 422;
    return NextResponse.json({ ok: false, error: "parse-failed", detail: msg.slice(0, 300) }, { status });
  }
}
