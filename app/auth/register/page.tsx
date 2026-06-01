"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Anchor, Anchor as AnchorIcon, Briefcase, Eye, EyeOff, AlertCircle, ChevronLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Role = "seafarer" | "company";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleRoleSelect(r: Role) {
    setRole(r);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data.user) {
        setError("Sign up failed. Please try again.");
        return;
      }

      // Insert into profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({ id: data.user.id, role: role as "seafarer" | "company" });

      if (profileError) {
        setError("Failed to create profile: " + profileError.message);
        return;
      }

      // If seafarer, create seafarer record
      if (role === "seafarer") {
        const { error: seafarerError } = await supabase
          .from("seafarers")
          .insert({ id: data.user.id });

        if (seafarerError) {
          setError("Failed to create seafarer profile: " + seafarerError.message);
          return;
        }

        router.push("/seafarer/dashboard");
      } else {
        router.push("/company/dashboard");
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
        <div className="w-full max-w-lg">

          {/* Step 1: Role selection */}
          {step === 1 && (
            <div>
              <div className="mb-8 text-center">
                <h1 className="font-display text-3xl font-semibold text-white">Create your account</h1>
                <p className="mt-2 text-sm text-mist">Choose how you want to use SeaJobs.pro</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Seafarer card */}
                <button
                  onClick={() => handleRoleSelect("seafarer")}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card p-8 text-left transition hover:border-brass/50 hover:bg-navy2"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-teal/20 to-teal/5 border border-teal/20">
                    <AnchorIcon size={32} className="text-teal" />
                  </div>
                  <div className="text-center">
                    <h2 className="font-display text-xl font-semibold text-white">Seafarer</h2>
                    <p className="mt-1.5 text-sm text-mist leading-relaxed">
                      Find maritime jobs, build your CV, manage certificates and sea experience.
                    </p>
                  </div>
                </button>

                {/* Company card */}
                <button
                  onClick={() => handleRoleSelect("company")}
                  className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card p-8 text-left transition hover:border-brass/50 hover:bg-navy2"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brass/20 to-brass/5 border border-brass/20">
                    <Briefcase size={32} className="text-brass2" />
                  </div>
                  <div className="text-center">
                    <h2 className="font-display text-xl font-semibold text-white">Company</h2>
                    <p className="mt-1.5 text-sm text-mist leading-relaxed">
                      Post vacancies, find qualified seafarers, and manage your crew.
                    </p>
                  </div>
                </button>
              </div>

              <p className="mt-6 text-center text-sm text-mist">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-brass2 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {/* Step 2: Registration form */}
          {step === 2 && (
            <div>
              <button
                onClick={() => { setStep(1); setError(null); }}
                className="mb-6 flex items-center gap-1.5 text-sm text-mist hover:text-white transition"
              >
                <ChevronLeft size={16} /> Back
              </button>

              <div className="rounded-2xl border border-white/10 bg-card p-8">
                <div className="mb-8 text-center">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brass/10 border border-brass/20 px-4 py-1.5">
                    {role === "seafarer" ? (
                      <AnchorIcon size={14} className="text-brass2" />
                    ) : (
                      <Briefcase size={14} className="text-brass2" />
                    )}
                    <span className="text-xs font-semibold text-brass2 capitalize">{role}</span>
                  </div>
                  <h1 className="font-display text-3xl font-semibold text-white">Create account</h1>
                  <p className="mt-2 text-sm text-mist">Fill in your details to get started</p>
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
                        placeholder="At least 6 characters"
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
                    <label className="text-sm font-semibold text-foam">Confirm password</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat your password"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-white/10 bg-navy2 px-4 py-3 pr-12 text-sm text-white outline-none focus:border-brass disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-white"
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                  >
                    {loading ? (
                      <span className="text-deep/70">Creating account...</span>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-mist">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="font-semibold text-brass2 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
