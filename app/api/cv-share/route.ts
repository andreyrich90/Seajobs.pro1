import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { PROFILE_SELECT, profileGaps } from "@/lib/profileGate";
import { hasToolAccess } from "@/lib/subscriptionAccess";

export const runtime = "nodejs";

// Mints the CV link a seafarer pastes into a letter they send themselves.
//
// Server-side because the token is a bearer credential for a document holding a
// passport number and visas: it must be unguessable and it must be minted for
// the caller, never for whoever the body claims.

const SITE = "https://seajobs.pro";
const TTL_DAYS = 30;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: Request) {
  // Who is asking, before anything about how the server is configured.
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: { user: caller }, error: authErr } = await admin.auth.getUser(token);
  if (authErr || !caller) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  // Writing from one's own mailbox is a subscription feature, like applying
  // through the portal: the letter goes to the agency's address, which only
  // subscribers are shown.
  if (!(await hasToolAccess(admin, caller.id))) {
    return NextResponse.json({ ok: false, error: "SUBSCRIPTION_REQUIRED" }, { status: 403 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    applicationId?: string;
    vacancyId?: string;
    sentTo?: string;
  };

  // A CV built from an empty profile is an empty page, so the same rule the
  // application trigger enforces applies here: a named person with a rank and
  // a phone (lib/profileGate.ts), and at least one voyage to show.
  const [{ data: sf }, { count: voyages }] = await Promise.all([
    admin.from("seafarers").select(PROFILE_SELECT).eq("id", caller.id).maybeSingle(),
    admin.from("sea_experience").select("id", { count: "exact", head: true }).eq("seafarer_id", caller.id),
  ]);
  const missing = profileGaps(sf as Record<string, string | null> | null);
  if (missing.length || !voyages) {
    return NextResponse.json(
      { ok: false, error: "PROFILE_INCOMPLETE", missing, voyages: voyages ?? 0 },
      { status: 422 },
    );
  }

  // The address the link is given to, for the "who did I send this to" list.
  // Read from the vacancy rather than trusted from the body when there is one.
  let sentTo = body.sentTo?.slice(0, 200) ?? null;
  if (body.vacancyId && UUID_RE.test(body.vacancyId)) {
    const { data: v } = await admin.from("vacancies").select("contact_email").eq("id", body.vacancyId).maybeSingle();
    if (v?.contact_email) sentTo = v.contact_email.slice(0, 200);
  }

  // 24 random bytes, URL-safe. Guessing is the only attack surface a link has.
  const share = randomBytes(24).toString("base64url");

  const { error } = await admin.from("cv_share_tokens").insert({
    token: share,
    seafarer_id: caller.id,
    application_id: body.applicationId ?? null,
    vacancy_id: body.vacancyId ?? null,
    sent_to: sentTo,
    expires_at: new Date(Date.now() + TTL_DAYS * 864e5).toISOString(),
  });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, url: `${SITE}/cv/${share}`, expiresInDays: TTL_DAYS });
}
