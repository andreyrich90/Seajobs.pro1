import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { importVacancy } from "@/lib/importVacancy";

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

    if (!body.title?.trim() || !body.companyName?.trim()) {
      return NextResponse.json({ ok: false, error: "Title and company name are required" }, { status: 400 });
    }

    const result = await importVacancy(admin, body);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[import-vacancy]", err);
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
