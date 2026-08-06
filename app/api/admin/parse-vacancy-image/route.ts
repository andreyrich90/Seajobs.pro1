import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseVacancies, IMAGE_TYPES, type ParseImage } from "@/lib/parseVacancy";

export const runtime = "nodejs";
export const maxDuration = 60;

// Anthropic rejects a single image over 5 MB; the serverless request body is
// capped around 4.5 MB. Fail with a clear message instead of a generic 500.
const MAX_IMAGE_BYTES = 4_500_000;

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }

  try {
    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await admin
      .from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    let body: { fileBase64?: string; mediaType?: string; text?: string; images?: ParseImage[] };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const { fileBase64, mediaType, text } = body;
    const hasText = typeof text === "string" && text.trim().length > 0;

    // `images` = vertical slices of one tall screenshot (see lib/parseVacancy);
    // `fileBase64` is the older single-image shape, still accepted.
    const images: ParseImage[] = (
      Array.isArray(body.images) && body.images.length
        ? body.images
        : fileBase64 && mediaType
        ? [{ base64: fileBase64, mediaType }]
        : []
    ).filter((im) => im && typeof im.base64 === "string" && IMAGE_TYPES.includes(im.mediaType));

    if (!hasText && images.length === 0) {
      return NextResponse.json({ ok: false, error: "unsupported_input" }, { status: 400 });
    }

    const tooBig = images.find((im) => im.base64.length * 0.75 > MAX_IMAGE_BYTES);
    if (tooBig) {
      return NextResponse.json(
        { ok: false, error: "image_too_large", detail: "Screenshot is too large — save it as JPEG or crop it and try again." },
        { status: 413 }
      );
    }

    let vacancies;
    try {
      vacancies = await parseVacancies(images.length ? { images } : { text });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Vacancy parse failed:", msg);
      if (msg.startsWith("anthropic_")) {
        return NextResponse.json(
          { ok: false, error: "api_failed", detail: msg.slice(0, 300) },
          { status: 502 }
        );
      }
      return NextResponse.json(
        { ok: false, error: "request_failed", detail: msg },
        { status: 500 }
      );
    }

    if (!vacancies.length) {
      return NextResponse.json(
        { ok: false, error: "parse_failed", detail: "No vacancy could be read from the input." },
        { status: 422 }
      );
    }

    // `vacancy` kept for backward compatibility with older clients.
    return NextResponse.json({ ok: true, vacancies, vacancy: vacancies[0] });
  } catch (e) {
    console.error("[parse-vacancy-image]", e);
    return NextResponse.json(
      { ok: false, error: "request_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
