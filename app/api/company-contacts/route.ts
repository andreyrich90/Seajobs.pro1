import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { hasActiveSubscription } from "@/lib/subscriptionAccess";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// A crewing company's phones, e-mails and contact people, for the company page.
//
// Part of what the seafarer subscription opens (lib/subscription.ts), like a
// vacancy's contacts in api/vacancy-contact. Logged-out visitors can no longer
// read these columns from the table at all (20261026000000 revokes them from
// anon), so the page asks here per reader. Admins pass, and so does the
// company itself, looking at its own page; other companies do not — they are
// not handed a competitor's crewing desk.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NO_STORE = { "Cache-Control": "no-store" };

/** How many of each kind the company has, without the values: a locked page
 *  can then say what subscribing would open, and say nothing when there is
 *  nothing to open. Counts reveal no contact. */
type Has = { phones: number; emails: number; managers: number };

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!UUID_RE.test(id)) return NextResponse.json({ ok: false, error: "Bad input" }, { status: 400, headers: NO_STORE });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 503, headers: NO_STORE });
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data, error } = await admin
    .from("companies").select("phones, emails, crew_managers").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500, headers: NO_STORE });
  if (!data) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404, headers: NO_STORE });

  const phones = ((data.phones ?? []) as string[]).filter((x) => x?.trim());
  const emails = ((data.emails ?? []) as string[]).filter((x) => x?.trim());
  const managers = ((data.crew_managers ?? []) as { name?: string; phone?: string; email?: string }[])
    .filter((m) => m && (m.name || m.phone || m.email));
  const has: Has = { phones: phones.length, emails: emails.length, managers: managers.length };
  const refuse = (error: string, status: number) =>
    NextResponse.json({ ok: false, error, has }, { status, headers: NO_STORE });

  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return refuse("SIGN_IN", 401);
  const { data: { user }, error: authErr } = await admin.auth.getUser(token);
  if (authErr || !user) return refuse("SIGN_IN", 401);

  if (user.id !== id) {
    const [{ data: profile }, { data: sf }] = await Promise.all([
      admin.from("profiles").select("is_admin, is_blocked").eq("id", user.id).maybeSingle(),
      admin.from("seafarers").select("id").eq("id", user.id).maybeSingle(),
    ]);
    if (profile?.is_blocked) return refuse("Forbidden", 403);
    if (!profile?.is_admin) {
      if (!sf) return refuse("NOT_SEAFARER", 403);
      if (!(await hasActiveSubscription(admin, user.id))) return refuse("SUBSCRIPTION_REQUIRED", 403);
    }
  }

  return NextResponse.json({ ok: true, has, phones, emails, crew_managers: managers }, { headers: NO_STORE });
}
