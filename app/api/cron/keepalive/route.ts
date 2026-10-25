import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// Vercel cron, every 6 hours (vercel.json): keeps the owner's side projects on
// Supabase's free plan awake. Supabase pauses a free project that sees too few
// database requests over a week ("a few requests each day" is enough, per
// https://supabase.com/docs/guides/platform/free-project-pausing), and a paused
// one stays down until someone presses Restore. They were moved off the paid
// organisation in October 2026, where each extra project cost ~$10 a month.
//
// Unrelated to SeaJobs itself; it lives here because this project already has
// the cron machinery. Each target is a one-row read of a table the project
// already serves to anonymous visitors, with its publishable key — a public
// value that ships in that site's own browser code — so nothing here grants
// more than the site already does.
const TARGETS = [
  {
    name: "svezho",
    url: "https://ojsdynvdkslypahoumwe.supabase.co/rest/v1/recipes?select=id&limit=1",
    key: "sb_publishable_EZuyanRrFhNFwESRtdgRHw_agiFB-KR",
  },
];

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const results = await Promise.all(
    TARGETS.map(async (t) => {
      try {
        const res = await fetch(t.url, {
          headers: { apikey: t.key },
          cache: "no-store",
          signal: AbortSignal.timeout(15_000),
        });
        return { name: t.name, status: res.status };
      } catch (e) {
        return { name: t.name, status: 0, error: e instanceof Error ? e.message : String(e) };
      }
    })
  );

  // A failure here is the warning that a project is about to be paused (or
  // already is, or its key was rotated), so it goes to the log, not just the response.
  for (const r of results) if (r.status !== 200) console.error("keepalive failed", r);

  return NextResponse.json({ ok: results.every((r) => r.status === 200), results });
}
