"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Anchor, Ship, Briefcase, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Role = "seafarer" | "company";

// Validated internal redirect target carried through the OAuth round-trip.
function safeRedirect(): string | null {
  if (typeof window === "undefined") return null;
  const r = new URLSearchParams(window.location.search).get("redirect") ?? "";
  return r.startsWith("/") && !r.startsWith("//") ? r : null;
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const [needsRole, setNeedsRole] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRoleSelectInner(uid: string, role: Role) {
    const { error: profileError } = await supabase
      .from("profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ id: uid, role } as any);

    if (profileError) {
      setError("Failed to save role: " + profileError.message);
      setSaving(false);
      setLoading(false);
      return;
    }

    localStorage.setItem("user_role", role);
    const dest = safeRedirect();
    if (role === "seafarer") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from("seafarers").insert({ id: uid } as any);
      router.push(dest ?? "/seafarer/dashboard");
    } else {
      router.push(dest ?? "/company/dashboard");
    }
  }

  async function handleRoleSelect(role: Role) {
    if (!userId) return;
    setSaving(true);
    setError(null);
    await handleRoleSelectInner(userId, role);
  }

  useEffect(() => {
    let active = true;

    // Once we have an authenticated user, route them based on their profile.
    async function handleUser(uid: string) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", uid)
          .single();

        if (!active) return;

        if (profile) {
          const r = (profile as { role: string }).role;
          localStorage.setItem("user_role", r);
          const dest = safeRedirect();
          router.push(dest ?? (r === "seafarer" ? "/seafarer/dashboard" : "/company/dashboard"));
          return;
        }

        // No profile yet (first OAuth sign-in). Apply a pending role chosen on
        // the register screen, otherwise ask the user to pick one.
        const pendingRole = localStorage.getItem("oauth_role") as Role | null;
        if (pendingRole === "seafarer" || pendingRole === "company") {
          localStorage.removeItem("oauth_role");
          setUserId(uid);
          await handleRoleSelectInner(uid, pendingRole);
        } else {
          setUserId(uid);
          setNeedsRole(true);
          setLoading(false);
        }
      } catch {
        // Profile lookup failed (transient API/schema issue) but the user IS
        // signed in — let them pick a role rather than bouncing to login.
        if (!active) return;
        setUserId(uid);
        setNeedsRole(true);
        setLoading(false);
      }
    }

    async function run() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const errDesc = params.get("error_description") || params.get("error");

        // OAuth provider returned an explicit error (e.g. user cancelled).
        if (errDesc) {
          if (!active) return;
          setError(decodeURIComponent(errDesc.replace(/\+/g, " ")));
          setLoading(false);
          return;
        }

        // PKCE: exchange the one-time ?code= for a session using the verifier
        // stored at sign-in time. Done explicitly (detectSessionInUrl is off).
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          if (!active) return;
          if (error || !data.session) {
            // A session may already exist (e.g. a duplicate callback) — use it.
            const { data: existing } = await supabase.auth.getSession();
            if (existing.session?.user) {
              await handleUser(existing.session.user.id);
              return;
            }
            setError(error?.message ?? "Could not complete sign in. Please try again.");
            setLoading(false);
            return;
          }
          await handleUser(data.session.user.id);
          return;
        }

        // No code in the URL — maybe already authenticated, otherwise to login.
        const { data: existing } = await supabase.auth.getSession();
        if (!active) return;
        if (existing.session?.user) {
          await handleUser(existing.session.user.id);
          return;
        }
        router.push("/auth/login");
      } catch {
        if (!active) return;
        setError("Unexpected error during sign in. Please try again.");
        setLoading(false);
      }
    }

    let ranDone = false;
    run().finally(() => {
      ranDone = true;
    });

    // Safety net: never let the page hang on "Signing you in…" forever.
    const watchdog = setTimeout(() => {
      if (active && !ranDone) {
        setError("Sign-in is taking too long. Please try signing in again.");
        setLoading(false);
      }
    }, 12000);

    return () => {
      active = false;
      clearTimeout(watchdog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2">
            <Anchor size={24} className="text-deep" />
          </div>
          <p className="text-mist">Signing you in...</p>
        </div>
      </div>
    );
  }

  if (error && !needsRole) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-left">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
            <p className="text-sm text-coral">{error}</p>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  if (needsRole) {
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
          <div className="w-full max-w-lg">
            <div className="mb-8 text-center">
              <h1 className="font-display text-3xl font-semibold text-white">One last step</h1>
              <p className="mt-2 text-sm text-mist">How will you use SeaJobs.pro?</p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-coral" />
                <p className="text-sm text-coral">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => handleRoleSelect("seafarer")}
                disabled={saving}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card p-8 transition hover:border-teal/50 hover:bg-navy2 disabled:opacity-50"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-teal/20 bg-gradient-to-br from-teal/20 to-teal/5">
                  <Ship size={32} className="text-teal" />
                </div>
                <div className="text-center">
                  <h2 className="font-display text-xl font-semibold text-white">Seafarer</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Find jobs, build your CV, manage certificates.
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("company")}
                disabled={saving}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-card p-8 transition hover:border-brass/50 hover:bg-navy2 disabled:opacity-50"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-brass/20 bg-gradient-to-br from-brass/20 to-brass/5">
                  <Briefcase size={32} className="text-brass2" />
                </div>
                <div className="text-center">
                  <h2 className="font-display text-xl font-semibold text-white">Crewing Company</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    Post vacancies, find qualified seafarers.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
