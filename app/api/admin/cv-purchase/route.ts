import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Open or close the Word export by hand, for the payments the matcher refuses.
//
// `chooseWordMatch` deliberately gives up when two buyers are mid-purchase in
// the same window, and the provider does not always send an address to match
// on. That leaves a person who paid and got nothing, and this is how they are
// served — the one path where a human decides, rather than the webhook.
//
// Writing to cv_word_purchases needs the service role: the table has a select
// policy and nothing else, so no browser can mark itself paid. Which makes this
// route the thing that must check who is asking, and it does so from the bearer
// token rather than from anything in the body.

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

  const body = (await req.json().catch(() => null)) as { id?: string; paid?: boolean } | null;
  const id = body?.id ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });

  // `paid_ref` records who opened it and when. A purchase with no payment event
  // behind it should say so for ever: a year from now, "manual:<uuid>" is the
  // difference between a payment that arrived and a decision somebody made.
  const patch = body?.paid
    ? {
        status: "paid",
        paid_at: new Date().toISOString(),
        paid_ref: `manual:${user.id}`,
      }
    : { status: "pending", paid_at: null, paid_ref: null };

  const { error } = await db.from("cv_word_purchases").update(patch).eq("id", id);
  if (error) {
    console.error("[admin/cv-purchase]", error.message);
    return NextResponse.json({ ok: false, error: "update_failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true, paid: !!body?.paid });
}
