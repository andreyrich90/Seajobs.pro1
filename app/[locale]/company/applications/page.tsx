"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Users, ChevronDown, ChevronUp, ExternalLink, ChevronLeft, ChevronRight, X, RotateCcw, FileText,
} from "lucide-react";
import { supabase, notify } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";
import ApplicantCvModal from "@/components/ApplicantCvModal";

type ApplicationRow = {
  id: string;
  status: string;
  stage: string;
  created_at: string;
  cover_letter: string | null;
  seafarer_id: string;
  vacancyTitle: string | null;
  seafarer: {
    first_name: string | null;
    last_name: string | null;
    photo_url: string | null;
    rank: string | null;
  } | null;
};

// Ordered ATS pipeline (Kanban columns). "rejected" is handled separately.
const PIPELINE = ["new", "interview", "offer", "onboard"] as const;
type Stage = (typeof PIPELINE)[number] | "rejected";

const COLUMNS: { key: Stage; labelKey: string; accent: string }[] = [
  { key: "new", labelKey: "kb_col_new", accent: "border-t-mist/50" },
  { key: "interview", labelKey: "kb_col_interview", accent: "border-t-brass2" },
  { key: "offer", labelKey: "kb_col_offer", accent: "border-t-teal" },
  { key: "onboard", labelKey: "kb_col_onboard", accent: "border-t-green-400" },
  { key: "rejected", labelKey: "kb_col_rejected", accent: "border-t-coral" },
];

// How a pipeline stage maps to the seafarer-facing status (+ which notify).
const STATUS_FOR_STAGE: Record<Stage, string> = {
  new: "pending",
  interview: "viewed",
  offer: "accepted",
  onboard: "accepted",
  rejected: "rejected",
};
const NOTIFY_STAGES = new Set<Stage>(["interview", "offer", "rejected"]);

function normalizeStage(s: string | null | undefined): Stage {
  return (COLUMNS.find((c) => c.key === s)?.key as Stage) ?? "new";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function CompanyApplicationsPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCover, setExpandedCover] = useState<Set<string>>(new Set());
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cvFor, setCvFor] = useState<{ seafarerId: string; fullName: string } | null>(null);

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

      const vacancyMap: Record<string, string> = {};
      for (const v of vacancyData ?? []) vacancyMap[v.id] = v.title;

      const { data: appsData } = await supabase
        .from("applications")
        .select("id, status, stage, created_at, cover_letter, seafarer_id, vacancy_id")
        .in("vacancy_id", vacancyIds)
        .order("created_at", { ascending: false });

      if (!appsData || appsData.length === 0) { setLoading(false); return; }

      const seafarerIds = [...new Set(appsData.map((a) => a.seafarer_id).filter(Boolean))];
      const { data: seafarersData } = await supabase
        .from("seafarers")
        .select("id, first_name, last_name, photo_url, rank")
        .in("id", seafarerIds);

      const seafarerMap: Record<string, ApplicationRow["seafarer"]> = {};
      for (const s of seafarersData ?? [])
        seafarerMap[s.id] = { first_name: s.first_name, last_name: s.last_name, photo_url: s.photo_url, rank: s.rank };

      setApplications(
        appsData.map((a) => ({
          id: a.id,
          status: a.status,
          stage: normalizeStage((a as { stage?: string }).stage),
          created_at: a.created_at,
          cover_letter: a.cover_letter,
          seafarer_id: a.seafarer_id,
          vacancyTitle: vacancyMap[(a as { vacancy_id: string }).vacancy_id] ?? null,
          seafarer: seafarerMap[a.seafarer_id] ?? null,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  async function moveTo(id: string, stage: Stage) {
    setUpdatingId(id);
    const status = STATUS_FOR_STAGE[stage];
    const { error } = await supabase
      .from("applications")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ stage, status } as any)
      .eq("id", id);

    if (!error) {
      setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, stage, status } : a)));
      if (NOTIFY_STAGES.has(stage)) {
        notify({ type: "status_changed", applicationId: id, status });
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
        <p className="text-mist text-sm">{t.kb_loading}</p>
      </div>
    );
  }

  const total = applications.length;

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">{t.kb_title}</h1>
        <p className="mt-1 text-sm text-mist">
          {total} {total !== 1 ? t.kb_candidates : t.kb_candidate} · {t.kb_move_hint}
        </p>
      </div>

      {total === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Users size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">{t.kb_empty}</p>
          <p className="mt-1 text-sm text-mist">{t.kb_empty_sub}</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const cards = applications.filter((a) => normalizeStage(a.stage) === col.key);
            const idx = PIPELINE.indexOf(col.key as (typeof PIPELINE)[number]);
            return (
              <div
                key={col.key}
                className={`w-[280px] shrink-0 rounded-2xl border border-white/10 border-t-4 ${col.accent} bg-card/60`}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <h2 className="text-sm font-bold text-white">{t[col.labelKey]}</h2>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-mist">
                    {cards.length}
                  </span>
                </div>

                <div className="flex flex-col gap-3 px-3 pb-3">
                  {cards.length === 0 && (
                    <p className="px-1 py-6 text-center text-xs text-mist/50">—</p>
                  )}
                  {cards.map((app) => {
                    const fullName =
                      [app.seafarer?.first_name, app.seafarer?.last_name].filter(Boolean).join(" ") ||
                      t.kb_unknown;
                    const coverExpanded = expandedCover.has(app.id);
                    const busy = updatingId === app.id;

                    return (
                      <div key={app.id} className="rounded-xl border border-white/10 bg-card p-3">
                        <div className="flex items-start gap-3">
                          {app.seafarer?.photo_url ? (
                            <Image src={app.seafarer.photo_url} alt={fullName} width={40} height={40} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                          ) : (
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-sm font-bold text-white">
                              {fullName[0]?.toUpperCase() ?? "?"}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-sm font-semibold text-white">{fullName}</p>
                              <Link
                                href={`/seafarers/${app.seafarer_id}`}
                                target="_blank"
                                title={t.kb_view_profile}
                                className="shrink-0 text-mist transition hover:text-brass2"
                              >
                                <ExternalLink size={13} />
                              </Link>
                            </div>
                            {app.seafarer?.rank && (
                              <p className="truncate text-xs text-brass2">{app.seafarer.rank}</p>
                            )}
                          </div>
                        </div>

                        <p className="mt-2 truncate text-xs text-mist">{app.vacancyTitle ?? "—"}</p>
                        <p className="text-[11px] text-mist/70">{formatDate(app.created_at)}</p>

                        <button
                          onClick={() => setCvFor({ seafarerId: app.seafarer_id, fullName })}
                          className="mt-2 flex items-center gap-1.5 rounded-lg border border-brass/30 bg-brass/10 px-2.5 py-1 text-[11px] font-semibold text-brass2 transition hover:bg-brass/20"
                        >
                          <FileText size={12} /> {t.kb_view_cv}
                        </button>

                        {app.cover_letter && (
                          <>
                            <button
                              onClick={() => toggleCover(app.id)}
                              className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-brass2 hover:text-brass"
                            >
                              {coverExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                              {coverExpanded ? t.kb_hide_letter : t.kb_cover_letter}
                            </button>
                            {coverExpanded && (
                              <div className="mt-1.5 max-h-40 overflow-auto rounded-lg border border-white/10 bg-navy2 p-2.5 text-xs leading-relaxed text-foam/80 whitespace-pre-wrap">
                                {app.cover_letter}
                              </div>
                            )}
                          </>
                        )}

                        {/* Move controls */}
                        <div className="mt-3 flex items-center gap-1.5">
                          {col.key === "rejected" ? (
                            <button
                              onClick={() => moveTo(app.id, "new")}
                              disabled={busy}
                              className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-mist transition hover:bg-white/10 disabled:opacity-50"
                            >
                              <RotateCcw size={12} /> {t.kb_restore}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => moveTo(app.id, PIPELINE[idx - 1])}
                                disabled={busy || idx <= 0}
                                title={t.kb_move_back}
                                className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/5 text-mist transition hover:bg-white/10 disabled:opacity-30"
                              >
                                <ChevronLeft size={14} />
                              </button>
                              <button
                                onClick={() => moveTo(app.id, PIPELINE[idx + 1])}
                                disabled={busy || idx >= PIPELINE.length - 1}
                                title={t.kb_advance}
                                className="grid h-7 w-7 place-items-center rounded-lg border border-brass/30 bg-brass/10 text-brass2 transition hover:bg-brass/20 disabled:opacity-30"
                              >
                                <ChevronRight size={14} />
                              </button>
                              <button
                                onClick={() => moveTo(app.id, "rejected")}
                                disabled={busy}
                                title={t.kb_reject}
                                className="ml-auto grid h-7 w-7 place-items-center rounded-lg border border-coral/30 bg-coral/10 text-coral transition hover:bg-coral/20 disabled:opacity-50"
                              >
                                <X size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cvFor && (
        <ApplicantCvModal
          seafarerId={cvFor.seafarerId}
          fullName={cvFor.fullName}
          onClose={() => setCvFor(null)}
        />
      )}
    </div>
  );
}
