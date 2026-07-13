"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Building2, Bookmark, Trash2, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

type SavedRow = {
  vacancy_id: string;
  created_at: string;
  vacancies: {
    id: string;
    title: string;
    rank: string | null;
    vessel_type: string | null;
    salary_from: number | null;
    salary_to: number | null;
    salary_period: string | null;
    currency: string;
    contract_duration: string | null;
    joining_date: string | null;
    companies: {
      name: string | null;
      logo_url: string | null;
      location: string | null;
      is_verified: boolean;
    } | null;
  } | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: SavedRow["vacancies"]): string {
  if (!v) return "";
  if (!v.salary_from && !v.salary_to) return "";
  const per = v.salary_period === "day" ? "/day" : "";
  if (v.salary_from && v.salary_to)
    return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}${per}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${v.currency}${per}`;
  return `up to ${v.salary_to!.toLocaleString()} ${v.currency}${per}`;
}

export default function SavedJobsPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("saved_vacancies")
        .select("vacancy_id, created_at, vacancies(id, title, rank, vessel_type, salary_from, salary_to, salary_period, currency, contract_duration, joining_date, companies(name, logo_url, location, is_verified))")
        .eq("seafarer_id", session.user.id)
        .order("created_at", { ascending: false });

      setSaved((data as SavedRow[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleUnsave(vacancyId: string) {
    if (!userId) return;
    const { error } = await supabase
      .from("saved_vacancies")
      .delete()
      .eq("vacancy_id", vacancyId)
      .eq("seafarer_id", userId);
    if (!error) setSaved((prev) => prev.filter((s) => s.vacancy_id !== vacancyId));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">{t.cab_loading}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">{t.sav_title}</h1>
        <p className="mt-1 text-sm text-mist">{saved.length} {t.sav_count}</p>
      </div>

      {saved.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Bookmark size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">{t.sav_empty}</p>
          <p className="mt-1 text-sm text-mist">{t.sav_empty_sub}</p>
          <Link
            href="/jobs"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {saved.map((s) => {
            const v = s.vacancies;
            const salary = formatSalary(v);

            return (
              <div
                key={s.vacancy_id}
                className="group rounded-2xl border border-white/10 bg-card p-5 flex items-start gap-4 hover:border-white/20 transition"
              >
                {/* Company logo */}
                <div className="shrink-0">
                  {v?.companies?.logo_url ? (
                    <Image
                      src={v.companies.logo_url}
                      alt={v.companies.name ?? ""}
                      width={48}
                      height={48}
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
                        <p className="text-xs text-mist">{v?.companies?.name ?? t.app_unknown}</p>
                        {v?.companies?.is_verified && <ShieldCheck size={12} className="text-teal" />}
                        {v?.companies?.location && (
                          <span className="text-xs text-mist/60">· {v.companies.location}</span>
                        )}
                      </div>
                      {v ? (
                        <Link
                          href={`/jobs/${v.id}`}
                          className="mt-0.5 block font-semibold text-white hover:text-brass2 transition"
                        >
                          {v.title}
                        </Link>
                      ) : (
                        <p className="mt-0.5 font-semibold text-mist">{t.sav_unavailable}</p>
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

                    <div className="shrink-0 text-right">
                      {salary && <p className="text-sm font-bold text-white">{salary}</p>}
                      {v?.contract_duration && (
                        <p className="text-xs text-mist mt-0.5">{v.contract_duration}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-wrap gap-4 text-xs text-mist">
                      {v?.joining_date && <span>Joining: {formatDate(v.joining_date)}</span>}
                      <span>Saved: {formatDate(s.created_at)}</span>
                    </div>
                    <button
                      onClick={() => handleUnsave(s.vacancy_id)}
                      title={t.sav_remove}
                      className="flex items-center gap-1.5 rounded-lg border border-coral/20 bg-coral/10 px-2.5 py-1 text-xs font-semibold text-coral hover:bg-coral/20 transition"
                    >
                      <Trash2 size={12} /> Remove
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
