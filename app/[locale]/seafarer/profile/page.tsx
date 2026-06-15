"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, Upload, User, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer } from "@/lib/supabase/types";
import { RANK_GROUPS } from "@/lib/ranks";

type ProfileForm = Omit<Seafarer, "id" | "updated_at">;

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
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsingCv, setParsingCv] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
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
    if (!file || !userId) return;

    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "Please upload your CV as a PDF file." });
      if (cvInputRef.current) cvInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setMessage({ type: "error", text: "CV is too large. Max 4 MB." });
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
        body: JSON.stringify({ fileBase64, mediaType: "application/pdf" }),
      });
      const data = await res.json();

      if (!data.ok || !data.profile) {
        const reason =
          data.error === "missing_api_key"
            ? "CV parsing is not configured on the server (missing API key)."
            : data.detail
            ? `Could not read this CV: ${data.detail}`
            : "Could not read this CV. Try a clearer PDF or fill the form manually.";
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
      }));

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
            from_date: x.from_date ?? null,
            to_date: x.to_date ?? null,
          }));
        if (rows.length) {
          const { error } = await supabase.from("sea_experience").insert(rows);
          if (!error) expCount = rows.length;
        }
      }

      setMessage({
        type: "success",
        text: `CV imported — profile fields filled${
          certCount ? `, ${certCount} certificate(s) added` : ""
        }${expCount ? `, ${expCount} voyage(s) added` : ""}. Review the details below and click Save Profile.`,
      });
    } catch {
      setMessage({ type: "error", text: "CV import failed. Please try again." });
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

      {/* Auto-fill from CV */}
      <div className="mb-6 rounded-2xl border border-brass/30 bg-brass/5 p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2">
            <Sparkles size={22} className="text-deep" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold text-white">Auto-fill from your CV</h2>
            <p className="mt-1 text-sm text-mist">
              Upload your CV as a PDF and we&apos;ll read your details, certificates and sea
              experience, then fill them in automatically.
            </p>
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={parsingCv || saving}
              className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
            >
              <FileText size={16} />
              {parsingCv ? "Reading your CV…" : "Upload CV (PDF)"}
            </button>
            <p className="mt-2 text-xs text-mist">PDF · max 4 MB</p>
            <input
              ref={cvInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleCvUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

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
