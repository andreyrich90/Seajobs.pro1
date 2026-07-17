import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { importVacancy, type ImportVacancyInput } from "@/lib/importVacancy";

export const runtime = "nodejs";

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function requireAdmin(req: Request) {
  const admin = getAdmin();
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  if (!token) return { admin, error: "Unauthorized", status: 401 as const };
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return { admin, error: "Unauthorized", status: 401 as const };
  const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) return { admin, error: "Forbidden", status: 403 as const };
  return { admin, error: null, status: 200 as const };
}

// GET: list pending drafts (newest first).
export async function GET(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });

  const url = new URL(req.url);
  const state = url.searchParams.get("status") ?? "pending";
  const { data, error: e } = await admin
    .from("vacancy_drafts")
    .select("*")
    .eq("status", state)
    .order("created_at", { ascending: false })
    .limit(200);
  if (e) return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  return NextResponse.json({ ok: true, drafts: data ?? [] });
}

// POST: act on a draft.
//   { action: "approve", id, parsed? }  — parsed overrides the stored fields
//                                          (admin may have edited them).
//   { action: "reject",  id }
export async function POST(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });

  const body = await req.json().catch(() => ({}));
  const { action, id } = body as { action?: string; id?: string; parsed?: ImportVacancyInput };
  if (!id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const { data: draft, error: dErr } = await admin
    .from("vacancy_drafts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (dErr) return NextResponse.json({ ok: false, error: dErr.message }, { status: 500 });
  if (!draft) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  if (action === "reject") {
    const { error: uErr } = await admin
      .from("vacancy_drafts")
      .update({ status: "rejected", reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (uErr) return NextResponse.json({ ok: false, error: uErr.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  if (action === "approve") {
    // Admin-edited fields (body.parsed) win over the stored parse.
    const p = { ...(draft.parsed ?? {}), ...(body.parsed ?? {}) } as ImportVacancyInput;
    if (!p.sourceUrl && draft.source_url) p.sourceUrl = draft.source_url;
    if (!p.title?.trim() || !p.companyName?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Title and company name are required to approve" },
        { status: 400 }
      );
    }
    let result;
    try {
      result = await importVacancy(admin, p);
    } catch (e) {
      return NextResponse.json(
        { ok: false, error: e instanceof Error ? e.message : String(e) },
        { status: 500 }
      );
    }
    const { error: uErr } = await admin
      .from("vacancy_drafts")
      .update({ status: "approved", vacancy_id: result.vacancyId, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (uErr) return NextResponse.json({ ok: false, error: uErr.message }, { status: 500 });
    return NextResponse.json({ ok: true, ...result });
  }

  return NextResponse.json({ ok: false, error: "bad_action" }, { status: 400 });
}
