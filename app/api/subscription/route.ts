import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUB_PLANS, isPlanId } from "@/lib/subscription";
import { hasCvAccess, subscriptionUntil } from "@/lib/subscriptionAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The seafarer subscription, from the seafarer's side.
//
//   GET  → where the caller stands: active until when, and whether the CV files
//          are open (a subscription, or a Word export bought before it).
//   POST → start a checkout for one plan: writes a pending row and returns the
//          plan's checkout link. The payment webhook (api/billing/buymeacoffee)
//          is what marks it paid — nothing here can.
//
// The caller is re-derived from the bearer token, as everywhere.

const NO_STORE = { "Cache-Control": "no-store" };

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function caller(req: Request) {
  const db = admin();
  if (!db) return { db: null, user: null };
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return { db, user: null };
  const { data: { user } } = await db.auth.getUser(token);
  return { db, user };
}

export async function GET(req: Request) {
  const { db, user } = await caller(req);
  if (!db) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503, headers: NO_STORE });
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: NO_STORE });

  const [until, cvAccess] = await Promise.all([subscriptionUntil(db, user.id), hasCvAccess(db, user.id)]);
  const active = !!until && until.getTime() > Date.now();
  return NextResponse.json(
    {
      ok: true,
      active,
      activeUntil: until?.toISOString() ?? null,
      cvAccess,
      email: user.email ?? null,
    },
    { headers: NO_STORE },
  );
}

export async function POST(req: Request) {
  const { db, user } = await caller(req);
  if (!db) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503 });
  if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { plan?: string } | null;
  const plan = body?.plan;
  if (!isPlanId(plan)) return NextResponse.json({ ok: false, error: "bad_plan" }, { status: 400 });
  const { months, usd, payUrl } = SUB_PLANS[plan];
  if (!payUrl) return NextResponse.json({ ok: false, error: "NOT_ON_SALE" }, { status: 409 });

  // Seafarers only: the row hangs off seafarers.id, and a company has nothing
  // here to buy.
  const { data: sf } = await db.from("seafarers").select("id").eq("id", user.id).maybeSingle();
  if (!sf) return NextResponse.json({ ok: false, error: "NOT_SEAFARER" }, { status: 403 });

  const email = user.email?.trim().toLowerCase() ?? null;
  if (!email) return NextResponse.json({ ok: false, error: "No e-mail on the account" }, { status: 400 });

  // One open checkout per seafarer and plan. Reused rather than duplicated —
  // two pending rows and the webhook marks the newer, leaving the older to
  // look like an abandoned checkout for ever — but its time is moved to now,
  // because the time is what matches a payment made from another mailbox.
  const now = new Date().toISOString();
  const { data: open } = await db
    .from("seafarer_subscriptions")
    .select("id")
    .eq("seafarer_id", user.id)
    .eq("plan", plan)
    .is("paid_at", null)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(1);
  if (open?.length) {
    await db.from("seafarer_subscriptions").update({ created_at: now, email, price_usd: usd }).eq("id", open[0].id);
    return NextResponse.json({ ok: true, id: open[0].id, payUrl });
  }

  const { data, error } = await db
    .from("seafarer_subscriptions")
    .insert({ seafarer_id: user.id, plan, months, price_usd: usd, email, status: "pending" })
    .select("id")
    .single();
  if (error) {
    console.error("[subscription] create", error.message);
    return NextResponse.json({ ok: false, error: "Could not start the checkout" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id, payUrl });
}
