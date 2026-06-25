import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const maxDuration = 60;

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "SeaJobs.pro <noreply@seajobs.pro>", to, subject, html }),
  }).catch(() => {});
}

// Daily Vercel cron: nudge referred users who signed up 7+ days ago but
// haven't finished their seafarer profile yet — finishing it is what
// triggers their referrer's visibility boost, so this converts "stuck" referrals.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  }
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const cutoff = new Date(Date.now() - 7 * 864e5).toISOString();
  const { data: stale, error } = await admin
    .from("referrals")
    .select("id, referrer_id, referred_id")
    .eq("status", "pending")
    .is("reminder_sent_at", null)
    .lte("created_at", cutoff);

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!stale || stale.length === 0) return NextResponse.json({ ok: true, reminded: 0 });

  // Only nudge referrals where the referred seafarer truly hasn't finished
  // their profile yet (same completeness check the boost trigger uses).
  const referredIds = stale.map((r) => r.referred_id);
  const { data: seafarerRows } = await admin
    .from("seafarers")
    .select("id, first_name, rank")
    .in("id", referredIds);

  const incompleteIds = new Set(
    (seafarerRows ?? []).filter((s) => !s.first_name || !s.rank).map((s) => s.id)
  );
  const toRemind = stale.filter((r) => incompleteIds.has(r.referred_id));

  if (toRemind.length === 0) {
    // Stale + already-complete referrals never get a second look — mark them
    // reminded too so this query doesn't keep re-scanning them every run.
    await admin
      .from("referrals")
      .update({ reminder_sent_at: new Date().toISOString() })
      .in("id", stale.map((r) => r.id));
    return NextResponse.json({ ok: true, reminded: 0 });
  }

  for (const r of toRemind) {
    await admin.from("notifications").insert({
      user_id: r.referred_id,
      type: "referral_reminder",
      title: "Finish your profile",
      body: "Your friend gets a visibility boost as soon as you complete your seafarer profile.",
      link: "/seafarer/profile",
    });

    const { data: { user } } = await admin.auth.admin.getUserById(r.referred_id);
    if (user?.email) {
      await sendEmail(
        user.email,
        "Finish your SeaJobs.pro profile",
        `<p>Hi,</p>
<p>You signed up to SeaJobs.pro through a friend's invite — finish your profile and your friend gets a visibility boost in company searches.</p>
<p><a href="https://seajobs.pro/seafarer/profile" style="background:#c9a227;color:#000;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Complete your profile →</a></p>`
      );
    }
  }

  await admin
    .from("referrals")
    .update({ reminder_sent_at: new Date().toISOString() })
    .in("id", stale.map((r) => r.id));

  return NextResponse.json({ ok: true, reminded: toRemind.length });
}
