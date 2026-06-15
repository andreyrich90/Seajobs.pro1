"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, Upload, User, FileText, Sparkles, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer } from "@/lib/supabase/types";
import { RANK_GROUPS } from "@/lib/ranks";

type ProfileForm = Omit<Seafarer, "id" | "updated_at">;

type ParsedCv = {
  firstName?: string | null;
  lastName?: string | null;
  rank?: string | null;
  yearsExperience?: number | null;
  vesselTypes?: string[];
  certificates?: { name: string; expiry: string | null }[];
  lastVessels?: { name: string; type: string; rank: string; from: string; to: string }[];
  readinessDate?: string | null;
  languages?: string[];
  email?: string | null;
  phone?: string | null;
};

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
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvApplying, setCvApplying] = useState(false);
  const [cvProfile, setCvProfile] = useState<ParsedCv | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

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
        });
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  function handleChange(field: keyof ProfileForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "File is too large. Max 5 MB." });
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
      setMessage({ type: "error", text: "Photo upload failed: " + uploadError.message });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    handleChange("photo_url", publicUrl);
    setUploading(false);
    setMessage({ type: "success", text: "Photo uploaded! Save your profile to apply." });
  }

  async function handleCvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Please upload a PDF file." });
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setMessage({ type: "error", text: "File is too large. Max 4 MB." });
      return;
    }

    setCvUploading(true);
    setMessage(null);
    setCvProfile(null);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/cv-parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({ fileBase64: base64, mediaType: file.type }),
      });
      const data = await res.json();
      if (data.ok) {
        setCvProfile(data.profile);
        setMessage({ type: "success", text: "CV parsed! Review the data below and apply it to your profile." });
      } else {
        setMessage({ type: "error", text: "Failed to parse CV: " + (data.error ?? "unknown error") });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to parse CV." });
    } finally {
      setCvUploading(false);
      if (cvFileInputRef.current) cvFileInputRef.current.value = "";
    }
  }

  async function handleApplyCv() {
    if (!cvProfile || !userId) return;
    setCvApplying(true);
    setMessage(null);

    const validRanks = new Set(RANK_GROUPS.flatMap((g) => g.ranks));
    const matchedRank = cvProfile.rank && validRanks.has(cvProfile.rank) ? cvProfile.rank : undefined;

    setForm((prev) => ({
      ...prev,
      first_name: cvProfile.firstName || prev.first_name,
      last_name: cvProfile.lastName || prev.last_name,
      rank: matchedRank ?? prev.rank,
      readiness_date: cvProfile.readinessDate || prev.readiness_date,
      phone: cvProfile.phone || prev.phone,
      about: prev.about || [
        cvProfile.yearsExperience ? `${cvProfile.yearsExperience} years of experience.` : "",
        cvProfile.vesselTypes?.length ? `Vessel types: ${cvProfile.vesselTypes.join(", ")}.` : "",
        cvProfile.languages?.length ? `Languages: ${cvProfile.languages.join(", ")}.` : "",
      ].filter(Boolean).join(" "),
    }));

    if (cvProfile.certificates?.length) {
      const rows = cvProfile.certificates
        .filter((c) => c.name)
        .map((c) => ({
          seafarer_id: userId,
          name: c.name,
          expiry_date: c.expiry || null,
        }));
      if (rows.length) await supabase.from("certificates").insert(rows);
    }

    if (cvProfile.lastVessels?.length) {
      const rows = cvProfile.lastVessels
        .filter((v) => v.name)
        .map((v) => ({
          seafarer_id: userId,
          vessel_name: v.name,
          vessel_type: v.type || null,
          rank: v.rank || null,
          from_date: v.from ? `${v.from}-01` : null,
          to_date: v.to ? `${v.to}-01` : null,
        }));
      if (rows.length) await supabase.from("sea_experience").insert(rows);
    }

    setCvProfile(null);
    setCvApplying(false);
    setMessage({ type: "success", text: "CV data applied! Review the fields below and click Save Profile to confirm." });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setMessage(null);

    const payload = {
      ...form,
      date_of_birth: form.date_of_birth || null,
      readiness_date: form.readiness_date || null,
      first_name: form.first_name || null,
      last_name: form.last_name || null,
      photo_url: form.photo_url || null,
      nationality: form.nationality || null,
      phone: form.phone || null,
      rank: form.rank || null,
      about: form.about || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("seafarers").update(payload).eq("id", userId);

    if (error) {
      setMessage({ type: "error", text: "Failed to save: " + error.message });
    } else {
      setMessage({ type: "success", text: "Profile saved successfully!" });
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-white mb-6">My Profile</h1>

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Photo upload */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Profile Photo</h2>
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0">
              {form.photo_url ? (
                <img
                  src={form.photo_url}
                  alt="Profile"
                  className="h-20 w-20 rounded-2xl object-cover border border-white/10"
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
                {uploading ? "Uploading..." : "Upload photo"}
              </button>
              <p className="text-xs text-mist">JPG, PNG or WEBP · max 5 MB</p>
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

        {/* CV import */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-brass" />
            Import from CV (AI)
          </h2>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => cvFileInputRef.current?.click()}
              disabled={cvUploading || saving}
              className="self-start flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <FileText size={16} />
              {cvUploading ? "Parsing CV..." : "Upload CV (PDF)"}
            </button>
            <p className="text-xs text-mist">PDF only · max 4 MB. We&apos;ll extract your details with AI for you to review.</p>
            <input
              ref={cvFileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleCvUpload}
              className="hidden"
            />
          </div>

          {cvProfile && (
            <div className="mt-5 rounded-xl border border-brass/30 bg-brass/5 p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="text-sm font-semibold text-foam">Parsed from your CV</p>
                <button
                  type="button"
                  onClick={() => setCvProfile(null)}
                  className="text-mist hover:text-white transition"
                  aria-label="Dismiss"
                >
                  <X size={16} />
                </button>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
                {(cvProfile.firstName || cvProfile.lastName) && (
                  <div><dt className="text-mist">Name</dt><dd className="text-foam">{[cvProfile.firstName, cvProfile.lastName].filter(Boolean).join(" ")}</dd></div>
                )}
                {cvProfile.rank && (
                  <div><dt className="text-mist">Rank</dt><dd className="text-foam">{cvProfile.rank}</dd></div>
                )}
                {cvProfile.phone && (
                  <div><dt className="text-mist">Phone</dt><dd className="text-foam">{cvProfile.phone}</dd></div>
                )}
                {cvProfile.readinessDate && (
                  <div><dt className="text-mist">Readiness date</dt><dd className="text-foam">{cvProfile.readinessDate}</dd></div>
                )}
                {typeof cvProfile.yearsExperience === "number" && (
                  <div><dt className="text-mist">Years of experience</dt><dd className="text-foam">{cvProfile.yearsExperience}</dd></div>
                )}
                {!!cvProfile.vesselTypes?.length && (
                  <div><dt className="text-mist">Vessel types</dt><dd className="text-foam">{cvProfile.vesselTypes.join(", ")}</dd></div>
                )}
                {!!cvProfile.languages?.length && (
                  <div><dt className="text-mist">Languages</dt><dd className="text-foam">{cvProfile.languages.join(", ")}</dd></div>
                )}
                {!!cvProfile.certificates?.length && (
                  <div className="sm:col-span-2"><dt className="text-mist">Certificates</dt><dd className="text-foam">{cvProfile.certificates.map((c) => c.name).join(", ")}</dd></div>
                )}
                {!!cvProfile.lastVessels?.length && (
                  <div className="sm:col-span-2"><dt className="text-mist">Sea experience</dt><dd className="text-foam">{cvProfile.lastVessels.map((v) => `${v.rank ?? ""} on ${v.name}`).join(", ")}</dd></div>
                )}
              </dl>
              <button
                type="button"
                onClick={handleApplyCv}
                disabled={cvApplying}
                className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                {cvApplying ? "Applying..." : "Apply to profile"}
              </button>
            </div>
          )}
        </div>

        {/* Personal info */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">First name</label>
              <input
                type="text" value={form.first_name ?? ""}
                onChange={(e) => handleChange("first_name", e.target.value)}
                placeholder="John" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Last name</label>
              <input
                type="text" value={form.last_name ?? ""}
                onChange={(e) => handleChange("last_name", e.target.value)}
                placeholder="Smith" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Nationality</label>
              <input
                type="text" value={form.nationality ?? ""}
                onChange={(e) => handleChange("nationality", e.target.value)}
                placeholder="Ukrainian" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">Date of birth</label>
              <input
                type="date" value={form.date_of_birth ?? ""}
                onChange={(e) => handleChange("date_of_birth", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">Phone</label>
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
              <label className="text-sm font-semibold text-foam">Rank / Position</label>
              <select
                value={form.rank ?? ""} onChange={(e) => handleChange("rank", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              >
                <option value="">Select rank...</option>
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
              <label className="text-sm font-semibold text-foam">Readiness date</label>
              <input
                type="date" value={form.readiness_date ?? ""}
                onChange={(e) => handleChange("readiness_date", e.target.value)}
                disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">About / Summary</label>
              <textarea
                value={form.about ?? ""}
                onChange={(e) => handleChange("about", e.target.value)}
                placeholder="Brief professional summary..."
                rows={4} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50 resize-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit" disabled={saving || uploading}
          className="self-start rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
