"use client";

import { useEffect, useState, useRef } from "react";
import {
  Download, Mail, Phone, Globe, Calendar, CalendarCheck, Anchor, Ship, Flag, Building2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer, Certificate, SeaExperience } from "@/lib/supabase/types";

interface CVData {
  seafarer: Seafarer | null;
  certificates: Certificate[];
  experience: SeaExperience[];
  email: string;
}

function formatDate(d: string | null, short?: boolean): string {
  if (!d) return "Present";
  return new Date(d).toLocaleDateString("en-GB", {
    month: short ? "short" : "long",
    year: "numeric",
    ...(short ? {} : { day: "numeric" }),
  });
}

function calcDuration(from: string | null, to: string | null): string {
  if (!from) return "";
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();
  const months = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
  if (months < 1) return "< 1 mo";
  if (months < 12) return `${months} mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y}y ${m > 0 ? `${m}mo` : ""}`.trim();
}

function isExpired(d: string | null): boolean {
  if (!d) return false;
  return new Date(d) < new Date();
}

function monthsBetween(from: string | null, to: string | null): number {
  if (!from) return 0;
  const start = new Date(from);
  const end = to ? new Date(to) : new Date();
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30.44)));
}

function fmtMonths(m: number): string {
  if (m < 1) return "< 1 mo";
  if (m < 12) return `${m} mo`;
  const y = Math.floor(m / 12);
  const mm = m % 12;
  return `${y}y${mm > 0 ? ` ${mm}mo` : ""}`;
}

interface ExpGroup {
  vesselType: string;
  rank: string;
  months: number;
}

// Collapse voyages into one row per (vessel type + rank), summing sea time.
function groupExperience(items: SeaExperience[]): ExpGroup[] {
  const map = new Map<string, ExpGroup>();
  for (const e of items) {
    const vesselType = e.vessel_type?.trim() || "Various vessels";
    const rank = e.rank?.trim() || "—";
    const key = `${vesselType}|||${rank}`;
    const months = monthsBetween(e.from_date, e.to_date);
    const existing = map.get(key);
    if (existing) existing.months += months;
    else map.set(key, { vesselType, rank, months });
  }
  return [...map.values()].sort((a, b) => b.months - a.months);
}

/* ─── Modern single-page CV ─────────────────────────────────── */
function CVDocument({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const initials =
    ((seafarer?.first_name?.[0] ?? "") + (seafarer?.last_name?.[0] ?? "")).toUpperCase() || "S";

  const recent = experience.slice(0, 10);
  const earlier = experience.slice(10);
  const earlierGroups = groupExperience(earlier);

  return (
    <div
      className="cv-content mx-auto flex bg-white font-sans text-[#1f2933]"
      style={{
        width: "210mm",
        minHeight: "297mm",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* ── Sidebar ── */}
      <aside className="flex w-[35%] flex-col gap-6 bg-[#0a1f33] p-7 text-white">
        <div>
          {seafarer?.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={seafarer.photo_url}
              alt={name}
              className="h-20 w-20 rounded-2xl border border-white/15 object-cover"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-[#c9a227] to-[#e3c04a] text-2xl font-bold text-[#0a1f33]">
              {initials}
            </div>
          )}
          <h1 className="mt-4 text-[22px] font-bold leading-tight">{name}</h1>
          {seafarer?.rank && (
            <p className="mt-1 text-sm font-semibold text-[#e3c04a]">{seafarer.rank}</p>
          )}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2 text-[11px] leading-snug text-[#c5d2dd]">
          {email && (
            <span className="flex items-center gap-2">
              <Mail size={12} className="shrink-0 text-[#8aa0b0]" /> {email}
            </span>
          )}
          {seafarer?.phone && (
            <span className="flex items-center gap-2">
              <Phone size={12} className="shrink-0 text-[#8aa0b0]" /> {seafarer.phone}
            </span>
          )}
          {seafarer?.nationality && (
            <span className="flex items-center gap-2">
              <Globe size={12} className="shrink-0 text-[#8aa0b0]" /> {seafarer.nationality}
            </span>
          )}
          {seafarer?.date_of_birth && (
            <span className="flex items-center gap-2">
              <Calendar size={12} className="shrink-0 text-[#8aa0b0]" />
              {formatDate(seafarer.date_of_birth)}
            </span>
          )}
        </div>

        {/* Availability */}
        {seafarer?.readiness_date && (
          <div className="flex items-center gap-2 rounded-lg bg-[#c9a227] px-3 py-2 text-[#0a1f33]">
            <CalendarCheck size={16} className="shrink-0" />
            <div className="leading-tight">
              <p className="text-[9px] font-bold uppercase tracking-wider">Available from</p>
              <p className="text-xs font-bold">{formatDate(seafarer.readiness_date, true)}</p>
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <h2 className="mb-2 border-b border-white/15 pb-1 text-[11px] font-bold uppercase tracking-widest text-[#e3c04a]">
              Certificates
            </h2>
            <ul className="flex flex-col gap-1.5">
              {certificates.map((c) => (
                <li key={c.id} className="text-[10.5px] leading-tight">
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className={isExpired(c.expiry_date) ? "text-[#ff9a8a]" : "text-[#8aa0b0]"}>
                    {c.number ? `№ ${c.number} · ` : ""}
                    {c.expiry_date ? `exp. ${formatDate(c.expiry_date, true)}` : "no expiry"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <main className="flex flex-1 flex-col gap-6 p-8">
        {/* Summary */}
        {seafarer?.about && (
          <section>
            <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#0a1f33]">
              <Anchor size={14} className="text-[#c9a227]" /> Professional Summary
            </h2>
            <p className="text-[11.5px] leading-relaxed text-[#41505e]">{seafarer.about}</p>
          </section>
        )}

        {/* Sea experience — last 10 voyages in detail */}
        {experience.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#0a1f33]">
              <Ship size={14} className="text-[#c9a227]" /> Sea Experience
              {experience.length > 10 && (
                <span className="ml-1 text-[10px] font-semibold normal-case tracking-normal text-[#a7b2bc]">
                  (last 10 voyages)
                </span>
              )}
            </h2>
            <div className="flex flex-col gap-3">
              {recent.map((e) => (
                <div key={e.id} className="border-l-2 border-[#e3c04a] pl-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[12.5px] font-bold text-[#0a1f33]">{e.vessel_name}</p>
                    <p className="shrink-0 whitespace-nowrap text-[10px] font-semibold text-[#6b7884]">
                      {formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}
                      <span className="ml-1 text-[#a7b2bc]">({calcDuration(e.from_date, e.to_date)})</span>
                    </p>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-[#52606d]">
                    {e.rank && <span className="font-semibold text-[#0a6c63]">{e.rank}</span>}
                    {e.vessel_type && <span>{e.vessel_type}</span>}
                    {e.company && (
                      <span className="flex items-center gap-1">
                        <Building2 size={11} className="text-[#a7b2bc]" /> {e.company}
                      </span>
                    )}
                    {e.flag && (
                      <span className="flex items-center gap-1">
                        <Flag size={11} className="text-[#a7b2bc]" /> {e.flag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Earlier service — summarised by vessel type + rank, sea time summed */}
            {earlierGroups.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-[10.5px] font-bold uppercase tracking-widest text-[#52606d]">
                  Earlier service — summary
                </h3>
                <div className="overflow-hidden rounded-md border border-[#e2e8ed]">
                  <table className="w-full border-collapse text-[10.5px]">
                    <thead>
                      <tr className="bg-[#f1f4f7] text-left text-[#52606d]">
                        <th className="px-2.5 py-1.5 font-bold">Vessel type</th>
                        <th className="px-2.5 py-1.5 font-bold">Rank</th>
                        <th className="px-2.5 py-1.5 text-right font-bold">Sea time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {earlierGroups.map((g, i) => (
                        <tr key={`${g.vesselType}-${g.rank}-${i}`} className="border-t border-[#eef1f4]">
                          <td className="px-2.5 py-1.5">{g.vesselType}</td>
                          <td className="px-2.5 py-1.5 font-semibold text-[#0a6c63]">{g.rank}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold text-[#0a1f33]">
                            {fmtMonths(g.months)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {!seafarer?.about && experience.length === 0 && certificates.length === 0 && (
          <p className="text-[12px] text-[#8aa0b0]">
            Fill in your profile, certificates and sea experience — or upload a CV — and they will
            appear here.
          </p>
        )}
      </main>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function CVPage() {
  const [data, setData] = useState<CVData>({
    seafarer: null,
    certificates: [],
    experience: [],
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const [seafarerRes, certsRes, expRes] = await Promise.all([
        supabase.from("seafarers").select("*").eq("id", session.user.id).single(),
        supabase.from("certificates").select("*").eq("seafarer_id", session.user.id).order("expiry_date"),
        supabase
          .from("sea_experience")
          .select("*")
          .eq("seafarer_id", session.user.id)
          .order("from_date", { ascending: false }),
      ]);

      setData({
        seafarer: seafarerRes.data,
        certificates: certsRes.data ?? [],
        experience: expRes.data ?? [],
        email: session.user.email ?? "",
      });
      setLoading(false);
    }
    loadData();
  }, []);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-mist">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Print rules — render only the CV, on a single A4 page */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #cv-print-area { display: block !important; }
          @page { size: A4; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
        }
      `}</style>

      <div className="no-print p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">My CV</h1>
            <p className="mt-1 text-sm text-mist">A modern one-page résumé, generated from your profile.</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* Preview — scrollable, A4 proportioned */}
        <div className="overflow-auto rounded-2xl border border-white/10 bg-gray-300 p-4 shadow-2xl">
          <div className="mx-auto w-fit shadow-xl">
            <CVDocument data={data} />
          </div>
        </div>
      </div>

      {/* Hidden print area */}
      <div id="cv-print-area" ref={printRef} style={{ display: "none" }}>
        <CVDocument data={data} />
      </div>
    </>
  );
}
