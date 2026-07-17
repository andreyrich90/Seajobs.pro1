import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { collectTelegram } from "@/lib/collectTelegram";

export const runtime = "nodejs";
export const maxDuration = 300;

// Hourly Vercel cron: poll every active Telegram source and parse fresh posts
// into vacancy_drafts for admin review. Nothing goes live automatically — an
// admin approves each draft from /admin/import-queue, which is what creates the
// real vacancies row (and, on apply, forwards our CV + site link to the crewing
// email). See lib/collectTelegram.ts for the collection logic.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ ok: false, error: "missing_api_key" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  try {
    const result = await collectTelegram(admin);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
