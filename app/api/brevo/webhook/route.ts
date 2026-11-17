import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { setMarketing } from "@/lib/marketing";

export const runtime = "nodejs";

// Brevo's marketing webhook: someone unsubscribed from a campaign, marked it
// as spam, or their address bounced for good. Each of those is a "no" to
// marketing e-mail, recorded in the consent journal so the site's switch, the
// digest and the Brevo list agree.
//
// Brevo only knows the e-mail, so the account is found through
// `marketing_digest.email`. Addresses that are not ours are ignored.
//
// Register it in Brevo (Settings → Webhooks → Marketing) as
//   https://seajobs.pro/api/brevo/webhook?secret=<CRON_SECRET>
// with the events Unsubscribed, Marked as spam and Hard bounce. The URL's
// secret is the check: Brevo's marketing webhooks carry no signature.

const OPT_OUT = /unsubscri|spam|hard.?bounce|blocked|invalid/i;

export async function POST(req: Request) {
  const want = process.env.MARKETING_SECRET || process.env.CRON_SECRET;
  const got = new URL(req.url).searchParams.get("secret");
  if (!want || got !== want) return NextResponse.json({ ok: false }, { status: 401 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 503 });
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const raw = await req.json().catch(() => null);
  const events: { event?: string; email?: string }[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
  let recorded = 0;
  for (const ev of events) {
    const email = (ev.email ?? "").trim().toLowerCase();
    if (!email || !OPT_OUT.test(ev.event ?? "")) continue;
    const { data: row } = await db.from("marketing_digest").select("user_id").ilike("email", email).maybeSingle();
    if (!row) continue;
    const ok = await setMarketing(db, row.user_id, false, { source: `brevo_${(ev.event ?? "").slice(0, 30)}` });
    if (ok) recorded++;
  }
  // Always 200 for a verified call: a retry storm over an address we do not
  // know helps nobody.
  return NextResponse.json({ ok: true, recorded });
}
