"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import {
  Inbox, RefreshCw, Play, Plus, Trash2, CheckCircle, XCircle, AlertCircle,
  ExternalLink, Radio, Building2, Briefcase, Mail, ChevronDown, ChevronUp,
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
        `From ${json.sources} source(s): ${json.published ?? 0} published, ${json.drafts} queued for review.`
      );
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
            <Inbox className="text-brass2" size={20} />
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

      {/* Sources */}
      <section className="rounded-2xl border border-white/10 bg-card p-4 sm:p-5 space-y-4">
        <h2 className="flex items-center gap-2 font-display text-base font-bold text-white">
          <Radio size={16} className="text-brass2" /> Telegram sources
        </h2>

        <div className="space-y-2">
          {sources.length === 0 && <p className="text-sm text-mist">No sources yet. Add a public channel below.</p>}
          {sources.map((s) => (
            <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-navy/40 px-3 py-2.5">
              <button onClick={() => toggleSource(s)}
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${s.is_active ? "bg-teal" : "bg-mist/40"}`}
                title={s.is_active ? "Active — click to pause" : "Paused — click to activate"} />
              <a href={`https://t.me/s/${s.handle}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-semibold text-white hover:text-brass2">
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
                    : "border-brass/30 bg-brass/10 text-brass2 hover:bg-brass/20"
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
          Pending drafts {drafts.length > 0 && <span className="text-brass2">({drafts.length})</span>}
        </h2>
        {loading && <p className="text-sm text-mist">Loading…</p>}
        {!loading && drafts.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-card px-4 py-6 text-center text-sm text-mist">
            No drafts waiting. Run “Collect now” or wait for the hourly job.
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
          <a href={draft.source_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-brass2">
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
