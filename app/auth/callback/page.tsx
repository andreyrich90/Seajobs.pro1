"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Anchor, Ship, Briefcase, AlertCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

type Role = "seafarer" | "company";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [needsRole, setNeedsRole] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let handled = false;

    // Google/Supabase report OAuth failures (e.g. cancelled consent,
    // misconfigured redirect URI) as ?error=...&error_description=... or
    // #error=...&error_description=... on this page. Surface that instead
    // of silently bouncing back to /auth/login with no explanation.
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const searchParams = new URLSearchParams(window.location.search);
    const oauthError = hashParams.get("error_description") || hashParams.get("error")
      || searchParams.get("error_description") || searchParams.get("error");
    if (oauthError) {
      handled = true;
      setAuthError(decodeURIComponent(oauthError));
      setLoading(false);
      return;
    }

    async function handleUser(userId: string) {
      if (handled) return;
      handled = true;

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .single();

        if (!profile) {
          const pendingRole = localStorage.getItem("oauth_role") as Role | null;
          if (pendingRole === "seafarer" || pendingRole === "company") {
            localStorage.removeItem("oauth_role");
            setUserId(userId);
            setLoading(false);
            await handleRoleSelectInner(userId, pendingRole);
          } else {
            setUserId(userId);
            setNeedsRole(true);
            setLoading(false);
          }
        } else {
          const r = (profile as { role: string }).role;
          localStorage.setItem("user_role", r);
          router.push(r === "seafarer" ? "/seafarer/dashboard" : "/company/dashboard");
        }
      } catch {
        // Profile lookup failed (e.g. transient API/schema issue) but the
        // user IS signed in — let them pick a role rather than bouncing
        // them back to /auth/login as if auth itself failed.
        setUserId(userId);
        setNeedsRole(true);
        setLoading(false);
      }
    }

    // Some browsers/contexts don't reliably re-fire INITIAL_SESSION once a
    // session already exists in storage, so check directly first...
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) handleUser(session.user.id);
    });

    // ...and also listen for the auth state change that follows PKCE code
    // exchange — getUser() called immediately can race against the code
    // exchange and return null (especially when opening from an email link
    // in a fresh browser context).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user) {
          await handleUser(session.user.id);
        } else if (event === "INITIAL_SESSION" && !session) {
          // No existing session and no code to exchange — send to login
          if (!handled) {
            handled = true;
            router.push("/auth/login");
          }
        }
      }
    );

    // Fallback timeout in case auth state never fires (network error etc.)
    const timeout = setTimeout(() => {
      if (!handled) {
        handled = true;
        router.push("/auth/login");
      }
    }, 12000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  async function handleRoleSelectInner(uid: string, role: Role) {
    const { error: profileError } = await supabase
      .from("profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ id: uid, role } as any);

    if (profileError) {
      setError("Failed to save role: " + profileError.message);
      setSaving(false);
      return;
    }

    localStorage.setItem("user_role", role);
    if (role === "seafarer") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from("seafarers").insert({ id: uid } as any);
      router.push("/seafarer/dashboard");
    } else {
      router.push("/company/dashboard");
    }
  }

  async function handleRoleSelect(role: Role) {
    if (!userId) return;
    setSaving(true);
    setError(null);
    await handleRoleSelectInner(userId, role);
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-coral/20">
            <AlertCircle size={24} className="text-coral" />
          </div>
          <p className="font-display text-xl font-semibold text-white">Sign-in failed</p>
          <p className="mt-2 text-sm text-mist">{authError}</p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

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
