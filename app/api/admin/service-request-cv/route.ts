import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// A signed URL for one attached CV, for the admin screen.
//
// The bucket is private and carries no storage policies at all, so neither the
// anon key nor a signed-in user can read it — a CV holds a passport number,
// visas and a date of birth. A link is minted here, per click, for ten minutes,
// after the caller has been verified as an admin. Nothing durable is handed out.

const SIGNED_URL_TTL_SECONDS = 600;

export async function GET(req: NextRequest) {
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

  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });
  }

  // The path comes from the row, never from the query: a caller must not be able
  // to name an arbitrary object in the bucket.
  const { data: row } = await db
    .from("service_requests")
    .select("cv_path, cv_name")
    .eq("id", id)
    .maybeSingle();
  if (!row?.cv_path) return NextResponse.json({ ok: false, error: "no_cv" }, { status: 404 });

  const { data, error } = await db.storage
    .from("service-cv")
    .createSignedUrl(row.cv_path, SIGNED_URL_TTL_SECONDS, { download: row.cv_name ?? true });
  if (error || !data?.signedUrl) {
    return NextResponse.json({ ok: false, error: error?.message ?? "sign_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, url: data.signedUrl });
}
