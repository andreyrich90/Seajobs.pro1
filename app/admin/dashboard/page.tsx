"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Users, Anchor, Briefcase, MessageSquare, Newspaper, Building2, ShieldOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Stats = {
  seafarers: number;
  companies: number;
  blocked: number;
  vacancies: number;
  activeVacancies: number;
  topics: number;
  posts: number;
  news: number;
};

const STAT_CARDS = (s: Stats) => [
  { label: "Seafarers",        value: s.seafarers,       icon: Anchor,       color: "text-teal",  bg: "bg-teal/10" },
  { label: "Companies",        value: s.companies,       icon: Building2,    color: "text-brass2", bg: "bg-brass/10" },
  { label: "Blocked users",    value: s.blocked,         icon: ShieldOff,    color: "text-coral",  bg: "bg-coral/10" },
  { label: "Vacancies",        value: s.vacancies,       icon: Briefcase,    color: "text-foam",   bg: "bg-white/10" },
  { label: "Active vacancies", value: s.activeVacancies, icon: Briefcase,    color: "text-teal",  bg: "bg-teal/10" },
  { label: "Forum topics",     value: s.topics,          icon: MessageSquare,color: "text-foam",   bg: "bg-white/10" },
  { label: "Forum replies",    value: s.posts,           icon: MessageSquare,color: "text-mist",   bg: "bg-white/5"  },
  { label: "News articles",    value: s.news,            icon: Newspaper,    color: "text-brass2", bg: "bg-brass/10" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [
        { count: seafarers },
        { count: companies },
        { count: blocked },
        { count: vacancies },
        { count: activeVacancies },
        { count: topics },
        { count: posts },
        { count: news },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "seafarer"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "company"),
        supabase.from("profiles").select("*", { count: "exact", head: true }).eq("is_blocked", true),
        supabase.from("vacancies").select("*", { count: "exact", head: true }),
        supabase.from("vacancies").select("*", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("forum_topics").select("*", { count: "exact", head: true }),
        supabase.from("forum_posts").select("*", { count: "exact", head: true }),
        supabase.from("news_articles").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        seafarers: seafarers ?? 0,
        companies: companies ?? 0,
        blocked: blocked ?? 0,
        vacancies: vacancies ?? 0,
        activeVacancies: activeVacancies ?? 0,
        topics: topics ?? 0,
        posts: posts ?? 0,
        news: news ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-mist text-sm">Loading...</p>
    </div>
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-mist">Overview of SeaJobs.pro</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats && STAT_CARDS(stats).map((card) => (
          <div key={card.label} className="rounded-2xl border border-white/10 bg-card p-5 flex flex-col gap-3">
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${card.bg}`}>
              <card.icon size={20} className={card.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-mist mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6">
        <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Total registered users</h2>
        <div className="flex items-end gap-6">
          <div>
            <p className="font-display text-4xl font-bold text-white">
              {stats ? stats.seafarers + stats.companies : 0}
            </p>
            <p className="text-sm text-mist mt-1">users on the platform</p>
          </div>
          <div className="flex gap-4 pb-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
              <span className="text-sm text-foam">{stats?.seafarers} seafarers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brass2" />
              <span className="text-sm text-foam">{stats?.companies} companies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
