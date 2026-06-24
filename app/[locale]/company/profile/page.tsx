"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle, AlertCircle, Upload, Building2, Plus, Trash2, Phone, Mail, Users } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { CrewManager } from "@/lib/supabase/types";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

type ProfileForm = {
  name: string;
  logo_url: string;
  location: string;
  description: string;
  website: string;
};

const EMPTY_FORM: ProfileForm = {
  name: "",
  logo_url: "",
  location: "",
  description: "",
  website: "",
};

const EMPTY_MANAGER: CrewManager = { name: "", department: "", phone: "", email: "" };

export default function CompanyProfilePage() {
  const { lang } = useLang();
  const t = T[lang];
  const [form, setForm] = useState<ProfileForm>(EMPTY_FORM);
  const [phones, setPhones] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [managers, setManagers] = useState<CrewManager[]>([]);
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
        setPhones(data.phones?.length ? data.phones : [""]);
        setEmails(data.emails?.length ? data.emails : [""]);
        setManagers(data.crew_managers ?? []);
      } else {
        setPhones([""]);
        setEmails([""]);
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  function handleChange(field: keyof ProfileForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage(null);
  }

  // ── List helpers (phones / emails) ──
  function updateListItem(setter: typeof setPhones, list: string[], i: number, value: string) {
    setter(list.map((v, idx) => (idx === i ? value : v)));
    setMessage(null);
  }
  function addListItem(setter: typeof setPhones, list: string[]) {
    setter([...list, ""]);
  }
  function removeListItem(setter: typeof setPhones, list: string[], i: number) {
    const next = list.filter((_, idx) => idx !== i);
    setter(next.length ? next : [""]);
    setMessage(null);
  }

  // ── Crew manager helpers ──
  function updateManager(i: number, field: keyof CrewManager, value: string) {
    setManagers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)));
    setMessage(null);
  }
  function addManager() {
    setManagers((prev) => [...prev, { ...EMPTY_MANAGER }]);
  }
  function removeManager(i: number) {
    setManagers((prev) => prev.filter((_, idx) => idx !== i));
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

    const cleanPhones = phones.map((p) => p.trim()).filter(Boolean);
    const cleanEmails = emails.map((m) => m.trim()).filter(Boolean);
    const cleanManagers = managers
      .map((m) => ({
        name: m.name.trim(),
        department: m.department.trim(),
        phone: m.phone.trim(),
        email: m.email.trim(),
      }))
      .filter((m) => m.name || m.department || m.phone || m.email);

    const payload = {
      name: form.name || null,
      logo_url: form.logo_url || null,
      location: form.location || null,
      description: form.description || null,
      website: form.website || null,
      phones: cleanPhones,
      emails: cleanEmails,
      crew_managers: cleanManagers,
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
                <Image
                  src={form.logo_url}
                  alt="Logo"
                  fill
                  sizes="80px"
                  className="rounded-2xl object-cover border border-white/10"
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

        {/* Contact details: phones + emails */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="text-sm font-semibold text-mist uppercase tracking-wider mb-4">{t.cp_contacts}</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Phones */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foam">{t.cp_phones}</label>
              {phones.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist/60" />
                    <input
                      type="tel" value={p}
                      onChange={(e) => updateListItem(setPhones, phones, i, e.target.value)}
                      placeholder={t.cp_phone_ph} disabled={saving}
                      className="w-full rounded-xl border border-white/10 bg-navy2 pl-9 pr-3 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                    />
                  </div>
                  <button type="button" onClick={() => removeListItem(setPhones, phones, i)}
                    title={t.cp_remove} disabled={saving}
                    className="rounded-lg border border-coral/20 bg-coral/10 p-2 text-coral transition hover:bg-coral/20 disabled:opacity-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem(setPhones, phones)} disabled={saving}
                className="mt-1 flex items-center gap-1.5 self-start text-xs font-semibold text-brass2 hover:text-brass disabled:opacity-50">
                <Plus size={14} /> {t.cp_add_phone}
              </button>
            </div>

            {/* Emails */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foam">{t.cp_emails}</label>
              {emails.map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist/60" />
                    <input
                      type="email" value={m}
                      onChange={(e) => updateListItem(setEmails, emails, i, e.target.value)}
                      placeholder={t.cp_email_ph} disabled={saving}
                      className="w-full rounded-xl border border-white/10 bg-navy2 pl-9 pr-3 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                    />
                  </div>
                  <button type="button" onClick={() => removeListItem(setEmails, emails, i)}
                    title={t.cp_remove} disabled={saving}
                    className="rounded-lg border border-coral/20 bg-coral/10 p-2 text-coral transition hover:bg-coral/20 disabled:opacity-50">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addListItem(setEmails, emails)} disabled={saving}
                className="mt-1 flex items-center gap-1.5 self-start text-xs font-semibold text-brass2 hover:text-brass disabled:opacity-50">
                <Plus size={14} /> {t.cp_add_email}
              </button>
            </div>
          </div>
        </div>

        {/* Crew managers */}
        <div className="rounded-2xl border border-white/10 bg-card p-6">
          <div className="mb-1 flex items-center gap-2">
            <Users size={16} className="text-brass2" />
            <h2 className="text-sm font-semibold text-mist uppercase tracking-wider">{t.cp_crew}</h2>
          </div>
          <p className="mb-4 text-xs text-mist">{t.cp_crew_hint}</p>

          <div className="flex flex-col gap-4">
            {managers.map((m, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-navy2/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-mist">#{i + 1}</span>
                  <button type="button" onClick={() => removeManager(i)}
                    title={t.cp_remove} disabled={saving}
                    className="rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral transition hover:bg-coral/20 disabled:opacity-50">
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text" value={m.name}
                    onChange={(e) => updateManager(i, "name", e.target.value)}
                    placeholder={t.cp_mgr_name_ph} disabled={saving}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <input
                    type="text" value={m.department}
                    onChange={(e) => updateManager(i, "department", e.target.value)}
                    placeholder={t.cp_mgr_dept_ph} disabled={saving}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <input
                    type="tel" value={m.phone}
                    onChange={(e) => updateManager(i, "phone", e.target.value)}
                    placeholder={t.cp_mgr_phone_ph} disabled={saving}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <input
                    type="email" value={m.email}
                    onChange={(e) => updateManager(i, "email", e.target.value)}
                    placeholder={t.cp_mgr_email_ph} disabled={saving}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-2.5 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
            {managers.length === 0 && (
              <p className="text-sm text-mist/60">{t.cp_no_managers}</p>
            )}
            <button type="button" onClick={addManager} disabled={saving}
              className="flex items-center gap-1.5 self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50">
              <Plus size={15} /> {t.cp_add_manager}
            </button>
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
