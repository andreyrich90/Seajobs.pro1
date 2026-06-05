"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Anchor, Ship, Briefcase, Eye, EyeOff, AlertCircle, ShieldOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Role = "seafarer" | "company";

function LoginContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>("seafarer");
  const isBlocked = searchParams.get("blocked") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setGoogleLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) { setError(signInError.message); return; }
      if (!data.user) { setError("Sign in failed. Please try again."); return; }

      if (typeof window !== "undefined") localStorage.setItem("user_role", role);
      router.push(role === "seafarer" ? "/seafarer/dashboard" : "/company/dashboard");
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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

          {/* Role selector */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => setRole("seafarer")}
              className={`flex items-center justify-center gap-2.5 rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                role === "seafarer"
                  ? "border-teal bg-teal/10 text-teal"
                  : "border-white/10 bg-card text-mist hover:border-white/20"
              }`}
            >
              <Ship size={20} /> Seafarer
            </button>
            <button
              onClick={() => setRole("company")}
              className={`flex items-center justify-center gap-2.5 rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                role === "company"
                  ? "border-brass bg-brass/10 text-brass2"
                  : "border-white/10 bg-card text-mist hover:border-white/20"
              }`}
            >
              <Briefcase size={20} /> Crewing
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card p-8">
            <div className="mb-6 text-center">
              <h1 className="font-display text-3xl font-semibold text-white">Welcome back</h1>
              <p className="mt-1 text-sm text-mist">
                Sign in as{" "}
                <span className={role === "seafarer" ? "text-teal font-semibold" : "text-brass2 font-semibold"}>
                  {role === "seafarer" ? "Seafarer" : "Crewing Company"}
                </span>
              </p>
            </div>

            {isBlocked && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <ShieldOff size={18} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">Your account has been blocked. Please contact support.</p>
              </div>
            )}

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{error}</p>
              </div>
            )}

            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={googleLoading}
              className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
                <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
              </svg>
              {googleLoading ? "Redirecting..." : "Sign in with Google"}
            </button>

            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-mist">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Email</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="captain@example.com" required disabled={loading}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" required disabled={loading}
                    className="w-full rounded-xl border border-white/10 bg-navy2 px-4 py-3 pr-12 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="text-right">
                <Link href="/auth/forgot-password" className="text-xs text-mist hover:text-white transition">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" disabled={loading}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-mist">
              No account?{" "}
              <Link href="/auth/register" className="font-semibold text-brass2 hover:underline">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
