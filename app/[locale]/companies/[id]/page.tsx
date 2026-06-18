"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft, Building2, Globe, MapPin, ShieldCheck, Briefcase, DollarSign, Clock, Calendar, Phone, Mail, Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";
import type { Vacancy, CrewManager } from "@/lib/supabase/types";

type CompanyDetail = {
  id: string;
  name: string | null;
  logo_url: string | null;
  location: string | null;
  description: string | null;
  website: string | null;
  phones: string[] | null;
  emails: string[] | null;
  crew_managers: CrewManager[] | null;
  is_verified: boolean;
};

function formatDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: Vacancy): string {
  if (!v.salary_from && !v.salary_to) return "";
  if (v.salary_from && v.salary_to) return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${v.currency}`;
  return `up to ${v.salary_to!.toLocaleString()} ${v.currency}`;
}

export default function PublicCompanyPage() {
  const params = useParams();
  const id = params?.id as string;

  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const { data: companyData, error } = await supabase
          .from("companies")
          .select("id, name, logo_url, location, description, website, phones, emails, crew_managers, is_verified")
          .eq("id", id)
          .single();

        if (error || !companyData) { setNotFound(true); return; }
        setCompany(companyData as CompanyDetail);

        const { data: vacancyData } = await supabase
          .from("vacancies")
          .select("*")
          .eq("company_id", id)
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        setVacancies((vacancyData as Vacancy[]) ?? []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center"><p className="text-mist text-sm">Loading...</p></div>
        <Footer />
      </div>
    );
  }

  if (notFound || !company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-16">
          <Building2 size={40} className="text-mist/30" />
          <p className="text-lg font-semibold text-foam">Company not found</p>
          <Link href="/jobs" className="text-sm text-brass2 hover:underline">Browse vacancies</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-5 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-mist hover:text-white transition mb-6">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-card p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                {company.logo_url ? (
                  <img src={company.logo_url} alt={company.name ?? ""} className="h-20 w-20 rounded-2xl object-cover mb-4" />
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 mb-4">
                    <Building2 size={32} className="text-mist" />
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <h1 className="font-display text-xl font-semibold text-white">{company.name ?? "Company"}</h1>
                  {company.is_verified && <ShieldCheck size={16} className="text-teal shrink-0" />}
                </div>
                {company.is_verified && (
                  <span className="mt-1.5 text-xs font-semibold text-teal">Verified Agency</span>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {company.location && (
                  <div className="flex items-center gap-2 text-sm text-mist">
                    <MapPin size={14} className="shrink-0 text-mist/60" />
                    {company.location}
                  </div>
                )}
                {company.website && (
                  <a href={company.website} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-brass2 hover:text-brass transition">
                    <Globe size={14} className="shrink-0" />
                    Visit website
                  </a>
                )}
                {company.phones?.filter(Boolean).map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-sm text-mist hover:text-white transition">
                    <Phone size={14} className="shrink-0 text-mist/60" />
                    {p}
                  </a>
                ))}
                {company.emails?.filter(Boolean).map((m) => (
                  <a key={m} href={`mailto:${m}`}
                    className="flex items-center gap-2 text-sm text-brass2 hover:text-brass transition break-all">
                    <Mail size={14} className="shrink-0 text-mist/60" />
                    {m}
                  </a>
                ))}
              </div>

              {company.description && (
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-sm text-mist leading-relaxed">{company.description}</p>
                </div>
              )}

              {company.crew_managers && company.crew_managers.filter((m) => m.name || m.phone || m.email).length > 0 && (
                <div className="mt-5 border-t border-white/10 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Users size={14} className="text-brass2" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-mist">Crew managers</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {company.crew_managers
                      .filter((m) => m.name || m.phone || m.email)
                      .map((m, i) => (
                        <div key={i} className="rounded-xl border border-white/10 bg-navy2/40 p-3 text-left">
                          {m.name && <p className="text-sm font-semibold text-white">{m.name}</p>}
                          {m.department && <p className="text-xs text-teal">{m.department}</p>}
                          {m.phone && (
                            <a href={`tel:${m.phone.replace(/\s+/g, "")}`}
                              className="mt-1 flex items-center gap-1.5 text-xs text-mist hover:text-white transition">
                              <Phone size={11} className="shrink-0 text-mist/60" />{m.phone}
                            </a>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`}
                              className="mt-0.5 flex items-center gap-1.5 text-xs text-brass2 hover:text-brass transition break-all">
                              <Mail size={11} className="shrink-0 text-mist/60" />{m.email}
                            </a>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vacancies */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={18} className="text-brass2" />
              <h2 className="font-display text-xl font-semibold text-white">
                Open Positions
              </h2>
              <span className="ml-auto text-sm text-mist">{vacancies.length} active</span>
            </div>

            {vacancies.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-card p-10 text-center">
                <Briefcase size={32} className="mx-auto mb-3 text-mist/30" />
                <p className="text-sm text-mist">No active vacancies at the moment.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {vacancies.map((v) => {
                  const salary = formatSalary(v);
                  return (
                    <Link key={v.id} href={`/jobs/${v.id}`}
                      className="group rounded-2xl border border-white/10 bg-card p-5 transition hover:border-white/20">
                      <h3 className="font-semibold text-white group-hover:text-brass2 transition">{v.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {v.rank && (
                          <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                            {v.rank}
                          </span>
                        )}
                        {v.vessel_type && (
                          <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                            {v.vessel_type}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-mist">
                        {salary && (
                          <span className="flex items-center gap-1"><DollarSign size={12} />{salary}</span>
                        )}
                        {v.contract_duration && (
                          <span className="flex items-center gap-1"><Clock size={12} />{v.contract_duration}</span>
                        )}
                        {v.joining_date && (
                          <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(v.joining_date)}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
