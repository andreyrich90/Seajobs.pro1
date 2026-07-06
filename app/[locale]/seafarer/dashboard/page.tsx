"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Award, Ship, Calendar, User, FileText, ChevronRight, Send, Bell, BellOff, Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer } from "@/lib/supabase/types";
import ContactForm from "@/components/ContactForm";
import { T, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

const DATE_LOCALES: Record<Lang, string> = { ua: "uk-UA", pl: "pl-PL", ru: "ru-RU", en: "en-GB", ro: "ro-RO" };

interface DashboardStats {
  seafarer: Seafarer | null;
  certCount: number;
  expCount: number;
  applicationCount: number;
  hasJobAlert: boolean;
}

function calcCompletion(seafarer: Seafarer | null): number {
  if (!seafarer) return 0;
  const fields: (keyof Seafarer)[] = [
    "first_name",
    "last_name",
    "nationality",
    "date_of_birth",
    "phone",
    "rank",
    "readiness_date",
    "about",
    "photo_url",
  ];
  const filled = fields.filter((f) => seafarer[f] !== null && seafarer[f] !== "").length;
  return Math.round((filled / fields.length) * 100);
}

export default function DashboardPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [stats, setStats] = useState<DashboardStats>({
    seafarer: null,
    certCount: 0,
    expCount: 0,
    applicationCount: 0,
    hasJobAlert: false,
  });
  const [loading, setLoading] = useState(true);
  const [alertToggling, setAlertToggling] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [seafarerRes, certsRes, expRes, appRes, alertRes] = await Promise.all([
        supabase.from("seafarers").select("*").eq("id", session.user.id).single(),
        supabase.from("certificates").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
        supabase.from("sea_experience").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
        supabase.from("applications").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
        supabase.from("job_alerts").select("seafarer_id").eq("seafarer_id", session.user.id).maybeSingle(),
      ]);

      setStats({
        seafarer: seafarerRes.data,
        certCount: certsRes.count ?? 0,
        expCount: expRes.count ?? 0,
        applicationCount: appRes.count ?? 0,
        hasJobAlert: !!alertRes.data,
      });
      setLoading(false);
    }

    loadData();
  }, []);

  const completion = calcCompletion(stats.seafarer);
  const fullName = [stats.seafarer?.first_name, stats.seafarer?.last_name].filter(Boolean).join(" ") || t.dash_seafarer_default;

  async function toggleJobAlert() {
    if (!stats.seafarer?.id || alertToggling) return;
    const rank = stats.seafarer.rank;
    if (!rank && !stats.hasJobAlert) return;
    setAlertToggling(true);
    if (stats.hasJobAlert) {
      await supabase.from("job_alerts").delete().eq("seafarer_id", stats.seafarer.id);
      setStats((prev) => ({ ...prev, hasJobAlert: false }));
    } else {
      await supabase.from("job_alerts").upsert({ seafarer_id: stats.seafarer.id, rank: rank! });
      setStats((prev) => ({ ...prev, hasJobAlert: true }));
    }
    setAlertToggling(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">{t.cab_loading}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Welcome card */}
      <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-mist mb-1">{t.dash_welcome}</p>
            <h1 className="font-display text-3xl font-semibold text-white">{fullName}</h1>
            {stats.seafarer?.rank && (
              <span className="mt-2 inline-block rounded-full bg-teal/10 border border-teal/20 px-3 py-1 text-xs font-semibold text-teal">
                {stats.seafarer.rank}
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-mist mb-1">{t.dash_profile_completion}</p>
            <p className="font-display text-3xl font-bold text-brass2">{completion}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-white/5">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-brass to-brass2 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          {completion < 100 && (
            <p className="mt-2 text-xs text-mist">
              {t.dash_complete_profile}{" "}
              <Link href="/seafarer/profile" className="text-brass2 hover:underline">
                {t.dash_update_now}
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Browse jobs CTA */}
      <Link
        href="/jobs"
        className="group mb-6 flex items-center justify-between gap-4 rounded-2xl border border-brass/30 bg-gradient-to-br from-brass/15 to-brass2/5 p-5 transition hover:border-brass/50 hover:from-brass/20"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shrink-0">
            <Search size={20} className="text-deep" />
          </div>
          <div>
            <p className="font-semibold text-white">{t.dash_browse_jobs}</p>
            <p className="text-xs text-mist">{t.dash_browse_jobs_desc}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-brass2 shrink-0 transition group-hover:translate-x-0.5" />
      </Link>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">{t.dash_certificates}</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brass/10">
              <Award size={18} className="text-brass2" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.certCount}</p>
          <p className="text-xs text-mist mt-1">{t.dash_documents_stored}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">{t.dash_sea_experience}</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10">
              <Ship size={18} className="text-teal" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.expCount}</p>
          <p className="text-xs text-mist mt-1">{t.dash_voyages_logged}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">{t.dash_applications}</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-coral/10">
              <Send size={18} className="text-coral" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.applicationCount}</p>
          <p className="text-xs text-mist mt-1">{t.dash_jobs_applied}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">{t.dash_ready_to_sail}</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10">
              <Calendar size={18} className="text-teal" />
            </div>
          </div>
          <p className="font-display text-lg font-bold text-white">
            {stats.seafarer?.readiness_date
              ? new Date(stats.seafarer.readiness_date).toLocaleDateString(DATE_LOCALES[lang], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : t.dash_not_set}
          </p>
          <p className="text-xs text-mist mt-1">{t.dash_readiness_date}</p>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="font-display text-xl font-semibold text-white mb-4">{t.dash_quick_actions}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t.dash_edit_profile, href: "/seafarer/profile", icon: User, desc: t.dash_edit_profile_desc },
          { label: t.dash_certificates, href: "/seafarer/certificates", icon: Award, desc: t.dash_certificates_desc },
          { label: t.dash_experience, href: "/seafarer/experience", icon: Ship, desc: t.dash_experience_desc },
          { label: t.dash_download_cv, href: "/seafarer/cv", icon: FileText, desc: t.dash_download_cv_desc },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-card p-4 transition hover:border-brass/30 hover:bg-navy2"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                <action.icon size={18} className="text-brass2" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{action.label}</p>
                <p className="text-xs text-mist">{action.desc}</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-mist group-hover:text-brass2 transition" />
          </Link>
        ))}
      </div>

      {/* Job Alert */}
      <div className={`mt-6 rounded-2xl border p-6 flex items-center justify-between gap-4 ${
        stats.hasJobAlert
          ? "border-brass/30 bg-brass/5"
          : "border-white/10 bg-card"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-xl shrink-0 ${
            stats.hasJobAlert ? "bg-brass/20" : "bg-white/5"
          }`}>
            {stats.hasJobAlert
              ? <Bell size={18} className="text-brass2" />
              : <BellOff size={18} className="text-mist" />
            }
          </div>
          <div>
            <p className="font-semibold text-white">{t.dash_job_alerts}</p>
            {stats.hasJobAlert ? (
              <p className="text-xs text-brass2">
                {t.dash_alert_active.split("{rank}")[0]}
                <strong>{stats.seafarer?.rank}</strong>
                {t.dash_alert_active.split("{rank}")[1]}
              </p>
            ) : stats.seafarer?.rank ? (
              <p className="text-xs text-mist">
                {t.dash_alert_get_notified.split("{rank}")[0]}
                <strong className="text-foam">{stats.seafarer.rank}</strong>
                {t.dash_alert_get_notified.split("{rank}")[1]}
              </p>
            ) : (
              <p className="text-xs text-mist">
                {t.dash_alert_set_rank.split("{link}")[0]}
                <Link href="/seafarer/profile" className="text-brass2 hover:underline">{t.dash_alert_set_rank_link}</Link>
                {t.dash_alert_set_rank.split("{link}")[1]}
              </p>
            )}
          </div>
        </div>
        {stats.seafarer?.rank && (
          <button
            onClick={toggleJobAlert}
            disabled={alertToggling}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
              stats.hasJobAlert
                ? "border border-coral/30 bg-coral/10 text-coral hover:bg-coral/20"
                : "bg-gradient-to-br from-brass to-brass2 text-deep hover:-translate-y-0.5"
            }`}
          >
            {alertToggling ? "…" : stats.hasJobAlert ? t.dash_disable : t.dash_enable}
          </button>
        )}
      </div>

      {/* Contact / Suggestions */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6">
        <ContactForm
          userId={stats.seafarer?.id ?? null}
          title={t.dash_suggestions_title}
          subtitle={t.dash_suggestions_subtitle}
          compact
        />
      </div>
    </div>
  );
}
