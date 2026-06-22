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

// English is the source the admin always fills in for news.
const src = (obj: Record<string, string>) =>
  asText(obj.en) || asText(obj.ru) || Object.values(obj).find(asText) || "";

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

    const body = await req.json().catch(() => ({}));
    const articleId: string | undefined = body?.articleId;

    // ── Per-article mode: fill all missing languages for one article (used on create) ──
    if (articleId) {
      const { data: a } = await admin
        .from("news_articles").select("title, body").eq("id", articleId).single();
      if (!a) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

      const titleObj = normObj(a.title);
      const bodyObj = normObj(a.body);
      const missing = LANGS.filter((l) => !asText(titleObj[l]));
      if (missing.length === 0) return NextResponse.json({ ok: true, translated: 0 });

      const srcTitle = src(titleObj);
      const srcBody = src(bodyObj);
      const results = await Promise.all(
        missing.map(async (l) => ({ l, ...(await translateText(apiKey, l, srcTitle, srcBody)) })),
      );
      for (const r of results) {
        titleObj[r.l] = r.title;
        bodyObj[r.l] = r.content;
      }
      const { error } = await admin
        .from("news_articles").update({ title: titleObj, body: bodyObj }).eq("id", articleId);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      return NextResponse.json({ ok: true, translated: missing.length });
    }

    // ── Backfill mode: translate one (article, language) per call, report remaining ──
    const { data: articles } = await admin.from("news_articles").select("id, title");
    let remaining = 0;
    let target: { id: string; lang: Lang } | null = null;
    for (const art of articles ?? []) {
      const titleObj = normObj(art.title);
      const missing = LANGS.filter((l) => !asText(titleObj[l]));
      remaining += missing.length;
      if (!target && missing.length) target = { id: art.id, lang: missing[0] };
    }
    if (!target) return NextResponse.json({ ok: true, remaining: 0, done: true });

    const { data: full } = await admin
      .from("news_articles").select("title, body").eq("id", target.id).single();
    const titleObj = normObj(full?.title);
    const bodyObj = normObj(full?.body);
    const { title, content } = await translateText(apiKey, target.lang, src(titleObj), src(bodyObj));
    const newTitle = { ...titleObj, [target.lang]: title };
    const newBody = { ...bodyObj, [target.lang]: content };
    const { error } = await admin
      .from("news_articles").update({ title: newTitle, body: newBody }).eq("id", target.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, remaining: remaining - 1 });
  } catch (err) {
    console.error("[translate-news]", err);
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Server error" }, { status: 500 });
  }
}
