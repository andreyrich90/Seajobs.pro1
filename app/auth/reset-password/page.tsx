"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { Anchor, Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { AUTH_T, LANGS } from "@/lib/i18n";

function ResetPasswordContent() {
  const { lang, setLang } = useLang();
  const t = AUTH_T[lang];

  // "verifying" while we exchange the recovery code; "ready" once a session
  // exists and the user can set a new password; "invalid" for a bad/expired link.
  const [phase, setPhase] = useState<"verifying" | "ready" | "invalid">("verifying");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // The reset email links here with a one-time ?code=. PKCE + detectSessionInUrl
  // is off, so exchange it explicitly for a recovery session (same as callback).
  useEffect(() => {
    let active = true;
    async function run() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const errDesc = params.get("error_description") || params.get("error");
      if (errDesc) { if (active) setPhase("invalid"); return; }

      if (code) {
        const { data, error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (!active) return;
        if (!exErr && data.session) { setPhase("ready"); return; }
      }
      // No code, or exchange failed — maybe a recovery session already exists.
      const { data: existing } = await supabase.auth.getSession();
      if (!active) return;
      setPhase(existing.session?.user ? "ready" : "invalid");
    }
    run();
    return () => { active = false; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) { setError(t.err_pw_match); return; }
    if (password.length < 6) { setError(t.err_pw_short); return; }

    setLoading(true);
    try {
      const { error: updErr } = await supabase.auth.updateUser({ password });
      if (updErr) { setError(updErr.message); return; }
      // Sign out so the recovery session can't linger; the user signs in fresh.
      await supabase.auth.signOut();
      setSuccess(true);
    } catch {
      setError(t.err_unexpected);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-deep flex flex-col">
      <header className="flex items-center justify-between border-b border-white/10 bg-deep/80 backdrop-blur-md px-5 py-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg">
            <Anchor size={22} className="text-[#061523]" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
        </Link>
        {/* Language switcher — auth screens have no global Header. */}
        <div className="flex items-center gap-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              title={l.label}
              className={`rounded-lg px-2 py-1 text-sm transition ${
                lang === l.code ? "bg-white/10 text-white" : "text-mist hover:text-white"
              }`}
            >
              {l.flag}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-card p-8">

            {phase === "verifying" && (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <Loader2 size={28} className="animate-spin text-brass2" />
                <p className="text-sm text-mist">{t.rp_verifying}</p>
              </div>
            )}

            {phase === "invalid" && (
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-coral/10">
                  <AlertCircle size={26} className="text-coral" />
                </div>
                <p className="text-sm text-foam/80">{t.rp_invalid}</p>
                <Link
                  href="/auth/forgot-password"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {t.rp_request_new}
                </Link>
              </div>
            )}

            {phase === "ready" && success && (
              <div className="text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal/15">
                  <CheckCircle size={26} className="text-teal" />
                </div>
                <h1 className="font-display text-2xl font-semibold text-white">{t.rp_success_title}</h1>
                <p className="mt-2 text-sm text-foam/80">{t.rp_success_body}</p>
                <Link
                  href="/auth/login"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
                >
                  {t.rp_go_login}
                </Link>
              </div>
            )}

            {phase === "ready" && !success && (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brass/10">
                    <Lock size={24} className="text-brass2" />
                  </div>
                  <h1 className="font-display text-3xl font-semibold text-white">{t.rp_title}</h1>
                  <p className="mt-2 text-sm text-mist">{t.rp_subtitle}</p>
                </div>

                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
                    <p className="text-sm text-coral">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foam">{t.rp_new_password}</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.password_ph6}
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-navy2 px-4 py-3 pr-12 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-white"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foam">{t.confirm_password}</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder={t.rp_confirm_ph}
                      required
                      disabled={loading}
                      className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                  >
                    {loading ? t.rp_updating : t.rp_submit}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-white transition"
                  >
                    <ArrowLeft size={14} /> {t.fp_back}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
