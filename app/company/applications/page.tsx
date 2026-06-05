"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type ApplicationRow = {
  id: string;
  status: string;
  created_at: string;
  cover_letter: string | null;
  seafarer_id: string;
  vacancies: {
    id: string;
    title: string;
  } | null;
  seafarers: {
    first_name: string | null;
    last_name: string | null;
    photo_url: string | null;
    rank: string | null;
  } | null;
};

type StatusKey = "pending" | "viewed" | "accepted" | "rejected";

const STATUS_STYLES: Record<StatusKey, string> = {
  pending: "text-mist border-mist/30 bg-mist/10",
  viewed: "text-brass2 border-brass2/30 bg-brass2/10",
  accepted: "text-teal border-teal/30 bg-teal/10",
  rejected: "text-coral border-coral/30 bg-coral/10",
};

const STATUS_OPTIONS: StatusKey[] = ["pending", "viewed", "accepted", "rejected"];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function CompanyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCover, setExpandedCover] = useState<Set<string>>(new Set());
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: vacancyData } = await supabase
        .from("vacancies")
        .select("id, title")
        .eq("company_id", session.user.id);

      const vacancyIds = (vacancyData ?? []).map((v) => v.id);
      if (vacancyIds.length === 0) { setLoading(false); return; }

      const vacancyMap: Record<string, { id: string; title: string }> = {};
      for (const v of vacancyData ?? []) vacancyMap[v.id] = { id: v.id, title: v.title };

      const { data: appsData } = await supabase
        .from("applications")
        .select("id, status, created_at, cover_letter, seafarer_id, vacancy_id")
        .in("vacancy_id", vacancyIds)
        .order("created_at", { ascending: false });

      if (!appsData || appsData.length === 0) { setLoading(false); return; }

      const seafarerIds = [...new Set(appsData.map((a) => a.seafarer_id).filter(Boolean))];
      const { data: seafarersData } = await supabase
        .from("seafarers")
        .select("id, first_name, last_name, photo_url, rank")
        .in("id", seafarerIds);

      const seafarerMap: Record<string, ApplicationRow["seafarers"]> = {};
      for (const s of seafarersData ?? [])
        seafarerMap[s.id] = { first_name: s.first_name, last_name: s.last_name, photo_url: s.photo_url, rank: s.rank };

      setApplications(appsData.map((a) => ({
        id: a.id, status: a.status, created_at: a.created_at,
        cover_letter: a.cover_letter, seafarer_id: a.seafarer_id,
        vacancies: vacancyMap[(a as { vacancy_id: string }).vacancy_id] ?? null,
        seafarers: seafarerMap[a.seafarer_id] ?? null,
      })));
      setLoading(false);
    }
    load();
  }, []);

  async function updateStatus(id: string, status: StatusKey) {
    setUpdatingId(id);
    const { data, error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: data.status } : a))
      );
      // Notify seafarer of status change (fire and forget)
      if (status !== "pending") {
        fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "status_changed", applicationId: id, status }),
        }).catch(() => {});
      }
    }
    setUpdatingId(null);
  }

  function toggleCover(id: string) {
    setExpandedCover((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Applications Received</h1>
        <p className="mt-1 text-sm text-mist">{applications.length} application{applications.length !== 1 ? "s" : ""}</p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Users size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">No applications yet</p>
          <p className="mt-1 text-sm text-mist">Applications from seafarers will appear here once you post vacancies.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const seafarer = app.seafarers;
            const fullName = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Unknown seafarer";
            const statusKey = (app.status as StatusKey) in STATUS_STYLES ? (app.status as StatusKey) : "pending";
            const coverExpanded = expandedCover.has(app.id);

            return (
              <div key={app.id} className="rounded-2xl border border-white/10 bg-card p-5">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    {seafarer?.photo_url ? (
                      <img
                        src={seafarer.photo_url}
                        alt={fullName}
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 font-bold text-white text-lg">
                        {fullName[0]?.toUpperCase() ?? "?"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{fullName}</p>
                          <Link
                            href={`/seafarers/${app.seafarer_id}`}
                            target="_blank"
                            title="View public profile"
                            className="text-mist hover:text-brass2 transition"
                          >
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                        {seafarer?.rank && (
                          <span className="mt-1 inline-block rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                            {seafarer.rank}
                          </span>
                        )}
                        <p className="mt-1 text-xs text-mist">
                          Vacancy: <span className="text-foam">{app.vacancies?.title ?? "—"}</span>
                        </p>
                        <p className="text-xs text-mist">Applied: {formatDate(app.created_at)}</p>
                      </div>

                      {/* Status selector */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <select
                          value={statusKey}
                          disabled={updatingId === app.id}
                          onChange={(e) => updateStatus(app.id, e.target.value as StatusKey)}
                          className={`rounded-xl border px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer disabled:opacity-50 ${STATUS_STYLES[statusKey]}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-navy2 text-white">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Cover letter */}
                    {app.cover_letter && (
                      <div className="mt-3">
                        <button
                          onClick={() => toggleCover(app.id)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-brass2 hover:text-brass transition"
                        >
                          {coverExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {coverExpanded ? "Hide cover letter" : "View cover letter"}
                        </button>
                        {coverExpanded && (
                          <div className="mt-2 rounded-xl border border-white/10 bg-navy2 p-4 text-sm text-foam/80 whitespace-pre-wrap leading-relaxed">
                            {app.cover_letter}
                          </div>
                        )}
                      </div>
                    )}
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
