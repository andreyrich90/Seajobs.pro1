"use client";

import { useEffect, useState, useRef } from "react";
import { Download, Printer } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import type { Seafarer, Certificate, SeaExperience } from "@/lib/supabase/types";

type Template = "classic" | "modern" | "compact";

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
  if (months < 1) return "< 1 month";
  if (months < 12) return `${months}mo`;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y}y ${m > 0 ? `${m}mo` : ""}`.trim();
}

function isExpired(d: string | null): boolean {
  if (!d) return false;
  return new Date(d) < new Date();
}

/* ─── Classic Template ─────────────────────────────────────── */
function ClassicCV({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

  return (
    <div className="cv-content classic bg-white text-gray-900 font-sans text-sm leading-relaxed p-10 max-w-[800px] mx-auto">
      {/* Header */}
      <div className="border-b-4 border-gray-900 pb-5 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{name}</h1>
        {seafarer?.rank && (
          <p className="text-lg font-semibold text-gray-600 mt-1">{seafarer.rank}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
          {email && <span>{email}</span>}
          {seafarer?.phone && <span>{seafarer.phone}</span>}
          {seafarer?.nationality && <span>Nationality: {seafarer.nationality}</span>}
          {seafarer?.date_of_birth && (
            <span>DOB: {formatDate(seafarer.date_of_birth)}</span>
          )}
        </div>
        {seafarer?.readiness_date && (
          <div className="mt-3 inline-block border border-gray-900 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Available from: {formatDate(seafarer.readiness_date)}
          </div>
        )}
      </div>

      {/* About */}
      {seafarer?.about && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700">{seafarer.about}</p>
        </div>
      )}

      {/* Sea Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Sea Experience
          </h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-2 py-1.5 font-bold">Vessel</th>
                <th className="text-left px-2 py-1.5 font-bold">Type</th>
                <th className="text-left px-2 py-1.5 font-bold">Rank</th>
                <th className="text-left px-2 py-1.5 font-bold">Company</th>
                <th className="text-left px-2 py-1.5 font-bold">Period</th>
                <th className="text-left px-2 py-1.5 font-bold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((e, i) => (
                <tr key={e.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-2 py-1.5 font-medium">{e.vessel_name}</td>
                  <td className="px-2 py-1.5">{e.vessel_type ?? "—"}</td>
                  <td className="px-2 py-1.5">{e.rank ?? "—"}</td>
                  <td className="px-2 py-1.5">{e.company ?? "—"}</td>
                  <td className="px-2 py-1.5 whitespace-nowrap">
                    {formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}
                  </td>
                  <td className="px-2 py-1.5">{calcDuration(e.from_date, e.to_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certificates */}
      {certificates.length > 0 && (
        <div>
          <h2 className="text-base font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Certificates & Documents
          </h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-2 py-1.5 font-bold">Certificate</th>
                <th className="text-left px-2 py-1.5 font-bold">Number</th>
                <th className="text-left px-2 py-1.5 font-bold">Issue Date</th>
                <th className="text-left px-2 py-1.5 font-bold">Expiry Date</th>
                <th className="text-left px-2 py-1.5 font-bold">Authority</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c, i) => (
                <tr key={c.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-2 py-1.5 font-medium">{c.name}</td>
                  <td className="px-2 py-1.5">{c.number ?? "—"}</td>
                  <td className="px-2 py-1.5">{formatDate(c.issue_date, true)}</td>
                  <td className={`px-2 py-1.5 ${isExpired(c.expiry_date) ? "text-red-600 font-semibold" : ""}`}>
                    {formatDate(c.expiry_date, true)}
                  </td>
                  <td className="px-2 py-1.5">{c.issuing_authority ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Modern Template ─────────────────────────────────────── */
function ModernCV({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

  return (
    <div className="cv-content modern bg-white text-gray-900 font-sans text-sm leading-relaxed max-w-[800px] mx-auto">
      {/* Navy header bar */}
      <div className="bg-[#0a1f33] text-white p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{name}</h1>
            {seafarer?.rank && (
              <p className="text-[#e3c04a] text-lg font-semibold mt-1">{seafarer.rank}</p>
            )}
          </div>
          {seafarer?.readiness_date && (
            <div className="shrink-0 rounded-lg bg-[#c9a227] px-4 py-2 text-center">
              <p className="text-[#061523] text-xs font-bold uppercase">Available</p>
              <p className="text-[#061523] font-bold text-sm mt-0.5">
                {formatDate(seafarer.readiness_date, true)}
              </p>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-5 text-xs text-[#8aa0b0]">
          {email && <span>✉ {email}</span>}
          {seafarer?.phone && <span>✆ {seafarer.phone}</span>}
          {seafarer?.nationality && <span>⚑ {seafarer.nationality}</span>}
          {seafarer?.date_of_birth && <span>Born: {formatDate(seafarer.date_of_birth)}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* About */}
        {seafarer?.about && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-[#c9a227]">
            <h2 className="text-sm font-bold text-[#0a1f33] uppercase tracking-wider mb-2">
              Summary
            </h2>
            <p className="text-gray-700">{seafarer.about}</p>
          </div>
        )}

        {/* Sea Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-[#0a1f33] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-gray-200" />
              Sea Experience
              <span className="h-px flex-1 bg-gray-200" />
            </h2>
            <div className="flex flex-col gap-3">
              {experience.map((e) => (
                <div key={e.id} className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">{e.vessel_name}</p>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        {e.vessel_type && (
                          <span className="bg-[#e8f7f6] text-[#0a6c63] rounded-full px-2.5 py-0.5 font-semibold">
                            {e.vessel_type}
                          </span>
                        )}
                        {e.rank && (
                          <span className="bg-[#fdf8e7] text-[#8b6a00] rounded-full px-2.5 py-0.5 font-semibold">
                            {e.rank}
                          </span>
                        )}
                        {e.flag && <span className="text-gray-500">Flag: {e.flag}</span>}
                        {e.company && <span className="text-gray-500">{e.company}</span>}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-gray-900">
                        {formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{calcDuration(e.from_date, e.to_date)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-[#0a1f33] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-gray-200" />
              Certificates
              <span className="h-px flex-1 bg-gray-200" />
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {certificates.map((c) => (
                <div key={c.id} className={`rounded-xl border p-3 ${isExpired(c.expiry_date) ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
                  <p className="font-semibold text-xs text-gray-900">{c.name}</p>
                  {c.number && <p className="text-xs text-gray-500 mt-0.5">No: {c.number}</p>}
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {formatDate(c.issue_date, true)} – {" "}
                      <span className={isExpired(c.expiry_date) ? "text-red-600 font-semibold" : ""}>
                        {formatDate(c.expiry_date, true)}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Compact Template ─────────────────────────────────────── */
function CompactCV({ data }: { data: CVData }) {
  const { seafarer, certificates, experience, email } = data;
  const name = [seafarer?.first_name, seafarer?.last_name].filter(Boolean).join(" ") || "Seafarer";

  return (
    <div className="cv-content compact bg-white text-gray-900 font-sans text-xs leading-relaxed p-8 max-w-[800px] mx-auto">
      {/* Compact header */}
      <div className="flex items-start justify-between mb-4 pb-3 border-b-2 border-gray-900">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          <p className="text-gray-500 text-xs mt-0.5">
            {[seafarer?.rank, seafarer?.nationality, email, seafarer?.phone]
              .filter(Boolean)
              .join(" | ")}
          </p>
        </div>
        {seafarer?.readiness_date && (
          <div className="shrink-0 border border-gray-900 px-2 py-1 text-center text-xs">
            <span className="font-bold">Available: </span>
            {formatDate(seafarer.readiness_date, true)}
          </div>
        )}
      </div>

      {/* About */}
      {seafarer?.about && (
        <div className="mb-3">
          <p className="font-bold uppercase text-xs tracking-wider mb-1">Summary</p>
          <p className="text-gray-700">{seafarer.about}</p>
        </div>
      )}

      {/* Two columns: exp + certs */}
      <div className="grid grid-cols-2 gap-6">
        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <p className="font-bold uppercase text-xs tracking-wider mb-2 border-b border-gray-300 pb-1">
              Sea Experience
            </p>
            <div className="flex flex-col gap-1.5">
              {experience.map((e) => (
                <div key={e.id} className="border-l-2 border-gray-300 pl-2">
                  <p className="font-bold">{e.vessel_name}</p>
                  <p className="text-gray-600">
                    {[e.rank, e.vessel_type].filter(Boolean).join(" · ")}
                  </p>
                  <p className="text-gray-500">
                    {formatDate(e.from_date, true)} – {formatDate(e.to_date, true)}
                    {" "}({calcDuration(e.from_date, e.to_date)})
                  </p>
                  {e.company && <p className="text-gray-500">{e.company}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <p className="font-bold uppercase text-xs tracking-wider mb-2 border-b border-gray-300 pb-1">
              Certificates
            </p>
            <div className="flex flex-col gap-1">
              {certificates.map((c) => (
                <div key={c.id} className="flex items-start justify-between gap-2">
                  <p className={`font-medium ${isExpired(c.expiry_date) ? "text-red-600" : ""}`}>
                    {c.name}
                  </p>
                  <p className={`shrink-0 text-right ${isExpired(c.expiry_date) ? "text-red-600 font-semibold" : "text-gray-500"}`}>
                    {formatDate(c.expiry_date, true)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function CVPage() {
  const [data, setData] = useState<CVData>({
    seafarer: null,
    certificates: [],
    experience: [],
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<Template>("classic");
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
    const el = printRef.current;
    if (!el) return;
    el.setAttribute("data-cv-template", template);
    window.print();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  const templates: { id: Template; label: string }[] = [
    { id: "classic", label: "Classic" },
    { id: "modern", label: "Modern" },
    { id: "compact", label: "Compact" },
  ];

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          #cv-print-area { display: block !important; }
          #cv-print-area .cv-content { display: block !important; }
          @page { margin: 10mm; size: A4; }
        }
      `}</style>

      <div className="p-8 max-w-5xl no-print">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-semibold text-white">My CV</h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* Template selector */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-semibold text-mist">Template:</span>
          <div className="flex gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  template === t.id
                    ? "bg-brass/20 border border-brass/40 text-brass2"
                    : "bg-white/5 border border-white/10 text-mist hover:text-white hover:bg-white/10"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-mist">
            <Printer size={14} />
            Print-ready
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="bg-gray-200 px-4 py-2 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-gray-600 font-medium">CV Preview — {template}</span>
          </div>
          <div className="bg-white overflow-auto max-h-[70vh]">
            {template === "classic" && <ClassicCV data={data} />}
            {template === "modern" && <ModernCV data={data} />}
            {template === "compact" && <CompactCV data={data} />}
          </div>
        </div>
      </div>

      {/* Hidden print area */}
      <div
        id="cv-print-area"
        ref={printRef}
        style={{ display: "none" }}
        data-cv-template={template}
      >
        {template === "classic" && <ClassicCV data={data} />}
        {template === "modern" && <ModernCV data={data} />}
        {template === "compact" && <CompactCV data={data} />}
      </div>
    </>
  );
}
