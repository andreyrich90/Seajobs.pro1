import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PARTNER_MAX_BYTES, PARTNER_MAX_FILES, PARTNER_TYPES } from "@/lib/partnerCopy";
import { esc, telegramConfigured, tgSendAdmins } from "@/lib/telegramBot";

export const runtime = "nodejs";
export const maxDuration = 60;

// A crewing company asks to become a SeaJobs Partner (lib/partners.ts).
//
//   GET  — the company's latest submission and whether it is verified.
//   POST — multipart: up to PARTNER_MAX_FILES documents (JPG/PNG/WebP/PDF,
//          PARTNER_MAX_BYTES together) plus country, registry number and a note.
//          The files go into the private `company-docs` bucket, a pending
//          `company_verifications` row is written, and the operators get a
//          Telegram message with a link to /admin/verifications.
//
// The caller is re-derived from the bearer token and must own a `companies`
// row. A second submission while one is pending replaces nothing: it is a new
// row, and the admin screen shows the newest per company first.

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function company(req: Request, db: NonNullable<ReturnType<typeof admin>>) {
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return null;
  const { data: co } = await db.from("companies").select("id, name, is_verified").eq("id", user.id).maybeSingle();
  return co ? { ...co, email: user.email ?? null } : null;
}

export async function GET(req: Request) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const co = await company(req, db);
  if (!co) return NextResponse.json({ error: "NOT_COMPANY" }, { status: 403 });
  const { data: last, error } = await db
    .from("company_verifications")
    .select("id, status, admin_note, submitted_at, reviewed_at")
    .eq("company_id", co.id)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  // A missing table (migration not run) reads as "never asked": the window
  // stays closed rather than offering a form that cannot be saved.
  if (error) return NextResponse.json({ verified: !!co.is_verified, last: null, unavailable: true });
  return NextResponse.json({ verified: !!co.is_verified, last: last ?? null });
}

function safeName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^.a-z0-9]/g, "").slice(0, 6) : "";
  const base = (dot > 0 ? name.slice(0, dot) : name).replace(/[^a-zA-Z0-9_-]+/g, "_").slice(0, 60) || "document";
  return `${base}${ext}`;
}

export async function POST(req: Request) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const co = await company(req, db);
  if (!co) return NextResponse.json({ error: "NOT_COMPANY" }, { status: 403 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "BAD_FORM" }, { status: 400 });
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return NextResponse.json({ error: "NO_FILES" }, { status: 400 });
  if (files.length > PARTNER_MAX_FILES) return NextResponse.json({ error: "TOO_MANY" }, { status: 400 });
  if (files.reduce((n, f) => n + f.size, 0) > PARTNER_MAX_BYTES) return NextResponse.json({ error: "TOO_BIG" }, { status: 400 });
  for (const f of files) {
    if (!PARTNER_TYPES.includes(f.type)) return NextResponse.json({ error: "BAD_TYPE" }, { status: 400 });
  }
  const text = (k: string, max: number) => {
    const v = form.get(k);
    return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
  };
  const country = text("country", 80);
  const registry = text("registry_number", 120);
  const note = text("note", 1000);

  const stamp = Date.now();
  const stored: { path: string; name: string; type: string; size: number }[] = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const path = `${co.id}/${stamp}-${i + 1}-${safeName(f.name)}`;
    const { error } = await db.storage.from("company-docs").upload(path, await f.arrayBuffer(), { contentType: f.type, upsert: false });
    if (error) {
      console.error("[verification] upload", error.message);
      // Remove what did go up, so a half submission leaves nothing behind.
      if (stored.length) await db.storage.from("company-docs").remove(stored.map((s) => s.path));
      return NextResponse.json({ error: "UPLOAD_FAILED" }, { status: 500 });
    }
    stored.push({ path, name: f.name.slice(0, 120), type: f.type, size: f.size });
  }

  const { data: row, error } = await db
    .from("company_verifications")
    .insert({ company_id: co.id, status: "pending", country, registry_number: registry, note, files: stored })
    .select("id")
    .single();
  if (error) {
    console.error("[verification] insert", error.message);
    await db.storage.from("company-docs").remove(stored.map((s) => s.path));
    return NextResponse.json({ error: "WRITE_FAILED" }, { status: 500 });
  }

  if (telegramConfigured()) {
    const lines = [
      "🛡 <b>Заявка «Партнёр SeaJobs»</b>",
      `🏢 ${esc(co.name ?? "—")}`,
      co.email ? `✉️ ${esc(co.email)}` : null,
      country ? `🌍 ${esc(country)}` : null,
      registry ? `🔢 ${esc(registry)}` : null,
      `📎 Файлов: ${stored.length}`,
    ].filter(Boolean);
    await tgSendAdmins(lines.join("\n"), { buttonText: "Проверить", buttonUrl: "https://seajobs.pro/ru/admin/verifications" })
      .catch((e) => console.error("[verification] telegram", e));
  }

  return NextResponse.json({ ok: true, id: row.id });
}
