import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sweepChannel } from "@/lib/telegramFeed";

export const runtime = "nodejs";
export const maxDuration = 60;

// Hourly Vercel cron: mirror to the Telegram channel any vacancy that went live
// but is not in the channel yet.
//
// Publishing already posts to the channel directly, so on a healthy day this
// finds nothing. It exists for the days that aren't healthy — Telegram down,
// a rate limit, a deploy mid-import — where the alternative is a vacancy that
// silently never reaches the channel.
//
// Query overrides (both bounded by the 60s function budget):
//   ?days=3650&limit=15   seed the channel from the existing board, a run at a
//                         time. Without it the sweep only looks two days back,
//                         so switching the feature on doesn't dump the whole
//                         archive into a fresh channel at once.

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    const query = new URL(req.url).searchParams.get("secret");
    if (auth !== `Bearer ${secret}` && query !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const params = new URL(req.url).searchParams;
  const num = (name: string, fallback: number, max: number) => {
    const n = parseInt(params.get(name) ?? "", 10);
    return Number.isFinite(n) && n > 0 ? Math.min(n, max) : fallback;
  };

  // 15 posts × 3.5s pacing ≈ 52s, inside maxDuration with room to spare.
  const result = await sweepChannel(admin, { limit: num("limit", 15, 15), days: num("days", 2, 3650) });
  return NextResponse.json({ ok: true, ...result });
}
