"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import {
  ArrowLeft, Building2, ShieldCheck, Globe, MapPin,
  Briefcase, DollarSign, Clock, Calendar,
  Bookmark, BookmarkCheck, Send, X, AlertCircle, ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, notify } from "@/lib/supabase/client";

export type VacancyDetail = {
  id: string;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  salary_from: number | null;
  salary_to: number | null;
  currency: string;
  contract_duration: string | null;
  joining_date: string | null;
  description: string | null;
  views_count: number;
  created_at: string;
  is_imported?: boolean;
  source_url?: string | null;
  contact_email?: string | null;
  companies: {
    id: string;
    name: string | null;
    logo_url: string | null;
    location: string | null;
    website: string | null;
    is_verified: boolean;
  } | null;
};

type ApplicationStatus = "pending" | "viewed" | "accepted" | "rejected";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: "text-mist border-mist/30 bg-mist/10",
  viewed: "text-brass2 border-brass2/30 bg-brass2/10",
  accepted: "text-teal border-teal/30 bg-teal/10",
  rejected: "text-coral border-coral/30 bg-coral/10",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(v: VacancyDetail): string {
  if (!v.salary_from && !v.salary_to) return "";
  if (v.salary_from && v.salary_to)
    return `${v.salary_from.toLocaleString()}–${v.salary_to.toLocaleString()} ${v.currency}`;
  if (v.salary_from) return `from ${v.salary_from.toLocaleString()} ${v.currency}`;
  return `up to ${v.salary_to!.toLocaleString()} ${v.currency}`;
}

export default function VacancyDetailClient({ vacancy }: { vacancy: VacancyDetail }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"seafarer" | "company" | null>(null);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [savingToggle, setSavingToggle] = useState(false);

  useEffect(() => {
    async function loadAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id ?? null;
      setUserId(uid);

      const role = (localStorage.getItem("user_role") as "seafarer" | "company" | null);
      setUserRole(role);

      // Increment views (fire & forget)
      supabase.rpc("increment_vacancy_views", { vid: vacancy.id }).then(() => {});

      if (uid && role === "seafarer") {
        const [{ data: appData }, { data: savedData }] = await Promise.all([
          supabase.from("applications").select("status").eq("vacancy_id", vacancy.id).eq("seafarer_id", uid).maybeSingle(),
          supabase.from("saved_vacancies").select("vacancy_id").eq("vacancy_id", vacancy.id).eq("seafarer_id", uid).maybeSingle(),
        ]);
        if (appData) setApplicationStatus(appData.status as ApplicationStatus);
        setSaved(!!savedData);
      }
    }
    loadAuth();
  }, [vacancy.id]);

  async function handleApply() {
    if (!userId) return;
    setApplying(true);
    setApplyError(null);

    const { error } = await supabase.from("applications").insert({
      vacancy_id: vacancy.id,
      seafarer_id: userId,
      cover_letter: coverLetter.trim() || null,
      status: "pending",
    });

    if (error) {
      setApplyError(error.message);
      setApplying(false);
      return;
    }

    if (vacancy.contact_email) {
      notify({ type: "external_application", vacancyId: vacancy.id, seafarerId: userId });
    } else {
      notify({ type: "application_received", vacancyId: vacancy.id, seafarerId: userId });
    }
    setApplicationStatus("pending");
    setShowModal(false);
    setCoverLetter("");
    setApplying(false);
  }

  async function toggleSave() {
    if (!userId || savingToggle) return;
    setSavingToggle(true);

    if (saved) {
      await supabase.from("saved_vacancies").delete().eq("vacancy_id", vacancy.id).eq("seafarer_id", userId);
      setSaved(false);
    } else {
      await supabase.from("saved_vacancies").insert({ vacancy_id: vacancy.id, seafarer_id: userId });
      setSaved(true);
    }
    setSavingToggle(false);
  }

  const salary = formatSalary(vacancy);
  const company = vacancy.companies;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="mx-auto max-w-5xl px-5 py-10">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-mist hover:text-white transition mb-6">
          <ArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Vacancy header */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {company?.logo_url ? (
                      <img src={company.logo_url} alt={company.name ?? ""} className="h-8 w-8 rounded-lg object-cover" />
                    ) : (
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                        <Building2 size={14} className="text-mist" />
                      </div>
                    )}
                    {company?.id ? (
                      <Link href={`/companies/${company.id}`} className="text-sm text-mist hover:text-brass2 transition">
                        {company.name ?? "Unknown company"}
                      </Link>
                    ) : (
                      <span className="text-sm text-mist">{company?.name ?? "Unknown company"}</span>
                    )}
                    {company?.is_verified && <ShieldCheck size={14} className="text-teal" />}
                    {company?.location && <span className="text-xs text-mist/60">· {company.location}</span>}
                  </div>

                  <h1 className="font-display text-2xl font-semibold text-white">{vacancy.title}</h1>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {vacancy.rank && (
                      <span className="rounded-full bg-brass/10 border border-brass/20 px-3 py-1 text-xs font-semibold text-brass2">
                        {vacancy.rank}
                      </span>
                    )}
                    {vacancy.vessel_type && (
                      <span className="rounded-full bg-teal/10 border border-teal/20 px-3 py-1 text-xs font-semibold text-teal">
                        {vacancy.vessel_type}
                      </span>
                    )}
                  </div>
                </div>

                {userRole === "seafarer" && (
                  <button
                    onClick={toggleSave}
                    disabled={savingToggle}
                    title={saved ? "Remove from saved" : "Save vacancy"}
                    className={`rounded-xl border p-2.5 transition ${
                      saved ? "border-brass/30 bg-brass/10 text-brass2" : "border-white/10 bg-white/5 text-mist hover:text-white"
                    }`}
                  >
                    {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  </button>
                )}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {salary && (
                  <div className="flex items-center gap-2">
                    <DollarSign size={15} className="text-brass2 shrink-0" />
                    <div>
                      <p className="text-xs text-mist">Salary</p>
                      <p className="text-sm font-semibold text-white">{salary}</p>
                    </div>
                  </div>
                )}
                {vacancy.contract_duration && (
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-teal shrink-0" />
                    <div>
                      <p className="text-xs text-mist">Contract</p>
                      <p className="text-sm font-semibold text-white">{vacancy.contract_duration}</p>
                    </div>
                  </div>
                )}
                {vacancy.joining_date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-coral shrink-0" />
                    <div>
                      <p className="text-xs text-mist">Joining</p>
                      <p className="text-sm font-semibold text-white">{formatDate(vacancy.joining_date)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Briefcase size={15} className="text-mist shrink-0" />
                  <div>
                    <p className="text-xs text-mist">Posted</p>
                    <p className="text-sm font-semibold text-white">{formatDate(vacancy.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Source banner for imported vacancies */}
            {vacancy.is_imported && vacancy.source_url && (
              <div className="rounded-2xl border border-brass/20 bg-brass/5 px-5 py-3 flex items-center gap-3">
                <ExternalLink size={15} className="text-brass2 shrink-0" />
                <p className="text-xs text-mist flex-1">
                  This vacancy was imported from an external source.
                </p>
                <a
                  href={vacancy.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brass2 hover:underline shrink-0"
                >
                  View original →
                </a>
              </div>
            )}

            {/* Description */}
            {vacancy.description && (
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="font-display text-lg font-semibold text-white mb-4">Job Description</h2>
                <div className="text-sm text-foam/80 leading-relaxed whitespace-pre-wrap">
                  {vacancy.description}
                </div>
              </div>
            )}

            {/* Apply section */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4">Apply for this Position</h2>

              {!userId && (
                <div>
                  <p className="text-sm text-mist mb-4">Sign in as a seafarer to apply for this position.</p>
                  <NextLink
                    href="/auth/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                  >
                    <Send size={16} /> Sign in to Apply
                  </NextLink>
                </div>
              )}

              {userId && userRole === "company" && (
                <p className="text-sm text-mist">Companies cannot apply to vacancies.</p>
              )}

              {userId && userRole === "seafarer" && applicationStatus && (
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold capitalize ${STATUS_COLORS[applicationStatus]}`}>
                    {applicationStatus === "pending" && "Application Pending"}
                    {applicationStatus === "viewed" && "Application Viewed"}
                    {applicationStatus === "accepted" && "Application Accepted"}
                    {applicationStatus === "rejected" && "Application Rejected"}
                  </span>
                  <p className="text-xs text-mist">You have already applied to this position.</p>
                </div>
              )}

              {userId && userRole === "seafarer" && !applicationStatus && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                >
                  <Send size={16} /> Apply Now
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h3 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">About the Company</h3>

              <div className="flex items-center gap-3 mb-4">
                {company?.logo_url ? (
                  <img src={company.logo_url} alt={company.name ?? ""} className="h-14 w-14 rounded-xl object-cover" />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/10">
                    <Building2 size={24} className="text-mist" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white">{company?.name ?? "Unknown"}</p>
                    {company?.is_verified && <ShieldCheck size={14} className="text-teal" />}
                  </div>
                  {company?.is_verified && <span className="text-xs text-teal">Verified company</span>}
                </div>
              </div>

              {company?.location && (
                <div className="flex items-center gap-2 text-sm text-mist mb-2">
                  <MapPin size={14} className="shrink-0" />
                  {company.location}
                </div>
              )}

              {company?.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brass2 hover:text-brass transition"
                >
                  <Globe size={14} className="shrink-0" />
                  Visit website
                </a>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-mist">Views</span>
                <span className="text-sm font-semibold text-white">{vacancy.views_count + 1}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-semibold text-white">Apply for Position</h3>
              <button onClick={() => { setShowModal(false); setApplyError(null); }} className="text-mist hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-mist mb-4">
              Applying for: <span className="font-semibold text-foam">{vacancy.title}</span>
            </p>

            {vacancy.contact_email && (
              <p className="mb-4 text-xs text-mist">
                Your profile (rank, experience, certificates, contacts) will be sent directly to the crewing agency&apos;s email.
              </p>
            )}

            {applyError && (
              <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{applyError}</p>
              </div>
            )}

            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm font-semibold text-foam">
                Cover Letter <span className="text-mist font-normal">(optional)</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Briefly describe your experience and why you're a good fit..."
                rows={5}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                <Send size={15} />
                {applying ? "Submitting..." : "Submit Application"}
              </button>
              <button
                onClick={() => { setShowModal(false); setApplyError(null); }}
                className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
