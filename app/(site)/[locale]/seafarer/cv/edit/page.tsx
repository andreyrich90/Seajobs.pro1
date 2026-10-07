"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Plus, Trash2, Save, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";
import { cleanSeaExperience } from "@/lib/cvImport";
import { useT } from "@/components/DictProvider";
import { RANK_GROUPS } from "@/lib/ranks";
import { VESSEL_TYPE_GROUPS } from "@/lib/vesselTypes";
import { isFleetId } from "@/lib/cvFleets";
import type { Database, Diploma } from "@/lib/supabase/types";

type SeafarerUpdate = Database["public"]["Tables"]["seafarers"]["Update"];

// The whole CV on one screen.
//
// After /maritime-cv the AI has spread a CV across four places — the profile,
// diplomas, certificates and sea service — and checking it meant visiting each
// one. This page puts every field the CV is built from in front of the seafarer
// at once, says what is still missing, and saves it all in one go.
//
// Rank and vessel type are free text with suggestions, not selects: the AI
// writes what the old CV said ("LNG Bunkering Vessel"), and a select would show
// such a value as empty and throw it away on save.

const PERSON_FIELDS = [
  "first_name", "last_name", "rank", "nationality", "date_of_birth", "phone", "readiness_date", "about",
  "passport_no", "passport_expiry", "seamans_book", "seamans_book_expiry", "service_record_book",
  "medical", "medical_expiry", "schengen_visa", "us_visa", "languages", "competencies", "education",
] as const;
type PersonKey = (typeof PERSON_FIELDS)[number];
type Person = Record<PersonKey, string>;

type CertRow = { key: string; id?: string; name: string; number: string; issuing_authority: string; issue_date: string; expiry_date: string };
type VoyRow = { key: string; id?: string; vessel_name: string; vessel_type: string; rank: string; company: string; flag: string; dwt: string; from_date: string; to_date: string };

const CERT_FIELDS = ["name", "number", "issuing_authority", "issue_date", "expiry_date"] as const;
const VOY_FIELDS = ["vessel_name", "vessel_type", "rank", "company", "flag", "dwt", "from_date", "to_date"] as const;

let seq = 0;
const newKey = () => `new-${++seq}`;
const s = (v: unknown) => (v === null || v === undefined ? "" : String(v));
const orNull = (v: string) => (v.trim() ? v.trim() : null);

type Snapshot = { person: Person; diplomas: Diploma[]; certs: CertRow[]; voys: VoyRow[] };

const INPUT = "w-full min-w-0 rounded-xl border border-white/10 bg-navy2 px-3 py-2.5 text-sm text-white outline-none focus:border-brass";

export default function CvEditPage() {
  const t = useT();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const [fromMaker, setFromMaker] = useState(false);
  const [fleetQuery, setFleetQuery] = useState("");

  const [person, setPerson] = useState<Person>(() => Object.fromEntries(PERSON_FIELDS.map((k) => [k, ""])) as Person);
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [voys, setVoys] = useState<VoyRow[]>([]);
  // What the database holds, as last read. Changes are worked out against it,
  // so saving touches only the rows that actually changed.
  const saved = useRef<Snapshot | null>(null);
  const [savedJson, setSavedJson] = useState("");

  async function load(uid: string) {
    // Duplicate voyages are merged before anything is shown, so the editor
    // never offers two copies of one contract to correct separately.
    await cleanSeaExperience(uid);
    const [{ data: sf }, { data: cs }, { data: ex }] = await Promise.all([
      supabase.from("seafarers").select("*").eq("id", uid).single(),
      supabase.from("certificates").select("*").eq("seafarer_id", uid).order("expiry_date"),
      supabase.from("sea_experience").select("*").eq("seafarer_id", uid).order("from_date", { ascending: false }),
    ]);
    const row = (sf ?? {}) as Record<string, unknown>;
    const p = Object.fromEntries(PERSON_FIELDS.map((k) => [k, s(row[k])])) as Person;
    // The diplomas list, or the single legacy diploma the CV import writes,
    // carried over the same way the profile page does.
    const dl = (row.diplomas as Diploma[] | null)?.length
      ? (row.diplomas as Diploma[])
      : row.diploma ? [{ name: "", number: s(row.diploma), expiry: s(row.diploma_expiry) }] : [];
    const c: CertRow[] = (cs ?? []).map((r) => ({
      key: r.id, id: r.id, name: s(r.name), number: s(r.number), issuing_authority: s(r.issuing_authority),
      issue_date: s(r.issue_date), expiry_date: s(r.expiry_date),
    }));
    const v: VoyRow[] = (ex ?? []).map((r) => ({
      key: r.id, id: r.id, vessel_name: s(r.vessel_name), vessel_type: s(r.vessel_type), rank: s(r.rank),
      company: s(r.company), flag: s(r.flag), dwt: s(r.dwt), from_date: s(r.from_date), to_date: s(r.to_date),
    }));
    setPerson(p); setDiplomas(dl); setCerts(c); setVoys(v);
    saved.current = { person: p, diplomas: dl, certs: c, voys: v };
    setSavedJson(JSON.stringify(saved.current));
  }

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setFromMaker(q.get("from") === "maker");
    const f = q.get("fleet");
    if (isFleetId(f)) setFleetQuery(`?fleet=${f}`);
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUserId(session.user.id);
      await load(session.user.id);
      setLoading(false);
    })();
  }, []);

  const dirty = useMemo(
    () => !loading && JSON.stringify({ person, diplomas, certs, voys }) !== savedJson,
    [loading, person, diplomas, certs, voys, savedJson],
  );

  // Leaving with unsaved edits asks first — this page is where a seafarer
  // spends ten minutes correcting an AI's reading, and losing that is the
  // one thing it must not do.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const today = new Date().toISOString().slice(0, 10);
  const realVoys = voys.filter((v) => v.vessel_name.trim());
  const expired = certs.filter((c) => c.name.trim() && c.expiry_date && c.expiry_date < today);
  const checks = [
    !person.phone.trim() && { id: "f-phone", text: t.cved_missing_phone },
    !person.rank.trim() && { id: "f-rank", text: t.cved_missing_rank },
    !person.passport_no.trim() && { id: "f-passport_no", text: t.cved_missing_passport },
    realVoys.length === 0 && { id: "sec-voyages", text: t.cved_missing_voyage },
    expired.length > 0 && { id: "sec-certs", text: t.cved_expired.replace("{n}", String(expired.length)) },
  ].filter(Boolean) as { id: string; text: string }[];

  async function save(): Promise<boolean> {
    if (!userId || !saved.current) return false;
    setSaving(true); setNotice(null);
    const errors: string[] = [];
    try {
      const cleanDiplomas = diplomas
        .map((d) => ({ name: d.name.trim(), number: d.number.trim(), expiry: d.expiry }))
        .filter((d) => d.name || d.number || d.expiry);
      const payload: SeafarerUpdate = {
        ...(Object.fromEntries(PERSON_FIELDS.map((k) => [k, orNull(person[k])])) as Record<PersonKey, string | null>),
        diplomas: cleanDiplomas,
        // The legacy single columns mirror the first diploma, as the profile page keeps them.
        diploma: cleanDiplomas[0]?.number || null,
        diploma_expiry: cleanDiplomas[0]?.expiry || null,
        updated_at: new Date().toISOString(),
      };
      const { error: pe } = await supabase.from("seafarers").update(payload).eq("id", userId);
      if (pe) errors.push(pe.message);

      // Certificates: delete the removed, update the changed, insert the new.
      const was = new Map(saved.current.certs.map((c) => [c.id, c]));
      const keep = new Set(certs.filter((c) => c.id).map((c) => c.id));
      const gone = saved.current.certs.filter((c) => c.id && !keep.has(c.id)).map((c) => c.id as string);
      if (gone.length) {
        const { error } = await supabase.from("certificates").delete().in("id", gone);
        if (error) errors.push(error.message);
      }
      for (const c of certs) {
        const row = { name: c.name.trim(), number: orNull(c.number), issuing_authority: orNull(c.issuing_authority), issue_date: orNull(c.issue_date), expiry_date: orNull(c.expiry_date) };
        if (c.id) {
          const prev = was.get(c.id);
          if (prev && CERT_FIELDS.some((f) => prev[f] !== c[f]) && row.name) {
            const { error } = await supabase.from("certificates").update(row).eq("id", c.id);
            if (error) errors.push(error.message);
          }
        } else if (row.name) {
          const { error } = await supabase.from("certificates").insert({ ...row, seafarer_id: userId });
          if (error) errors.push(error.message);
        }
      }

      // Sea service, the same way. A voyage needs a vessel name to be kept.
      const wasV = new Map(saved.current.voys.map((v) => [v.id, v]));
      const keepV = new Set(voys.filter((v) => v.id).map((v) => v.id));
      const goneV = saved.current.voys.filter((v) => v.id && !keepV.has(v.id)).map((v) => v.id as string);
      if (goneV.length) {
        const { error } = await supabase.from("sea_experience").delete().in("id", goneV);
        if (error) errors.push(error.message);
      }
      for (const v of voys) {
        const row = {
          vessel_name: v.vessel_name.trim(), vessel_type: orNull(v.vessel_type), rank: orNull(v.rank), company: orNull(v.company),
          flag: orNull(v.flag), dwt: orNull(v.dwt), from_date: orNull(v.from_date), to_date: orNull(v.to_date),
        };
        if (v.id) {
          const prev = wasV.get(v.id);
          if (prev && VOY_FIELDS.some((f) => prev[f] !== v[f]) && row.vessel_name) {
            const { error } = await supabase.from("sea_experience").update(row).eq("id", v.id);
            if (error) errors.push(error.message);
          }
        } else if (row.vessel_name) {
          const { error } = await supabase.from("sea_experience").insert({ ...row, seafarer_id: userId });
          if (error) errors.push(error.message);
        }
      }

      // Read it back: new rows get their ids, and what is on screen is what is stored.
      await load(userId);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "network error");
    } finally {
      setSaving(false);
    }
    setNotice(errors.length ? { ok: false, text: t.cved_failed + errors[0] } : { ok: true, text: t.cved_saved });
    return errors.length === 0;
  }

  async function saveAndOpen() {
    if (await save()) router.push(`/seafarer/cv${fleetQuery}`);
  }

  const setP = (k: PersonKey, v: string) => setPerson((p) => ({ ...p, [k]: v }));
  const field = (k: PersonKey, label: string, type = "text") => (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-semibold text-mist">{label}</span>
      <input id={`f-${k}`} type={type} value={person[k]} onChange={(e) => setP(k, e.target.value)} className={INPUT} />
    </label>
  );
  const area = (k: PersonKey, label: string) => (
    <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
      <span className="text-xs font-semibold text-mist">{label}</span>
      <textarea id={`f-${k}`} rows={3} value={person[k]} onChange={(e) => setP(k, e.target.value)} className={`${INPUT} resize-y`} />
    </label>
  );

  if (loading) {
    return <div className="flex items-center gap-2 p-8 text-sm text-mist"><Loader2 size={16} className="animate-spin" /> {t.cab_loading}</div>;
  }

  return (
    <div className="p-5 pb-36 sm:p-8 sm:pb-32">
      <datalist id="dl-ranks">{RANK_GROUPS.flatMap((g) => g.ranks).map((r) => <option key={r} value={r} />)}</datalist>
      <datalist id="dl-types">{VESSEL_TYPE_GROUPS.flatMap((g) => g.types).map((v) => <option key={v} value={v} />)}</datalist>

      <h1 className="font-display text-2xl font-semibold text-white">{t.cved_title}</h1>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-mist">{fromMaker ? t.cved_sub_maker : t.cved_sub}</p>

      {/* What is still missing — each one jumps to its field */}
      <div className={`mt-5 rounded-xl border px-4 py-3 ${checks.length ? "border-brass/30 bg-brass/10" : "border-teal/30 bg-teal/10"}`}>
        {checks.length ? (
          <>
            <p className="mb-2 text-sm font-semibold text-foam">{t.cved_check}</p>
            <div className="flex flex-wrap gap-2">
              {checks.map((c) => (
                <a key={c.id} href={`#${c.id}`}
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById(c.id); el?.scrollIntoView({ behavior: "smooth", block: "center" }); (el as HTMLInputElement | null)?.focus?.(); }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brass/40 bg-navy2 px-3 py-1 text-xs font-semibold text-brassInk hover:border-brass">
                  <AlertCircle size={13} /> {c.text}
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="flex items-center gap-2 text-sm font-semibold text-teal"><CheckCircle2 size={16} /> {t.cved_all_good}</p>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <Section title={t.sp_personal}>
          <div className="grid gap-3 sm:grid-cols-2">
            {field("first_name", t.sp_first_name)}
            {field("last_name", t.sp_last_name)}
            <label className="flex min-w-0 flex-col gap-1.5">
              <span className="text-xs font-semibold text-mist">{t.sp_rank}</span>
              <input id="f-rank" list="dl-ranks" value={person.rank} onChange={(e) => setP("rank", e.target.value)} className={INPUT} />
            </label>
            {field("nationality", t.sp_nationality)}
            {field("date_of_birth", t.sp_dob, "date")}
            {field("phone", t.sp_phone, "tel")}
            {field("readiness_date", t.sp_readiness, "date")}
            {area("about", t.sp_about)}
          </div>
        </Section>

        <Section title={t.sp_documents}>
          <div className="grid gap-3 sm:grid-cols-2">
            {field("passport_no", t.sp_passport)}
            {field("passport_expiry", t.sp_passport_expiry, "date")}
            {field("seamans_book", t.sp_seamans_book)}
            {field("seamans_book_expiry", t.sp_seamans_expiry, "date")}
            {field("medical", t.sp_medical)}
            {field("medical_expiry", t.sp_medical_expiry, "date")}
            {field("service_record_book", t.sp_service_record)}
            {field("schengen_visa", t.sp_schengen)}
            {field("us_visa", t.sp_us_visa)}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold text-mist">{t.sp_diplomas}</p>
            <div className="space-y-2">
              {diplomas.map((d, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[2fr_1.4fr_1fr_auto]">
                  <Cell label={t.sp_diploma_name_ph}><input aria-label={t.sp_diploma_name_ph} placeholder={t.sp_diploma_name_ph} value={d.name}
                    onChange={(e) => setDiplomas((l) => l.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={INPUT} /></Cell>
                  <Cell label={t.sp_diploma_no_ph}><input aria-label={t.sp_diploma_no_ph} placeholder={t.sp_diploma_no_ph} value={d.number}
                    onChange={(e) => setDiplomas((l) => l.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))} className={INPUT} /></Cell>
                  <Cell label={t.cert_expiry}><input type="date" aria-label={t.cert_expiry} value={d.expiry}
                    onChange={(e) => setDiplomas((l) => l.map((x, j) => (j === i ? { ...x, expiry: e.target.value } : x)))} className={INPUT} /></Cell>
                  <RemoveButton label={t.cved_remove} onClick={() => setDiplomas((l) => l.filter((_, j) => j !== i))} />
                </div>
              ))}
            </div>
            <AddButton label={t.sp_add_diploma} onClick={() => setDiplomas((l) => [...l, { name: "", number: "", expiry: "" }])} />
          </div>
        </Section>

        <Section id="sec-certs" title={t.cert_title}>
          <div className="space-y-3">
            {certs.map((c, i) => {
              const old = c.expiry_date && c.expiry_date < today;
              const set = (k: (typeof CERT_FIELDS)[number], v: string) => setCerts((l) => l.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
              return (
                <div key={c.key} className={`grid gap-2 rounded-xl border p-3 sm:grid-cols-[2.2fr_1fr_1.2fr_1fr_auto] ${old ? "border-coral/40" : "border-white/10"}`}>
                  <Cell label={t.cert_name}><input aria-label={t.cert_name} placeholder={t.cert_name} value={c.name} onChange={(e) => set("name", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.cert_number}><input aria-label={t.cert_number} placeholder={t.cert_number} value={c.number} onChange={(e) => set("number", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.cert_authority}><input aria-label={t.cert_authority} placeholder={t.cert_authority} value={c.issuing_authority} onChange={(e) => set("issuing_authority", e.target.value)} className={INPUT} /></Cell>
                  <label className="flex min-w-0 flex-col">
                    <Cell label={t.cert_expiry}><input type="date" aria-label={t.cert_expiry} value={c.expiry_date} onChange={(e) => set("expiry_date", e.target.value)} className={`${INPUT} ${old ? "border-coral/60 text-coral" : ""}`} /></Cell>
                    {old && <span className="mt-1 text-[11px] font-semibold text-coral">{t.cved_expired_tag}</span>}
                  </label>
                  <RemoveButton label={t.cved_remove} onClick={() => setCerts((l) => l.filter((_, j) => j !== i))} />
                </div>
              );
            })}
          </div>
          <AddButton label={t.cved_add_cert} onClick={() => setCerts((l) => [...l, { key: newKey(), name: "", number: "", issuing_authority: "", issue_date: "", expiry_date: "" }])} />
        </Section>

        <Section id="sec-voyages" title={t.exp_title}>
          <div className="space-y-3">
            {voys.map((v, i) => {
              const set = (k: (typeof VOY_FIELDS)[number], val: string) => setVoys((l) => l.map((x, j) => (j === i ? { ...x, [k]: val } : x)));
              return (
                <div key={v.key} className="grid gap-2 rounded-xl border border-white/10 p-3 sm:grid-cols-4">
                  <Cell label={t.exp_vessel_name}><input aria-label={t.exp_vessel_name} placeholder={t.exp_vessel_name} value={v.vessel_name} onChange={(e) => set("vessel_name", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.exp_vessel_type}><input aria-label={t.exp_vessel_type} placeholder={t.exp_vessel_type} list="dl-types" value={v.vessel_type} onChange={(e) => set("vessel_type", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.exp_rank}><input aria-label={t.exp_rank} placeholder={t.exp_rank} list="dl-ranks" value={v.rank} onChange={(e) => set("rank", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.exp_company}><input aria-label={t.exp_company} placeholder={t.exp_company} value={v.company} onChange={(e) => set("company", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.exp_flag}><input aria-label={t.exp_flag} placeholder={t.exp_flag} value={v.flag} onChange={(e) => set("flag", e.target.value)} className={INPUT} /></Cell>
                  <Cell label={t.exp_dwt}><input aria-label={t.exp_dwt} placeholder={t.exp_dwt} value={v.dwt} onChange={(e) => set("dwt", e.target.value)} className={INPUT} /></Cell>
                  <label className="flex min-w-0 flex-col gap-1">
                    <span className="text-[11px] font-semibold text-mist">{t.exp_from}</span>
                    <input type="date" value={v.from_date} onChange={(e) => set("from_date", e.target.value)} className={INPUT} />
                  </label>
                  <div className="flex min-w-0 items-end gap-2">
                    <label className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[11px] font-semibold text-mist">{t.exp_to}</span>
                      <input type="date" value={v.to_date} onChange={(e) => set("to_date", e.target.value)} className={INPUT} />
                    </label>
                    <RemoveButton label={t.cved_remove} onClick={() => setVoys((l) => l.filter((_, j) => j !== i))} />
                  </div>
                </div>
              );
            })}
          </div>
          <AddButton label={t.cved_add_voyage} onClick={() => setVoys((l) => [{ key: newKey(), vessel_name: "", vessel_type: "", rank: "", company: "", flag: "", dwt: "", from_date: "", to_date: "" }, ...l])} />
        </Section>

        <Section title={t.cved_extra}>
          <div className="grid gap-3 sm:grid-cols-2">
            {area("languages", t.sp_languages)}
            {area("competencies", t.sp_competencies)}
            {area("education", t.sp_education)}
          </div>
        </Section>
      </div>

      {/* The save bar stays in reach on a long page. Fixed, not sticky: the
          cabinet's <main> is an overflow box that grows with its content, and
          sticky inside it never sticks. Offset by the 256px desktop sidebar so
          it never covers the menu; under the mobile drawer and cookie banner. */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-navy/95 px-5 py-3 backdrop-blur md:left-[256px] sm:px-8"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
        {/* One row on a phone: "save" shrinks to its icon there, so the bar
            costs one line of a small screen rather than three. */}
        {(notice || dirty) && (
          <p className={`mb-2 text-xs font-semibold ${notice ? (notice.ok ? "text-teal" : "text-coral") : "text-mist"}`}>
            {notice ? notice.text : t.cved_unsaved}
          </p>
        )}
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => void save()} disabled={saving} aria-label={t.cved_save} title={t.cved_save}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-brass/40 bg-brass/10 px-3.5 py-2.5 text-sm font-bold text-brassInk transition hover:bg-brass/20 disabled:opacity-50 sm:px-5">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span className="hidden sm:inline">{t.cved_save}</span>
          </button>
          <button type="button" onClick={() => void saveAndOpen()} disabled={saving}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50 sm:flex-none sm:px-5">
            <span className="truncate">{t.cved_save_open}</span> <ArrowRight size={15} className="shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="mb-4 font-display text-lg font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-foam transition hover:bg-white/10">
      <Plus size={15} /> {label}
    </button>
  );
}

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label}
      className="inline-flex h-[42px] w-[42px] shrink-0 items-center justify-center self-end rounded-xl border border-white/10 text-mist transition hover:border-coral/50 hover:text-coral">
      <Trash2 size={16} />
    </button>
  );
}

/** A captioned input for the certificate, diploma and voyage rows: once a field
 *  is filled its placeholder is gone, so the caption is what says what it is. */
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[11px] font-semibold text-mist">{label}</span>
      {children}
    </label>
  );
}
