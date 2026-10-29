"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft, Building2, Globe, MapPin, ShieldCheck, Briefcase, DollarSign, Clock, Calendar, Phone, Mail, Users, Lock,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";
import type { CrewManager } from "@/lib/supabase/types";
import { VACANCY_COLUMNS, type BrowserVacancy as Vacancy } from "@/lib/vacancyColumns";
import { slugId } from "@/lib/slug";
import VacancyCard from "@/components/VacancyCard";
import { useLang } from "@/components/LangProvider";
import { subLock } from "@/lib/subscription";

import { money } from "@/lib/format";

type CompanyDetail = {
  id: string;
  name: string | null;
  logo_url: string | null;
  location: string | null;
  description: string | null;
  website: string | null;
  is_verified: boolean;
};

/** The company's contacts, from api/company-contacts — never from the table,
 *  which no longer hands them to logged-out visitors. A subscription opens
 *  them (lib/subscription.ts); `has` says what there is to open meanwhile. */
type CompanyContacts = {
  ok: boolean;
  error?: string;
  has?: { phones: number; emails: number; managers: number };
  phones?: string[];
  emails?: string[];
  crew_managers?: CrewManager[];
};

function formatDate(d: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: Vacancy): string {
  if (!v.salary_from && !v.salary_to) return "";
  const per = v.salary_period === "day" ? "/day" : "";
  if (v.salary_from && v.salary_to) return `${money(v.salary_from)}–${money(v.salary_to)} ${v.currency}${per}`;
  if (v.salary_from) return `from ${money(v.salary_from)} ${v.currency}${per}`;
  return `up to ${money(v.salary_to!)} ${v.currency}${per}`;
}

export default function CompanyClient() {
  const params = useParams();
  const id = params?.id as string;

  const { lang } = useLang();
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [contacts, setContacts] = useState<CompanyContacts | null>(null);
  const sub = subLock(lang);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const { data: companyData, error } = await supabase
          .from("companies")
          .select("id, name, logo_url, location, description, website, is_verified")
          .eq("id", id)
          .single();

        if (error || !companyData) { setNotFound(true); return; }
        setCompany(companyData as CompanyDetail);

        // Contacts per reader, after the page: the route decides who sees them.
        const { data: { session } } = await supabase.auth.getSession();
        fetch(`/api/company-contacts?id=${id}`, {
          headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
          cache: "no-store",
        })
          .then((r) => r.json())
          .then((j: CompanyContacts) => setContacts(j))
          .catch(() => { /* stays without contacts */ });

        // Keep vacancies for 2 weeks after the joining date (grace period).
        const cutoff = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10);
        const { data: vacancyData } = await supabase
          .from("vacancies")
          .select(VACANCY_COLUMNS)
          .eq("company_id", id)
          .eq("is_active", true)
          .or(`joining_date.is.null,joining_date.gte.${cutoff}`)
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
          <Link href="/jobs" className="text-sm text-brassInk hover:underline">Browse vacancies</Link>
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
                  <Image src={company.logo_url} alt={company.name ?? ""} width={80} height={80} className="h-20 w-20 rounded-2xl border border-white/10 bg-white object-contain p-1.5 mb-4" />
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
                    className="flex items-center gap-2 text-sm text-brassInk hover:text-brass transition">
                    <Globe size={14} className="shrink-0" />
                    Visit website
                  </a>
                )}
                {contacts?.ok && contacts.phones?.filter(Boolean).map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-sm text-mist hover:text-white transition">
                    <Phone size={14} className="shrink-0 text-mist/60" />
                    {p}
                  </a>
                ))}
                {contacts?.ok && contacts.emails?.filter(Boolean).map((m) => (
                  <a key={m} href={`mailto:${m}`}
                    className="flex items-center gap-2 text-sm text-brassInk hover:text-brass transition break-all">
                    <Mail size={14} className="shrink-0 text-mist/60" />
                    {m}
                  </a>
                ))}
              </div>

              {/* What a subscription would open, when there is something to open. */}
              {contacts && !contacts.ok && contacts.has && (contacts.has.phones + contacts.has.emails + contacts.has.managers > 0) && (
                <div className="mt-5 rounded-xl border border-brass/30 bg-brass/10 p-4 text-left">
                  <p className="flex items-center gap-2 text-sm font-semibold text-foam">
                    <Lock size={14} className="shrink-0 text-brassInk" /> {sub.lockCompany}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1 text-xs text-mist">
                    {contacts.has.phones > 0 && <li className="flex items-center gap-1.5"><Phone size={11} /> <span className="select-none blur-[4px]">+00 000 000 00</span></li>}
                    {contacts.has.emails > 0 && <li className="flex items-center gap-1.5"><Mail size={11} /> <span className="select-none blur-[4px]">crewing@agency.com</span></li>}
                    {contacts.has.managers > 0 && <li className="flex items-center gap-1.5"><Users size={11} /> {contacts.has.managers}</li>}
                  </ul>
                  {/* Sign-up sits outside the locale tree; the cabinet inside it. */}
                  {contacts.error === "SIGN_IN" ? (
                    <a
                      href="/auth/register?role=seafarer"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-xs font-bold text-[#061523] transition hover:-translate-y-0.5"
                    >
                      {sub.cta}
                    </a>
                  ) : contacts.error === "SUBSCRIPTION_REQUIRED" ? (
                    <Link
                      href="/seafarer/subscription"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-xs font-bold text-[#061523] transition hover:-translate-y-0.5"
                    >
                      {sub.cta}
                    </Link>
                  ) : null}
                </div>
              )}

              {company.description && (
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-sm text-mist leading-relaxed">{company.description}</p>
                </div>
              )}

              {contacts?.ok && contacts.crew_managers && contacts.crew_managers.filter((m) => m.name || m.phone || m.email).length > 0 && (
                <div className="mt-5 border-t border-white/10 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Users size={14} className="text-brassInk" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-mist">Crew managers</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {contacts.crew_managers
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
                              className="mt-0.5 flex items-center gap-1.5 text-xs text-brassInk hover:text-brass transition break-all">
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
              <Briefcase size={18} className="text-brassInk" />
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
                {vacancies.map((v) => (
                  <VacancyCard key={v.id} vacancy={{ ...v, companies: company }} lang={lang} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
