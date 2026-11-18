import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { brevoCheck, brevoConfigured, brevoEnsureAttributes, brevoUpsertContact } from "@/lib/brevo";
import { optedIn } from "@/lib/marketing";

export const runtime = "nodejs";
export const maxDuration = 120;

// Is Brevo wired up? Open /api/brevo/setup?secret=<CRON_SECRET> after setting
// the env vars (lib/brevo.ts). It reports the key, the plan, the list and the
// sender, creates the RANK and LANG contact attributes, and counts who has
// said yes. `&sync=1` also pushes every opted-in seafarer to the list — for
// the first run, and after the list was changed in Brevo.

export async function GET(req: Request) {
  const want = process.env.CRON_SECRET;
  const q = new URL(req.url).searchParams;
  if (!want || q.get("secret") !== want) return NextResponse.json({ ok: false }, { status: 401 });
  if (!brevoConfigured()) return NextResponse.json({ ok: false, error: "BREVO_API_KEY is not set in Vercel" });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 503 });
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const [check, attributes, yes] = await Promise.all([brevoCheck(), brevoEnsureAttributes(), optedIn(db)]);

  let synced: { ok: number; failed: number } | undefined;
  if (q.get("sync") === "1") {
    synced = { ok: 0, failed: 0 };
    for (const [userId, lang] of yes) {
      const { data: u } = await db.auth.admin.getUserById(userId);
      const email = u?.user?.email;
      if (!email) { synced.failed++; continue; }
      const { data: sf } = await db.from("seafarers").select("first_name, last_name, rank").eq("id", userId).maybeSingle();
      const r = await brevoUpsertContact({ email, firstName: sf?.first_name, lastName: sf?.last_name, rank: sf?.rank, lang });
      if (r.ok) {
        synced.ok++;
        await db.from("marketing_digest").upsert(
          { user_id: userId, email, lang, synced_at: new Date().toISOString() },
          { onConflict: "user_id" },
        );
      } else synced.failed++;
    }
  }

  return NextResponse.json({ ok: true, ...check, attributes, optedIn: yes.size, ...(synced ? { synced } : {}) });
}
