import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseVacancies } from "@/lib/parseVacancy";

export const runtime = "nodejs";
export const maxDuration = 60;

const JPEG_TYPE = "image/jpeg";
const PNG_TYPE = "image/png";
const WEBP_TYPE = "image/webp";

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

    let body: { fileBase64?: string; mediaType?: string; text?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const { fileBase64, mediaType, text } = body;
    const hasText = typeof text === "string" && text.trim().length > 0;
    const hasImage = !!fileBase64 && (mediaType === JPEG_TYPE || mediaType === PNG_TYPE || mediaType === WEBP_TYPE);
    if (!hasText && !hasImage) {
      return NextResponse.json({ ok: false, error: "unsupported_input" }, { status: 400 });
    }

    let vacancies;
    try {
      vacancies = await parseVacancies(
        hasImage ? { imageBase64: fileBase64, mediaType } : { text }
      );
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
