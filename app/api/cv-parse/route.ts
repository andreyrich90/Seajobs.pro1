import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// Only takes effect on Vercel Pro; harmless elsewhere.
export const maxDuration = 60;

// The schema is aligned 1:1 with the Supabase columns the client writes to
// (seafarers / certificates / sea_experience), so the parsed result maps
// straight into the profile with no translation step.
const SCHEMA_PROMPT = `You extract structured data from a seafarer's CV/resume.
Return ONLY valid JSON — no markdown fences, no preamble, no commentary.

Schema:
{
  "first_name": string|null,
  "last_name": string|null,
  "rank": string|null,
  "nationality": string|null,
  "phone": string|null,
  "date_of_birth": "YYYY-MM-DD"|null,
  "readiness_date": "YYYY-MM-DD"|null,
  "about": string|null,
  "seamans_book": string|null,
  "passport_no": string|null,
  "passport_expiry": "YYYY-MM-DD"|null,
  "us_visa": string|null,
  "schengen_visa": string|null,
  "education": string|null,
  "languages": string|null,
  "competencies": string|null,
  "certificates": [
    { "name": string, "number": string|null, "issue_date": "YYYY-MM-DD"|null, "expiry_date": "YYYY-MM-DD"|null, "issuing_authority": string|null }
  ],
  "experience": [
    { "vessel_name": string, "vessel_type": string|null, "rank": string|null, "company": string|null, "flag": string|null, "dwt": string|null, "engine": string|null, "from_date": "YYYY-MM-DD"|null, "to_date": "YYYY-MM-DD"|null }
  ]
}

Rules:
- Use null for unknown scalar fields and [] for empty lists.
- Map ranks to standard maritime titles (e.g. "Master", "Chief Officer", "2nd Officer", "Chief Engineer", "2nd Engineer", "Able Seaman", "Ordinary Seaman").
- All dates ISO "YYYY-MM-DD". If only month/year is known, use the first day of that month.
- "about" = a concise 1–2 sentence professional summary in English.
- "us_visa"/"schengen_visa" = validity text if present (e.g. "Valid until 05/2028"); "seamans_book"/"passport_no" = the document number/validity as written.
- "education" = institution, field and graduation year on one line.
- "languages" = e.g. "English: Fluent, Russian: Native".
- "competencies" = key skills, one per line.
- "dwt" = deadweight/GRT as written (e.g. "58,500 DWT"); "engine" = engine make / power (e.g. "MAN-B&W / 12,800").`;

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }

  let body: { fileBase64?: string; mediaType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const { fileBase64, mediaType } = body;
  if (!fileBase64 || mediaType !== "application/pdf") {
    return NextResponse.json({ ok: false, error: "pdf_base64_required" }, { status: 400 });
  }

  // The client sends a data URL ("data:application/pdf;base64,XXXX") via
  // FileReader.readAsDataURL — strip the prefix; Anthropic wants raw base64.
  const base64 = fileBase64.includes(",")
    ? fileBase64.slice(fileBase64.indexOf(",") + 1)
    : fileBase64;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: SCHEMA_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: { type: "base64", media_type: "application/pdf", data: base64 },
              },
              { type: "text", text: "Parse this CV into the JSON schema." },
            ],
          },
        ],
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Anthropic error:", r.status, detail);
      // Surface the upstream status/message so failures are diagnosable
      // (e.g. 401 = bad/missing key, 400 = bad request, 429 = rate limit).
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

    // Be tolerant of stray prose/fences: parse the outermost JSON object.
    const cleaned = text.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    const jsonText = start >= 0 && end > start ? cleaned.slice(start, end + 1) : cleaned;

    let profile: unknown;
    try {
      profile = JSON.parse(jsonText);
    } catch {
      console.error("CV parse: model did not return valid JSON:", cleaned.slice(0, 300));
      return NextResponse.json(
        { ok: false, error: "parse_failed", detail: "The CV could not be read as structured data." },
        { status: 422 }
      );
    }
    return NextResponse.json({ ok: true, profile });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "request_failed", detail: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
