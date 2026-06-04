"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Send, Trash2, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type ApplicationRow = {
  id: string;
  status: string;
  created_at: string;
  cover_letter: string | null;
  vacancies: {
    id: string;
    title: string;
    rank: string | null;
    vessel_type: string | null;
    salary_from: number | null;
    salary_to: number | null;
    currency: string;
    companies: {
      name: string | null;
      logo_url: string | null;
      is_verified: boolean;
    } | null;
  } | null;
};

type StatusKey = "pending" | "viewed" | "accepted" | "rejected";

const STATUS_STYLES: Record<StatusKey, string> = {
  pending: "text-mist border-mist/30 bg-mist/10",
  viewed: "text-brass2 border-brass2/30 bg-brass2/10",
  accepted: "text-teal border-teal/30 bg-teal/10",
  rejected: "text-coral border-coral/30 bg-coral/10",
};

const STATUS_LABEL: Record<StatusKey, string> = {
  pending: "Pending",
  viewed: "Viewed",
  accepted: "Accepted",
  rejected: "Rejected",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: ApplicationRow["vacancies"]): string {
  if (!v) return "";
  if (!v.salary_from && !v.salary_to) return "";
  if (v.salary_from && v.salary_to)
    return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${v.currency}`;
  return `up to ${v.salary_to!.toLocaleString()} ${v.currency}`;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data } = await supabase
        .from("applications")
        .select("id, status, created_at, cover_letter, vacancies(id, title, rank, vessel_type, salary_from, salary_to, currency, companies(name, logo_url, is_verified))")
        .eq("seafarer_id", session.user.id)
        .order("created_at", { ascending: false });

      setApplications((data as ApplicationRow[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleWithdraw(id: string) {
    if (!confirm("Withdraw this application?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (!error) setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">My Applications</h1>
        <p className="mt-1 text-sm text-mist">{applications.length} application{applications.length !== 1 ? "s" : ""}</p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Send size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">No applications yet</p>
          <p className="mt-1 text-sm text-mist">Browse jobs and apply to get started.</p>
          <Link
            href="/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const v = app.vacancies;
            const statusKey = (app.status as StatusKey) in STATUS_STYLES ? (app.status as StatusKey) : "pending";
            const salary = formatSalary(v);

            return (
              <div
                key={app.id}
                className="rounded-2xl border border-white/10 bg-card p-5 flex items-start gap-4"
              >
                {/* Company logo */}
                <div className="shrink-0">
                  {v?.companies?.logo_url ? (
                    <img
                      src={v.companies.logo_url}
                      alt={v.companies.name ?? ""}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10">
                      <Building2 size={20} className="text-mist" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-mist">{v?.companies?.name ?? "Unknown company"}</p>
                        {v?.companies?.is_verified && <ShieldCheck size={12} className="text-teal" />}
                      </div>
                      {v ? (
                        <Link
                          href={`/jobs/${v.id}`}
                          className="mt-0.5 block font-semibold text-white hover:text-brass2 transition"
                        >
                          {v.title}
                        </Link>
                      ) : (
                        <p className="mt-0.5 font-semibold text-white">Vacancy removed</p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-2">
                        {v?.rank && (
                          <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                            {v.rank}
                          </span>
                        )}
                        {v?.vessel_type && (
                          <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                            {v.vessel_type}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[statusKey]}`}>
                        {STATUS_LABEL[statusKey]}
                      </span>
                      {salary && <p className="text-xs font-semibold text-white">{salary}</p>}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-mist">Applied: {formatDate(app.created_at)}</p>
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      title="Withdraw application"
                      className="flex items-center gap-1.5 rounded-lg border border-coral/20 bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral hover:bg-coral/20 transition"
                    >
                      <Trash2 size={12} /> Withdraw
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
