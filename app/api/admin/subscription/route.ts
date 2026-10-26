import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUB_PLANS, isPlanId, windowFor } from "@/lib/subscription";
import { subscriptionUntil } from "@/lib/subscriptionAccess";

export const runtime = "nodejs";
export const maxDuration = 60;

// The one lever a person has over subscriptions, for the payments the webhook
// refuses to guess at (another mailbox and no checkout in the window, two
// buyers at once) and for refunds.
//
//   { action: "open",  id }            — mark an open checkout paid; its window
//                                        stacks on whatever the seafarer has.
//   { action: "close", id }            — take a paid one back (a refund).
//   { action: "grant", email, plan }   — a window for a seafarer who paid
//                                        without ever opening a checkout here.
//
// Rows written here keep `paid_ref = manual:<admin id>`, so a year from now
// the ledger still says whether money arrived or a decision did. The table has
// a select policy and nothing else, so this route — which checks the admin from
// the bearer token — is the only way a person can write to it.

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503 });
  const db = createClient(url, key, { auth: { persistSession: false } });

  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await db.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

  const body = (await req.json().catch(() => null)) as
    | { action?: string; id?: string; email?: string; plan?: string }
    | null;
  const manual = `manual:${user.id}`;

  if (body?.action === "open" || body?.action === "close") {
    const id = body.id ?? "";
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });
    const { data: row } = await db
      .from("seafarer_subscriptions").select("id, seafarer_id, months").eq("id", id).maybeSingle();
    if (!row) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

    if (body.action === "close") {
      const { error } = await db.from("seafarer_subscriptions")
        .update({ status: "refunded", paid_at: null, starts_at: null, paid_until: null, paid_ref: manual })
        .eq("id", id);
      if (error) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
      return NextResponse.json({ ok: true });
    }

    const w = windowFor(new Date(), await subscriptionUntil(db, row.seafarer_id), row.months);
    const { error } = await db.from("seafarer_subscriptions").update({
      status: "paid", paid_at: new Date().toISOString(),
      starts_at: w.starts.toISOString(), paid_until: w.until.toISOString(), paid_ref: manual,
    }).eq("id", id);
    if (error) return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
    return NextResponse.json({ ok: true, until: w.until.toISOString() });
  }

  if (body?.action === "grant") {
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email.includes("@")) return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
    if (!isPlanId(body.plan)) return NextResponse.json({ ok: false, error: "bad_plan" }, { status: 400 });

    // auth.users is the only place an address maps to an account; page it,
    // as /api/admin/user-emails does. A few thousand users is a few pages.
    let seafarerId: string | null = null;
    for (let page = 1; page <= 50 && !seafarerId; page++) {
      const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      seafarerId = data.users.find((u) => u.email?.toLowerCase() === email)?.id ?? null;
      if (data.users.length < 1000) break;
    }
    if (!seafarerId) return NextResponse.json({ ok: false, error: "no_account" }, { status: 404 });
    const { data: sf } = await db.from("seafarers").select("id").eq("id", seafarerId).maybeSingle();
    if (!sf) return NextResponse.json({ ok: false, error: "not_seafarer" }, { status: 400 });

    const { months, usd } = SUB_PLANS[body.plan];
    const w = windowFor(new Date(), await subscriptionUntil(db, seafarerId), months);
    const { error } = await db.from("seafarer_subscriptions").insert({
      seafarer_id: seafarerId, plan: body.plan, months, price_usd: usd, email,
      status: "paid", paid_at: new Date().toISOString(),
      starts_at: w.starts.toISOString(), paid_until: w.until.toISOString(), paid_ref: manual,
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, until: w.until.toISOString() });
  }

  return NextResponse.json({ ok: false, error: "bad_action" }, { status: 400 });
}
