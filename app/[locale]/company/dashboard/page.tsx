"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Building2, Briefcase, Plus, CheckCircle, Clock, Users } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import ContactForm from "@/components/ContactForm";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

export default function CompanyDashboardPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [activeVacancies, setActiveVacancies] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [{ data: company }, { data: vacancies }] = await Promise.all([
        supabase.from("companies").select("name").eq("id", session.user.id).single(),
        supabase.from("vacancies").select("id, is_active").eq("company_id", session.user.id),
      ]);

      setCompanyName(company?.name ?? null);
      setTotalVacancies(vacancies?.length ?? 0);
      setActiveVacancies(vacancies?.filter((v) => v.is_active).length ?? 0);

      const vacancyIds = (vacancies ?? []).map((v) => v.id);
      if (vacancyIds.length > 0) {
        const { count } = await supabase
          .from("applications")
          .select("id", { count: "exact" })
          .in("vacancy_id", vacancyIds);
        setApplicationsCount(count ?? 0);
      }

      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">
          {t.co_welcome}{companyName ? `, ${companyName}` : ""}!
        </h1>
        <p className="mt-1 text-sm text-mist">{t.co_subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Briefcase,    bg: "bg-brass/10",  color: "text-brass2", value: totalVacancies,   label: t.co_vacancies },
          { icon: CheckCircle,  bg: "bg-teal/10",   color: "text-teal",   value: activeVacancies,  label: t.co_active },
          { icon: Users,        bg: "bg-coral/10",  color: "text-coral",  value: applicationsCount, label: t.co_responses },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-card p-4 flex flex-col gap-3">
            <div className={`grid h-9 w-9 place-items-center rounded-xl ${card.bg}`}>
              <card.icon size={18} className={card.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-mist mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.co_quick_actions}</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/company/vacancies"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            <Plus size={16} /> {t.co_post_vacancy}
          </Link>
          <Link
            href="/company/profile"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Building2 size={16} /> {t.co_edit_profile}
          </Link>
        </div>

        {totalVacancies === 0 && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-brass/20 bg-brass/5 px-4 py-3">
            <Clock size={16} className="mt-0.5 shrink-0 text-brass2" />
            <p className="text-sm text-brass2">{t.co_no_vacancies}</p>
          </div>
        )}
      </div>

      {/* Contact / Suggestions */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6">
        <ContactForm title={t.co_suggestions_title} subtitle={t.co_suggestions_subtitle} compact />
      </div>
    </div>
  );
}
