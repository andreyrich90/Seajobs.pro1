"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Anchor, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (!data.user) {
        setError("Sign in failed. Please try again.");
        return;
      }

      // Check user role from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single() as { data: Profile | null; error: unknown };

      if (profileError || !profileData) {
        setError("Could not load your profile. Please try again.");
        return;
      }

      if (profileData.role === "seafarer") {
        router.push("/seafarer/dashboard");
      } else if (profileData.role === "company") {
        router.push("/company/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-deep flex flex-col">
      {/* Minimal header */}
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

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-card p-8">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-semibold text-white">Welcome back</h1>
              <p className="mt-2 text-sm text-mist">Sign in to your SeaJobs account</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foam">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                {loading ? (
                  <span className="text-mist">Signing in...</span>
                ) : (
                  <>
                    <LogIn size={16} /> Sign in
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-mist">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-semibold text-brass2 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
