import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Admin-only: return a { userId: email } map for the Users admin page.
// Emails live in auth.users (not in `profiles`), so they can only be read with
// the service-role client — never expose this to non-admins.
export async function GET(req: Request) {
  try {
    const admin = getAdmin();
    const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
    if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await admin.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });

    // Page through all auth users and collect their emails.
    const emails: Record<string, string> = {};
    const perPage = 1000;
    for (let page = 1; page <= 50; page++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      for (const u of data.users) {
        if (u.email) emails[u.id] = u.email;
      }
      if (data.users.length < perPage) break;
    }

    return NextResponse.json({ ok: true, emails });
  } catch (e) {
    console.error("[admin/user-emails]", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
