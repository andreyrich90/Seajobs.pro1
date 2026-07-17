import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

// GET: list all import sources.
export async function GET(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });
  const { data, error: e } = await admin
    .from("import_sources")
    .select("*")
    .order("created_at", { ascending: false });
  if (e) return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  return NextResponse.json({ ok: true, sources: data ?? [] });
}

// POST: add a Telegram source. { handle, label?, defaultContactEmail? }
export async function POST(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });

  const body = await req.json().catch(() => ({}));
  const handle = String(body.handle ?? "").trim().replace(/^@/, "").replace(/\s+/g, "");
  if (!/^[A-Za-z0-9_]{3,64}$/.test(handle)) {
    return NextResponse.json({ ok: false, error: "bad_handle" }, { status: 400 });
  }
  const { data, error: e } = await admin
    .from("import_sources")
    .insert({
      kind: "telegram",
      handle,
      label: body.label?.trim() || null,
      default_contact_email: body.defaultContactEmail?.trim() || null,
    })
    .select("*")
    .single();
  if (e) return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  return NextResponse.json({ ok: true, source: data });
}

// PATCH: toggle active / edit. { id, is_active?, label?, defaultContactEmail? }
export async function PATCH(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });

  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const patch: Record<string, unknown> = {};
  if (typeof body.is_active === "boolean") patch.is_active = body.is_active;
  if (typeof body.label === "string") patch.label = body.label.trim() || null;
  if (typeof body.defaultContactEmail === "string")
    patch.default_contact_email = body.defaultContactEmail.trim() || null;
  const { error: e } = await admin.from("import_sources").update(patch).eq("id", body.id);
  if (e) return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE: remove a source. { id }
export async function DELETE(req: Request) {
  const { admin, error, status } = await requireAdmin(req);
  if (error) return NextResponse.json({ ok: false, error }, { status });
  const body = await req.json().catch(() => ({}));
  if (!body.id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });
  const { error: e } = await admin.from("import_sources").delete().eq("id", body.id);
  if (e) return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
