import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { LANGS, type Lang, asText, normObj, translateText } from "@/lib/forumI18n";

export const runtime = "nodejs";
export const maxDuration = 300;

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
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

    // Lightweight pass: only fetch titles to locate the next missing cell.
    const { data: topics } = await admin.from("forum_topics").select("id, title");

    let remaining = 0;
    let target: { id: string; titleObj: Record<string, string>; lang: Lang } | null = null;
    for (const tp of topics ?? []) {
      const titleObj = normObj(tp.title);
      const missing = LANGS.filter((l) => !asText(titleObj[l]));
      remaining += missing.length;
      if (!target && missing.length) {
        target = { id: tp.id, titleObj, lang: missing[0] };
      }
    }

    if (!target) return NextResponse.json({ ok: true, remaining: 0, done: true });

    // Fetch the full content only for the one topic we're about to translate.
    const { data: full } = await admin
      .from("forum_topics").select("title, content").eq("id", target.id).single();
    const titleObj = normObj(full?.title);
    const contentObj = normObj(full?.content);

    const srcTitle = asText(titleObj.ru) || asText(titleObj.en) || Object.values(titleObj).find(asText) || "";
    const srcContent = asText(contentObj.ru) || asText(contentObj.en) || Object.values(contentObj).find(asText) || "";

    const { title, content } = await translateText(apiKey, target.lang, srcTitle, srcContent);

    const newTitle = { ...titleObj, [target.lang]: title };
    const newContent = { ...contentObj, [target.lang]: content };
    const { error } = await admin.from("forum_topics").update({ title: newTitle, content: newContent }).eq("id", target.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, remaining: remaining - 1, translated: { id: target.id, lang: target.lang } });
  } catch (err) {
    console.error("[translate-forum]", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
