"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Ship, Award, MapPin, Anchor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";

type PublicProfile = {
  first_name: string | null;
  last_name: string | null;
  photo_url: string | null;
  nationality: string | null;
  rank: string | null;
  readiness_date: string | null;
  about: string | null;
};

type Experience = {
  id: string;
  vessel_name: string;
  vessel_type: string | null;
  rank: string | null;
  company: string | null;
  flag: string | null;
  from_date: string | null;
  to_date: string | null;
};

type Certificate = {
  id: string;
  name: string;
  issuing_authority: string | null;
  expiry_date: string | null;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function calcDuration(from: string | null, to: string | null): string {
  if (!from) return "";
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 1) return "< 1 month";
  if (months < 12) return `${months}m`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return m > 0 ? `${y}y ${m}m` : `${y}y`;
}

export default function PublicSeafarerPage() {
  const params = useParams();
  const id = params?.id as string;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const { data: profileData, error } = await supabase
          .from("seafarers")
          .select("first_name, last_name, photo_url, nationality, rank, readiness_date, about")
          .eq("id", id)
          .single();

        if (error || !profileData) {
          setNotFound(true);
          return;
        }

        setProfile(profileData as PublicProfile);

        const [expRes, certRes] = await Promise.all([
          supabase
            .from("sea_experience")
            .select("id, vessel_name, vessel_type, rank, company, flag, from_date, to_date")
            .eq("seafarer_id", id)
            .order("from_date", { ascending: false }),
          supabase
            .from("certificates")
            .select("id, name, issuing_authority, expiry_date")
            .eq("seafarer_id", id)
            .order("expiry_date", { ascending: false }),
        ]);

        setExperience((expRes.data as Experience[]) ?? []);
        setCertificates((certRes.data as Certificate[]) ?? []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-mist text-sm">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-16 text-center">
          <Anchor size={40} className="text-mist/30" />
          <p className="text-lg font-semibold text-foam">Profile not found</p>
          <p className="text-sm text-mist">This profile may be private or does not exist.</p>
          <Link href="/jobs" className="text-sm text-brass2 hover:underline">
            Browse vacancies
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ") || "Seafarer";
  const initials = [profile.first_name?.[0], profile.last_name?.[0]].filter(Boolean).join("").toUpperCase() || "S";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-5 py-10">
        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-mist hover:text-white transition mb-6"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Link>

        <div className="flex flex-col gap-6">
          {/* Profile header */}
          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <div className="flex items-start gap-5">
              {profile.photo_url ? (
                <img
                  src={profile.photo_url}
                  alt={fullName}
                  className="h-20 w-20 rounded-2xl object-cover shrink-0"
                />
              ) : (
                <div className="grid h-20 w-20 place-items-center shrink-0 rounded-2xl bg-brass/20 font-display text-2xl font-bold text-brass2">
                  {initials}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h1 className="font-display text-2xl font-semibold text-white">{fullName}</h1>

                {profile.rank && (
                  <span className="mt-1.5 inline-block rounded-full bg-brass/10 border border-brass/20 px-3 py-0.5 text-xs font-semibold text-brass2">
                    {profile.rank}
                  </span>
                )}

                <div className="mt-3 flex flex-wrap gap-4">
                  {profile.nationality && (
                    <div className="flex items-center gap-1.5 text-sm text-mist">
                      <MapPin size={14} className="shrink-0" />
                      {profile.nationality}
                    </div>
                  )}
                  {profile.readiness_date && (
                    <div className="flex items-center gap-1.5 text-sm text-mist">
                      <Ship size={14} className="shrink-0" />
                      Available from {formatDate(profile.readiness_date)}
                    </div>
                  )}
                </div>

                {profile.about && (
                  <p className="mt-4 text-sm text-foam/80 leading-relaxed">{profile.about}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sea Experience */}
          {experience.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Ship size={18} className="text-brass2" />
                <h2 className="font-display text-lg font-semibold text-white">Sea Experience</h2>
              </div>

              <div className="flex flex-col divide-y divide-white/10">
                {experience.map((e) => (
                  <div key={e.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{e.vessel_name}</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {e.rank && (
                            <span className="rounded-full bg-brass/10 border border-brass/20 px-2.5 py-0.5 text-xs font-semibold text-brass2">
                              {e.rank}
                            </span>
                          )}
                          {e.vessel_type && (
                            <span className="rounded-full bg-teal/10 border border-teal/20 px-2.5 py-0.5 text-xs font-semibold text-teal">
                              {e.vessel_type}
                            </span>
                          )}
                          {e.flag && (
                            <span className="text-xs text-mist/70">{e.flag}</span>
                          )}
                        </div>
                        {e.company && (
                          <p className="mt-1 text-xs text-mist">{e.company}</p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-mist">
                          {formatDate(e.from_date)} — {e.to_date ? formatDate(e.to_date) : "Present"}
                        </p>
                        <p className="text-xs text-brass2 font-semibold">{calcDuration(e.from_date, e.to_date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Award size={18} className="text-brass2" />
                <h2 className="font-display text-lg font-semibold text-white">Certificates</h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {certificates.map((c) => (
                  <div key={c.id} className="rounded-xl border border-white/10 bg-navy2 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{c.name}</p>
                    {c.issuing_authority && (
                      <p className="text-xs text-mist mt-0.5">{c.issuing_authority}</p>
                    )}
                    {c.expiry_date && (
                      <p className="mt-1 text-xs text-mist/60">
                        Expires: {formatDate(c.expiry_date)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {experience.length === 0 && certificates.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-card p-8 text-center">
              <User size={32} className="mx-auto mb-3 text-mist/30" />
              <p className="text-sm text-mist">No experience or certificates added yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
