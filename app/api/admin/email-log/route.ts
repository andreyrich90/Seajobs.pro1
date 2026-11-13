import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ALERT_DAILY_BUDGET } from "@/lib/jobAlerts";
import { emailList } from "@/lib/emailList";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Imported vacancies have been answered from the seafarer's own mailbox since
// #325 went live. Before that, an application to one was mailed by us and is
// already in email_log as `external_application`, so only later ones count.
const MAILBOX_SINCE = "2026-11-12T09:42:19Z";

// The pseudo-kind for those: not an e-mail we sent, but a press of "Send from
// my email" — the seafarer's mail app opened with the letter to the agency.
// We cannot know whether they then pressed Send.
const MAILBOX_KIND = "mailbox_application";

type LogRow = { id: string; to_email: string; kind: string; ok: boolean; error: string | null; created_at: string; from?: string | null };

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

    const wantMailbox = !failedOnly && (!kind || kind === MAILBOX_KIND);
    const wantLog = kind !== MAILBOX_KIND;

    let rows: LogRow[] = [];
    if (wantLog) {
      let query = admin
        .from("email_log")
        .select("id, to_email, kind, ok, error, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (failedOnly) query = query.eq("ok", false);
      if (kind) query = query.eq("kind", kind);

      const { data, error } = await query;
      if (error) {
        // Most likely the migration hasn't been run yet — say so plainly instead
        // of showing an empty page that looks like "no emails were sent".
        return NextResponse.json(
          { ok: false, error: error.message, hint: "Run supabase/migrations/20260805000000_email_log.sql in the Supabase SQL editor." },
          { status: 500 },
        );
      }
      rows = (data ?? []) as LogRow[];
    }

    if (wantMailbox) {
      const mailbox = await mailboxRows(admin, 200);
      rows = [...rows, ...mailbox]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 200);
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

    // Presses of "Send from my email" today, same UTC day.
    const dayStart = since.toISOString() > MAILBOX_SINCE ? since.toISOString() : MAILBOX_SINCE;
    const { count: mailboxToday } = await admin
      .from("applications")
      .select("id, vacancies!inner(is_imported)", { count: "exact", head: true })
      .eq("vacancies.is_imported", true)
      .gte("created_at", dayStart);

    return NextResponse.json({
      ok: true,
      rows,
      mailboxToday: mailboxToday ?? 0,
      today,
      alertBudget: { used: today["new_vacancy"]?.sent ?? 0, limit: ALERT_DAILY_BUDGET },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/** The latest applications sent from the seafarer's own mailbox, shaped as log rows. */
async function mailboxRows(admin: ReturnType<typeof getAdmin>, limit: number): Promise<LogRow[]> {
  const { data } = await admin
    .from("applications")
    .select("id, created_at, seafarer_id, vacancies!inner(is_imported, contact_email, title)")
    .eq("vacancies.is_imported", true)
    .gte("created_at", MAILBOX_SINCE)
    .order("created_at", { ascending: false })
    .limit(limit);
  type A = { id: string; created_at: string; seafarer_id: string; vacancies: { contact_email: string | null; title: string | null } | null };
  const apps = (data ?? []) as unknown as A[];
  if (!apps.length) return [];

  const ids = [...new Set(apps.map((a) => a.seafarer_id))];
  const { data: people } = await admin.from("seafarers").select("id, first_name, last_name").in("id", ids);
  const name = new Map(
    (people ?? []).map((p) => [p.id as string, [p.first_name, p.last_name].filter(Boolean).join(" ")]),
  );

  return apps.map((a) => ({
    id: `app-${a.id}`,
    to_email: emailList(a.vacancies?.contact_email).join(", ") || "—",
    kind: MAILBOX_KIND,
    ok: true,
    error: null,
    created_at: a.created_at,
    from: [name.get(a.seafarer_id), a.vacancies?.title].filter(Boolean).join(" · ") || null,
  }));
}
