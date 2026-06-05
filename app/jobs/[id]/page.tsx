"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Building2, ShieldCheck, Globe, MapPin,
  Briefcase, Ship, DollarSign, Clock, Calendar,
  Bookmark, BookmarkCheck, Send, X, AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";

type VacancyDetail = {
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

export default function VacancyDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [vacancy, setVacancy] = useState<VacancyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Auth state
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"seafarer" | "company" | null>(null);

  // Application state
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [saved, setSaved] = useState(false);

  // Apply modal
  const [showModal, setShowModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  // Save toggling
  const [savingToggle, setSavingToggle] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      // Auth
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user?.id ?? null;
      setUserId(uid);

      // Fetch vacancy
      const { data: vacancyData, error: vacancyError } = await supabase
        .from("vacancies")
        .select("id, title, rank, vessel_type, salary_from, salary_to, currency, contract_duration, joining_date, description, views_count, created_at, companies(id, name, logo_url, location, website, is_verified)")
        .eq("id", id)
        .single();

      if (vacancyError || !vacancyData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setVacancy(vacancyData as VacancyDetail);

      // Increment views
      await supabase
        .from("vacancies")
        .update({ views_count: (vacancyData.views_count ?? 0) + 1 })
        .eq("id", id);

      if (uid) {
        // Get role
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", uid)
          .single();

        const role = profileData?.role ?? null;
        setUserRole(role as "seafarer" | "company" | null);

        if (role === "seafarer") {
          // Check application
          const { data: appData } = await supabase
            .from("applications")
            .select("status")
            .eq("vacancy_id", id)
            .eq("seafarer_id", uid)
            .maybeSingle();

          if (appData) setApplicationStatus(appData.status as ApplicationStatus);

          // Check saved
          const { data: savedData } = await supabase
            .from("saved_vacancies")
            .select("vacancy_id")
            .eq("vacancy_id", id)
            .eq("seafarer_id", uid)
            .maybeSingle();

          setSaved(!!savedData);
        }
      }

      setLoading(false);
    }

    load();
  }, [id]);

  async function handleApply() {
    if (!userId || !vacancy) return;
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

    // Trigger notification (fire and forget)
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "application_received", vacancyId: vacancy.id, seafarerId: userId }),
    }).catch(() => {});

    setApplicationStatus("pending");
    setShowModal(false);
    setCoverLetter("");
    setApplying(false);
  }

  async function toggleSave() {
    if (!userId || !vacancy || savingToggle) return;
    setSavingToggle(true);

    if (saved) {
      await supabase
        .from("saved_vacancies")
        .delete()
        .eq("vacancy_id", vacancy.id)
        .eq("seafarer_id", userId);
      setSaved(false);
    } else {
      await supabase
        .from("saved_vacancies")
        .insert({ vacancy_id: vacancy.id, seafarer_id: userId });
      setSaved(true);
    }

    setSavingToggle(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-64">
          <p className="text-mist text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (notFound || !vacancy) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <p className="text-lg font-semibold text-foam">Vacancy not found</p>
          <Link href="/jobs" className="mt-4 inline-block text-sm text-brass2 hover:underline">
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  const salary = formatSalary(vacancy);
  const company = vacancy.companies;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="mx-auto max-w-5xl px-5 py-10">
        {/* Back link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-mist hover:text-white transition mb-6"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Vacancy header */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Company info */}
                  <div className="flex items-center gap-2 mb-2">
                    {company?.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name ?? ""}
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                        <Building2 size={14} className="text-mist" />
                      </div>
                    )}
                    <span className="text-sm text-mist">{company?.name ?? "Unknown company"}</span>
                    {company?.is_verified && (
                      <ShieldCheck size={14} className="text-teal" />
                    )}
                    {company?.location && (
                      <span className="text-xs text-mist/60">· {company.location}</span>
                    )}
                  </div>

                  <h1 className="font-display text-2xl font-semibold text-white">{vacancy.title}</h1>

                  {/* Badges */}
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

                {/* Save button — only for seafarers */}
                {userRole === "seafarer" && (
                  <button
                    onClick={toggleSave}
                    disabled={savingToggle}
                    title={saved ? "Remove from saved" : "Save vacancy"}
                    className={`rounded-xl border p-2.5 transition ${
                      saved
                        ? "border-brass/30 bg-brass/10 text-brass2"
                        : "border-white/10 bg-white/5 text-mist hover:text-white"
                    }`}
                  >
                    {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                  </button>
                )}
              </div>

              {/* Key stats */}
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
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                  >
                    <Send size={16} /> Sign in to Apply
                  </Link>
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

          {/* Sidebar — Company card */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h3 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">About the Company</h3>

              <div className="flex items-center gap-3 mb-4">
                {company?.logo_url ? (
                  <img
                    src={company.logo_url}
                    alt={company.name ?? ""}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                ) : (
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/10">
                    <Building2 size={24} className="text-mist" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white">{company?.name ?? "Unknown"}</p>
                    {company?.is_verified && (
                      <ShieldCheck size={14} className="text-teal" />
                    )}
                  </div>
                  {company?.is_verified && (
                    <span className="text-xs text-teal">Verified company</span>
                  )}
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

            {/* Quick stats */}
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
              <button
                onClick={() => { setShowModal(false); setApplyError(null); }}
                className="text-mist hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-mist mb-4">
              Applying for: <span className="font-semibold text-foam">{vacancy.title}</span>
            </p>

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
