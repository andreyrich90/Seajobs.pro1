import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { LANGS, asText, normObj, translateText } from "@/lib/forumI18n";

export const runtime = "nodejs";
export const maxDuration = 300;

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Translate one topic (the author's own, or any if admin) into all missing
// languages. Called right after a topic is created so it appears in every UI
// language. Best-effort: on failure the topic simply stays single-language.
export async function POST(req: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });

    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { topicId } = await req.json();
    if (!topicId) return NextResponse.json({ ok: false, error: "topicId required" }, { status: 400 });

    const { data: topic } = await admin
      .from("forum_topics").select("id, user_id, title, content").eq("id", topicId).single();
    if (!topic) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    // Only the author or an admin may translate.
    if (topic.user_id !== user.id) {
      const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
      if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const titleObj = normObj(topic.title);
    const contentObj = normObj(topic.content);
    const missing = LANGS.filter((l) => !asText(titleObj[l]));
    if (missing.length === 0) return NextResponse.json({ ok: true, translated: 0 });

    const srcTitle = asText(titleObj.ru) || asText(titleObj.en) || Object.values(titleObj).find(asText) || "";
    const srcContent = asText(contentObj.ru) || asText(contentObj.en) || Object.values(contentObj).find(asText) || "";

    const results = await Promise.all(
      missing.map(async (l) => ({ l, ...(await translateText(apiKey, l, srcTitle, srcContent)) })),
    );
    for (const r of results) {
      titleObj[r.l] = r.title;
      contentObj[r.l] = r.content;
    }

    const { error } = await admin
      .from("forum_topics").update({ title: titleObj, content: contentObj }).eq("id", topicId);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, translated: missing.length });
  } catch (err) {
    console.error("[translate-topic]", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
