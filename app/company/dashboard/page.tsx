"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Building2, Briefcase, Plus, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function CompanyDashboardPage() {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [activeVacancies, setActiveVacancies] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [{ data: company }, { data: vacancies }] = await Promise.all([
        supabase.from("companies").select("name").eq("id", session.user.id).single(),
        supabase.from("vacancies").select("is_active").eq("company_id", session.user.id),
      ]);

      setCompanyName(company?.name ?? null);
      setTotalVacancies(vacancies?.length ?? 0);
      setActiveVacancies(vacancies?.filter((v) => v.is_active).length ?? 0);
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
          Welcome{companyName ? `, ${companyName}` : ""}!
        </h1>
        <p className="mt-1 text-sm text-mist">Manage your vacancies and company profile.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-card p-6 flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brass/10">
            <Briefcase size={22} className="text-brass2" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalVacancies}</p>
            <p className="text-sm text-mist">Total vacancies</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-6 flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10">
            <CheckCircle size={22} className="text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{activeVacancies}</p>
            <p className="text-sm text-mist">Active vacancies</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/company/vacancies"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            <Plus size={16} /> Post a vacancy
          </Link>
          <Link
            href="/company/profile"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Building2 size={16} /> Edit company profile
          </Link>
        </div>

        {totalVacancies === 0 && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-brass/20 bg-brass/5 px-4 py-3">
            <Clock size={16} className="mt-0.5 shrink-0 text-brass2" />
            <p className="text-sm text-brass2">
              You haven&apos;t posted any vacancies yet. Post your first job to start finding crew.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
