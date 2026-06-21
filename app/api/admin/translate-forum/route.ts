import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

const LANGS = ["en", "ru", "ua", "pl"] as const;
type Lang = (typeof LANGS)[number];
const LANG_NAME: Record<Lang, string> = { en: "English", ru: "Russian", ua: "Ukrainian", pl: "Polish" };

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const asText = (v: unknown) => (typeof v === "string" && v.trim() ? v : "");

// Normalize a title/content field to a { lang: text } object.
// Plain strings are assumed Russian (that's how UI-created topics are stored).
function normObj(field: unknown): Record<string, string> {
  if (typeof field === "string") return field.trim() ? { ru: field } : {};
  if (field && typeof field === "object") {
    const obj = { ...(field as Record<string, string>) };
    if (obj.uk && !obj.ua) obj.ua = obj.uk; // legacy "uk" → "ua"
    return obj;
  }
  return {};
}

async function translate(apiKey: string, lang: Lang, title: string, content: string) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 8000,
      system:
        `You translate forum posts for a maritime job board into ${LANG_NAME[lang]}. ` +
        `Preserve meaning, tone and any Markdown formatting/headings. ` +
        `Return ONLY valid JSON, no fences: {"title": string, "content": string}.`,
      messages: [{ role: "user", content: `TITLE:\n${title}\n\nBODY:\n${content}` }],
    }),
  });
  if (!r.ok) throw new Error(`Anthropic ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  const text: string = (data.content ?? []).map((b: { text?: string }) => b.text ?? "").join("");
  const cleaned = text.replace(/```json|```/g, "").trim();
  const s = cleaned.indexOf("{");
  const e = cleaned.lastIndexOf("}");
  const parsed = JSON.parse(s >= 0 && e > s ? cleaned.slice(s, e + 1) : cleaned);
  return { title: String(parsed.title ?? title), content: String(parsed.content ?? content) };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });

    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    const { data: topics } = await admin.from("forum_topics").select("id, title, content");

    // Find the first (topic, missing language) cell to fill, and total remaining.
    let remaining = 0;
    let target: { id: string; titleObj: Record<string, string>; contentObj: Record<string, string>; lang: Lang } | null = null;
    for (const tp of topics ?? []) {
      const titleObj = normObj(tp.title);
      const contentObj = normObj(tp.content);
      const missing = LANGS.filter((l) => !asText(titleObj[l]));
      remaining += missing.length;
      if (!target && missing.length) {
        target = { id: tp.id, titleObj, contentObj, lang: missing[0] };
      }
    }

    if (!target) return NextResponse.json({ ok: true, remaining: 0, done: true });

    const srcTitle = asText(target.titleObj.ru) || asText(target.titleObj.en) || Object.values(target.titleObj).find(asText) || "";
    const srcContent = asText(target.contentObj.ru) || asText(target.contentObj.en) || Object.values(target.contentObj).find(asText) || "";

    const { title, content } = await translate(apiKey, target.lang, srcTitle, srcContent);

    const newTitle = { ...target.titleObj, [target.lang]: title };
    const newContent = { ...target.contentObj, [target.lang]: content };
    const { error } = await admin.from("forum_topics").update({ title: newTitle, content: newContent }).eq("id", target.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, remaining: remaining - 1, translated: { id: target.id, lang: target.lang } });
  } catch (err) {
    console.error("[translate-forum]", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
