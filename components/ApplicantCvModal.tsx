"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import {
  X, Phone, Mail, MapPin, Ship, Award, FileText, MessageCircle, Loader2, Globe, GraduationCap,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import type { Seafarer, Certificate, SeaExperience, Diploma } from "@/lib/supabase/types";

type Payload = {
  ok: boolean;
  seafarer: Seafarer;
  email: string | null;
  experience: SeaExperience[];
  certificates: Certificate[];
};

const L: Record<string, Record<string, string>> = {
  contact:    { ua: "Контакти", pl: "Kontakt", ru: "Контакты", en: "Contact" },
  documents:  { ua: "Документи", pl: "Dokumenty", ru: "Документы", en: "Documents" },
  experience: { ua: "Морський досвід", pl: "Doświadczenie morskie", ru: "Морской опыт", en: "Sea experience" },
  certs:      { ua: "Сертифікати", pl: "Certyfikaty", ru: "Сертификаты", en: "Certificates" },
  education:  { ua: "Освіта", pl: "Edukacja", ru: "Образование", en: "Education" },
  languages:  { ua: "Мови", pl: "Języki", ru: "Языки", en: "Languages" },
  about:      { ua: "Про себе", pl: "O sobie", ru: "О себе", en: "About" },
  available:  { ua: "Готовий з", pl: "Dostępny od", ru: "Готов с", en: "Available from" },
  message:    { ua: "Написати", pl: "Napisz", ru: "Написать", en: "Message" },
  loading:    { ua: "Завантаження…", pl: "Ładowanie…", ru: "Загрузка…", en: "Loading…" },
  noData:     { ua: "CV недоступне", pl: "CV niedostępne", ru: "CV недоступно", en: "CV unavailable" },
  present:    { ua: "Зараз", pl: "Obecnie", ru: "Сейчас", en: "Present" },
};

function fmt(d: string | null, short = true): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { day: short ? undefined : "numeric", month: "short", year: "numeric" });
}

export default function ApplicantCvModal({
  seafarerId,
  fullName,
  onClose,
}: {
  seafarerId: string;
  fullName: string;
  onClose: () => void;
}) {
  const { lang } = useLang();
  const router = useRouter();
  const tx = (k: string) => L[k]?.[lang] ?? L[k]?.en ?? k;

  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        const res = await fetch(`/api/company/applicant?seafarerId=${seafarerId}`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const json = await res.json();
        if (active && json.ok) setData(json);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [seafarerId]);

  async function startChat() {
    setStarting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const companyId = session.user.id;

      // Reuse an existing conversation if one already exists.
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("company_id", companyId)
        .eq("seafarer_id", seafarerId)
        .maybeSingle();

      let convoId = existing?.id;
      if (!convoId) {
        const { data: created, error } = await supabase
          .from("conversations")
          .insert({ company_id: companyId, seafarer_id: seafarerId })
          .select("id")
          .single();
        if (error || !created) { setStarting(false); return; }
        convoId = created.id;
      }
      router.push(`/company/messages?c=${convoId}`);
    } finally {
      setStarting(false);
    }
  }

  const s = data?.seafarer;
  const docs: [string, string | null, string | null][] = s
    ? [
        ["Seaman's book", s.seamans_book, s.seamans_book_expiry],
        ["Passport", s.passport_no, s.passport_expiry],
        ["US visa", s.us_visa, null],
        ["Schengen visa", s.schengen_visa, null],
        ["Medical", s.medical, s.medical_expiry],
        ["Service record book", s.service_record_book, null],
      ].filter((d) => d[1])
    : [];
  const diplomas: Diploma[] = (s?.diplomas ?? []).filter((d) => d?.name || d?.number);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-t-2xl border-b border-white/10 bg-card px-5 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {s?.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.photo_url} alt={fullName} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
            ) : (
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brass/20 font-display text-lg font-bold text-brass2">
                {fullName[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold text-white">{fullName}</p>
              {s?.rank && <p className="truncate text-sm text-brass2">{s.rank}</p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={startChat}
              disabled={starting || !data}
              className="flex items-center gap-1.5 rounded-xl border border-brass/30 bg-brass/10 px-3 py-2 text-sm font-semibold text-brass2 transition hover:bg-brass/20 disabled:opacity-50"
            >
              {starting ? <Loader2 size={15} className="animate-spin" /> : <MessageCircle size={15} />}
              {tx("message")}
            </button>
            <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl text-mist transition hover:bg-white/10 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-mist">
              <Loader2 size={18} className="animate-spin" /> {tx("loading")}
            </div>
          ) : !data || !s ? (
            <p className="py-16 text-center text-mist">{tx("noData")}</p>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Contact */}
              <section>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-mist">{tx("contact")}</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {data.email && <Info icon={<Mail size={14} />} value={data.email} href={`mailto:${data.email}`} />}
                  {s.phone && <Info icon={<Phone size={14} />} value={s.phone} href={`tel:${s.phone}`} />}
                  {s.nationality && <Info icon={<MapPin size={14} />} value={s.nationality} />}
                  {s.readiness_date && <Info icon={<Ship size={14} />} value={`${tx("available")}: ${fmt(s.readiness_date)}`} />}
                </div>
              </section>

              {s.about && (
                <section>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-mist">{tx("about")}</h3>
                  <p className="text-sm leading-relaxed text-foam/80">{s.about}</p>
                </section>
              )}

              {/* Documents */}
              {(docs.length > 0 || diplomas.length > 0) && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist">
                    <FileText size={13} /> {tx("documents")}
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {docs.map(([label, num, exp]) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-navy2 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-mist/70">{label}</p>
                        <p className="text-sm text-foam">{num}{exp ? ` · exp. ${fmt(exp)}` : ""}</p>
                      </div>
                    ))}
                    {diplomas.map((d, i) => (
                      <div key={`dip-${i}`} className="rounded-xl border border-white/10 bg-navy2 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-mist/70">{d.name || "Diploma"}</p>
                        <p className="text-sm text-foam">{d.number}{d.expiry ? ` · exp. ${fmt(d.expiry)}` : ""}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education / Languages / Competencies */}
              {(s.education || s.languages || s.competencies) && (
                <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {s.education && (
                    <div>
                      <h3 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist"><GraduationCap size={13} /> {tx("education")}</h3>
                      <p className="text-sm text-foam/80 whitespace-pre-wrap">{s.education}</p>
                    </div>
                  )}
                  {s.languages && (
                    <div>
                      <h3 className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist"><Globe size={13} /> {tx("languages")}</h3>
                      <p className="text-sm text-foam/80 whitespace-pre-wrap">{s.languages}</p>
                    </div>
                  )}
                  {s.competencies && (
                    <div className="sm:col-span-2">
                      <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-mist">Competencies</h3>
                      <p className="text-sm text-foam/80 whitespace-pre-wrap">{s.competencies}</p>
                    </div>
                  )}
                </section>
              )}

              {/* Sea experience */}
              {data.experience.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist">
                    <Ship size={13} /> {tx("experience")}
                  </h3>
                  <div className="flex flex-col divide-y divide-white/10">
                    {data.experience.map((e) => (
                      <div key={e.id} className="flex items-start justify-between gap-3 py-2.5 first:pt-0">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{e.vessel_name}</p>
                          <p className="text-xs text-mist">
                            {[e.rank, e.vessel_type, e.company, e.flag].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        <p className="shrink-0 text-right text-xs text-mist">
                          {fmt(e.from_date)} — {e.to_date ? fmt(e.to_date) : tx("present")}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certificates */}
              {data.certificates.length > 0 && (
                <section>
                  <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-mist">
                    <Award size={13} /> {tx("certs")}
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {data.certificates.map((c) => (
                      <div key={c.id} className="rounded-xl border border-white/10 bg-navy2 px-3 py-2">
                        <p className="text-sm font-semibold text-foam">{c.name}</p>
                        {c.issuing_authority && <p className="text-xs text-mist">{c.issuing_authority}</p>}
                        {c.expiry_date && <p className="text-[11px] text-mist/60">exp. {fmt(c.expiry_date)}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ icon, value, href }: { icon: React.ReactNode; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy2 px-3 py-2 text-sm text-foam">
      <span className="text-brass2">{icon}</span>
      <span className="truncate">{value}</span>
    </div>
  );
  return href ? <a href={href} className="transition hover:opacity-80">{inner}</a> : inner;
}
