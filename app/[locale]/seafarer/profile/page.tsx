"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, AlertCircle, Upload, User, FileText, Sparkles, Plus, Trash2, Link2, Copy, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer, Diploma } from "@/lib/supabase/types";
import { RANK_GROUPS } from "@/lib/ranks";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

type ProfileForm = Omit<Seafarer, "id" | "updated_at" | "diplomas" | "referral_code" | "boost_until">;

const EMPTY_DIPLOMA: Diploma = { name: "", number: "", expiry: "" };

const ALL_RANKS = RANK_GROUPS.flatMap((g) => g.ranks);
const MAX_CV_BYTES = 4 * 1024 * 1024; // Vercel serverless body limit is ~4.5 MB

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const EMPTY_FORM: ProfileForm = {
  first_name: "",
  last_name: "",
  photo_url: "",
  nationality: "",
  date_of_birth: "",
  phone: "",
  rank: "",
  readiness_date: "",
  about: "",
  seamans_book: "",
  seamans_book_expiry: "",
  passport_no: "",
  passport_expiry: "",
  service_record_book: "",
  medical: "",
  medical_expiry: "",
  diploma: "",
  diploma_expiry: "",
  us_visa: "",
  schengen_visa: "",
  education: "",
  languages: "",
  competencies: "",
};

export default function ProfilePage() {
  const { lang } = useLang();
  const t = T[lang];
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsingCv, setParsingCv] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralStats, setReferralStats] = useState({ invited: 0, completed: 0 });
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("seafarers")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setForm({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          photo_url: data.photo_url ?? "",
          nationality: data.nationality ?? "",
          date_of_birth: data.date_of_birth ?? "",
          phone: data.phone ?? "",
          rank: data.rank ?? "",
          readiness_date: data.readiness_date ?? "",
          about: data.about ?? "",
          seamans_book: data.seamans_book ?? "",
          seamans_book_expiry: data.seamans_book_expiry ?? "",
          passport_no: data.passport_no ?? "",
          passport_expiry: data.passport_expiry ?? "",
          service_record_book: data.service_record_book ?? "",
          medical: data.medical ?? "",
          medical_expiry: data.medical_expiry ?? "",
          diploma: data.diploma ?? "",
          diploma_expiry: data.diploma_expiry ?? "",
          us_visa: data.us_visa ?? "",
          schengen_visa: data.schengen_visa ?? "",
          education: data.education ?? "",
          languages: data.languages ?? "",
          competencies: data.competencies ?? "",
        });
        // Use the diplomas array; migrate the legacy single diploma if needed.
        if (data.diplomas?.length) {
          setDiplomas(data.diplomas);
        } else if (data.diploma) {
          setDiplomas([{ name: "", number: data.diploma, expiry: data.diploma_expiry ?? "" }]);
        }

        setReferralCode(data.referral_code ?? null);

        const { data: referrals } = await supabase
          .from("referrals")
          .select("status")
          .eq("referrer_id", session.user.id);
        if (referrals) {
          setReferralStats({
            invited: referrals.length,
            completed: referrals.filter((r) => r.status === "completed").length,
          });
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  function copyReferralLink() {
    if (!referralCode || typeof window === "undefined") return;
    const link = `${window.location.origin}/auth/register?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function updateDiploma(i: number, field: keyof Diploma, value: string) {
    setDiplomas((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: value } : d)));
    setMessage(null);
  }
  function addDiploma() {
    setDiplomas((prev) => [...prev, { ...EMPTY_DIPLOMA }]);
  }
  function removeDiploma(i: number) {
    setDiplomas((prev) => prev.filter((_, idx) => idx !== i));
    setMessage(null);
  }

  function handleChange(field: keyof ProfileForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: t.sp_photo_too_large });
      return;
    }

    setUploading(true);
    setMessage(null);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setMessage({ type: "error", text: t.sp_photo_failed + uploadError.message });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    handleChange("photo_url", publicUrl);
    setUploading(false);
    setMessage({ type: "success", text: t.sp_photo_ok });
  }

  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const name = file.name.toLowerCase();
    const isPdf = file.type === "application/pdf" || name.endsWith(".pdf");
    const isDocx =
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx");
    const isDoc = file.type === "application/msword" || name.endsWith(".doc");
    if (!isPdf && !isDocx && !isDoc) {
      setMessage({ type: "error", text: t.sp_cv_pdf_only });
      if (cvInputRef.current) cvInputRef.current.value = "";
      return;
    }
    const mediaType = isPdf
      ? "application/pdf"
      : isDocx
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/msword";
    if (file.size > MAX_CV_BYTES) {
      setMessage({ type: "error", text: t.sp_cv_too_large });
      if (cvInputRef.current) cvInputRef.current.value = "";
      return;
    }

    setParsingCv(true);
    setMessage(null);

    try {
      const fileBase64 = await readAsDataURL(file);
      const res = await fetch("/api/cv-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileBase64, mediaType }),
      });
      const data = await res.json();

      if (!data.ok || !data.profile) {
        const reason =
          data.error === "missing_api_key"
            ? t.sp_cv_missing_key
            : data.detail
            ? t.sp_cv_could_not + data.detail
            : t.sp_cv_unreadable;
        setMessage({ type: "error", text: reason });
        return;
      }

      const p = data.profile;

      // Fill the editable profile form — the seafarer reviews, then Saves.
      setForm((prev) => ({
        ...prev,
        first_name: p.first_name ?? prev.first_name,
        last_name: p.last_name ?? prev.last_name,
        rank: p.rank ?? prev.rank,
        nationality: p.nationality ?? prev.nationality,
        phone: p.phone ?? prev.phone,
        date_of_birth: p.date_of_birth ?? prev.date_of_birth,
        readiness_date: p.readiness_date ?? prev.readiness_date,
        about: p.about ?? prev.about,
        seamans_book: p.seamans_book ?? prev.seamans_book,
        seamans_book_expiry: p.seamans_book_expiry ?? prev.seamans_book_expiry,
        passport_no: p.passport_no ?? prev.passport_no,
        passport_expiry: p.passport_expiry ?? prev.passport_expiry,
        service_record_book: p.service_record_book ?? prev.service_record_book,
        medical: p.medical ?? prev.medical,
        medical_expiry: p.medical_expiry ?? prev.medical_expiry,
        diploma: p.diploma ?? prev.diploma,
        diploma_expiry: p.diploma_expiry ?? prev.diploma_expiry,
        us_visa: p.us_visa ?? prev.us_visa,
        schengen_visa: p.schengen_visa ?? prev.schengen_visa,
        education: p.education ?? prev.education,
        languages: p.languages ?? prev.languages,
        competencies: p.competencies ?? prev.competencies,
      }));

      // Seed the diplomas list from the parsed diploma (if we don't have any yet).
      if (p.diploma) {
        setDiplomas((prev) =>
          prev.length ? prev : [{ name: "", number: p.diploma, expiry: p.diploma_expiry ?? "" }]
        );
      }

      // Certificates and sea experience are list tables — insert what we found
      // so they show up immediately in those sections.
      let certCount = 0;
      if (Array.isArray(p.certificates)) {
        const rows = p.certificates
          .filter((c: { name?: string }) => c?.name)
          .map((c: Record<string, string | null>) => ({
            seafarer_id: userId,
            name: c.name,
            number: c.number ?? null,
            issue_date: c.issue_date ?? null,
            expiry_date: c.expiry_date ?? null,
            issuing_authority: c.issuing_authority ?? null,
          }));
        if (rows.length) {
          const { error } = await supabase.from("certificates").insert(rows);
          if (!error) certCount = rows.length;
        }
      }

      let expCount = 0;
      if (Array.isArray(p.experience)) {
        const rows = p.experience
          .filter((x: { vessel_name?: string }) => x?.vessel_name)
          .map((x: Record<string, string | null>) => ({
            seafarer_id: userId,
            vessel_name: x.vessel_name,
            vessel_type: x.vessel_type ?? null,
            rank: x.rank ?? null,
            company: x.company ?? null,
            flag: x.flag ?? null,
            dwt: x.dwt ?? null,
            engine: x.engine ?? null,
            from_date: x.from_date ?? null,
            to_date: x.to_date ?? null,
          }));
        if (rows.length) {
          const { error } = await supabase.from("sea_experience").insert(rows);
          if (!error) expCount = rows.length;
        }
      }

      void certCount;
      void expCount;
      setMessage({ type: "success", text: t.sp_cv_imported });
    } catch {
      setMessage({ type: "error", text: t.sp_cv_failed });
    } finally {
      setParsingCv(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setMessage(null);

    const cleanDiplomas: Diploma[] = diplomas
      .map((d) => ({ name: d.name.trim(), number: d.number.trim(), expiry: d.expiry }))
      .filter((d) => d.name || d.number || d.expiry);

    const payload = {
      ...form,
      date_of_birth: form.date_of_birth || null,
      readiness_date: form.readiness_date || null,
      passport_expiry: form.passport_expiry || null,
      first_name: form.first_name || null,
      last_name: form.last_name || null,
      photo_url: form.photo_url || null,
      nationality: form.nationality || null,
      phone: form.phone || null,
      rank: form.rank || null,
      about: form.about || null,
      seamans_book: form.seamans_book || null,
      seamans_book_expiry: form.seamans_book_expiry || null,
      passport_no: form.passport_no || null,
      service_record_book: form.service_record_book || null,
      medical: form.medical || null,
      medical_expiry: form.medical_expiry || null,
      us_visa: form.us_visa || null,
      schengen_visa: form.schengen_visa || null,
      education: form.education || null,
      languages: form.languages || null,
      competencies: form.competencies || null,
      diplomas: cleanDiplomas,
      // Mirror the first diploma into the legacy single columns for compatibility.
      diploma: cleanDiplomas[0]?.number || null,
      diploma_expiry: cleanDiplomas[0]?.expiry || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("seafarers").update(payload).eq("id", userId);

    if (error) {
      setMessage({ type: "error", text: t.sp_save_failed + error.message });
    } else {
      setMessage({ type: "success", text: t.sp_save_ok });
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">{t.sp_loading}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-white mb-6">{t.sp_title}</h1>

      {message && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 ${
            message.type === "success"
              ? "border-teal/30 bg-teal/10"
              : "border-coral/30 bg-coral/10"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={18} className="mt-0.5 shrink-0 text-teal" />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
          )}
          <p className={`text-sm ${message.type === "success" ? "text-teal" : "text-coral"}`}>
            {message.text}
          </p>
        </div>
      )}

      {/* Auto-fill from CV */}
      <div className="mb-6 rounded-2xl border border-brass/30 bg-brass/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2">
            <Sparkles size={22} className="text-deep" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-white">{t.sp_autofill_title}</h2>
            <p className="mt-1 text-sm text-mist">{t.sp_autofill_desc}</p>
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={parsingCv || saving}
              className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
            >
              <FileText size={16} />
              {parsingCv ? t.sp_reading_cv : t.sp_upload_cv}
            </button>
            <p className="mt-2 text-xs text-mist">{t.sp_cv_hint}</p>
            <input
              ref={cvInputRef}
              type="file"
              accept="application/pdf,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleCvUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Invite a friend / referral */}
      {referralCode && (
        <div className="mb-6 rounded-2xl border border-teal/30 bg-teal/5 p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal to-teal/60">
              <Link2 size={20} className="text-deep" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-white">{t.ref_title}</h2>
              <p className="mt-1 text-sm text-mist">{t.ref_desc}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-white/10 bg-navy2 px-3.5 py-2.5 text-sm text-foam/80 truncate max-w-full">
                  {typeof window !== "undefined" ? `${window.location.origin}/auth/register?ref=${referralCode}` : ""}
                </div>
                <button
                  type="button"
                  onClick={copyReferralLink}
                  className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-teal to-teal/60 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? t.ref_copied : t.ref_copy}
                </button>
              </div>

              <div className="mt-4 flex gap-5 text-sm">
                <p className="text-mist">
                  {t.ref_invited}: <span className="font-semibold text-foam">{referralStats.invited}</span>
                </p>
                <p className="text-mist">
                  {t.ref_completed}: <span className="font-semibold text-foam">{referralStats.completed}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Photo upload */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.sp_photo}</h2>
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0">
              {form.photo_url ? (
                <Image
                  src={form.photo_url}
                  alt="Profile"
                  fill
                  sizes="80px"
                  className="rounded-2xl object-cover border border-white/10"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-navy2 border border-white/10 flex items-center justify-center">
                  <User size={32} className="text-mist" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || saving}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
              >
                <Upload size={16} />
                {uploading ? t.sp_uploading : t.sp_upload_photo}
              </button>
              <p className="text-xs text-mist">{t.sp_photo_hint}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.sp_personal}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_first_name}</label>
              <input
                type="text" value={form.first_name ?? ""}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="John" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_last_name}</label>
              <input
                type="text" value={form.last_name ?? ""}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Smith" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_nationality}</label>
              <input
                type="text" value={form.nationality ?? ""}
                onChange={(e) => handleChange("nationality", e.target.value)}
                placeholder="Ukrainian" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_dob}</label>
              <input
                type="date" value={form.date_of_birth ?? ""}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">{t.sp_phone}</label>
              <input
                type="tel" value={form.phone ?? ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+380 XX XXX XX XX" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Professional info */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_rank}</label>
              <select
                value={form.rank ?? ""} onChange={(e) => handleChange("rank", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">{t.sp_select_rank}</option>
                {form.rank && !ALL_RANKS.includes(form.rank) && (
                  <option value={form.rank}>{form.rank}</option>
                )}
                {RANK_GROUPS.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.ranks.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_readiness}</label>
              <input
                type="date" value={form.readiness_date ?? ""}
                onChange={(e) => handleChange("readiness_date", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">{t.sp_about}</label>
              <textarea
                value={form.about ?? ""}
                onChange={(e) => handleChange("about", e.target.value)}
                placeholder={t.sp_about_ph}
                rows={4} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Documents & Visas */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.sp_documents}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Seaman's book (паспорт моряка) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_seamans_book}</label>
              <input
                type="text" value={form.seamans_book ?? ""}
                onChange={(e) => handleChange("seamans_book", e.target.value)}
                placeholder="SB 1234567" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_seamans_expiry}</label>
              <input
                type="date" value={form.seamans_book_expiry ?? ""}
                onChange={(e) => handleChange("seamans_book_expiry", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Foreign (travel / bio) passport */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_passport}</label>
              <input
                type="text" value={form.passport_no ?? ""}
                onChange={(e) => handleChange("passport_no", e.target.value)}
                placeholder="75 No 9876543" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_passport_expiry}</label>
              <input
                type="date" value={form.passport_expiry ?? ""}
                onChange={(e) => handleChange("passport_expiry", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Service record book (послужная книжка) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_service_record}</label>
              <input
                type="text" value={form.service_record_book ?? ""}
                onChange={(e) => handleChange("service_record_book", e.target.value)}
                placeholder={t.sp_service_record_ph} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="hidden sm:block" />

            {/* Medical certificate */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_medical}</label>
              <input
                type="text" value={form.medical ?? ""}
                onChange={(e) => handleChange("medical", e.target.value)}
                placeholder={t.sp_medical_ph} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_medical_expiry}</label>
              <input
                type="date" value={form.medical_expiry ?? ""}
                onChange={(e) => handleChange("medical_expiry", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>

            {/* Diplomas / Certificates of Competency (one or several) */}
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">{t.sp_diplomas}</label>
              {diplomas.map((d, i) => (
                <div key={i} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-navy2/40 p-3 sm:flex-row sm:items-center">
                  <input
                    type="text" value={d.name}
                    onChange={(e) => updateDiploma(i, "name", e.target.value)}
                    placeholder={t.sp_diploma_name_ph} disabled={saving}
                    className="flex-1 rounded-lg border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <input
                    type="text" value={d.number}
                    onChange={(e) => updateDiploma(i, "number", e.target.value)}
                    placeholder={t.sp_diploma_no_ph} disabled={saving}
                    className="flex-1 rounded-lg border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <input
                    type="date" value={d.expiry}
                    onChange={(e) => updateDiploma(i, "expiry", e.target.value)}
                    disabled={saving}
                    className="rounded-lg border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <button type="button" onClick={() => removeDiploma(i)}
                    title={t.sp_remove} disabled={saving}
                    className="self-end rounded-lg border border-coral/20 bg-coral/10 p-2 text-coral transition hover:bg-coral/20 disabled:opacity-50 sm:self-auto">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addDiploma} disabled={saving}
                className="flex items-center gap-1.5 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50">
                <Plus size={15} /> {t.sp_add_diploma}
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_us_visa}</label>
              <input
                type="text" value={form.us_visa ?? ""}
                onChange={(e) => handleChange("us_visa", e.target.value)}
                placeholder="Valid until 05/2028" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_schengen}</label>
              <input
                type="text" value={form.schengen_visa ?? ""}
                onChange={(e) => handleChange("schengen_visa", e.target.value)}
                placeholder="Valid until 11/2027" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Education, Languages & Competencies */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.sp_edu_section}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_education}</label>
              <textarea
                value={form.education ?? ""}
                onChange={(e) => handleChange("education", e.target.value)}
                placeholder={t.sp_education_ph}
                rows={2} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_languages}</label>
              <input
                type="text" value={form.languages ?? ""}
                onChange={(e) => handleChange("languages", e.target.value)}
                placeholder={t.sp_languages_ph} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.sp_competencies}</label>
              <textarea
                value={form.competencies ?? ""}
                onChange={(e) => handleChange("competencies", e.target.value)}
                placeholder={t.sp_competencies_ph}
                rows={3} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit" disabled={saving || uploading}
          className="self-start rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
        >
          {saving ? t.sp_saving : t.sp_save}
        </button>
      </form>
    </div>
  );
}
