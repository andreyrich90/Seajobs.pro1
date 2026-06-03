"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, Ship, Calendar, User, FileText, ChevronRight, Send } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer } from "@/lib/supabase/types";
import ContactForm from "@/components/ContactForm";

interface DashboardStats {
  seafarer: Seafarer | null;
  certCount: number;
  expCount: number;
  applicationCount: number;
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
  const [stats, setStats] = useState<DashboardStats>({
    seafarer: null,
    certCount: 0,
    expCount: 0,
    applicationCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [seafarerRes, certsRes, expRes, appRes] = await Promise.all([
        supabase.from("seafarers").select("*").eq("id", session.user.id).single(),
        supabase.from("certificates").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
        supabase.from("sea_experience").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
        supabase.from("applications").select("id", { count: "exact" }).eq("seafarer_id", session.user.id),
      ]);

      setStats({
        seafarer: seafarerRes.data,
        certCount: certsRes.count ?? 0,
        expCount: expRes.count ?? 0,
        applicationCount: appRes.count ?? 0,
      });
      setLoading(false);
    }

    loadData();
  }, []);

  const completion = calcCompletion(stats.seafarer);
  const fullName = [stats.seafarer?.first_name, stats.seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl">
      {/* Welcome card */}
      <div className="rounded-2xl border border-white/10 bg-card p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-mist mb-1">Welcome back,</p>
            <h1 className="font-display text-3xl font-semibold text-white">{fullName}</h1>
            {stats.seafarer?.rank && (
              <span className="mt-2 inline-block rounded-full bg-teal/10 border border-teal/20 px-3 py-1 text-xs font-semibold text-teal">
                {stats.seafarer.rank}
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-mist mb-1">Profile completion</p>
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
              Complete your profile to increase visibility to recruiters.{" "}
              <Link href="/seafarer/profile" className="text-brass2 hover:underline">
                Update now
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">Certificates</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brass/10">
              <Award size={18} className="text-brass2" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.certCount}</p>
          <p className="text-xs text-mist mt-1">documents stored</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">Sea Experience</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10">
              <Ship size={18} className="text-teal" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.expCount}</p>
          <p className="text-xs text-mist mt-1">voyages logged</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">Applications</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-coral/10">
              <Send size={18} className="text-coral" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-white">{stats.applicationCount}</p>
          <p className="text-xs text-mist mt-1">jobs applied to</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-mist">Ready to Sail</p>
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-teal/10">
              <Calendar size={18} className="text-teal" />
            </div>
          </div>
          <p className="font-display text-lg font-bold text-white">
            {stats.seafarer?.readiness_date
              ? new Date(stats.seafarer.readiness_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Not set"}
          </p>
          <p className="text-xs text-mist mt-1">readiness date</p>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="font-display text-xl font-semibold text-white mb-4">Quick actions</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Edit Profile", href: "/seafarer/profile", icon: User, desc: "Update your personal info" },
          { label: "Certificates", href: "/seafarer/certificates", icon: Award, desc: "Add or manage certs" },
          { label: "Experience", href: "/seafarer/experience", icon: Ship, desc: "Log sea experience" },
          { label: "Download CV", href: "/seafarer/cv", icon: FileText, desc: "Generate your CV" },
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

      {/* Contact / Suggestions */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-6">
        <ContactForm
          userId={stats.seafarer?.id ?? null}
          title="Suggestions & Contact"
          subtitle="Have a question or suggestion? Write to us — we read everything."
          compact
        />
      </div>
    </div>
  );
}
