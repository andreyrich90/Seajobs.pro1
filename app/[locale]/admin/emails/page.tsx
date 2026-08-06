"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, AlertTriangle, CheckCircle2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Row = {
  id: string;
  to_email: string;
  kind: string;
  ok: boolean;
  error: string | null;
  created_at: string;
};

type Today = Record<string, { sent: number; failed: number }>;

// Human labels for the `kind` values written by lib/email.ts.
const KIND_LABEL: Record<string, string> = {
  application_received: "Application → company",
  external_application: "CV → crewing agency",
  status_changed: "Application status",
  new_message: "Chat message",
  new_vacancy: "Job alert",
  unread_digest: "Unread digest",
  referral_reminder: "Referral reminder",
  contact: "Contact form",
  outreach: "Agency outreach",
};

// Emails that carry something a user is waiting on — a failure here is serious.
const CRITICAL = new Set(["external_application", "application_received", "status_changed"]);

function fmt(d: string) {
  return new Date(d).toLocaleString("en-GB", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminEmailsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [today, setToday] = useState<Today>({});
  const [budget, setBudget] = useState<{ used: number; limit: number }>({ used: 0, limit: 50 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [failedOnly, setFailedOnly] = useState(false);
  const [kind, setKind] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHint(null);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setError("Not authenticated."); setLoading(false); return; }

    const params = new URLSearchParams();
    if (failedOnly) params.set("failed", "1");
    if (kind) params.set("kind", kind);

    const res = await fetch(`/api/admin/email-log?${params}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    const data = await res.json();
    if (!data.ok) {
      setError(data.error ?? "Failed to load");
      setHint(data.hint ?? null);
      setLoading(false);
      return;
    }
    setRows(data.rows);
    setToday(data.today ?? {});
    setBudget(data.alertBudget ?? { used: 0, limit: 50 });
    setLoading(false);
  }, [failedOnly, kind]);

  useEffect(() => { load(); }, [load]);

  const todaySent = Object.values(today).reduce((s, t) => s + t.sent, 0);
  const todayFailed = Object.values(today).reduce((s, t) => s + t.failed, 0);
  const budgetPct = Math.min(100, Math.round((budget.used / budget.limit) * 100));

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Email log</h1>
          <p className="mt-1 text-sm text-mist">
            Every email the site sends, with its outcome. Free tier allows 100/day.
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-coral/25 bg-coral/10 p-5">
          <p className="flex items-center gap-2 font-semibold text-coral"><AlertTriangle size={16} /> {error}</p>
          {hint && <p className="mt-2 text-sm text-mist">{hint}</p>}
        </div>
      ) : (
        <>
          {/* Today's counters */}
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mist">Sent today</p>
              <p className="mt-1 text-3xl font-bold text-white">{todaySent}<span className="text-base font-semibold text-mist"> / 100</span></p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mist">Failed today</p>
              <p className={`mt-1 text-3xl font-bold ${todayFailed > 0 ? "text-coral" : "text-teal"}`}>{todayFailed}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-mist">Job-alert budget</p>
              <p className="mt-1 text-3xl font-bold text-white">{budget.used}<span className="text-base font-semibold text-mist"> / {budget.limit}</span></p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full ${budgetPct >= 100 ? "bg-coral" : "bg-brass"}`} style={{ width: `${budgetPct}%` }} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFailedOnly((v) => !v)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                failedOnly ? "border-coral/40 bg-coral/15 text-coral" : "border-white/10 bg-white/5 text-mist hover:text-white"
              }`}
            >
              Failed only
            </button>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="rounded-xl border border-white/10 bg-card px-3 py-2 text-sm text-white outline-none focus:border-brass"
            >
              <option value="">All types</option>
              {Object.entries(KIND_LABEL).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>
            {(failedOnly || kind) && (
              <button onClick={() => { setFailedOnly(false); setKind(""); }} className="text-sm font-semibold text-brass2 hover:text-brass">
                Reset
              </button>
            )}
          </div>

          {/* Log table */}
          {loading ? (
            <div className="flex h-40 items-center justify-center"><p className="text-sm text-mist">Loading…</p></div>
          ) : rows.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-card p-10 text-center">
              <Mail size={26} className="mx-auto text-mist/40" />
              <p className="mt-3 text-sm text-mist">
                {failedOnly || kind ? "Nothing matches this filter." : "No emails logged yet — the log fills as the site sends mail."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-deep">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-mist">When</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-mist">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-mist">To</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-mist">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {rows.map((r) => (
                    <tr key={r.id} className="bg-card align-top transition hover:bg-white/[0.02]">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-mist">{fmt(r.created_at)}</td>
                      <td className="px-4 py-3">
                        <span className="font-medium text-white">{KIND_LABEL[r.kind] ?? r.kind}</span>
                        {CRITICAL.has(r.kind) && !r.ok && (
                          <span className="ml-2 inline-flex rounded-full border border-coral/30 bg-coral/10 px-2 py-0.5 text-[10px] font-bold uppercase text-coral">
                            critical
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-mist break-all">{r.to_email}</td>
                      <td className="px-4 py-3">
                        {r.ok ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal">
                            <CheckCircle2 size={13} /> Sent
                          </span>
                        ) : (
                          <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral">
                              <AlertTriangle size={13} /> Failed
                            </span>
                            {r.error && <p className="mt-1 max-w-md text-[11px] leading-snug text-mist break-words">{r.error}</p>}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
