import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { CONSENT_KINDS, CONSENT_NOTIFICATION_TYPE, CONSENT_VERSION, isConsentRole, type ConsentKind } from "@/lib/consent";

export const runtime = "nodejs";

// The consent journal (`user_consents`, see lib/consent.ts).
//
//   GET  — the caller's role, which boxes it needs under the current version,
//          which are still missing, and the latest confirmation of each.
//   POST — { kinds, source, locale }: records each box as given now, with the
//          IP and user agent the server saw, and removes the bell
//          notification that asked for it once nothing is missing.
//
// The caller is re-derived from the bearer token, and only the boxes of the
// caller's own role are accepted. A missing table (migration not run yet)
// reads as "nothing missing" so no banner appears that could not be answered.

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function caller(req: Request, db: NonNullable<ReturnType<typeof admin>>) {
  const token = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return null;
  const { data: { user } } = await db.auth.getUser(token);
  if (!user) return null;
  const { data: profile } = await db.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = profile?.role;
  return { id: user.id, role: isConsentRole(role) ? role : null };
}

type Row = { kind: string; version: string; granted: boolean; created_at: string };

export async function GET(req: Request) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const me = await caller(req, db);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!me.role) return NextResponse.json({ role: null, version: CONSENT_VERSION, required: [], missing: [], given: [] });

  const required = CONSENT_KINDS[me.role];
  const { data, error } = await db
    .from("user_consents")
    .select("kind, version, granted, created_at")
    .eq("user_id", me.id)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[consent] read", error.message);
    return NextResponse.json({ role: me.role, version: CONSENT_VERSION, required, missing: [], given: [], unavailable: true });
  }

  const latest = new Map<string, Row>();
  for (const r of (data ?? []) as Row[]) if (!latest.has(r.kind)) latest.set(r.kind, r);
  const missing = required.filter((k) => {
    const r = latest.get(k);
    return !r || !r.granted || r.version !== CONSENT_VERSION;
  });
  return NextResponse.json({
    role: me.role,
    version: CONSENT_VERSION,
    required,
    missing,
    given: required.map((k) => latest.get(k)).filter(Boolean),
  });
}

export async function POST(req: Request) {
  const db = admin();
  if (!db) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const me = await caller(req, db);
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!me.role) return NextResponse.json({ error: "NO_ROLE" }, { status: 400 });

  const body = (await req.json().catch(() => null)) as { kinds?: unknown; source?: unknown; locale?: unknown } | null;
  const allowed = CONSENT_KINDS[me.role];
  const kinds = Array.isArray(body?.kinds)
    ? Array.from(new Set(body!.kinds.filter((k): k is ConsentKind => allowed.includes(k as ConsentKind))))
    : [];
  if (!kinds.length) return NextResponse.json({ error: "NO_KINDS" }, { status: 400 });

  const source = body?.source === "register" || body?.source === "site_banner" ? body.source : "banner";
  const locale = typeof body?.locale === "string" ? body.locale.slice(0, 5) : null;
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || null;
  const userAgent = (req.headers.get("user-agent") ?? "").slice(0, 300) || null;

  const { error } = await db.from("user_consents").insert(
    kinds.map((kind) => ({
      user_id: me.id,
      kind,
      version: CONSENT_VERSION,
      granted: true,
      source,
      locale,
      ip,
      user_agent: userAgent,
    })),
  );
  if (error) {
    console.error("[consent] write", error.message);
    return NextResponse.json({ error: "WRITE_FAILED" }, { status: 500 });
  }

  // The bell notification goes once every box of the role is confirmed under
  // this version. Best-effort: a leftover notification costs nothing.
  const { data: rows } = await db
    .from("user_consents")
    .select("kind")
    .eq("user_id", me.id)
    .eq("version", CONSENT_VERSION)
    .eq("granted", true);
  const have = new Set((rows ?? []).map((r: { kind: string }) => r.kind));
  if (allowed.every((k) => have.has(k))) {
    const { error: delError } = await db
      .from("notifications")
      .delete()
      .eq("user_id", me.id)
      .eq("type", CONSENT_NOTIFICATION_TYPE);
    if (delError) console.error("[consent] notification", delError.message);
  }

  return NextResponse.json({ ok: true, kinds });
}
