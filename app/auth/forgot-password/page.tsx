"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Anchor, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { AUTH_T, LANGS } from "@/lib/i18n";

function ForgotPasswordContent() {
  const { lang, setLang } = useLang();
  const t = AUTH_T[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/auth/reset-password",
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
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
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brass/10">
                <Mail size={26} className="text-brass2" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-white">{t.fp_title}</h1>
              <p className="mt-2 text-sm text-mist">
                {t.fp_subtitle}
              </p>
            </div>

            {success ? (
              <div>
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-teal/30 bg-teal/10 px-4 py-4">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-teal" />
                  <div>
                    <p className="text-sm font-semibold text-teal">{t.fp_check}</p>
                    <p className="mt-1 text-sm text-foam/70">
                      {t.fp_sent_pre} <span className="font-semibold text-foam">{email}</span>.
                      {" "}{t.fp_sent_post}
                    </p>
                  </div>
                </div>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ArrowLeft size={16} /> {t.fp_back}
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                    <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
                    <p className="text-sm text-coral">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foam">{t.email_address}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="captain@example.com"
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
                    {loading ? t.fp_sending : t.fp_send}
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

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
}
