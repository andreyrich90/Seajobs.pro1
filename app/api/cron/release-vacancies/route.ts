import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { releaseDue } from "@/lib/publishQueue";

export const runtime = "nodejs";
export const maxDuration = 120;

// Vercel cron, every 10 minutes (vercel.json): release the vacancies the
// Telegram collector queued, two or three at a time, so the board and the
// channel fill gradually instead of in one burst every six hours. Does nothing
// at night in Kyiv. See lib/publishQueue.ts.
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
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  try {
    return NextResponse.json(await releaseDue(admin));
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
