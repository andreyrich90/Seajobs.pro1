import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const admin = getAdmin();

    // Verify caller is admin
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await admin
      .from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const {
      companyName, companyLocation, companyWebsite,
      title, rank, vesselType, salaryFrom, salaryTo, currency,
      contractDuration, joiningDate, description, sourceUrl,
    } = body;

    if (!title?.trim() || !companyName?.trim()) {
      return NextResponse.json({ ok: false, error: "Title and company name are required" }, { status: 400 });
    }

    // Find or create company by name (case-insensitive)
    let companyId: string;
    const { data: existing } = await admin
      .from("companies")
      .select("id")
      .ilike("name", companyName.trim())
      .maybeSingle();

    if (existing) {
      companyId = existing.id;
    } else {
      const newId = crypto.randomUUID();
      await admin.from("companies").insert({
        id: newId,
        name: companyName.trim(),
        location: companyLocation?.trim() || null,
        website: companyWebsite?.trim() || null,
      });
      companyId = newId;
    }

    // Insert vacancy
    const { data: vacancy, error: vacErr } = await admin.from("vacancies").insert({
      company_id: companyId,
      title: title.trim(),
      rank: rank || null,
      vessel_type: vesselType || null,
      salary_from: salaryFrom ? Number(salaryFrom) : null,
      salary_to: salaryTo ? Number(salaryTo) : null,
      currency: currency || "USD",
      contract_duration: contractDuration?.trim() || null,
      joining_date: joiningDate || null,
      description: description?.trim() || null,
      is_active: true,
      is_imported: true,
      source_url: sourceUrl?.trim() || null,
    }).select("id").single();

    if (vacErr) return NextResponse.json({ ok: false, error: vacErr.message }, { status: 500 });

    return NextResponse.json({ ok: true, vacancyId: vacancy.id, companyId });
  } catch (err) {
    console.error("[import-vacancy]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
