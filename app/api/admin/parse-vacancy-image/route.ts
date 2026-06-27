import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { RANK_GROUPS } from "@/lib/ranks";

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

// Schema mirrors the fields the admin Import Vacancy form (and
// api/admin/import-vacancy) accepts, so the parsed result can be dropped
// straight into the form for review before saving.
const SCHEMA_PROMPT = `You extract a maritime job vacancy posting from a screenshot.
Return ONLY valid JSON — no markdown fences, no preamble, no commentary.

Schema:
{
  "companyName": string|null,
  "companyLocation": string|null,
  "companyWebsite": string|null,
  "title": string|null,
  "rank": string|null,
  "vesselType": string|null,
  "salaryFrom": number|null,
  "salaryTo": number|null,
  "currency": string|null,
  "contractDuration": string|null,
  "joiningDate": "YYYY-MM-DD"|null,
  "description": string|null,
  "contactEmail": string|null
}

Rules:
- "rank" must be one of: ${RANK_GROUPS.flatMap((g) => g.ranks).join(", ")}. Pick the closest match, or null if none fits.
- "title" = a short job title, e.g. "Chief Officer — Oil Tanker".
- "salaryFrom"/"salaryTo" = plain numbers (monthly), no currency symbols. If only one figure is given, set both to it.
- "currency" = 3-letter ISO code (USD, EUR, GBP...).
- "joiningDate": if only month/year is given, use the first day of that month. Resolve relative dates ("ASAP", "immediately") to null.
- "description" = requirements/responsibilities/conditions text as written, concatenated into one block, in English if possible.
- Use null for anything not present in the image. Do not invent data.`;

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
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

    let body: { fileBase64?: string; mediaType?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
    }

    const { fileBase64, mediaType } = body;
    if (!fileBase64 || (mediaType !== JPEG_TYPE && mediaType !== PNG_TYPE && mediaType !== WEBP_TYPE)) {
      return NextResponse.json({ ok: false, error: "unsupported_file" }, { status: 400 });
    }

    const base64 = fileBase64.includes(",")
      ? fileBase64.slice(fileBase64.indexOf(",") + 1)
      : fileBase64;

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        system: SCHEMA_PROMPT,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: "Extract this vacancy posting into the JSON schema." },
          ],
        }],
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Anthropic error:", r.status, detail);
      let message = detail;
      try {
        message = JSON.parse(detail)?.error?.message ?? detail;
      } catch {
        /* keep raw text */
      }
      return NextResponse.json(
        { ok: false, error: "api_failed", status: r.status, detail: String(message).slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await r.json();
    const text: string = (data.content as AnthropicContentBlock[] | undefined ?? [])
      .map((i) => i.text ?? "")
      .join("");

    const cleaned = text.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    const jsonText = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;

    let vacancy: unknown;
    try {
      vacancy = JSON.parse(jsonText);
    } catch {
      console.error("Vacancy parse: model did not return valid JSON:", cleaned.slice(0, 300));
      return NextResponse.json(
        { ok: false, error: "parse_failed", detail: "The screenshot could not be read as structured data." },
        { status: 422 }
      );
    }
    return NextResponse.json({ ok: true, vacancy });
  } catch (e) {
    console.error("[parse-vacancy-image]", e);
    return NextResponse.json(
      { ok: false, error: "request_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
