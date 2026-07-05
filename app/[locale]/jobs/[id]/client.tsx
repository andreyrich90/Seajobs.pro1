"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import {
  ArrowLeft, Building2, ShieldCheck, Globe, MapPin,
  Briefcase, DollarSign, Clock, Calendar,
  Bookmark, BookmarkCheck, Send, X, AlertCircle, Share2, Copy, Check, MessageCircle, Mail,
  CheckCircle2, Upload,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase, notify } from "@/lib/supabase/client";
import { renderMarkdown } from "@/lib/markdown";

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

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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
  // Applying requires a phone number and at least one sea-service record, so
  // the crewing agency always receives contacts + a real CV. null = not loaded.
  const [profileGaps, setProfileGaps] = useState<{ phone: boolean; experience: boolean } | null>(null);
  // One-shot CV import inside the apply modal: parse a PDF/DOCX with
  // /api/cv-parse and write straight into the profile (same as the cabinet).
  const [cvUploading, setCvUploading] = useState(false);
  const [cvNotice, setCvNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);
  const [savingToggle, setSavingToggle] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [loginHref, setLoginHref] = useState("/auth/login");

  useEffect(() => {
    setShareUrl(window.location.href);
    setLoginHref(`/auth/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  }

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
        const [{ data: appData }, { data: savedData }, { data: sf }, { count: expCount }] = await Promise.all([
          supabase.from("applications").select("status").eq("vacancy_id", vacancy.id).eq("seafarer_id", uid).maybeSingle(),
          supabase.from("saved_vacancies").select("vacancy_id").eq("vacancy_id", vacancy.id).eq("seafarer_id", uid).maybeSingle(),
          supabase.from("seafarers").select("phone").eq("id", uid).maybeSingle(),
          supabase.from("sea_experience").select("id", { count: "exact", head: true }).eq("seafarer_id", uid),
        ]);
        if (appData) setApplicationStatus(appData.status as ApplicationStatus);
        setSaved(!!savedData);
        setProfileGaps({
          phone: !(sf?.phone ?? "").trim(),
          experience: (expCount ?? 0) === 0,
        });
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
      // DB trigger blocks applications from incomplete profiles (see
      // enforce_profile_complete_on_apply migration).
      setApplyError(
        error.message.includes("PROFILE_INCOMPLETE")
          ? "Please add your phone number and at least one sea service record to your profile before applying."
          : error.message
      );
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

  // Parse an uploaded CV (PDF/DOCX) and write the extracted data straight into
  // the seafarer's profile — the same import the cabinet uses, but one-shot so
  // the seafarer can apply immediately after.
  async function handleCvFile(file: File) {
    if (!userId) return;
    const lower = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || lower.endsWith(".pdf");
    const isDocx =
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      lower.endsWith(".docx");
    if (!isPdf && !isDocx) {
      setCvNotice({ type: "error", text: "Please upload a PDF or DOCX file." });
      return;
    }
    setCvUploading(true);
    setCvNotice(null);
    try {
      const fileBase64 = await readAsDataURL(file);
      const mediaType = isPdf
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      const res = await fetch("/api/cv-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64, mediaType }),
      });
      const data = await res.json();
      if (!data.ok || !data.profile) {
        setCvNotice({ type: "error", text: "Could not read the CV. Please fill in your profile manually." });
        return;
      }
      const p = data.profile as Record<string, unknown>;

      // Profile fields: only overwrite with values the CV actually contains.
      const fields = [
        "first_name", "last_name", "rank", "nationality", "phone", "date_of_birth",
        "readiness_date", "about", "seamans_book", "seamans_book_expiry", "passport_no",
        "passport_expiry", "service_record_book", "medical", "medical_expiry", "diploma",
        "diploma_expiry", "us_visa", "schengen_visa", "education", "languages", "competencies",
      ] as const;
      const upd: { [K in (typeof fields)[number]]?: string } = {};
      for (const k of fields) if (typeof p[k] === "string" && p[k]) upd[k] = p[k] as string;
      if (Object.keys(upd).length) {
        await supabase.from("seafarers").update(upd).eq("id", userId);
      }

      if (Array.isArray(p.certificates)) {
        const rows = (p.certificates as Record<string, string | null>[])
          .filter((c) => c?.name)
          .map((c) => ({
            seafarer_id: userId,
            name: c.name as string,
            number: c.number ?? null,
            issue_date: c.issue_date ?? null,
            expiry_date: c.expiry_date ?? null,
            issuing_authority: c.issuing_authority ?? null,
          }));
        if (rows.length) await supabase.from("certificates").insert(rows);
      }

      if (Array.isArray(p.experience)) {
        const rows = (p.experience as Record<string, string | null>[])
          .filter((x) => x?.vessel_name)
          .map((x) => ({
            seafarer_id: userId,
            vessel_name: x.vessel_name as string,
            vessel_type: x.vessel_type ?? null,
            rank: x.rank ?? null,
            company: x.company ?? null,
            flag: x.flag ?? null,
            dwt: x.dwt ?? null,
            engine: x.engine ?? null,
            from_date: x.from_date ?? null,
            to_date: x.to_date ?? null,
          }));
        if (rows.length) await supabase.from("sea_experience").insert(rows);
      }

      // Re-check what is still missing (e.g. the CV had no phone number).
      const [{ data: sf }, { count: expCount }] = await Promise.all([
        supabase.from("seafarers").select("phone").eq("id", userId).maybeSingle(),
        supabase.from("sea_experience").select("id", { count: "exact", head: true }).eq("seafarer_id", userId),
      ]);
      const gaps = { phone: !(sf?.phone ?? "").trim(), experience: (expCount ?? 0) === 0 };
      setProfileGaps(gaps);
      setCvNotice(
        gaps.phone || gaps.experience
          ? { type: "error", text: "CV imported, but something is still missing — see the list above." }
          : { type: "success", text: "CV imported — your profile is complete. You can apply now." }
      );
    } catch {
      setCvNotice({ type: "error", text: "Upload failed. Please try again or fill in your profile manually." });
    } finally {
      setCvUploading(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    }
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
                      <Image src={company.logo_url} alt={company.name ?? ""} width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
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

              {/* Share */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-mist">
                  <Share2 size={14} /> Share
                </span>
                <button
                  onClick={copyLink}
                  title="Copy link"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                  {copied ? <Check size={14} className="text-teal" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${vacancy.title}${company?.name ? ` — ${company.name}` : ""} ${shareUrl}`)}`}
                  target="_blank" rel="noopener noreferrer" title="WhatsApp"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#25D366] transition hover:bg-white/10"
                >
                  <MessageCircle size={15} />
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${vacancy.title}${company?.name ? ` — ${company.name}` : ""}`)}`}
                  target="_blank" rel="noopener noreferrer" title="Telegram"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#229ED9] transition hover:bg-white/10"
                >
                  <Send size={15} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer" title="Facebook"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#1877F2] transition hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.4l.6-3H14V9z" /></svg>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(`${vacancy.title}${company?.name ? ` — ${company.name}` : ""}`)}&body=${encodeURIComponent(`${vacancy.title}${company?.name ? ` — ${company.name}` : ""}\n\n${shareUrl}`)}`}
                  title="Email"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-mist transition hover:bg-white/10 hover:text-white"
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>

            {/* Description */}
            {vacancy.description && (
              <div className="rounded-2xl border border-white/10 bg-card p-6">
                <h2 className="font-display text-lg font-semibold text-white mb-4">Job Description</h2>
                <div className="leading-relaxed">
                  {renderMarkdown(vacancy.description)}
                </div>
              </div>
            )}

            {/* Apply section */}
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-white mb-4">Apply for this Position</h2>

              {!userId && (
                <div>
                  <p className="text-sm text-mist mb-4">Sign in or create a free seafarer account to apply — your CV is sent to the crewing agency with one click.</p>
                  <div className="flex flex-wrap gap-3">
                    <NextLink
                      href={loginHref}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                    >
                      <Send size={16} /> Sign in to Apply
                    </NextLink>
                    <NextLink
                      href="/auth/register?role=seafarer"
                      className="inline-flex items-center gap-2 rounded-xl border border-brass/40 px-5 py-2.5 text-sm font-bold text-brass2 transition hover:bg-brass/10"
                    >
                      Create account
                    </NextLink>
                  </div>
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
                <div>
                  {profileGaps && !profileGaps.phone && !profileGaps.experience && (
                    <p className="mb-3 flex items-center gap-2 text-sm text-teal">
                      <CheckCircle2 size={16} /> Your CV is on SeaJobs.pro — it will be sent with your application.
                    </p>
                  )}
                  {profileGaps && (profileGaps.phone || profileGaps.experience) && (
                    <p className="mb-3 flex items-center gap-2 text-sm text-brass2">
                      <Upload size={16} /> Upload your CV (PDF/DOCX) or complete your profile — takes a minute.
                    </p>
                  )}
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                  >
                    <Send size={16} /> Apply Now
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <h3 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">About the Company</h3>

              <div className="flex items-center gap-3 mb-4">
                {company?.logo_url ? (
                  <Image src={company.logo_url} alt={company.name ?? ""} width={56} height={56} className="h-14 w-14 rounded-xl object-cover" />
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

            {profileGaps && (profileGaps.phone || profileGaps.experience) ? (
              <>
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-brass/30 bg-brass/10 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-brass2" />
                  <div className="text-sm text-foam">
                    <p className="mb-2 font-semibold">Complete your profile to apply</p>
                    <p className="mb-2 text-mist">The crewing agency receives your CV with your application, so it must include your contacts and sea service:</p>
                    <ul className="list-disc pl-5 text-mist">
                      {profileGaps.phone && (
                        <li>Add your <NextLink href="/seafarer/profile" className="text-brass2 underline hover:text-brass">phone number</NextLink></li>
                      )}
                      {profileGaps.experience && (
                        <li>Add at least one <NextLink href="/seafarer/experience" className="text-brass2 underline hover:text-brass">sea service record</NextLink></li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mb-4 rounded-xl border border-white/10 bg-navy2 px-4 py-3">
                  <p className="mb-2 text-sm font-semibold text-foam">Fastest way: upload your CV</p>
                  <p className="mb-3 text-xs text-mist">Upload a PDF or DOCX — we read it and fill your profile automatically, then your formatted CV is sent with the application.</p>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept="application/pdf,.pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCvFile(f); }}
                  />
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    disabled={cvUploading}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                  >
                    <Upload size={15} /> {cvUploading ? "Reading your CV..." : "Upload CV (PDF / DOCX)"}
                  </button>
                  {cvNotice && (
                    <p className={`mt-2 text-xs ${cvNotice.type === "success" ? "text-teal" : "text-coral"}`}>{cvNotice.text}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <NextLink
                    href={profileGaps.phone ? "/seafarer/profile" : "/seafarer/experience"}
                    className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
                  >
                    Fill in manually
                  </NextLink>
                  <button
                    onClick={() => { setShowModal(false); setApplyError(null); }}
                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {profileGaps && !profileGaps.phone && !profileGaps.experience && (
                  <p className="mb-4 flex items-center gap-2 text-sm text-teal">
                    <CheckCircle2 size={16} /> Your profile is complete — your CV will be sent with this application.
                  </p>
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
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
