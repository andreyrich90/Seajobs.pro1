import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

// Daily Vercel cron: deactivate vacancies whose joining date has passed, so
// they show as "Inactive" in the company cabinet (and stay hidden publicly).
export async function GET(req: Request) {
  // If CRON_SECRET is set, Vercel sends it as a Bearer token — verify it.
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

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await admin
    .from("vacancies")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("is_active", true)
    .lt("joining_date", today) // null joining_date never matches → "ASAP" stays active
    .select("id");

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, closed: data?.length ?? 0 });
}
