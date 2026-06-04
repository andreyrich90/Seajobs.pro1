"use client";

export const dynamic = "force-dynamic";

import { useState, Suspense } from "react";
import Link from "next/link";
import { Anchor, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

function ForgotPasswordContent() {
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
      <header className="border-b border-white/10 bg-deep/80 backdrop-blur-md px-5 py-3">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg">
            <Anchor size={22} className="text-deep" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
        </Link>
      </header>

      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-card p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brass/10">
                <Mail size={26} className="text-brass2" />
              </div>
              <h1 className="font-display text-3xl font-semibold text-white">Forgot password?</h1>
              <p className="mt-2 text-sm text-mist">
                Enter your email address and we&apos;ll send you a reset link.
              </p>
            </div>

            {success ? (
              <div>
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-teal/30 bg-teal/10 px-4 py-4">
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-teal" />
                  <div>
                    <p className="text-sm font-semibold text-teal">Check your email!</p>
                    <p className="mt-1 text-sm text-foam/70">
                      We&apos;ve sent a password reset link to <span className="font-semibold text-foam">{email}</span>.
                      Check your inbox and follow the instructions.
                    </p>
                  </div>
                </div>
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <ArrowLeft size={16} /> Back to Login
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
                    <label className="text-sm font-semibold text-foam">Email address</label>
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
                    className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>

                <div className="mt-5 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-1.5 text-sm text-mist hover:text-white transition"
                  >
                    <ArrowLeft size={14} /> Back to Login
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
