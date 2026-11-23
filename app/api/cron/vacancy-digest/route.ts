import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { brevoConfigured, brevoSend, digestDailyCap } from "@/lib/brevo";
import { alertMatchesVacancy } from "@/lib/jobAlerts";
import { optedIn, unsubscribeUrl } from "@/lib/marketing";
import { digestCopy, type DigestCopy } from "@/lib/marketingCopy";
import { emailShell, type EmailRow } from "@/lib/emailShell";
import { pageAll, MAX_VACANCY_ROWS } from "@/lib/pageAll";
import { tgLang, vacancyUrl } from "@/lib/telegramBot";

export const runtime = "nodejs";
export const maxDuration = 300;

// Daily Vercel cron: the weekly vacancy digest, sent through Brevo.
//
// Every seafarer whose latest marketing answer is yes (lib/marketing.ts) gets
// one e-mail a week: up to ten vacancies posted in the last seven days for
// their rank, those stating a salary first (the profile's rank and their job-alert ranks, matched the way
// job alerts match), topped up with other fresh vacancies that state a salary
// when their rank brought fewer than three. Nobody gets an empty one.
//
// It runs daily and sends to whoever is due, oldest first, up to
// BREVO_DIGEST_DAILY_CAP (100 by default) — so a big list spreads over the
// week, and a new sender address warms up gradually instead of firing its
// whole list on the first morning. Brevo's free plan allows 300 a day across
// the digest and the owner's own campaigns.

const WEEK_MS = 7 * 864e5;
const DUE_AFTER_MS = 6.5 * 864e5;
const MAX_ITEMS = 10;
const MIN_OWN = 3;

type Vac = {
  id: string; title: string; rank: string | null; vessel_type: string | null;
  salary_from: number | null; salary_to: number | null; currency: string | null;
  salary_period: string | null; created_at: string;
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function money(v: Vac, c: DigestCopy): string {
  const from = v.salary_from ?? null;
  const to = v.salary_to ?? null;
  if (!from && !to) return c.noSalary;
  const cur = (v.currency || "USD").toUpperCase();
  const sym = cur === "USD" ? "$" : cur === "EUR" ? "€" : `${cur} `;
  const n = (x: number) => x.toLocaleString("en-US").replace(/,/g, " ");
  const amount = from && to && from !== to ? `${n(from)}–${n(to)}` : n((from ?? to) as number);
  return `${sym}${amount} / ${v.salary_period === "day" ? c.perDay : c.perMonth}`;
}

function row(v: Vac, lang: string, c: DigestCopy): EmailRow {
  const link = `${vacancyUrl({ id: v.id, title: v.title }, tgLang(lang))}?utm_source=brevo&utm_medium=email&utm_campaign=digest`;
  const title = `<a href="${link}" style="color:#0d1f33;text-decoration:none;">${esc(v.title)}</a>`;
  const meta = [v.vessel_type, money(v, c)].filter(Boolean).map((x) => esc(String(x))).join(" · ");
  return ["🚢", title, meta];
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!brevoConfigured()) return NextResponse.json({ ok: true, skipped: "BREVO_API_KEY is not set" });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ ok: false, error: "Missing Supabase env vars" }, { status: 500 });
  const db = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const yes = await optedIn(db);
  if (!yes.size) return NextResponse.json({ ok: true, optedIn: 0, sent: 0 });

  // Sending state, and how many already went out today (a second run the same
  // day — a retry, a manual call — must not exceed the cap).
  const state = await pageAll<{ user_id: string; email: string | null; last_sent_at: string | null; sends: number }>((f, t) =>
    db.from("marketing_digest").select("user_id, email, last_sent_at, sends").order("user_id").range(f, t),
  );
  const byUser = new Map(state.map((s) => [s.user_id, s]));
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  const sentToday = state.filter((s) => s.last_sent_at && new Date(s.last_sent_at) >= today).length;
  let budget = digestDailyCap() - sentToday;
  if (budget <= 0) return NextResponse.json({ ok: true, optedIn: yes.size, sent: 0, note: "daily cap reached" });

  const now = Date.now();
  const due = [...yes.keys()]
    .filter((id) => {
      const last = byUser.get(id)?.last_sent_at;
      return !last || now - new Date(last).getTime() > DUE_AFTER_MS;
    })
    .sort((a, b) => {
      const la = byUser.get(a)?.last_sent_at, lb = byUser.get(b)?.last_sent_at;
      if (!la || !lb) return la ? 1 : lb ? -1 : 0;
      return la.localeCompare(lb);
    });
  if (!due.length) return NextResponse.json({ ok: true, optedIn: yes.size, sent: 0, note: "nobody due" });

  const since = new Date(now - WEEK_MS).toISOString();
  const vacancies = await pageAll<Vac>((f, t) =>
    db
      .from("vacancies")
      .select("id, title, rank, vessel_type, salary_from, salary_to, currency, salary_period, created_at")
      .eq("is_active", true)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .order("id")
      .range(f, t),
    MAX_VACANCY_ROWS,
  );
  const withSalary = vacancies.filter((v) => v.salary_from || v.salary_to);

  // Ranks for the next batch only: the profile's rank and every alert rank.
  const batch = due.slice(0, budget * 2);
  const ranks = new Map<string, string[]>();
  const names = new Map<string, string | null>();
  for (let i = 0; i < batch.length; i += 100) {
    const ids = batch.slice(i, i + 100);
    const [{ data: sfs }, { data: alerts }] = await Promise.all([
      db.from("seafarers").select("id, first_name, rank").in("id", ids),
      db.from("job_alerts").select("seafarer_id, rank").in("seafarer_id", ids),
    ]);
    for (const s of sfs ?? []) {
      names.set(s.id, s.first_name ?? null);
      if (s.rank) ranks.set(s.id, [s.rank]);
    }
    for (const a of alerts ?? []) {
      if (!a.rank) continue;
      const list = ranks.get(a.seafarer_id) ?? [];
      if (!list.some((r) => r.toLowerCase() === a.rank.toLowerCase())) list.push(a.rank);
      ranks.set(a.seafarer_id, list);
    }
  }

  let sent = 0, empty = 0, failed = 0;
  let stopped: string | undefined;
  for (const userId of batch) {
    if (budget <= 0) break;
    const lang = yes.get(userId) ?? "en";
    const c = digestCopy(lang);
    const userRanks = ranks.get(userId) ?? [];

    // Vacancies that state a salary first (the owner's choice: the figure is
    // what a seafarer opens the e-mail for), each group newest first.
    const matched = userRanks.length
      ? vacancies.filter((v) => userRanks.some((r) => alertMatchesVacancy(r, v.rank, v.title)))
      : [];
    const paid = (v: Vac) => !!(v.salary_from || v.salary_to);
    const own = [...matched.filter(paid), ...matched.filter((v) => !paid(v))].slice(0, MAX_ITEMS);
    const ownIds = new Set(own.map((v) => v.id));
    const others = own.length < MIN_OWN
      ? withSalary.filter((v) => !ownIds.has(v.id)).slice(0, MAX_ITEMS - own.length)
      : [];
    if (!own.length && !others.length) { empty++; continue; }

    let email = byUser.get(userId)?.email ?? null;
    if (!email) {
      const { data } = await db.auth.admin.getUserById(userId);
      email = data?.user?.email ?? null;
    }
    if (!email) { failed++; continue; }

    const rankLabel = own.length ? userRanks[0] : null;
    const total = own.length + others.length;
    const subject = rankLabel
      ? c.subjectRank.replace("{rank}", rankLabel).replace("{n}", String(own.length))
      : c.subjectAny.replace("{n}", String(total));
    const rows: EmailRow[] = own.map((v) => row(v, lang, c));
    if (others.length) {
      rows.push(["", `<span style="font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#8a97a5;">${esc(c.others)}</span>`, ""]);
      rows.push(...others.map((v) => row(v, lang, c)));
    }
    const unsub = unsubscribeUrl(userId, lang);
    const jobs = `https://seajobs.pro${lang === "en" ? "" : `/${lang}`}/jobs?utm_source=brevo&utm_medium=email&utm_campaign=digest`;
    const html = emailShell(
      lang === "ua" ? "uk" : lang,
      esc(c.headerSub),
      esc(rankLabel ? c.heroRank.replace("{rank}", rankLabel) : c.heroAny),
      esc(c.intro),
      rows,
      esc(c.cta),
      "",
      `${esc(c.why)}<br><a href="${unsub}" style="color:#7fd1c8;">${esc(c.unsubscribe)}</a>`,
      jobs,
    );

    const r = await brevoSend({
      to: { email, ...(names.get(userId) ? { name: names.get(userId)! } : {}) },
      subject,
      html,
      headers: { "List-Unsubscribe": `<${unsub}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      tags: ["digest"],
    });
    if (!r.ok) {
      failed++;
      console.error("[digest] send", r.status, JSON.stringify(r.body).slice(0, 300));
      // Out of credits or blocked: the rest would fail the same way.
      if (r.status === 402 || r.status === 429 || r.status === 401 || r.status === 403) { stopped = `brevo ${r.status}`; break; }
      continue;
    }
    sent++;
    budget--;
    const prev = byUser.get(userId);
    await db.from("marketing_digest").upsert(
      { user_id: userId, email, lang, last_sent_at: new Date().toISOString(), last_count: total, sends: (prev?.sends ?? 0) + 1 },
      { onConflict: "user_id" },
    );
  }

  return NextResponse.json({ ok: true, optedIn: yes.size, due: due.length, sent, empty, failed, ...(stopped ? { stopped } : {}) });
}
