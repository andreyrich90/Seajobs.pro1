"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import {
  Inbox, RefreshCw, Play, Plus, Trash2, CheckCircle, XCircle, AlertCircle,
  ExternalLink, Radio, Building2, Briefcase, Mail, ChevronDown, ChevronUp, BarChart3, History,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { RANK_GROUPS } from "@/lib/ranks";
import { companyFromEmail } from "@/lib/companyName";

type Source = {
  id: string;
  handle: string;
  label: string | null;
  default_contact_email: string | null;
  is_active: boolean;
  auto_publish: boolean;
  last_checked_at: string | null;
  last_post_id: number | null;
  last_error: string | null;
};

type Parsed = {
  companyName?: string | null;
  companyLocation?: string | null;
  companyWebsite?: string | null;
  title?: string | null;
  rank?: string | null;
  vesselType?: string | null;
  salaryFrom?: number | null;
  salaryTo?: number | null;
  currency?: string | null;
  contractDuration?: string | null;
  joiningDate?: string | null;
  description?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

type Draft = {
  id: string;
  source_handle: string | null;
  source_url: string | null;
  raw_text: string | null;
  parsed: Parsed;
  created_at: string;
};

const ALL_RANKS = RANK_GROUPS.flatMap((g) => g.ranks);

async function authFetch(url: string, init?: RequestInit) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return fetch(url, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
  });
}

export default function ImportQueuePage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // add-source form
  const [newHandle, setNewHandle] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newEmail, setNewEmail] = useState("");
  // Bumped after "Collect now" so the run panel shows the run just made
  // instead of the one before it.
  const [runsKey, setRunsKey] = useState(0);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sRes, dRes] = await Promise.all([
        authFetch("/api/admin/sources"),
        authFetch("/api/admin/drafts?status=pending"),
      ]);
      const sJson = await sRes.json();
      const dJson = await dRes.json();
      if (sJson.ok) setSources(sJson.sources);
      if (dJson.ok) setDrafts(dJson.drafts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function addSource(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await authFetch("/api/admin/sources", {
      method: "POST",
      body: JSON.stringify({ handle: newHandle, label: newLabel, defaultContactEmail: newEmail }),
    });
    const json = await res.json();
    if (!json.ok) { setError(json.error === "bad_handle" ? "Invalid channel handle" : json.error); return; }
    setNewHandle(""); setNewLabel(""); setNewEmail("");
    load();
  }

  async function toggleSource(s: Source) {
    await authFetch("/api/admin/sources", {
      method: "PATCH",
      body: JSON.stringify({ id: s.id, is_active: !s.is_active }),
    });
    load();
  }

  async function toggleAutoPublish(s: Source) {
    await authFetch("/api/admin/sources", {
      method: "PATCH",
      body: JSON.stringify({ id: s.id, auto_publish: !s.auto_publish }),
    });
    load();
  }

  async function deleteSource(s: Source) {
    if (!confirm(`Remove @${s.handle}?`)) return;
    await authFetch("/api/admin/sources", { method: "DELETE", body: JSON.stringify({ id: s.id }) });
    load();
  }

  async function collectNow() {
    setCollecting(true);
    setNotice(null);
    setError(null);
    try {
      const res = await authFetch("/api/admin/collect-now", { method: "POST" });
      const json = await res.json();
      if (!json.ok) { setError(json.error ?? "Collection failed"); return; }
      setNotice(
        `From ${json.sources} source(s): ${json.fetched ?? "?"} posts fetched, ${json.fresh ?? "?"} new, ` +
        `${json.published ?? 0} published, ${json.drafts} queued for review.`
      );
      setRunsKey((k) => k + 1);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Collection failed");
    } finally {
      setCollecting(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-start gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brass/15">
            <Inbox className="text-brassInk" size={20} />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold text-white">Auto-collection queue</h1>
            <p className="text-sm text-mist">
              Vacancies scraped from Telegram channels. Nothing goes live until you approve it.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={load} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-mist hover:text-white hover:border-white/20 transition">
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={collectNow} disabled={collecting}
            className="flex items-center gap-2 rounded-xl bg-brass px-4 py-2 text-sm font-semibold text-[#061523] hover:bg-brass2 transition disabled:opacity-60">
            {collecting ? <RefreshCw size={15} className="animate-spin" /> : <Play size={15} />}
            {collecting ? "Collecting…" : "Collect now"}
          </button>
        </div>
      </header>

      {notice && (
        <div className="flex items-center gap-2 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal">
          <CheckCircle size={16} /> {notice}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <LastRuns refreshKey={runsKey} />

      <SourceStats />

      {/* Sources */}
      <section className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5 space-y-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
          <Radio size={16} className="text-brassInk" /> Telegram sources
        </h2>

        <div className="space-y-2">
          {sources.length === 0 && <p className="text-sm text-mist">No sources yet. Add a public channel below.</p>}
          {sources.map((s) => (
            <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-navy/40 px-3 py-2.5">
              <button onClick={() => toggleSource(s)}
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.is_active ? "bg-teal" : "bg-mist/40"}`}
                title={s.is_active ? "Active — click to pause" : "Paused — click to activate"} />
              <a href={`https://t.me/s/${s.handle}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-white hover:text-brassInk">
                @{s.handle} <ExternalLink size={12} />
              </a>
              {s.label && <span className="text-xs text-mist">· {s.label}</span>}
              {s.default_contact_email && <span className="text-xs text-mist">· {s.default_contact_email}</span>}
              <button
                onClick={() => toggleAutoPublish(s)}
                title={s.auto_publish ? "Auto-publishing — click to send to review instead" : "Review queue — click to auto-publish"}
                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold transition ${
                  s.auto_publish
                    ? "border-teal/30 bg-teal/10 text-teal hover:bg-teal/20"
                    : "border-brass/30 bg-brass/10 text-brassInk hover:bg-brass/20"
                }`}
              >
                {s.auto_publish ? "Auto-publish" : "Review first"}
              </button>
              <span className="ml-auto text-[11px] text-mist">
                {s.last_error
                  ? <span className="text-coral">error: {s.last_error.slice(0, 60)}</span>
                  : s.last_checked_at
                  ? `checked ${new Date(s.last_checked_at).toLocaleString()}`
                  : "never checked"}
              </span>
              <button onClick={() => deleteSource(s)} className="text-mist hover:text-coral transition" title="Remove">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={addSource} className="flex flex-wrap items-end gap-2 border-t border-white/10 pt-4">
          <label className="flex-1 min-w-[140px]">
            <span className="mb-1 block text-xs text-mist">Channel handle *</span>
            <input value={newHandle} onChange={(e) => setNewHandle(e.target.value)} placeholder="offshorevacancies"
              className="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-white placeholder:text-mist/60 focus:border-brass/40 outline-none" />
          </label>
          <label className="flex-1 min-w-[120px]">
            <span className="mb-1 block text-xs text-mist">Label</span>
            <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Offshore jobs"
              className="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-white placeholder:text-mist/60 focus:border-brass/40 outline-none" />
          </label>
          <label className="flex-1 min-w-[140px]">
            <span className="mb-1 block text-xs text-mist">Fallback email</span>
            <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="crewing@…"
              className="w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-white placeholder:text-mist/60 focus:border-brass/40 outline-none" />
          </label>
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition">
            <Plus size={15} /> Add
          </button>
        </form>
      </section>

      {/* Drafts */}
      <section className="space-y-3">
        <h2 className="font-display text-base font-bold text-white">
          Pending drafts {drafts.length > 0 && <span className="text-brassInk">({drafts.length})</span>}
        </h2>
        {loading && <p className="text-sm text-mist">Loading…</p>}
        {!loading && drafts.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-card px-4 py-6 text-center text-sm text-mist">
            No drafts waiting. Run “Collect now” or wait for the scheduled job (every 6h).
          </p>
        )}
        {drafts.map((d) => (
          <DraftCard key={d.id} draft={d}
            onRemove={() => setDrafts((prev) => prev.filter((x) => x.id !== d.id))}
            onError={setError} onNotice={setNotice} />
        ))}
      </section>
    </div>
  );
}

const CURRENCIES = ["USD", "EUR", "GBP", "NOK", "SGD", "AUD", "CAD"];

/* ── Per-channel yield ──────────────────────────────────────────────────────
   Which sources are worth keeping. The column that decides it is `published_pct`
   — a channel with many posts and few publications spends moderation time and
   Claude calls on spam, and a stale `last post` means the collector is walking
   to it every 6 hours for nothing. */

type StatRow = {
  id: string; handle: string; label: string | null;
  isActive: boolean; autoPublish: boolean;
  lastCheckedAt: string | null; lastError: string | null;
  posts: number; published: number; live: number; rejected: number; pending: number;
  posts30d: number; published30d: number; lastPostAt: string | null;
};
type StatTotals = { posts: number; published: number; pending: number; orphaned: number };

function pct(part: number, whole: number): string {
  if (!whole) return "—";
  return `${Math.round((part / whole) * 1000) / 10}%`;
}

// UTC, like every other date on the site: the server runs in UTC and the reader
// does not, so a local reading would disagree by a day near midnight.
function statDate(iso: string | null): string {
  if (!iso) return "never";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  const stamp = d.toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short" });
  if (days <= 0) return `${stamp} (today)`;
  return `${stamp} (${days}d ago)`;
}

/* Last runs of the collector.
   The cron used to return its summary to nobody, so "have vacancies stopped
   arriving?" could only be answered by reading Vercel logs — and a 200 there
   says the route ran, not that it found anything. These counts separate the
   cases that look identical from the outside: `fetched` at zero means the
   scrape is broken or blocked, `fresh` at zero with `fetched` high means the
   channels are just quiet, and drafts piling up means the queue is waiting on
   a person rather than on code. */

type RunRow = {
  started_at: string;
  trigger_kind: string;
  ok: boolean;
  sources: number;
  fetched: number;
  fresh: number;
  scanned: number;
  drafts: number;
  published: number;
  errors: number;
  error_detail: string | null;
};

function ago(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "—";
  const mins = Math.max(0, Math.round((Date.now() - t) / 60_000));
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

function runStamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    timeZone: "UTC", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

/** What the numbers mean, so the page answers the question instead of posing it. */
function verdict(r: RunRow): { tone: "bad" | "warn" | "ok"; text: string } {
  if (r.errors > 0) {
    return { tone: "bad", text: `${r.errors} source(s) failed${r.error_detail ? `: ${r.error_detail}` : ""}` };
  }
  if (r.sources === 0) {
    return { tone: "bad", text: "No active Telegram sources — nothing to collect." };
  }
  if (r.fetched === 0) {
    return { tone: "bad", text: "The scrape returned no posts at all. Telegram changed its markup or is refusing this host — this is a code problem, not a quiet channel." };
  }
  if (r.fresh === 0) {
    return { tone: "warn", text: "Nothing newer than the last run. The channels are quiet; the collector is fine." };
  }
  if (r.drafts === 0 && r.published === 0) {
    return { tone: "warn", text: "New posts arrived but none survived the filters — no rank, no crewing name, roubles, or a Russian agency." };
  }
  if (r.drafts > 0) {
    return { tone: "ok", text: `${r.drafts} draft(s) queued — they go live only after you approve them below.` };
  }
  return { tone: "ok", text: `${r.published} vacancy(ies) published automatically.` };
}

function LastRuns({ refreshKey }: { refreshKey: number }) {
  const [runs, setRuns] = useState<RunRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setErr(null);
    // Read straight from the table: RLS lets admins select it, so this needs no
    // route of its own.
    const { data, error } = await supabase
      .from("collector_runs")
      .select("started_at, trigger_kind, ok, sources, fetched, fresh, scanned, drafts, published, errors, error_detail")
      .order("started_at", { ascending: false })
      .limit(5);
    if (error) { setErr(error.message); return; }
    setRuns((data as RunRow[]) ?? []);
  }, []);

  useEffect(() => { load(); }, [load, refreshKey]);

  const latest = runs?.[0];
  const v = latest ? verdict(latest) : null;
  const tone = v?.tone === "bad" ? "border-coral/30 bg-coral/10 text-coral"
    : v?.tone === "warn" ? "border-white/10 bg-navy2 text-mist"
    : "border-teal/30 bg-teal/10 text-teal";

  return (
    <section className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
          <History size={16} className="text-brassInk" /> Collector runs
        </h2>
        <button onClick={load}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-mist transition hover:border-white/20 hover:text-white">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {err && (
        <p className="flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">
          <AlertCircle size={15} /> {err}
        </p>
      )}

      {!runs && !err && <p className="text-sm text-mist">Loading…</p>}

      {runs && runs.length === 0 && (
        <p className="text-sm text-mist">
          No run recorded yet. The cron fires at 00:00, 06:00, 12:00 and 18:00 UTC — or press
          “Collect now” above.
        </p>
      )}

      {latest && (
        <>
          <p className="text-sm text-foam">
            <b className="text-white">{ago(latest.started_at)}</b>
            <span className="text-mist"> · {runStamp(latest.started_at)} UTC · {latest.trigger_kind}</span>
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums text-mist">
            <span>sources <b className="text-white">{latest.sources}</b></span>
            <span>posts fetched <b className="text-white">{latest.fetched}</b></span>
            <span>new <b className="text-white">{latest.fresh}</b></span>
            <span>parsed <b className="text-white">{latest.scanned}</b></span>
            <span>drafts <b className="text-white">{latest.drafts}</b></span>
            <span>published <b className="text-white">{latest.published}</b></span>
          </div>
          {v && <p className={`rounded-xl border px-3 py-2 text-sm ${tone}`}>{v.text}</p>}

          {runs.length > 1 && (
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[520px] text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-left uppercase tracking-wider text-mist">
                    <th className="px-3 py-1.5 font-semibold">Earlier runs</th>
                    <th className="px-3 py-1.5 text-right font-semibold">Fetched</th>
                    <th className="px-3 py-1.5 text-right font-semibold">New</th>
                    <th className="px-3 py-1.5 text-right font-semibold">Drafts</th>
                    <th className="px-3 py-1.5 text-right font-semibold">Published</th>
                    <th className="px-3 py-1.5 text-right font-semibold">Errors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {runs.slice(1).map((r) => (
                    <tr key={r.started_at}>
                      <td className="px-3 py-2 whitespace-nowrap text-mist">
                        {runStamp(r.started_at)} UTC <span className="text-mist/60">· {r.trigger_kind}</span>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums text-foam">{r.fetched}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foam">{r.fresh}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foam">{r.drafts || "—"}</td>
                      <td className="px-3 py-2 text-right tabular-nums text-foam">{r.published || "—"}</td>
                      <td className={`px-3 py-2 text-right tabular-nums ${r.errors ? "text-coral" : "text-mist"}`}>
                        {r.errors || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function SourceStats() {
  const [rows, setRows] = useState<StatRow[] | null>(null);
  const [totals, setTotals] = useState<StatTotals | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    setErr(null);
    try {
      const res = await authFetch("/api/admin/import-stats");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "failed");
      setRows(json.sources as StatRow[]);
      setTotals(json.totals as StatTotals);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "failed");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <section className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
          <BarChart3 size={16} className="text-brassInk" /> Yield per channel
        </h2>
        <button onClick={load} disabled={busy}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-mist transition hover:border-white/20 hover:text-white disabled:opacity-60">
          <RefreshCw size={13} className={busy ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {err && (
        <p className="flex items-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">
          <AlertCircle size={15} /> {err}
        </p>
      )}

      {!rows && !err && <p className="text-sm text-mist">Loading…</p>}

      {rows && rows.length === 0 && <p className="text-sm text-mist">No Telegram sources yet.</p>}

      {rows && rows.length > 0 && (
        <>
          <div className="-mx-4 overflow-x-auto sm:mx-0">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-wider text-mist">
                  <th className="px-3 py-2 font-semibold">Channel</th>
                  <th className="px-3 py-2 text-right font-semibold">Posts</th>
                  <th className="px-3 py-2 text-right font-semibold">Published</th>
                  <th className="px-3 py-2 text-right font-semibold" title="Share of parsed posts that became a vacancy">Rate</th>
                  <th className="px-3 py-2 text-right font-semibold" title="Still active on the board">Live</th>
                  <th className="px-3 py-2 text-right font-semibold">Pending</th>
                  <th className="px-3 py-2 text-right font-semibold" title="Parsed / published in the last 30 days">30 days</th>
                  <th className="px-3 py-2 font-semibold">Last post</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r) => {
                  const rate = r.posts ? r.published / r.posts : 0;
                  // Below a third, the channel costs more to filter than it gives.
                  const weak = r.posts >= 10 && rate < 0.34;
                  return (
                    <tr key={r.id} className="hover:bg-white/[0.02]">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <a href={`https://t.me/s/${r.handle}`} target="_blank" rel="noopener noreferrer"
                            className="font-semibold text-white transition hover:text-brassInk">
                            @{r.handle}
                          </a>
                          {!r.isActive && (
                            <span className="rounded-full border border-white/15 px-1.5 py-px text-[10px] font-bold uppercase text-mist">off</span>
                          )}
                          {r.lastError && (
                            <span title={r.lastError} className="inline-flex text-coral"><AlertCircle size={12} /></span>
                          )}
                        </div>
                        {r.label && <p className="text-xs text-mist">{r.label}</p>}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-mist">{r.posts}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-white">{r.published}</td>
                      {/* Neutral when there is nothing to rate: a teal dash on a
                          channel with no posts reads as a good score. */}
                      <td className={`px-3 py-2.5 text-right tabular-nums font-semibold ${
                        r.posts === 0 ? "text-mist" : weak ? "text-coral" : "text-teal"
                      }`}>
                        {pct(r.published, r.posts)}
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-mist">{r.live}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-mist">{r.pending || "—"}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-mist">
                        {r.posts30d === 0 ? "—" : `${r.published30d}/${r.posts30d}`}
                      </td>
                      <td className="px-3 py-2.5 text-xs text-mist whitespace-nowrap">{statDate(r.lastPostAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totals && (
            <p className="text-xs leading-relaxed text-mist">
              {totals.posts} posts parsed in total · {totals.published} became vacancies (
              {pct(totals.published, totals.posts)}) · {totals.pending} awaiting review
              {totals.orphaned > 0 && ` · ${totals.orphaned} from channels since deleted`}
              <br />
              <span className="text-mist/70">
                “Rate” is the share of a channel’s posts that reached the board — a low one means the
                collector is spending Claude calls on posts you reject. A “Last post” far in the past
                means the channel has gone quiet and can be switched off.
              </span>
            </p>
          )}
        </>
      )}
    </section>
  );
}

function DraftCard({
  draft, onRemove, onError, onNotice,
}: {
  draft: Draft;
  onRemove: () => void;
  onError: (m: string) => void;
  onNotice: (m: string) => void;
}) {
  // Fill the company from the crewing email domain when the stored draft has
  // none (older drafts collected before the fallback shipped).
  const [p, setP] = useState<Parsed>(() => {
    const base = draft.parsed ?? {};
    if (base.companyName?.trim()) return base;
    const derived = companyFromEmail(base.contactEmail);
    return derived ? { ...base, companyName: derived } : base;
  });
  const [busy, setBusy] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

  const set = (k: keyof Parsed) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setP((prev) => ({ ...prev, [k]: e.target.value }));

  async function approve() {
    if (!p.title?.trim() || !p.companyName?.trim()) {
      onError("Title and company name are required to approve.");
      return;
    }
    setBusy(true);
    try {
      const res = await authFetch("/api/admin/drafts", {
        method: "POST",
        body: JSON.stringify({ action: "approve", id: draft.id, parsed: p }),
      });
      const json = await res.json();
      if (!json.ok) { onError(json.error ?? "Approve failed"); return; }
      onNotice(json.refreshed ? "Approved — refreshed an existing vacancy." : "Approved — vacancy published.");
      onRemove();
    } finally {
      setBusy(false);
    }
  }

  async function reject() {
    setBusy(true);
    try {
      const res = await authFetch("/api/admin/drafts", {
        method: "POST",
        body: JSON.stringify({ action: "reject", id: draft.id }),
      });
      const json = await res.json();
      if (!json.ok) { onError(json.error ?? "Reject failed"); return; }
      onRemove();
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-navy px-3 py-2 text-sm text-white placeholder:text-mist/50 focus:border-brass/40 outline-none";

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs text-mist">
        {draft.source_handle && <span className="rounded-full bg-white/5 px-2 py-0.5">@{draft.source_handle}</span>}
        {draft.source_url && (
          <a href={draft.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brassInk">
            source <ExternalLink size={11} />
          </a>
        )}
        <span className="ml-auto">{new Date(draft.created_at).toLocaleString()}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1 flex items-center gap-1 text-xs text-mist"><Briefcase size={12} /> Title *</span>
          <input value={p.title ?? ""} onChange={set("title")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 flex items-center gap-1 text-xs text-mist"><Building2 size={12} /> Company *</span>
          <input value={p.companyName ?? ""} onChange={set("companyName")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 flex items-center gap-1 text-xs text-mist"><Mail size={12} /> Contact email</span>
          <input value={p.contactEmail ?? ""} onChange={set("contactEmail")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Rank</span>
          <select value={p.rank ?? ""} onChange={set("rank")} className={inputCls}>
            <option value="">—</option>
            {ALL_RANKS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Vessel type</span>
          <input value={p.vesselType ?? ""} onChange={set("vesselType")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Salary from</span>
          <input value={p.salaryFrom ?? ""} onChange={set("salaryFrom")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Salary to</span>
          <input value={p.salaryTo ?? ""} onChange={set("salaryTo")} className={inputCls} />
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Currency</span>
          <select value={p.currency ?? "USD"} onChange={set("currency")} className={inputCls}>
            {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs text-mist">Joining date</span>
          <input type="date" value={p.joiningDate ?? ""} onChange={set("joiningDate")} className={inputCls} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1 block text-xs text-mist">Contact phone</span>
          <input value={p.contactPhone ?? ""} onChange={set("contactPhone")} placeholder="+380 50 123 45 67" className={inputCls} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1 block text-xs text-mist">Description</span>
          <textarea value={p.description ?? ""} onChange={set("description")} rows={6} className={`${inputCls} font-mono text-xs leading-relaxed`} />
        </label>
      </div>

      {draft.raw_text && (
        <div>
          <button onClick={() => setShowRaw((s) => !s)} className="flex items-center gap-1 text-xs text-mist hover:text-white">
            {showRaw ? <ChevronUp size={13} /> : <ChevronDown size={13} />} Original post
          </button>
          {showRaw && (
            <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-navy/60 p-3 text-xs text-mist">
              {draft.raw_text}
            </pre>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-white/10 pt-3">
        <button onClick={approve} disabled={busy}
          className="flex items-center gap-2 rounded-lg bg-teal/90 px-4 py-2 text-sm font-semibold text-[#061523] hover:bg-teal transition disabled:opacity-60">
          <CheckCircle size={15} /> Approve & publish
        </button>
        <button onClick={reject} disabled={busy}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-mist hover:text-coral hover:border-coral/30 transition disabled:opacity-60">
          <XCircle size={15} /> Reject
        </button>
      </div>
    </div>
  );
}
