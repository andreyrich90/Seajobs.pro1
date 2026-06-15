import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const SCHEMA_PROMPT = `Extract seafarer data from this CV. Return ONLY valid JSON, no markdown, no preamble. Schema:
{"firstName":"","lastName":"","rank":"","yearsExperience":0,
"vesselTypes":[],"certificates":[{"name":"","expiry":"YYYY-MM-DD or null"}],
"lastVessels":[{"name":"","type":"","rank":"","from":"YYYY-MM","to":"YYYY-MM"}],
"readinessDate":"YYYY-MM-DD or null","languages":[],"email":"","phone":""}
Rules: use null for unknown, [] for empty lists. Map ranks to standard maritime titles. Dates ISO format.`;

export async function POST(req: Request) {
  try {
    const admin = getAdmin();

    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
    if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { fileBase64, mediaType } = await req.json();
    if (!fileBase64 || mediaType !== "application/pdf") {
      return NextResponse.json({ ok: false, error: "pdf_base64_required" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        system: SCHEMA_PROMPT,
        messages: [
          {
            role: "user",
            content: [
              { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileBase64 } },
              { type: "text", text: "Parse this CV into the JSON schema." },
            ],
          },
        ],
      }),
    });

    if (!r.ok) {
      console.error("[cv-parse] Anthropic error:", await r.text());
      return NextResponse.json({ ok: false, error: "api_failed" }, { status: 502 });
    }

    const data = await r.json();
    const text = (data.content as { text?: string }[]).map((i) => i.text ?? "").join("");
    const profile = JSON.parse(text.replace(/```json|```/g, "").trim());

    return NextResponse.json({ ok: true, profile });
  } catch (err) {
    console.error("[cv-parse]", err);
    return NextResponse.json({ ok: false, error: "parse_failed" }, { status: 422 });
  }
}
