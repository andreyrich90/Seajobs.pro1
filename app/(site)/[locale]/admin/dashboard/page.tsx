"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import { Users, Anchor, Briefcase, MessageSquare, Newspaper, Building2, ShieldOff, Send, Mail, Globe2, RefreshCw, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Stats = {
  seafarers: number;
  companies: number;
  blocked: number;
  vacancies: number;
  activeVacancies: number;
  applications: number;
  topics: number;
  posts: number;
  news: number;
  messages: number;
};

const STAT_CARDS = (s: Stats) => [
  { label: "Seafarers",        value: s.seafarers,       icon: Anchor,       color: "text-teal",  bg: "bg-teal/10" },
  { label: "Companies",        value: s.companies,       icon: Building2,    color: "text-brassInk", bg: "bg-brass/10" },
  { label: "Blocked users",    value: s.blocked,         icon: ShieldOff,    color: "text-coral",  bg: "bg-coral/10" },
  { label: "Vacancies",        value: s.vacancies,       icon: Briefcase,    color: "text-foam",   bg: "bg-white/10" },
  { label: "Active vacancies", value: s.activeVacancies, icon: Briefcase,    color: "text-teal",  bg: "bg-teal/10" },
  { label: "Applications",     value: s.applications,    icon: Send,         color: "text-brassInk", bg: "bg-brass/10" },
  { label: "Forum topics",     value: s.topics,          icon: MessageSquare,color: "text-foam",   bg: "bg-white/10" },
  { label: "Forum replies",    value: s.posts,           icon: MessageSquare,color: "text-mist",   bg: "bg-white/5"  },
  { label: "News articles",    value: s.news,            icon: Newspaper,    color: "text-brassInk", bg: "bg-brass/10" },
  { label: "Messages",         value: s.messages,        icon: Mail,         color: "text-teal",   bg: "bg-teal/10"  },
];

type TgStats = {
  seafarers: number;
  linked: number;
  subscriptions: number;
  subscribers: number;
  subscribedButUnlinked: number;
  announced: number;
};

/* ── Where our seafarers are from ───────────────────────────────────────────
   `nationality` is free text, so the counting happens server-side behind
   lib/nationality.ts. Spellings the normaliser cannot place are listed rather
   than hidden in an "Other" row: each one is a line worth adding to that file,
   and a large unplaced pile would otherwise make the rest look complete when
   it isn't. */

type CountryRow = {
  code: string; name: string; flag: string; total: number;
  topRanks: { rank: string; n: number }[]; withoutRank: number;
};
type SeafarerStats = {
  totals: { seafarers: number; placed: number; noNationality: number; unrecognisedCount: number; countries: number };
  countries: CountryRow[];
  unrecognised: { value: string; n: number }[];
};

function CountryBreakdown({ authHeader }: { authHeader: () => Promise<HeadersInit> }) {
  const [data, setData] = useState<SeafarerStats | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(async () => {
    setBusy(true); setErr(null);
    try {
      const res = await fetch("/api/admin/seafarer-stats", { headers: await authHeader() });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "failed");
      setData(json as SeafarerStats);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "failed");
    } finally {
      setBusy(false);
    }
  }, [authHeader]);

  useEffect(() => { load(); }, [load]);

  const rows = data ? (showAll ? data.countries : data.countries.slice(0, 12)) : [];
  const max = data?.countries[0]?.total ?? 1;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-mist">
          <Globe2 size={15} className="text-brassInk" /> Seafarers by country
        </h2>
        <button onClick={load} disabled={busy}
          className="ml-auto flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-mist transition hover:border-white/20 hover:text-white disabled:opacity-60">
          <RefreshCw size={13} className={busy ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {err && (
        <p className="flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">
          <AlertCircle size={15} /> {err}
        </p>
      )}
      {!data && !err && <p className="text-sm text-mist">Loading…</p>}

      {data && (
        <>
          <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-mist">
            <span><span className="font-display text-lg font-bold text-white">{data.totals.placed}</span> placed in {data.totals.countries} countries</span>
            {data.totals.noNationality > 0 && (
              <span><span className="font-display text-lg font-bold text-mist">{data.totals.noNationality}</span> left the field empty</span>
            )}
            {data.totals.unrecognisedCount > 0 && (
              <span><span className="font-display text-lg font-bold text-coral">{data.totals.unrecognisedCount}</span> not recognised</span>
            )}
          </div>

          {data.countries.length === 0 ? (
            <p className="text-sm text-mist">No nationality filled in on any profile yet.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {rows.map((c) => (
                <li key={c.code} className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/[0.03]">
                  <span className="w-6 shrink-0 text-lg leading-none" aria-hidden="true">{c.flag}</span>
                  <span className="w-32 shrink-0 truncate text-sm font-semibold text-white" title={c.name}>{c.name}</span>
                  {/* The bar makes the shape of the list readable without
                      dividing every number by the largest one in your head. */}
                  <span className="hidden h-2 flex-1 rounded-full bg-white/5 sm:block">
                    <span className="block h-2 rounded-full bg-brass/70" style={{ width: `${Math.max(3, (c.total / max) * 100)}%` }} />
                  </span>
                  <span className="w-10 shrink-0 text-right font-display text-sm font-bold tabular-nums text-white">{c.total}</span>
                  <span className="hidden w-56 shrink-0 truncate text-xs text-mist md:block"
                        title={c.topRanks.map((r) => `${r.rank} — ${r.n}`).join(" · ")}>
                    {c.topRanks.length > 0
                      ? c.topRanks.map((r) => `${r.rank} (${r.n})`).join(", ")
                      : "no rank filled in"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {data.countries.length > 12 && (
            <button onClick={() => setShowAll((v) => !v)}
              className="mt-3 cursor-pointer text-xs font-semibold text-brassInk hover:underline">
              {showAll ? "Show top 12" : `Show all ${data.countries.length} countries`}
            </button>
          )}

          {data.unrecognised.length > 0 && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-coral">
                Not recognised — add these to lib/nationality.ts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {data.unrecognised.map((u) => (
                  <span key={u.value} className="rounded-full border border-coral/25 bg-coral/10 px-2.5 py-1 text-xs text-coral">
                    {u.value} {u.n > 1 && <span className="font-bold tabular-nums">× {u.n}</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [tg, setTg] = useState<TgStats | null>(null);
  const [announcing, setAnnouncing] = useState(false);
  const [announceResult, setAnnounceResult] = useState<string | null>(null);

  // Telegram figures come from a server route, not from here: seafarer_telegram
  // is readable only by its owner, so counting it in the browser returns zero.
  async function authHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    return { Authorization: `Bearer ${session?.access_token ?? ""}` };
  }

  const loadTg = useCallback(async () => {
    const res = await fetch("/api/admin/telegram", { headers: await authHeader() });
    const json = await res.json();
    if (json.ok) setTg(json as TgStats);
  }, []);

  useEffect(() => { loadTg(); }, [loadTg]);

  async function announce() {
    if (announcing) return;
    setAnnouncing(true);
    setAnnounceResult(null);
    try {
      const res = await fetch("/api/admin/telegram", { method: "POST", headers: await authHeader() });
      const json = await res.json();
      setAnnounceResult(
        json.ok
          ? `Sent to ${json.inserted} seafarers. Skipped ${json.skippedLinked} already connected and ${json.skippedAlreadyAnnounced} already notified.`
          : `Failed: ${json.error}`,
      );
      await loadTg();
    } catch (e) {
      setAnnounceResult(`Failed: ${e instanceof Error ? e.message : "network error"}`);
    } finally {
      setAnnouncing(false);
    }
  }

  useEffect(() => {
    async function load() {
      const [
        { count: seafarers },
        { count: companies },
        { count: blocked },
        { count: vacancies },
        { count: activeVacancies },
        { count: applications },
        { count: topics },
        { count: posts },
        { count: news },
        { count: messages },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "seafarer"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "company"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_blocked", true),
        supabase.from("vacancies").select("*", { count: "exact", head: true }),
        supabase.from("vacancies").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("forum_topics").select("*", { count: "exact", head: true }),
        supabase.from("forum_posts").select("*", { count: "exact", head: true }),
        supabase.from("news_articles").select("*", { count: "exact", head: true }),
        supabase.from("messages").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        seafarers: seafarers ?? 0,
        companies: companies ?? 0,
        blocked: blocked ?? 0,
        vacancies: vacancies ?? 0,
        activeVacancies: activeVacancies ?? 0,
        applications: applications ?? 0,
        topics: topics ?? 0,
        posts: posts ?? 0,
        news: news ?? 0,
        messages: messages ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-mist text-sm">Loading...</p>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-mist">Overview of SeaJobs.pro</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        {stats && STAT_CARDS(stats).map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-card p-5 flex flex-col gap-3">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${card.bg}`}>
              <card.icon size={20} className={card.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-mist mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Telegram adoption. Job-alert email is paused, so "subscribed but not
          connected" is the number that matters: those seafarers currently have
          no way to hear about a matching vacancy except by visiting the site. */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-mist">Telegram</h2>

        {tg ? (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              <div>
                <p className="font-display text-3xl font-bold text-teal">{tg.linked}</p>
                <p className="mt-1 text-xs text-mist">
                  connected
                  {tg.seafarers > 0 && ` · ${Math.round((tg.linked / tg.seafarers) * 100)}% of seafarers`}
                </p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-white">{tg.subscribers}</p>
                <p className="mt-1 text-xs text-mist">subscribed to a rank · {tg.subscriptions} subscriptions</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-coral">{tg.subscribedButUnlinked}</p>
                <p className="mt-1 text-xs text-mist">subscribed but not connected — currently unreachable</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-mist">{tg.announced}</p>
                <p className="mt-1 text-xs text-mist">already asked to connect</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
              <button
                onClick={announce}
                disabled={announcing}
                className="cursor-pointer rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {announcing ? "Sending…" : "Send the connect-Telegram notice"}
              </button>
              <p className="text-xs leading-relaxed text-mist">
                Writes an in-app notification for every seafarer who has not connected Telegram and has not
                been asked before. Safe to press twice — nobody receives it twice.
              </p>
            </div>

            {announceResult && <p className="mt-3 text-sm text-foam">{announceResult}</p>}
          </>
        ) : (
          <p className="text-sm text-mist">Loading…</p>
        )}
      </div>

      <CountryBreakdown authHeader={authHeader} />

      <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Total registered users</h2>
        <div className="flex items-end gap-6">
          <div>
            <p className="font-display text-4xl font-bold text-white">
              {stats ? stats.seafarers + stats.companies : 0}
            </p>
            <p className="text-sm text-mist mt-1">users on the platform</p>
          </div>
          <div className="flex gap-4 pb-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              <span className="text-sm text-foam">{stats?.seafarers} seafarers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brass2" />
              <span className="text-sm text-foam">{stats?.companies} companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
