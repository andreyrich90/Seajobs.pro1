import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { buildCvDocx } from "@/lib/cvDocx";
import { CV_WORD } from "@/lib/cvWord";

export const runtime = "nodejs";
export const maxDuration = 30;

// The paid Word export, and the gate in front of it.
//
//   GET  → the .docx, once this seafarer has paid
//   POST → start a purchase: writes a pending row and returns its id
//
// The check lives here and nowhere else. Hiding the button in the cabinet is
// presentation; this route is the boundary, and it re-derives who is asking
// from their bearer token rather than trusting anything in the request.

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

/**
 * Has this seafarer paid?
 *
 * One paid row is enough, for ever — see the migration for why the purchase
 * does not expire. A missing table (the migration has not been run yet) reads
 * as "not paid" rather than as a crash: the button then simply never unlocks,
 * which is the safe way round.
 */
async function hasPaid(db: NonNullable<ReturnType<typeof admin>>, seafarerId: string) {
  const { data, error } = await db
    .from("cv_word_purchases")
    .select("id")
    .eq("seafarer_id", seafarerId)
    .not("paid_at", "is", null)
    .limit(1);
  if (error) {
    console.error("[cv-word] purchase lookup", error.message);
    return false;
  }
  return (data?.length ?? 0) > 0;
}

export async function GET(req: Request) {
  const { db, user } = await caller(req);
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await hasPaid(db, user.id))) {
    return NextResponse.json({ error: "Not purchased" }, { status: 402 });
  }

  const { buffer, filename } = await buildCvDocx(db, user.id, user.email ?? null);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // RFC 5987 as well as the plain form: a seafarer's name is rarely ASCII,
      // and without filename* the browser saves "download".
      "Content-Disposition": `attachment; filename="cv.docx"; filename*=UTF-8''${encodeURIComponent(filename)}`,
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: Request) {
  const { db, user } = await caller(req);
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Already paid: nothing to buy, and no second row to confuse the webhook.
  if (await hasPaid(db, user.id)) return NextResponse.json({ ok: true, paid: true });

  const email = user.email?.trim().toLowerCase() ?? null;
  if (!email) return NextResponse.json({ error: "No e-mail on the account" }, { status: 400 });

  // One pending row per buyer. Without this, opening the checkout twice leaves
  // two rows and the webhook marks the newer one, so the older never clears.
  const { data: open } = await db
    .from("cv_word_purchases")
    .select("id")
    .eq("seafarer_id", user.id)
    .is("paid_at", null)
    .order("created_at", { ascending: false })
    .limit(1);
  if (open?.length) return NextResponse.json({ ok: true, id: open[0].id, paid: false });

  const { data, error } = await db
    .from("cv_word_purchases")
    .insert({ seafarer_id: user.id, email, price_usd: CV_WORD.usd, status: "pending" })
    .select("id")
    .single();
  if (error) {
    console.error("[cv-word] create", error.message);
    return NextResponse.json({ error: "Could not start the purchase" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id, paid: false });
}
