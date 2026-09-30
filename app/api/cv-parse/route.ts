import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { askClaude, extractJson } from "@/lib/cvParse";

export const runtime = "nodejs";

const PDF_TYPE = "application/pdf";
const DOCX_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const DOC_TYPE = "application/msword";
// Only takes effect on Vercel Pro; harmless elsewhere.
export const maxDuration = 60;

// Reads a seafarer's CV into the profile fields. The prompt, the token ceiling
// and the model call live in lib/cvParse.ts, where they can be exercised
// without the network; this file is the request around them.

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
  let userContent: unknown[];
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
    let answer = await askClaude(apiKey, userContent);

    // The failure this route was built wrong for: a long CV, too little room,
    // and JSON that stopped mid-array. It surfaced as "model did not return
    // valid JSON", which named the symptom and hid the cause. Now the cause is
    // recognised and answered by asking for less, rather than giving up.
    if (answer.ok && answer.truncated) {
      console.warn("CV parse: hit the token ceiling, retrying compact");
      answer = await askClaude(apiKey, userContent, { compact: true });
    }

    if (!answer.ok) {
      console.error("Anthropic error:", answer.status, answer.detail);
      // Surface the upstream status/message so failures are diagnosable
      // (e.g. 401 = bad/missing key, 400 = bad request, 429 = rate limit).
      return NextResponse.json(
        { ok: false, error: "api_failed", status: answer.status, detail: answer.detail.slice(0, 300) },
        { status: 502 }
      );
    }

    const jsonText = extractJson(answer.text);
    let profile: unknown;
    try {
      profile = JSON.parse(jsonText);
    } catch {
      // Say which of the two it was. A reply that ran out of room is a CV we
      // must handle better; a malformed reply at half the ceiling is something
      // else entirely, and the two used to look identical in the log.
      console.error(
        `CV parse: unparseable reply (stop_reason=${answer.stopReason}, chars=${answer.text.length}):`,
        jsonText.slice(0, 300)
      );
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
