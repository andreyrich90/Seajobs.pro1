import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";
import {
  NOTIF_PARTNER_APPROVED, NOTIF_PARTNER_INVITE, NOTIF_PARTNER_REJECTED,
  companyLang, partnerDecisionEmail, partnerInviteEmail,
} from "@/lib/partners";

export const runtime = "nodejs";
export const maxDuration = 120;

// The admin side of SeaJobs Partners (/admin/verifications).
//
//   GET                          — submissions (newest first) with the company,
//                                  and the invitation counts.
//   POST {action:"file", id, i}  — a ten-minute signed URL for one document;
//                                  the path comes from the row, never the query.
//   POST {action:"decide", id, decision:"approve"|"reject", note}
//                                — settles a submission, sets
//                                  companies.is_verified, and tells the company
//                                  in the bell and by e-mail.
//   POST {action:"invite", limit}— the invitation: a bell notification for
//                                  every company account not yet a partner or
//                                  waiting, and an e-mail to at most `limit` of
//                                  them, never past 80 e-mails sent today in
//                                  all (Resend's 100 a day are shared with the
//                                  CVs seafarers send). Run it again on another
//                                  day for the rest; nobody is mailed twice.

const DAILY_TOTAL_CEILING = 80;
const SIGNED_URL_TTL_SECONDS = 600;

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

async function adminCaller(req: Request): Promise<{ db: Db; userId: string } | NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503 });
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await db.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
  if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  return { db, userId: user.id };
}

async function emailOf(db: Db, id: string): Promise<string | null> {
  const { data } = await db.auth.admin.getUserById(id);
  return data?.user?.email ?? null;
}

/** Every company with an account: profiles with role "company". */
async function companyAccounts(db: Db) {
  const { data: profiles } = await db.from("profiles").select("id").eq("role", "company").eq("is_blocked", false);
  const ids = (profiles ?? []).map((p) => p.id as string);
  if (!ids.length) return [];
  const { data: cos } = await db.from("companies").select("id, name, location, is_verified").in("id", ids);
  return (cos ?? []) as { id: string; name: string | null; location: string | null; is_verified: boolean | null }[];
}

export async function GET(req: Request) {
  const who = await adminCaller(req);
  if (who instanceof NextResponse) return who;
  const { db } = who;

  const { data: rows, error } = await db
    .from("company_verifications")
    .select("id, company_id, status, country, registry_number, note, files, admin_note, submitted_at, reviewed_at")
    .order("submitted_at", { ascending: false })
    .limit(300);
  if (error) return NextResponse.json({ ok: false, error: error.message, unavailable: true });

  const companyIds = [...new Set((rows ?? []).map((r) => r.company_id as string))];
  const { data: cos } = companyIds.length
    ? await db.from("companies").select("id, name, logo_url, website, location, is_verified").in("id", companyIds)
    : { data: [] };
  const byId = new Map((cos ?? []).map((c) => [c.id as string, c]));
  const emails = new Map<string, string | null>();
  for (const id of companyIds) emails.set(id, await emailOf(db, id));

  const accounts = await companyAccounts(db);
  const { data: invited } = await db.from("notifications").select("user_id").eq("type", NOTIF_PARTNER_INVITE);
  const { count: mailed } = await db.from("email_log").select("id", { count: "exact", head: true }).eq("kind", "partner_invite").eq("ok", true);

  return NextResponse.json({
    ok: true,
    items: (rows ?? []).map((r) => ({
      ...r,
      files: ((r.files ?? []) as { name: string; type: string; size: number }[]).map((f) => ({ name: f.name, type: f.type, size: f.size })),
      company: byId.get(r.company_id) ?? null,
      email: emails.get(r.company_id) ?? null,
    })),
    stats: {
      accounts: accounts.length,
      verified: accounts.filter((a) => a.is_verified).length,
      pending: new Set((rows ?? []).filter((r) => r.status === "pending").map((r) => r.company_id)).size,
      invited: new Set((invited ?? []).map((n) => n.user_id)).size,
      mailed: mailed ?? 0,
    },
  });
}

export async function POST(req: Request) {
  const who = await adminCaller(req);
  if (who instanceof NextResponse) return who;
  const { db, userId } = who;
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const action = body?.action;

  if (action === "file") {
    const id = String(body?.id ?? "");
    const i = Number(body?.i ?? 0);
    const { data: row } = await db.from("company_verifications").select("files").eq("id", id).maybeSingle();
    const file = ((row?.files ?? []) as { path: string; name: string }[])[i];
    if (!file) return NextResponse.json({ ok: false, error: "no_file" }, { status: 404 });
    const { data, error } = await db.storage.from("company-docs").createSignedUrl(file.path, SIGNED_URL_TTL_SECONDS);
    if (error || !data?.signedUrl) return NextResponse.json({ ok: false, error: error?.message ?? "sign_failed" }, { status: 500 });
    return NextResponse.json({ ok: true, url: data.signedUrl });
  }

  if (action === "decide") {
    const id = String(body?.id ?? "");
    const approve = body?.decision === "approve";
    const note = typeof body?.note === "string" ? body.note.trim().slice(0, 1000) : "";
    if (!approve && !note) return NextResponse.json({ ok: false, error: "REASON_REQUIRED" }, { status: 400 });
    const { data: row } = await db.from("company_verifications").select("id, company_id").eq("id", id).maybeSingle();
    if (!row) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    const { error } = await db
      .from("company_verifications")
      .update({ status: approve ? "approved" : "rejected", admin_note: note || null, reviewed_at: new Date().toISOString(), reviewed_by: userId })
      .eq("id", id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    const { error: coError } = await db.from("companies").update({ is_verified: approve }).eq("id", row.company_id);
    if (coError) return NextResponse.json({ ok: false, error: coError.message }, { status: 500 });

    // Tell the company. Best-effort: the decision above is what counts.
    const { data: co } = await db.from("companies").select("location").eq("id", row.company_id).maybeSingle();
    const email = await emailOf(db, row.company_id);
    const lang = companyLang(email, co?.location);
    await db.from("notifications").delete().eq("user_id", row.company_id).eq("type", NOTIF_PARTNER_INVITE);
    await db.from("notifications").insert({
      user_id: row.company_id,
      type: approve ? NOTIF_PARTNER_APPROVED : NOTIF_PARTNER_REJECTED,
      title: approve ? "Your company is a SeaJobs Partner" : "Partner documents not accepted",
      body: approve
        ? "Your vacancies are now shown in the SeaJobs Partners block with the badge."
        : `Reason: ${note}`,
      link: "/company/verification",
    });
    let mailed = false;
    if (email) {
      const m = partnerDecisionEmail(lang, approve, note);
      const r = await sendEmail({ to: email, subject: m.subject, html: m.html, kind: "partner_decision", replyTo: "partners@seajobs.pro" });
      mailed = r.ok;
    }
    return NextResponse.json({ ok: true, mailed });
  }

  if (action === "invite") {
    const limit = Math.max(0, Math.min(Number(body?.limit ?? 25) || 0, 60));
    const accounts = await companyAccounts(db);
    const { data: subs } = await db.from("company_verifications").select("company_id, status");
    const busy = new Set((subs ?? []).filter((s) => s.status !== "rejected").map((s) => s.company_id as string));
    const targets = accounts.filter((a) => !a.is_verified && !busy.has(a.id));

    // The bell, for everyone not yet asked.
    const { data: asked } = await db.from("notifications").select("user_id").eq("type", NOTIF_PARTNER_INVITE);
    const askedSet = new Set((asked ?? []).map((n) => n.user_id as string));
    const toNotify = targets.filter((t) => !askedSet.has(t.id));
    if (toNotify.length) {
      const { error } = await db.from("notifications").insert(toNotify.map((t) => ({
        user_id: t.id,
        type: NOTIF_PARTNER_INVITE,
        title: "Become a SeaJobs Partner",
        body: "Confirm that you are a licensed crewing agency, and your vacancies will open the board with the badge.",
        link: "/company/verification",
      })));
      if (error) console.error("[partner-invite] notifications", error.message);
    }

    // The e-mail, within today's room and to nobody twice.
    const since = new Date(); since.setUTCHours(0, 0, 0, 0);
    const { count: sentToday } = await db.from("email_log").select("id", { count: "exact", head: true }).eq("ok", true).gte("created_at", since.toISOString());
    const room = Math.max(0, Math.min(limit, DAILY_TOTAL_CEILING - (sentToday ?? 0)));
    const { data: already } = await db.from("email_log").select("to_email").eq("kind", "partner_invite").eq("ok", true);
    const mailedSet = new Set((already ?? []).map((r) => String(r.to_email).toLowerCase()));

    let mailed = 0, failed = 0, left = 0;
    for (const t of targets) {
      const email = await emailOf(db, t.id);
      if (!email || mailedSet.has(email.toLowerCase())) continue;
      if (mailed >= room) { left++; continue; }
      const m = partnerInviteEmail(companyLang(email, t.location));
      const r = await sendEmail({ to: email, subject: m.subject, html: m.html, kind: "partner_invite", replyTo: "partners@seajobs.pro" });
      if (r.ok) { mailed++; mailedSet.add(email.toLowerCase()); }
      else { failed++; if (r.quota) break; }
    }
    return NextResponse.json({ ok: true, targets: targets.length, notified: toNotify.length, mailed, failed, left, room });
  }

  return NextResponse.json({ ok: false, error: "bad_action" }, { status: 400 });
}
