"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { Inbox, Mail, Trash2, Clock, User, Anchor } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { money } from "@/lib/format";
import type { ServiceRequest } from "@/lib/supabase/types";

// Requests for the CV-distribution service, which is priced on the page but not
// yet sold. This screen exists to answer one question — how many people, and for
// which package, at which price — so the counts sit above the list rather than
// being something to work out by scrolling.

const STATUSES = ["new", "contacted", "done", "dropped"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_STYLE: Record<Status, string> = {
  new: "text-brassInk border-brass/30 bg-brass/10",
  contacted: "text-teal border-teal/30 bg-teal/10",
  done: "text-mist border-mist/30 bg-mist/10",
  dropped: "text-coral border-coral/30 bg-coral/10",
};

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminServiceRequestsPage() {
  const [rows, setRows] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Status>("all");

  useEffect(() => { load(); }, []);

  async function load() {
    // PostgREST caps a response at 1000 rows. If this list ever reaches that,
    // page it the way the admin sweeps in app/api/admin/* do.
    const { data } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    setRows((data as ServiceRequest[]) ?? []);
    setLoading(false);
  }

  async function setStatus(row: ServiceRequest, status: Status) {
    const handled_at = status === "new" ? null : new Date().toISOString();
    await supabase.from("service_requests").update({ status, handled_at }).eq("id", row.id);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status, handled_at } : r)));
  }

  async function remove(id: string) {
    await supabase.from("service_requests").delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  /** Demand per package: the number that decides whether this ships at all. */
  const byPackage = useMemo(() => {
    const map = new Map<string, { label: string; count: number; eur: number | null }>();
    for (const r of rows) {
      const cur = map.get(r.package_code);
      if (cur) cur.count += 1;
      else map.set(r.package_code, { label: r.package_label, count: 1, eur: r.price_eur });
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [rows]);

  const byLang = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of rows) map.set(r.lang ?? "—", (map.get(r.lang ?? "—") ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const newCount = rows.filter((r) => r.status === "new").length;
  const displayed = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div className="max-w-5xl p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">CV distribution requests</h1>
          <p className="mt-0.5 text-sm text-mist">
            {loading ? "Loading..." : `${rows.length} total · ${newCount} new`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...STATUSES] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-3.5 py-2 text-sm font-semibold capitalize transition ${
                filter === f
                  ? "border border-brass/20 bg-brass/15 text-brassInk"
                  : "border border-white/10 text-mist hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {!loading && rows.length > 0 && (
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">Demand per package</p>
            <div className="flex flex-col gap-1.5">
              {byPackage.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-foam">{p.label}</span>
                  <span className="shrink-0 text-mist">
                    {p.eur !== null && <span className="mr-2 text-xs">€{money(p.eur)}</span>}
                    <b className="text-brassInk">{p.count}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-card p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">By page language</p>
            <div className="flex flex-wrap gap-2">
              {byLang.map(([l, n]) => (
                <span key={l} className="rounded-full border border-white/15 px-3 py-1 text-sm text-foam">
                  {l.toUpperCase()} <b className="text-brassInk">{n}</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <p className="text-sm text-mist">Loading...</p>
        </div>
      ) : displayed.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Inbox size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">No requests</p>
          <p className="mt-1 text-sm text-mist">
            {filter === "all" ? "Nobody has asked for the mailing yet." : `Nothing with status “${filter}”.`}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((r) => {
            const status = (STATUSES as readonly string[]).includes(r.status)
              ? (r.status as Status)
              : "new";
            return (
              <div
                key={r.id}
                className={`rounded-2xl border bg-card p-5 ${
                  status === "new" ? "border-brass/30 bg-brass/5" : "border-white/10"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{r.package_label}</p>
                    <p className="mt-0.5 text-sm text-brassInk">
                      {r.price_eur !== null && `€${money(r.price_eur)}`}
                      {r.price_eur !== null && r.price_usd !== null && " · "}
                      {r.price_usd !== null && `$${money(r.price_usd)}`}
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLE[status]}`}>
                    {status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-mist">
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {r.name || "—"}
                  </span>
                  <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 text-foam hover:text-brassInk">
                    <Mail size={13} /> {r.email}
                  </a>
                  {r.phone && <span>{r.phone}</span>}
                  {r.rank && (
                    <span className="flex items-center gap-1.5">
                      <Anchor size={13} /> {r.rank}
                    </span>
                  )}
                  {r.fleet && <span className="capitalize">{r.fleet}</span>}
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {formatDate(r.created_at)}
                  </span>
                </div>

                {r.note && (
                  <p className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-foam">
                    {r.note}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(r, s)}
                      disabled={status === s}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                        status === s
                          ? "border-brass/30 bg-brass/15 text-brassInk"
                          : "border-white/10 text-mist hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={() => remove(r.id)}
                    className="ml-auto flex items-center gap-1.5 rounded-lg border border-coral/20 bg-coral/10 px-3 py-1.5 text-xs font-semibold text-coral transition hover:bg-coral/20"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
