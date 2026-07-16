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
      contractDuration, joiningDate, description, sourceUrl, contactEmail,
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

    const fields = {
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
      contact_email: contactEmail?.trim() || null,
    };

    // Recurring posting (same company + same title, case-insensitive) →
    // refresh the existing row instead of creating a clone: bump the dates so
    // it sorts as fresh, reactivate it, and overwrite with the new details.
    const { data: duplicate } = await admin
      .from("vacancies")
      .select("id")
      .eq("company_id", companyId)
      .ilike("title", title.trim())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (duplicate) {
      const { error: updErr } = await admin
        .from("vacancies")
        .update({ ...fields, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("id", duplicate.id);
      if (updErr) return NextResponse.json({ ok: false, error: updErr.message }, { status: 500 });
      return NextResponse.json({ ok: true, vacancyId: duplicate.id, companyId, refreshed: true });
    }

    const { data: vacancy, error: vacErr } = await admin.from("vacancies").insert({
      company_id: companyId,
      title: title.trim(),
      ...fields,
    }).select("id").single();

    if (vacErr) return NextResponse.json({ ok: false, error: vacErr.message }, { status: 500 });

    return NextResponse.json({ ok: true, vacancyId: vacancy.id, companyId });
  } catch (err) {
    console.error("[import-vacancy]", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
