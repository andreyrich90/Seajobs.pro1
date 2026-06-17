"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, Upload, Building2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Company } from "@/lib/supabase/types";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

type ProfileForm = Omit<Company, "id" | "updated_at" | "is_verified">;

const EMPTY_FORM: ProfileForm = {
  name: "",
  logo_url: "",
  location: "",
  description: "",
  website: "",
};

export default function CompanyProfilePage() {
  const { lang } = useLang();
  const t = T[lang];
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);

      const { data } = await supabase
        .from("companies")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (data) {
        setForm({
          name: data.name ?? "",
          logo_url: data.logo_url ?? "",
          location: data.location ?? "",
          description: data.description ?? "",
          website: data.website ?? "",
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

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: t.cp_file_too_large });
      return;
    }

    setUploading(true);
    setMessage(null);

    const ext = file.name.split(".").pop() ?? "png";
    const path = `${userId}/logo.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setMessage({ type: "error", text: t.cp_upload_failed + uploadError.message });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("logos").getPublicUrl(path);
    handleChange("logo_url", publicUrl);
    setUploading(false);
    setMessage({ type: "success", text: t.cp_uploaded });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setMessage(null);

    const payload = {
      name: form.name || null,
      logo_url: form.logo_url || null,
      location: form.location || null,
      description: form.description || null,
      website: form.website || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("companies").upsert({ id: userId, ...payload });

    if (error) {
      setMessage({ type: "error", text: t.cp_save_failed + error.message });
    } else {
      setMessage({ type: "success", text: t.cp_saved });
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">{t.cp_loading}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display text-2xl font-semibold text-white mb-6">{t.cp_title}</h1>

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

        {/* Logo upload */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.cp_logo}</h2>
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0">
              {form.logo_url ? (
                <img
                  src={form.logo_url}
                  alt="Logo"
                  className="h-20 w-20 rounded-2xl object-cover border border-white/10"
                />
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-navy2 border border-white/10 flex items-center justify-center">
                  <Building2 size={32} className="text-mist" />
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
                {uploading ? t.cp_uploading : t.cp_upload}
              </button>
              <p className="text-xs text-mist">{t.cp_logo_hint}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Company info */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.cp_info}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">{t.cp_name}</label>
              <input
                type="text" value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={t.cp_name_ph} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.cp_location}</label>
              <input
                type="text" value={form.location ?? ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder={t.cp_location_ph} disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foam">{t.cp_website}</label>
              <input
                type="url" value={form.website ?? ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://example.com" disabled={saving}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-foam">{t.cp_about}</label>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={t.cp_about_ph}
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
          {saving ? t.cp_saving : t.cp_save}
        </button>
      </form>
    </div>
  );
}
