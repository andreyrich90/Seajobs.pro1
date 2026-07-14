"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer, Certificate, SeaExperience } from "@/lib/supabase/types";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

// A4 width in CSS pixels (210 mm at the browser's 96 dpi). Used to scale the
// on-screen preview so a full A4 page fits the phone's viewport width.
const A4_WIDTH_PX = (210 * 96) / 25.4;

interface CVData {
  seafarer: Seafarer | null;
  certificates: Certificate[];
  experience: SeaExperience[];
  email: string;
}

type Template = "maritime" | "classic" | "modern";

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

// Identity documents + visas, in the order they appear on the CV.
function buildDocs(s: Seafarer | null): [string, string][] {
  if (!s) return [];
  const docs: [string, string][] = [];
  const withExp = (val: string, exp: string | null) =>
    val + (exp ? ` — exp. ${formatDate(exp, true)}` : "");
  if (s.passport_no) docs.push(["Foreign passport (bio)", withExp(s.passport_no, s.passport_expiry)]);
  if (s.seamans_book) docs.push(["Seaman's book", withExp(s.seamans_book, s.seamans_book_expiry)]);
  if (s.service_record_book) docs.push(["Service record book", s.service_record_book]);
  if (s.medical) docs.push(["Medical certificate", withExp(s.medical, s.medical_expiry)]);
  // One or several diplomas (falls back to the legacy single diploma field).
  const diplomas = s.diplomas?.length
    ? s.diplomas
    : s.diploma
    ? [{ name: "", number: s.diploma, expiry: s.diploma_expiry ?? "" }]
    : [];
  for (const d of diplomas) {
    const label = d.name?.trim() ? `Diploma — ${d.name.trim()}` : "Diploma / CoC";
    const val = [d.number, d.expiry ? `exp. ${formatDate(d.expiry, true)}` : ""].filter(Boolean).join(" — ");
    if (val) docs.push([label, val]);
  }
  if (s.us_visa) docs.push(["US visa C1/D", s.us_visa]);
  if (s.schengen_visa) docs.push(["Schengen visa", s.schengen_visa]);
  return docs;
}

const cell = "px-2 py-[3px] align-top";
const zebra = (i: number) => (i % 2 === 1 ? "bg-[#f4f6f8]" : "bg-white");

const A4: React.CSSProperties = {
  width: "210mm",
  WebkitPrintColorAdjust: "exact",
  printColorAdjust: "exact",
};

/* Branded footer — site logo + name, shown on every printed/downloaded CV. */
function CVBrand({ dark }: { dark?: boolean }) {
  return (
    <div className={`mt-5 flex items-center justify-center gap-2 border-t pt-2.5 ${dark ? "border-white/20" : "border-[#dbe3ec]"}`}>
      <span className="grid h-[16px] w-[16px] place-items-center rounded-[4px] bg-[#c9a227]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a1f33" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      </span>
      <span className={`text-[10px] font-bold ${dark ? "text-white" : "text-[#16365c]"}`}>
        SeaJobs<span className="text-[#c9a227]">.pro</span>
      </span>
      <span className="text-[9px] text-[#9aa7b2]">· Generated on seajobs.pro</span>
    </div>
  );
}

/* Compact 2-column certificate list — uses horizontal space to save height. */
function CertGrid({ items }: { items: Certificate[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-[2px] pt-1 text-[9.5px]">
      {items.map((c) => (
        <div key={c.id} className="flex items-baseline justify-between gap-2 border-b border-[#eef2f5] pb-[1.5px]">
          <span className="min-w-0 truncate font-semibold text-[#23303a]" title={c.name}>{c.name}</span>
          <span className="shrink-0 whitespace-nowrap text-[#52606d]">
            {c.number ? `${c.number} · ` : ""}
            <span className={isExpired(c.expiry_date) ? "font-semibold text-[#c0392b]" : ""}>
              {c.expiry_date ? formatDate(c.expiry_date, true) : "Cont."}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ════════════ Template 1 — Maritime (navy bars) ════════════ */
function Bar({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 bg-[#16365c] px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-wide text-white">
      {children}
    </div>
  );
}

function CVMaritime({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const totalMonths = experience.reduce((s, e) => s + monthsBetween(e.from_date, e.to_date), 0);
  const byRank = seaTimeByRank(experience);
  const recent = experience.slice(0, 10);
  const hasEarlier = experience.length > 10;
  const docs = buildDocs(seafarer);

  return (
    <div className="cv-content mx-auto bg-white font-sans text-[#1f2933]" style={{ ...A4, padding: "12mm" }}>
      <header className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold uppercase leading-tight tracking-tight text-[#16365c]">{name}</h1>
          {seafarer?.rank && <p className="text-[13px] font-bold uppercase tracking-wide text-[#16365c]">{seafarer.rank}</p>}
          <div className="mt-2 space-y-0.5 text-[10px] text-[#41505e]">
            {email && <p><span className="font-bold">Email:</span> {email}</p>}
            {seafarer?.phone && <p><span className="font-bold">Phone / WhatsApp:</span> {seafarer.phone}</p>}
            {(seafarer?.nationality || seafarer?.readiness_date) && (
              <p>
                <span className="font-bold">Availability:</span>{" "}
                {seafarer?.readiness_date ? `Ready from ${formatDate(seafarer.readiness_date, true)}` : "Ready for transit"}
                {seafarer?.nationality ? ` · ${seafarer.nationality}` : ""}
              </p>
            )}
          </div>
        </div>
        {seafarer?.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={seafarer.photo_url} alt={name} className="h-[35mm] w-[26mm] shrink-0 rounded-sm border border-[#d7dee5] object-cover" />
        ) : (
          <div className="grid h-[35mm] w-[26mm] shrink-0 place-items-center rounded-sm border border-dashed border-[#b9c4cf] text-center text-[8px] leading-tight text-[#9aa7b2]">PHOTO<br />3.5 × 4.5 cm</div>
        )}
      </header>

      <div className="mt-1 grid grid-cols-2 gap-5">
        <div>
          <Bar>Personal Information</Bar>
          <table className="w-full border-collapse text-[10px]"><tbody>
            {[
              ["Date of birth", formatDate(seafarer?.date_of_birth ?? null)],
              ["Citizenship", seafarer?.nationality || "—"],
              ["Availability", seafarer?.readiness_date ? formatDate(seafarer.readiness_date, true) : "Immediate"],
              ["Rank / Position", seafarer?.rank || "—"],
              ["Phone", seafarer?.phone || "—"],
              ["Email", email || "—"],
            ].map(([k, v], i) => (
              <tr key={k} className={zebra(i)}>
                <td className={`${cell} w-[42%] font-semibold text-[#52606d]`}>{k}</td>
                <td className={cell}>{v}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
        <div>
          <Bar>Sea Time Summary</Bar>
          <table className="w-full border-collapse text-[10px]"><tbody>
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
            {byRank.length === 0 && <tr><td className={cell} colSpan={2}>No sea service recorded yet.</td></tr>}
          </tbody></table>
          {seafarer?.education && (<><Bar>Education</Bar><p className="px-1 py-1 text-[10px] leading-snug text-[#41505e]">{seafarer.education}</p></>)}
        </div>
      </div>

      {seafarer?.about && <p className="mt-2 text-[10px] leading-relaxed text-[#41505e]">{seafarer.about}</p>}

      {docs.length > 0 && (
        <>
          <Bar>Identity Documents &amp; Visas</Bar>
          <table className="w-full border-collapse text-[10px]"><tbody>
            {docs.map(([k, v], i) => (
              <tr key={k} className={zebra(i)}>
                <td className={`${cell} w-[28%] font-semibold text-[#52606d]`}>{k}</td>
                <td className={cell}>{v}</td>
              </tr>
            ))}
          </tbody></table>
        </>
      )}

      {certificates.length > 0 && (
        <>
          <Bar>Competency, Endorsements &amp; STCW Certificates</Bar>
          <CertGrid items={certificates} />
        </>
      )}

      {experience.length > 0 && (
        <>
          <Bar>Sea Service History{hasEarlier && <span className="ml-1 font-semibold normal-case tracking-normal text-[#b9c4cf]">— last 10 voyages</span>}</Bar>
          <table className="w-full border-collapse text-[9.5px]">
            <thead><tr className="bg-[#dbe3ec] text-left text-[#16365c]">
              <th className={`${cell} font-bold`}>Vessel name</th><th className={`${cell} font-bold`}>Type</th><th className={`${cell} font-bold`}>DWT / GRT</th><th className={`${cell} font-bold`}>Engine / BHP</th><th className={`${cell} font-bold`}>Rank</th><th className={`${cell} font-bold`}>Flag</th><th className={`${cell} font-bold`}>Period (from – to)</th><th className={`${cell} font-bold`}>Duration</th><th className={`${cell} font-bold`}>Company</th>
            </tr></thead>
            <tbody>{recent.map((e, i) => (
              <tr key={e.id} className={zebra(i)}>
                <td className={`${cell} font-semibold`}>{e.vessel_name}</td>
                <td className={cell}>{e.vessel_type || "—"}</td>
                <td className={cell}>{e.dwt || "—"}</td>
                <td className={cell}>{e.engine || "—"}</td>
                <td className={`${cell} font-semibold text-[#16365c]`}>{e.rank || "—"}</td>
                <td className={cell}>{e.flag || "—"}</td>
                <td className={`${cell} whitespace-nowrap`}>{formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}</td>
                <td className={`${cell} whitespace-nowrap`}>{fmtMonths(monthsBetween(e.from_date, e.to_date))}</td>
                <td className={cell}>{e.company || "—"}</td>
              </tr>
            ))}</tbody>
          </table>
          {hasEarlier && <p className="mt-1 text-[9px] italic text-[#6b7884]">Earlier service ({experience.length - 10} more voyages) is consolidated in the Sea Time Summary above.</p>}
        </>
      )}

      {(seafarer?.competencies || seafarer?.languages) && (
        <>
          <Bar>Core Competencies &amp; Languages</Bar>
          <div className="grid grid-cols-2 gap-5 pt-1 text-[10px] text-[#41505e]">
            <div>{seafarer?.competencies ? seafarer.competencies.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).map((line, i) => <p key={i} className="leading-snug">• {line}</p>) : null}</div>
            {seafarer?.languages && <div><p className="font-bold text-[#16365c]">Languages</p><p className="leading-snug">{seafarer.languages}</p></div>}
          </div>
        </>
      )}

      <CVBrand />
    </div>
  );
}

/* ════════════ Template 2 — Classic (matches the screenshot) ════════════ */
function ClassicHead({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-3 border-b-2 border-[#1d4e79] pb-0.5 text-[11px] font-bold uppercase tracking-wide text-[#1d4e79]">{children}</h2>;
}

function CVClassic({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const totalMonths = experience.reduce((s, e) => s + monthsBetween(e.from_date, e.to_date), 0);
  const byRank = seaTimeByRank(experience);
  const recent = experience.slice(0, 12);
  const docs = buildDocs(seafarer);
  const row = "flex gap-2 text-[10px] leading-relaxed";
  const lbl = "w-[34%] shrink-0 font-semibold text-[#52606d]";

  return (
    <div className="cv-content mx-auto bg-white font-serif text-[#23303a]" style={{ ...A4, padding: "13mm" }}>
      <header className="flex items-start justify-between gap-6 border-b border-[#cfd8e0] pb-3">
        <div className="min-w-0">
          <h1 className="text-[26px] font-bold uppercase leading-none tracking-tight text-[#15324f]">{name}</h1>
          {seafarer?.rank && <p className="mt-1 text-[14px] font-semibold uppercase tracking-wide text-[#1d4e79]">{seafarer.rank}</p>}
        </div>
        <div className="flex shrink-0 items-start gap-3">
          <div className="rounded-md border border-[#cfd8e0] bg-[#f3f6f9] px-3 py-2 text-[9.5px] leading-relaxed text-[#41505e]">
            <p className="mb-1 font-bold uppercase tracking-wide text-[#1d4e79]">Contact</p>
            {seafarer?.phone && <p>☏ {seafarer.phone}</p>}
            {email && <p>✉ {email}</p>}
            {seafarer?.nationality && <p>⚑ {seafarer.nationality}</p>}
            <p>● {seafarer?.readiness_date ? `Ready ${formatDate(seafarer.readiness_date, true)}` : "Ready now"}</p>
          </div>
          {seafarer?.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={seafarer.photo_url} alt={name} className="h-[36mm] w-[27mm] rounded-md border border-[#cfd8e0] object-cover" />
          ) : (
            <div className="grid h-[36mm] w-[27mm] place-items-center rounded-md border border-dashed border-[#b9c4cf] text-center text-[8px] text-[#9aa7b2]">PHOTO</div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-7">
        <div>
          <ClassicHead>Personal Information</ClassicHead>
          <div className="mt-1.5 space-y-0.5">
            {[
              ["Name", name],
              ["Date of birth", formatDate(seafarer?.date_of_birth ?? null)],
              ["Citizenship", seafarer?.nationality || "—"],
              ["Rank / Position", seafarer?.rank || "—"],
              ["Contact", seafarer?.phone || email || "—"],
            ].map(([k, v]) => (<div key={k} className={row}><span className={lbl}>{k}:</span><span>{v}</span></div>))}
          </div>
        </div>
        <div>
          <ClassicHead>Sea Time Summary</ClassicHead>
          <div className="mt-1.5 space-y-0.5">
            <div className={row}><span className={lbl}>Total:</span><span className="font-bold text-[#15324f]">{fmtMonths(totalMonths)}</span></div>
            {byRank.slice(0, 5).map((r) => (<div key={r.rank} className={row}><span className={lbl}>As {r.rank}:</span><span>{fmtMonths(r.months)}</span></div>))}
            {byRank.length === 0 && <p className="text-[10px] text-[#6b7884]">No sea service recorded yet.</p>}
          </div>
        </div>
      </div>

      {seafarer?.education && (<><ClassicHead>Education</ClassicHead><p className="mt-1 text-[10px] leading-relaxed text-[#41505e]">{seafarer.education}</p></>)}
      {seafarer?.about && (<><ClassicHead>Profile</ClassicHead><p className="mt-1 text-[10px] leading-relaxed text-[#41505e]">{seafarer.about}</p></>)}

      {docs.length > 0 && (
        <>
          <ClassicHead>Documents &amp; Visas</ClassicHead>
          <div className="mt-1.5 grid grid-cols-2 gap-x-7">
            {docs.map(([k, v]) => (<div key={k} className={row}><span className={lbl}>{k}:</span><span>{v}</span></div>))}
          </div>
        </>
      )}

      {certificates.length > 0 && (
        <>
          <ClassicHead>Competency, Endorsements &amp; STCW Certificates</ClassicHead>
          <CertGrid items={certificates} />
        </>
      )}

      {experience.length > 0 && (
        <>
          <ClassicHead>Sea Service History</ClassicHead>
          <table className="mt-1 w-full border-collapse text-[9.5px]">
            <thead><tr className="border-b border-[#cfd8e0] text-left text-[#1d4e79]"><th className={`${cell} font-bold`}>Vessel</th><th className={`${cell} font-bold`}>Type</th><th className={`${cell} font-bold`}>Rank</th><th className={`${cell} font-bold`}>Flag</th><th className={`${cell} font-bold`}>Period</th><th className={`${cell} font-bold`}>Duration</th><th className={`${cell} font-bold`}>Company</th></tr></thead>
            <tbody>{recent.map((e) => (
              <tr key={e.id} className="border-b border-[#eef2f5]">
                <td className={`${cell} font-semibold`}>{e.vessel_name}</td>
                <td className={cell}>{e.vessel_type || "—"}</td>
                <td className={`${cell} font-semibold text-[#15324f]`}>{e.rank || "—"}</td>
                <td className={cell}>{e.flag || "—"}</td>
                <td className={`${cell} whitespace-nowrap`}>{formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}</td>
                <td className={`${cell} whitespace-nowrap`}>{fmtMonths(monthsBetween(e.from_date, e.to_date))}</td>
                <td className={cell}>{e.company || "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        </>
      )}

      {(seafarer?.competencies || seafarer?.languages) && (
        <>
          <ClassicHead>Core Competencies &amp; Languages</ClassicHead>
          <div className="mt-1 grid grid-cols-2 gap-7 text-[10px] text-[#41505e]">
            <div>{seafarer?.competencies ? seafarer.competencies.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).map((line, i) => <p key={i} className="leading-snug">• {line}</p>) : null}</div>
            {seafarer?.languages && <div><p className="font-bold text-[#1d4e79]">Languages</p><p className="leading-snug">{seafarer.languages}</p></div>}
          </div>
        </>
      )}

      <CVBrand />
    </div>
  );
}

/* ════════════ Template 3 — Modern (dark sidebar résumé) ════════════ */
function SideHead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.15em] text-[#e3c04a]">{children}</p>;
}
function MainHead({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-4 mb-1 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-[#0e2a45]"><span className="h-[10px] w-[3px] bg-[#c9a227]" />{children}</h2>;
}

function CVModern({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";
  const totalMonths = experience.reduce((s, e) => s + monthsBetween(e.from_date, e.to_date), 0);
  const byRank = seaTimeByRank(experience);
  const recent = experience.slice(0, 9);
  const docs = buildDocs(seafarer);

  return (
    <div className="cv-content mx-auto flex bg-white font-sans text-[#23303a]" style={{ ...A4, minHeight: "297mm" }}>
      {/* Sidebar */}
      <aside className="w-[66mm] shrink-0 bg-[#0e2a45] px-5 py-7 text-white">
        <div className="flex flex-col items-center text-center">
          {seafarer?.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={seafarer.photo_url} alt={name} className="h-[34mm] w-[34mm] rounded-full border-2 border-[#c9a227] object-cover" />
          ) : (
            <div className="grid h-[34mm] w-[34mm] place-items-center rounded-full border-2 border-dashed border-white/30 text-[8px] text-white/50">PHOTO</div>
          )}
          <h1 className="mt-3 text-[17px] font-bold uppercase leading-tight">{name}</h1>
          {seafarer?.rank && <p className="text-[11px] font-semibold uppercase tracking-wide text-[#e3c04a]">{seafarer.rank}</p>}
        </div>

        <SideHead>Contact</SideHead>
        <div className="mt-1 space-y-1 text-[9.5px] leading-snug text-white/85">
          {seafarer?.phone && <p>☏ {seafarer.phone}</p>}
          {email && <p className="break-all">✉ {email}</p>}
          {seafarer?.nationality && <p>⚑ {seafarer.nationality}</p>}
          <p>● {seafarer?.readiness_date ? `Ready ${formatDate(seafarer.readiness_date, true)}` : "Ready now"}</p>
          {seafarer?.date_of_birth && <p>🎂 {formatDate(seafarer.date_of_birth, true)}</p>}
        </div>

        <SideHead>Sea Time</SideHead>
        <div className="mt-1 space-y-1 text-[9.5px] leading-snug text-white/85">
          <p><span className="font-bold text-white">Total:</span> {fmtMonths(totalMonths)}</p>
          {byRank.slice(0, 5).map((r) => (<p key={r.rank}>As {r.rank}: {fmtMonths(r.months)}</p>))}
        </div>

        {seafarer?.languages && (<><SideHead>Languages</SideHead><p className="mt-1 text-[9.5px] leading-snug text-white/85">{seafarer.languages}</p></>)}

        {docs.length > 0 && (
          <>
            <SideHead>Documents</SideHead>
            <div className="mt-1 space-y-1 text-[9px] leading-snug text-white/85">
              {docs.map(([k, v]) => (<p key={k}><span className="font-semibold text-white">{k}:</span> {v}</p>))}
            </div>
          </>
        )}
      </aside>

      {/* Main column */}
      <main className="flex-1 px-7 py-7">
        {seafarer?.about && (<><MainHead>Profile</MainHead><p className="text-[10px] leading-relaxed text-[#41505e]">{seafarer.about}</p></>)}
        {seafarer?.education && (<><MainHead>Education</MainHead><p className="text-[10px] leading-relaxed text-[#41505e]">{seafarer.education}</p></>)}

        {experience.length > 0 && (
          <>
            <MainHead>Sea Service History</MainHead>
            <div className="flex flex-col gap-2">
              {recent.map((e) => (
                <div key={e.id} className="border-l-2 border-[#dbe3ec] pl-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[10.5px] font-bold text-[#0e2a45]">{e.vessel_name}{e.vessel_type ? ` · ${e.vessel_type}` : ""}</p>
                    <p className="shrink-0 text-[9px] text-[#6b7884]">{formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}</p>
                  </div>
                  <p className="text-[9.5px] text-[#41505e]">{[e.rank, e.company, e.flag, e.dwt].filter(Boolean).join(" · ")}{` · ${fmtMonths(monthsBetween(e.from_date, e.to_date))}`}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {certificates.length > 0 && (
          <>
            <MainHead>Certificates</MainHead>
            <CertGrid items={certificates} />
          </>
        )}

        {seafarer?.competencies && (
          <>
            <MainHead>Core Competencies</MainHead>
            <div className="text-[10px] leading-snug text-[#41505e]">
              {seafarer.competencies.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).map((line, i) => <p key={i}>• {line}</p>)}
            </div>
          </>
        )}

        <CVBrand />
      </main>
    </div>
  );
}

function CVDocument({ template, data }: { template: Template; data: CVData }) {
  if (template === "classic") return <CVClassic data={data} />;
  if (template === "modern") return <CVModern data={data} />;
  return <CVMaritime data={data} />;
}

/* ─── Page ───────────────────────────────────────────────────── */
const TEMPLATES: { key: Template; label: string }[] = [
  { key: "maritime", label: "Maritime" },
  { key: "classic", label: "Classic" },
  { key: "modern", label: "Modern" },
];

export default function CVPage() {
  const { lang } = useLang();
  const t = T[lang];
  const [data, setData] = useState<CVData>({ seafarer: null, certificates: [], experience: [], email: "" });
  const [template, setTemplate] = useState<Template>("maritime");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Auto-fit to a single A4 page: measure the (visible) preview and scale it
  // down if it's taller than one page. The same scale is applied to the print
  // copy, guaranteeing the CV never spills onto a second page.
  const measureRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [natH, setNatH] = useState<number | null>(null);

  // Fit the on-screen preview to the container width (so the full A4 page fits
  // a phone screen), with an optional manual zoom on top. The printed PDF is
  // unaffected — it keeps the height-fit `scale` below.
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const [boxW, setBoxW] = useState(0);
  const [zoom, setZoom] = useState(1);
  useLayoutEffect(() => {
    const el = previewBoxRef.current;
    if (!el) return;
    const measure = () => setBoxW(el.clientWidth - 16); // minus padding
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const fitScale = boxW ? Math.min(1, boxW / A4_WIDTH_PX) : 1;
  const previewScale = Math.max(0.2, fitScale * zoom);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const PAGE_H = (297 * 96) / 25.4 - 8; // one A4 in px (~1114), minus a small safety margin
    const measure = () => {
      const nh = el.offsetHeight; // natural height, unaffected by the CSS transform
      if (!nh) return;
      setNatH(nh);
      setScale(nh > PAGE_H ? Math.max(0.5, PAGE_H / nh) : 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [template, data, loading]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const [seafarerRes, certsRes, expRes] = await Promise.all([
        supabase.from("seafarers").select("*").eq("id", session.user.id).single(),
        supabase.from("certificates").select("*").eq("seafarer_id", session.user.id).order("expiry_date"),
        supabase.from("sea_experience").select("*").eq("seafarer_id", session.user.id).order("from_date", { ascending: false }),
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

  // The browser uses document.title as the suggested filename when saving the
  // print output as PDF. Swap it to "First Last - Rank" for the download, then
  // restore the page title afterwards so navigation/SEO isn't affected.
  function handleDownload() {
    const sf = data.seafarer;
    const fullName = [sf?.first_name, sf?.last_name].filter(Boolean).join(" ").trim();
    const rank = sf?.rank?.trim();
    const filename = ([fullName || "Seafarer", rank].filter(Boolean).join(" - "))
      .replace(/[\\/:*?"<>|]+/g, " ") // strip characters not allowed in filenames
      .replace(/\s+/g, " ")
      .trim();

    const original = document.title;
    document.title = filename;
    const restore = () => {
      document.title = original;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    window.print();
    setTimeout(restore, 3000); // fallback if afterprint doesn't fire (some mobile browsers)
  }

  const TPL_LABEL: Record<Template, string> = {
    maritime: t.cv_tpl_maritime,
    classic: t.cv_tpl_classic,
    modern: t.cv_tpl_modern,
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-mist">{t.cab_loading}</p>
      </div>
    );
  }

  return (
    <>
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
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-white">{t.cab_cv}</h1>
            <p className="mt-1 text-sm text-mist">{t.cv_page_subtitle}</p>
          </div>
          <button
            onClick={handleDownload}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            <Download size={16} /> {t.cv_download_pdf}
          </button>
        </div>

        {/* Template picker + zoom controls */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.key}
              onClick={() => setTemplate(tpl.key)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                template === tpl.key
                  ? "border-brass/40 bg-brass/15 text-brass2"
                  : "border-white/10 bg-white/5 text-mist hover:text-white"
              }`}
            >
              {TPL_LABEL[tpl.key]}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(2)))}
              className="grid h-8 w-8 place-items-center rounded-lg text-mist transition hover:bg-white/10 hover:text-white"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="w-10 text-center text-xs font-semibold text-mist">{Math.round(fitScale * zoom * 100)}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.2).toFixed(2)))}
              className="grid h-8 w-8 place-items-center rounded-lg text-mist transition hover:bg-white/10 hover:text-white"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        {/* Preview — the exact printed A4 page, scaled to fit the screen width
            (zoomable). Inner `scale` is the height-fit used for print; the outer
            `previewScale` fits that A4 page onto the phone. */}
        <div ref={previewBoxRef} className="overflow-auto rounded-2xl border border-white/10 bg-gray-300 p-2 shadow-2xl sm:p-4">
          <div
            className="mx-auto shadow-xl"
            style={{ width: A4_WIDTH_PX * previewScale, height: natH ? natH * scale * previewScale : undefined, overflow: "hidden" }}
          >
            <div style={{ width: A4_WIDTH_PX, height: natH ? natH * scale : undefined, overflow: "hidden", transform: `scale(${previewScale})`, transformOrigin: "top left" }}>
              <div style={{ width: A4_WIDTH_PX, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <CVDocument template={template} data={data} />
              </div>
            </div>
          </div>
        </div>

        {/* Hidden measurer — natural (unscaled) height of one A4 page, used for
            both the print scale above and the preview height. */}
        <div className="pointer-events-none absolute -left-[9999px] top-0" aria-hidden>
          <div ref={measureRef} style={{ width: A4_WIDTH_PX }}>
            <CVDocument template={template} data={data} />
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <div id="cv-print-root">
            <div style={{ width: "210mm", height: natH ? natH * scale : undefined, overflow: "hidden" }}>
              <div style={{ width: "210mm", transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <CVDocument template={template} data={data} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
