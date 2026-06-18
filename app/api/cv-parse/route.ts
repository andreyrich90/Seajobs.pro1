import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export const runtime = "nodejs";

const PDF_TYPE = "application/pdf";
const DOCX_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const DOC_TYPE = "application/msword";
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
  "seamans_book_expiry": "YYYY-MM-DD"|null,
  "passport_no": string|null,
  "passport_expiry": "YYYY-MM-DD"|null,
  "diploma": string|null,
  "diploma_expiry": "YYYY-MM-DD"|null,
  "service_record_book": string|null,
  "medical": string|null,
  "medical_expiry": "YYYY-MM-DD"|null,
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
- "us_visa"/"schengen_visa" = validity text if present (e.g. "Valid until 05/2028"); "seamans_book"/"passport_no" = the document number as written.
- "seamans_book" = seaman's book / seaman's passport number; "passport_no" = foreign/travel (biometric) passport number; "diploma" = Certificate of Competency / diploma number (e.g. "CoC II/2 No. 12345").
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
  if (!fileBase64 || (mediaType !== PDF_TYPE && mediaType !== DOCX_TYPE && mediaType !== DOC_TYPE)) {
    return NextResponse.json({ ok: false, error: "unsupported_file" }, { status: 400 });
  }

  // The client sends a data URL ("data:<type>;base64,XXXX") via
  // FileReader.readAsDataURL — strip the prefix; we want raw base64.
  const base64 = fileBase64.includes(",")
    ? fileBase64.slice(fileBase64.indexOf(",") + 1)
    : fileBase64;

  // PDFs go to Claude as a native document block. Word docs aren't supported
  // as document blocks, so we extract their text server-side (mammoth handles
  // .docx) and send it as a plain text block into the same schema prompt.
  let userContent: AnthropicContentBlock[] | { type: string; source?: unknown; text?: string }[];
  if (mediaType === PDF_TYPE) {
    userContent = [
      { type: "document", source: { type: "base64", media_type: PDF_TYPE, data: base64 } },
      { type: "text", text: "Parse this CV into the JSON schema." },
    ];
  } else {
    let extractedText = "";
    try {
      const buffer = Buffer.from(base64, "base64");
      const result = await mammoth.extractRawText({ buffer });
      extractedText = (result.value ?? "").trim();
    } catch (e) {
      console.error("Word extraction failed:", e);
      return NextResponse.json(
        { ok: false, error: "word_unreadable", detail: "Could not read this Word file. Try saving it as .docx or PDF." },
        { status: 422 }
      );
    }
    if (!extractedText) {
      return NextResponse.json(
        { ok: false, error: "word_empty", detail: "No text found in this Word file. Try saving it as .docx or PDF." },
        { status: 422 }
      );
    }
    userContent = [
      { type: "text", text: `Parse this CV into the JSON schema.\n\nCV TEXT:\n${extractedText}` },
    ];
  }

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
        messages: [{ role: "user", content: userContent }],
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
