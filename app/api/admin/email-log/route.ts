import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Mirrors the alert budget in app/api/notify/route.ts.
const ALERT_DAILY_BUDGET = 50;

// Admin-only: recent email sends + today's counters for /admin/emails.
// `email_log` has RLS on with no policies, so it is readable only through the
// service-role client — never expose this to non-admins.
export async function GET(req: Request) {
  try {
    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    const { searchParams } = new URL(req.url);
    const failedOnly = searchParams.get("failed") === "1";
    const kind = searchParams.get("kind");

    let query = admin
      .from("email_log")
      .select("id, to_email, kind, ok, error, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (failedOnly) query = query.eq("ok", false);
    if (kind) query = query.eq("kind", kind);

    const { data: rows, error } = await query;
    if (error) {
      // Most likely the migration hasn't been run yet — say so plainly instead
      // of showing an empty page that looks like "no emails were sent".
      return NextResponse.json(
        { ok: false, error: error.message, hint: "Run supabase/migrations/20260805000000_email_log.sql in the Supabase SQL editor." },
        { status: 500 },
      );
    }

    // Today's totals per kind (UTC day, matching the budget window).
    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const { data: todayRows } = await admin
      .from("email_log")
      .select("kind, ok")
      .gte("created_at", since.toISOString())
      .limit(5000);

    const today: Record<string, { sent: number; failed: number }> = {};
    for (const r of todayRows ?? []) {
      const t = (today[r.kind] ??= { sent: 0, failed: 0 });
      if (r.ok) t.sent++;
      else t.failed++;
    }

    return NextResponse.json({
      ok: true,
      rows: rows ?? [],
      today,
      alertBudget: { used: today["new_vacancy"]?.sent ?? 0, limit: ALERT_DAILY_BUDGET },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
