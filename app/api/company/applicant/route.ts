import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Returns the FULL CV (incl. contact data: phone + email) of a seafarer, but
// only to a company that has actually received an application from them — or to
// an admin. Contact data is never exposed to anonymous visitors this way.

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: Request) {
  try {
    const admin = getAdmin();

    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
    if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const seafarerId = new URL(req.url).searchParams.get("seafarerId") ?? "";
    if (!UUID_RE.test(seafarerId)) {
      return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400 });
    }

    // Is the caller an admin?
    const { data: callerProfile } = await admin
      .from("profiles").select("is_admin").eq("id", caller.id).maybeSingle();
    const isAdmin = !!callerProfile?.is_admin;

    // Otherwise the caller must have an application from this seafarer to one of
    // their own vacancies.
    if (!isAdmin) {
      const { data: app } = await admin
        .from("applications")
        .select("id, vacancies!inner(company_id)")
        .eq("seafarer_id", seafarerId)
        .eq("vacancies.company_id", caller.id)
        .limit(1)
        .maybeSingle();
      if (!app) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
    }

    const [{ data: seafarer }, { data: experience }, { data: certificates }, authUser] = await Promise.all([
      admin.from("seafarers").select("*").eq("id", seafarerId).single(),
      admin.from("sea_experience").select("*").eq("seafarer_id", seafarerId).order("from_date", { ascending: false }),
      admin.from("certificates").select("*").eq("seafarer_id", seafarerId).order("expiry_date", { ascending: false }),
      admin.auth.admin.getUserById(seafarerId),
    ]);

    if (!seafarer) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({
      ok: true,
      seafarer,
      email: authUser.data.user?.email ?? null,
      experience: experience ?? [],
      certificates: certificates ?? [],
    });
  } catch (err) {
    console.error("[company/applicant]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
