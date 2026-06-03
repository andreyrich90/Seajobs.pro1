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

  useEffect(() => {
    async function handleCallback() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        setUserId(user.id);
        setNeedsRole(true);
        setLoading(false);
      } else {
        const r = (profile as { role: string }).role;
        router.push(r === "seafarer" ? "/seafarer/dashboard" : "/company/dashboard");
      }
    }

    handleCallback();
  }, [router]);

  async function handleRoleSelect(role: Role) {
    if (!userId) return;
    setSaving(true);
    setError(null);

    const { error: profileError } = await supabase
      .from("profiles")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ id: userId, role } as any);

    if (profileError) {
      setError("Failed to save role: " + profileError.message);
      setSaving(false);
      return;
    }

    if (role === "seafarer") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from("seafarers").insert({ id: userId } as any);
      router.push("/seafarer/dashboard");
    } else {
      router.push("/company/dashboard");
    }
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
