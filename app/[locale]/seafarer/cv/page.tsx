"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer, Certificate, SeaExperience } from "@/lib/supabase/types";

interface CVData {
  seafarer: Seafarer | null;
  certificates: Certificate[];
  experience: SeaExperience[];
  email: string;
}

function formatDate(d: string | null, short?: boolean): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    month: short ? "short" : "long",
    year: "numeric",
    ...(short ? {} : { day: "numeric" }),
  });
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

function isExpired(d: string | null): boolean {
  if (!d) return false;
  return new Date(d) < new Date();
}

// Total sea time grouped by rank (for the Sea Time Summary), sorted by time.
function seaTimeByRank(items: SeaExperience[]): { rank: string; months: number }[] {
  const map = new Map<string, number>();
  for (const e of items) {
    const rank = e.rank?.trim() || "Other";
    map.set(rank, (map.get(rank) ?? 0) + monthsBetween(e.from_date, e.to_date));
  }
  return [...map.entries()]
    .map(([rank, months]) => ({ rank, months }))
    .sort((a, b) => b.months - a.months);
}

/* ─── Navy section bar (matches the maritime CV template) ─── */
function Bar({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-[#16365c] px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-wide text-white">
      {children}
    </div>
  );
}

/* ─── Maritime single-page CV ─────────────────────────────── */
function CVDocument({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

  const totalMonths = experience.reduce((s, e) => s + monthsBetween(e.from_date, e.to_date), 0);
  const byRank = seaTimeByRank(experience);
  const recent = experience.slice(0, 10);
  const hasEarlier = experience.length > 10;

  const cell = "px-2 py-[3px] align-top";
  const zebra = (i: number) => (i % 2 === 1 ? "bg-[#f4f6f8]" : "bg-white");

  return (
    <div
      className="cv-content mx-auto bg-white font-sans text-[#1f2933]"
      style={{
        width: "210mm",
        padding: "12mm",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* ── Header ── */}
      <header className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold uppercase leading-tight tracking-tight text-[#16365c]">
            {name}
          </h1>
          {seafarer?.rank && (
            <p className="text-[13px] font-bold uppercase tracking-wide text-[#16365c]">
              {seafarer.rank}
            </p>
          )}
          <div className="mt-2 space-y-0.5 text-[10px] text-[#41505e]">
            {email && (
              <p>
                <span className="font-bold">Email:</span> {email}
              </p>
            )}
            {seafarer?.phone && (
              <p>
                <span className="font-bold">Phone / WhatsApp:</span> {seafarer.phone}
              </p>
            )}
            {(seafarer?.nationality || seafarer?.readiness_date) && (
              <p>
                <span className="font-bold">Availability:</span>{" "}
                {seafarer?.readiness_date
                  ? `Ready from ${formatDate(seafarer.readiness_date, true)}`
                  : "Ready for transit"}
                {seafarer?.nationality ? ` · ${seafarer.nationality}` : ""}
              </p>
            )}
          </div>
        </div>

        {/* Photo / placeholder */}
        {seafarer?.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={seafarer.photo_url}
            alt={name}
            className="h-[35mm] w-[26mm] shrink-0 rounded-sm border border-[#d7dee5] object-cover"
          />
        ) : (
          <div className="grid h-[35mm] w-[26mm] shrink-0 place-items-center rounded-sm border border-dashed border-[#b9c4cf] text-center text-[8px] leading-tight text-[#9aa7b2]">
            PHOTO
            <br />
            3.5 × 4.5 cm
          </div>
        )}
      </header>

      {/* ── Two columns: Personal Information | Sea Time Summary ── */}
      <div className="mt-1 grid grid-cols-2 gap-5">
        {/* Personal Information */}
        <div>
          <Bar>Personal Information</Bar>
          <table className="w-full border-collapse text-[10px]">
            <tbody>
              {[
                ["Date of birth", formatDate(seafarer?.date_of_birth ?? null)],
                ["Citizenship", seafarer?.nationality || "—"],
                ["Availability", seafarer?.readiness_date ? formatDate(seafarer.readiness_date, true) : "Immediate"],
                ["Rank / Position", seafarer?.rank || "—"],
                ["Phone", seafarer?.phone || "—"],
                ["Email", email || "—"],
                ...(seafarer?.seamans_book
                  ? [["Seaman's Book", seafarer.seamans_book + (seafarer.seamans_book_expiry ? ` (exp. ${formatDate(seafarer.seamans_book_expiry, true)})` : "")]]
                  : []),
                ...(seafarer?.passport_no
                  ? [["Foreign Passport", seafarer.passport_no + (seafarer.passport_expiry ? ` (exp. ${formatDate(seafarer.passport_expiry, true)})` : "")]]
                  : []),
                ...(seafarer?.diploma
                  ? [["Diploma / CoC", seafarer.diploma + (seafarer.diploma_expiry ? ` (exp. ${formatDate(seafarer.diploma_expiry, true)})` : "")]]
                  : []),
                ...(seafarer?.us_visa ? [["US Visa C1/D", seafarer.us_visa]] : []),
                ...(seafarer?.schengen_visa ? [["Schengen Visa", seafarer.schengen_visa]] : []),
              ].map(([k, v], i) => (
                <tr key={k} className={zebra(i)}>
                  <td className={`${cell} w-[42%] font-semibold text-[#52606d]`}>{k}</td>
                  <td className={cell}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sea Time Summary */}
        <div>
          <Bar>Sea Time Summary</Bar>
          <table className="w-full border-collapse text-[10px]">
            <tbody>
              <tr className="bg-white">
                <td className={`${cell} w-[55%] font-semibold text-[#52606d]`}>Total Sea Time</td>
                <td className={`${cell} font-bold text-[#16365c]`}>{fmtMonths(totalMonths)}</td>
              </tr>
              {byRank.map((r, i) => (
                <tr key={r.rank} className={zebra(i)}>
                  <td className={`${cell} font-semibold text-[#52606d]`}>As {r.rank}</td>
                  <td className={cell}>{fmtMonths(r.months)}</td>
                </tr>
              ))}
              {byRank.length === 0 && (
                <tr>
                  <td className={cell} colSpan={2}>
                    No sea service recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {seafarer?.education && (
            <>
              <Bar>Education</Bar>
              <p className="px-1 py-1 text-[10px] leading-snug text-[#41505e]">{seafarer.education}</p>
            </>
          )}
        </div>
      </div>

      {seafarer?.about && (
        <p className="mt-2 text-[10px] leading-relaxed text-[#41505e]">{seafarer.about}</p>
      )}

      {/* ── Certificates ── */}
      {certificates.length > 0 && (
        <>
          <Bar>Competency, Endorsements &amp; STCW Certificates</Bar>
          <table className="w-full border-collapse text-[9.5px]">
            <thead>
              <tr className="bg-[#dbe3ec] text-left text-[#16365c]">
                <th className={`${cell} font-bold`}>Certificate description</th>
                <th className={`${cell} font-bold`}>Number</th>
                <th className={`${cell} font-bold`}>Issue date</th>
                <th className={`${cell} font-bold`}>Expiry date</th>
                <th className={`${cell} font-bold`}>Authority</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c, i) => (
                <tr key={c.id} className={zebra(i)}>
                  <td className={`${cell} font-semibold`}>{c.name}</td>
                  <td className={cell}>{c.number || "—"}</td>
                  <td className={cell}>{formatDate(c.issue_date, true)}</td>
                  <td className={`${cell} ${isExpired(c.expiry_date) ? "font-semibold text-[#c0392b]" : ""}`}>
                    {c.expiry_date ? formatDate(c.expiry_date, true) : "Continuous"}
                  </td>
                  <td className={cell}>{c.issuing_authority || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ── Sea Service History ── */}
      {experience.length > 0 && (
        <>
          <Bar>
            Sea Service History
            {hasEarlier && (
              <span className="ml-1 font-semibold normal-case tracking-normal text-[#b9c4cf]">
                — last 10 voyages
              </span>
            )}
          </Bar>
          <table className="w-full border-collapse text-[9.5px]">
            <thead>
              <tr className="bg-[#dbe3ec] text-left text-[#16365c]">
                <th className={`${cell} font-bold`}>Vessel name</th>
                <th className={`${cell} font-bold`}>Type</th>
                <th className={`${cell} font-bold`}>DWT / GRT</th>
                <th className={`${cell} font-bold`}>Engine / BHP</th>
                <th className={`${cell} font-bold`}>Rank</th>
                <th className={`${cell} font-bold`}>Flag</th>
                <th className={`${cell} font-bold`}>Period (from – to)</th>
                <th className={`${cell} font-bold`}>Duration</th>
                <th className={`${cell} font-bold`}>Company</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((e, i) => (
                <tr key={e.id} className={zebra(i)}>
                  <td className={`${cell} font-semibold`}>{e.vessel_name}</td>
                  <td className={cell}>{e.vessel_type || "—"}</td>
                  <td className={cell}>{e.dwt || "—"}</td>
                  <td className={cell}>{e.engine || "—"}</td>
                  <td className={`${cell} font-semibold text-[#16365c]`}>{e.rank || "—"}</td>
                  <td className={cell}>{e.flag || "—"}</td>
                  <td className={`${cell} whitespace-nowrap`}>
                    {formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}
                  </td>
                  <td className={`${cell} whitespace-nowrap`}>
                    {fmtMonths(monthsBetween(e.from_date, e.to_date))}
                  </td>
                  <td className={cell}>{e.company || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasEarlier && (
            <p className="mt-1 text-[9px] italic text-[#6b7884]">
              Earlier service ({experience.length - 10} more voyages) is consolidated in the Sea Time
              Summary above.
            </p>
          )}
        </>
      )}

      {/* ── Core Competencies & Languages ── */}
      {(seafarer?.competencies || seafarer?.languages) && (
        <>
          <Bar>Core Competencies &amp; Languages</Bar>
          <div className="grid grid-cols-2 gap-5 pt-1 text-[10px] text-[#41505e]">
            <div>
              {seafarer?.competencies
                ? seafarer.competencies
                    .split(/\r?\n/)
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((line, i) => (
                      <p key={i} className="leading-snug">• {line}</p>
                    ))
                : null}
            </div>
            {seafarer?.languages && (
              <div>
                <p className="font-bold text-[#16365c]">Languages</p>
                <p className="leading-snug">{seafarer.languages}</p>
              </div>
            )}
          </div>
        </>
      )}

      {!seafarer?.about && experience.length === 0 && certificates.length === 0 && (
        <p className="mt-4 text-[11px] text-[#8aa0b0]">
          Fill in your profile, certificates and sea experience — or upload a CV — and they will
          appear here.
        </p>
      )}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-mist">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Print rules — render ONLY the portal'd CV, on a single A4 page.
          #cv-print-root is a direct child of <body> (via portal), so the
          :not() selector reliably hides everything else with no blank page. */}
      <style>{`
        #cv-print-root { display: none; }
        @media print {
          body > *:not(#cv-print-root) { display: none !important; }
          #cv-print-root { display: block !important; }
          html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div className="p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">My CV</h1>
            <p className="mt-1 text-sm text-mist">A one-page maritime résumé, generated from your profile.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* Preview */}
        <div className="overflow-auto rounded-2xl border border-white/10 bg-gray-300 p-4 shadow-2xl">
          <div className="mx-auto w-fit shadow-xl">
            <CVDocument data={data} />
          </div>
        </div>
      </div>

      {/* Print copy — portaled to <body> so print CSS can isolate it cleanly */}
      {mounted &&
        createPortal(
          <div id="cv-print-root">
            <CVDocument data={data} />
          </div>,
          document.body
        )}
    </>
  );
}
