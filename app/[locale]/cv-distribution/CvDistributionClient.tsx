"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Mail, Send, ShieldAlert, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";
import { money } from "@/lib/format";
import { RANK_GROUPS } from "@/lib/ranks";
import { FLEETS } from "@/lib/fleets";
import type { Lang } from "@/lib/langs";
import {
  BLAST_PACKAGES,
  packageName,
  type BlastPackage,
  type CvBlastCopy,
  type PackageGroup,
} from "@/lib/cvBlast";

const GROUP_ORDER: PackageGroup[] = ["fleet", "general", "monthly", "extra"];

type Currency = "eur" | "usd";

/** The contact fields, lifted so they survive moving between the package dialog
 *  and the form at the foot of the page — and so the session prefill runs once. */
type Values = { name: string; email: string; phone: string; rank: string; fleet: string; note: string };
const EMPTY: Values = { name: "", email: "", phone: "", rank: "", fleet: "", note: "" };

function priceOf(p: BlastPackage, currency: Currency): string {
  return currency === "eur" ? `€${p.eur}` : `$${p.usd}`;
}

export default function CvDistributionClient({ copy, lang }: { copy: CvBlastCopy; lang: Lang }) {
  const [currency, setCurrency] = useState<Currency>("eur");
  /** The package whose dialog is open. */
  const [detail, setDetail] = useState<BlastPackage | null>(null);
  /** The package selected in the form at the foot of the page. */
  const [bottomPick, setBottomPick] = useState<BlastPackage | null>(null);
  const [values, setValues] = useState<Values>(EMPTY);

  // Prefill from the session when there is one. A signed-in seafarer should not
  // retype the address we already mail them at.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!alive || !session) return;
        setValues((v) => ({ ...v, email: v.email || session.user.email || "" }));
        const { data } = await supabase
          .from("seafarers")
          .select("first_name, last_name, rank, phone")
          .eq("id", session.user.id)
          .maybeSingle();
        if (!alive || !data) return;
        const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ");
        setValues((v) => ({
          ...v,
          name: v.name || fullName,
          rank: v.rank || data.rank || "",
          phone: v.phone || data.phone || "",
        }));
      } catch {
        // Not signed in, or the profile row does not exist. The form still works.
      }
    })();
    return () => { alive = false; };
  }, []);

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: BLAST_PACKAGES.filter((p) => p.group === group),
      })).filter((g) => g.items.length > 0),
    [],
  );

  // Esc closes the dialog, and the page behind it stops scrolling while it is
  // open — on a phone the dialog is most of the screen and a scrolling backdrop
  // reads as the page having jumped.
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDetail(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [detail]);

  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <Header />

      {/* Hero */}
      <div className="hero-surface-center px-5 py-14 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brass/35 bg-brass/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-brassInk">
            {copy.pill}
          </span>
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mist sm:text-lg">{copy.lede}</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl flex-1 px-5 pb-20 pt-8">
        {/* Nothing is on sale yet, and the page says so before anything else. */}
        <div className="flex items-start gap-3 rounded-2xl border border-brass/30 bg-brass/10 px-4 py-3.5">
          <Mail size={18} className="mt-0.5 shrink-0 text-brassInk" />
          <p className="text-sm leading-relaxed text-foam/90">{copy.soon}</p>
        </div>

        {/* How it works */}
        <section className="mt-11">
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{copy.howTitle}</h2>
          <p className="mt-1 text-sm text-mist">{copy.howSub}</p>
          <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.steps.map((s, i) => (
              <div key={s.h} className="rounded-2xl border border-white/10 bg-card p-5">
                <span className="font-display text-xs font-bold tracking-[0.1em] text-brassInk">
                  {copy.stepWord} {i + 1}
                </span>
                <h3 className="mt-2 text-[15px] font-bold text-white">{s.h}</h3>
                <p className="mt-1 text-sm text-mist">{s.p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{copy.packagesTitle}</h2>
            <div className="inline-flex overflow-hidden rounded-xl border border-white/15" role="group" aria-label={copy.currencyLabel}>
              {(["eur", "usd"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    currency === c ? "bg-brass/15 text-brassInk" : "text-mist hover:text-white"
                  }`}
                >
                  {c === "eur" ? "EUR €" : "USD $"}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-mist">{copy.packagesSub}</p>

          {grouped.map(({ group, items }) => (
            <div key={group} className="mt-8">
              <div className="mb-3 flex flex-wrap items-baseline gap-2.5 border-b border-white/10 pb-2.5">
                <h3 className="font-display text-[17px] font-semibold text-white">{copy.groups[group].title}</h3>
                <span className="text-[13px] text-mist">{copy.groups[group].note}</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {items.map((p) => (
                  // The whole row is the control. It used to be a div with a
                  // button in the corner, so everything a thumb naturally aims
                  // at — the name, the price — did nothing. The CTA is a span,
                  // not a button, because a button inside a button is invalid.
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setDetail(p)}
                    className="flex w-full flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-white/10 bg-card px-5 py-4 text-left transition hover:border-brass/50 focus-visible:border-brass focus-visible:outline-none"
                  >
                    <span className="min-w-[200px] flex-1">
                      <span className="block text-[15px] font-bold text-white">{packageName(p, copy)}</span>
                      <span className="mt-1.5 flex flex-wrap gap-1.5">
                        {p.addresses !== null && (
                          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-mist">
                            {copy.chipAddresses}: {money(p.addresses)}
                          </span>
                        )}
                        {p.sends > 0 && (
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                              p.sends > 1 ? "border-teal/35 bg-teal/10 text-teal" : "border-white/15 text-mist"
                            }`}
                          >
                            {copy.chipSends}: {p.sends}
                          </span>
                        )}
                        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-mist">
                          {p.tags}
                        </span>
                      </span>
                    </span>

                    <span className="text-right">
                      <b className="block font-display text-2xl font-bold leading-tight text-brassInk">
                        {priceOf(p, currency)}
                      </b>
                      <span className="text-xs text-mist">{p.recurring ? copy.perMonth : copy.once}</span>
                    </span>

                    <span className="shrink-0 rounded-xl border border-brass/40 bg-brass/10 px-4 py-2 text-[13px] font-bold text-brassInk">
                      {copy.openDetails}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* The form at the foot, for a reader who did not pick from the list.
            Its package field is a real select — it used to be a static line that
            looked tappable and was not. */}
        <section className="mt-12">
          <div className="rounded-2xl border border-brass/30 bg-card p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-white">{copy.formTitle}</h2>
            <p className="mt-1 text-sm text-mist">{copy.formSub}</p>
            <RequestForm
              copy={copy}
              lang={lang}
              currency={currency}
              values={values}
              onChange={setValues}
              chosen={bottomPick}
              onChoose={setBottomPick}
            />
          </div>
        </section>

        {/* The site tells seafarers site-wide never to pay for a job. A paid page
            has to say, in the same breath, which side of that line it is on. */}
        <section className="mt-12">
          <div className="rounded-2xl border border-coral/30 bg-coral/10 p-5 sm:p-6">
            <div className="flex gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-coral/15">
                <ShieldAlert size={20} className="text-coral" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-coral">{copy.notTitle}</p>
                {copy.notBody.map((line) => (
                  <p key={line} className="mt-2 text-sm leading-relaxed text-foam/90">{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{copy.faqTitle}</h2>
          <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
            {copy.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-navy2 p-5">
                <h3 className="text-[15px] font-bold text-white">{f.q}</h3>
                <p className="mt-1.5 text-sm text-mist">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {detail && (
        <PackageDialog
          pkg={detail}
          copy={copy}
          lang={lang}
          currency={currency}
          values={values}
          onChange={setValues}
          onClose={() => setDetail(null)}
        />
      )}

      <Footer />
    </div>
  );
}

function PackageDialog({
  pkg, copy, lang, currency, values, onChange, onClose,
}: {
  pkg: BlastPackage;
  copy: CvBlastCopy;
  lang: Lang;
  currency: Currency;
  values: Values;
  onChange: (v: Values) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={packageName(pkg, copy)}
        onClick={(e) => e.stopPropagation()}
        className="my-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-card shadow-2xl"
      >
        <div className="flex items-start gap-4 border-b border-white/10 p-5 sm:p-6">
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-white">{packageName(pkg, copy)}</h2>
            <p className="mt-1">
              <b className="font-display text-2xl font-bold text-brassInk">{priceOf(pkg, currency)}</b>
              <span className="ml-2 text-xs text-mist">{pkg.recurring ? copy.perMonth : copy.once}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="shrink-0 rounded-lg border border-white/10 p-2 text-mist transition hover:border-white/25 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-foam/90">{copy.groupDetail[pkg.group]}</p>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-mist">{copy.modalIncluded}</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-foam">
              {pkg.addresses !== null && (
                <li>• {copy.chipAddresses}: <b className="text-white">{money(pkg.addresses)}</b></li>
              )}
              {pkg.sends > 0 && (
                <li>• {copy.chipSends}: <b className="text-white">{pkg.sends}</b></li>
              )}
              <li>• {pkg.tags}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-mist">{copy.modalHow}</h3>
            <ol className="mt-2 space-y-1.5 text-sm text-mist">
              {copy.steps.map((s, i) => (
                <li key={s.h}>
                  <b className="text-foam">{i + 1}. {s.h}.</b> {s.p}
                </li>
              ))}
            </ol>
          </div>

          <p className="rounded-xl border border-coral/25 bg-coral/10 px-4 py-3 text-sm leading-relaxed text-foam/90">
            {copy.modalNote}
          </p>

          <div className="border-t border-white/10 pt-5">
            <h3 className="font-display text-base font-bold text-white">{copy.formTitle}</h3>
            <p className="mt-1 text-sm text-mist">{copy.formSub}</p>
            <RequestForm
              copy={copy}
              lang={lang}
              currency={currency}
              values={values}
              onChange={onChange}
              chosen={pkg}
              onDone={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The request form. Two instances exist — one inside the package dialog with the
 * package fixed, one at the foot of the page where it is a select — so the
 * fields live in the parent and only the submission state is local. Typing in
 * one and then opening the other keeps what was typed.
 */
function RequestForm({
  copy, lang, currency, values, onChange, chosen, onChoose, onDone,
}: {
  copy: CvBlastCopy;
  lang: Lang;
  currency: Currency;
  values: Values;
  onChange: (v: Values) => void;
  chosen: BlastPackage | null;
  /** Present on the page-foot instance: renders the package field as a select. */
  onChoose?: (p: BlastPackage | null) => void;
  /** Present in the dialog: lets the success panel close it. */
  onDone?: () => void;
}) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = useCallback(
    (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...values, [k]: e.target.value }),
    [values, onChange],
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const email = values.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.errEmail);
      return;
    }
    setSending(true);
    setError(null);

    // Posted to the API rather than inserted straight into Supabase: the server
    // takes the package name and price from the catalogue (so the demand
    // numbers cannot be forged) and pings the admin on Telegram.
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          package_code: chosen?.code ?? null,
          name: values.name.trim(),
          email,
          phone: values.phone.trim(),
          rank: values.rank,
          fleet: values.fleet,
          note: values.note.trim(),
          lang,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      setError(copy.errFail);
      setSending(false);
      return;
    }
    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-9 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10">
          <CheckCircle size={28} className="text-teal" />
        </div>
        <p className="font-semibold text-white">{copy.okTitle}</p>
        <p className="max-w-md text-sm text-mist">{copy.okBody}</p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            onChange({ ...values, note: "" });
            onDone?.();
          }}
          className="mt-1 text-xs text-brassInk hover:underline"
        >
          {onDone ? copy.close : copy.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
      <div className="rounded-xl border border-white/10 bg-navy2 px-4 py-3">
        <p className="text-xs text-mist">{copy.formChosen}</p>
        {onChoose ? (
          <select
            value={chosen?.code ?? ""}
            onChange={(e) =>
              onChoose(BLAST_PACKAGES.find((p) => p.code === e.target.value) ?? null)
            }
            className="mt-1 w-full rounded-lg border border-white/10 bg-card px-3 py-2 text-sm font-semibold text-white outline-none focus:border-brass"
          >
            <option value="">{copy.fAny}</option>
            {GROUP_ORDER.map((group) => {
              const items = BLAST_PACKAGES.filter((p) => p.group === group);
              if (items.length === 0) return null;
              return (
                <optgroup key={group} label={copy.groups[group].title}>
                  {items.map((p) => (
                    <option key={p.code} value={p.code}>
                      {packageName(p, copy)} — {priceOf(p, currency)}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        ) : (
          <p className="mt-0.5 text-sm font-bold text-white">
            {chosen ? `${packageName(chosen, copy)} — ${priceOf(chosen, currency)}` : copy.fAny}
          </p>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
          <p className="text-sm text-coral">{error}</p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={values.name}
          onChange={set("name")}
          placeholder={copy.fName}
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
        />
        <input
          type="email"
          required
          value={values.email}
          onChange={set("email")}
          placeholder={copy.fEmail}
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
        />
      </div>

      <input
        value={values.phone}
        onChange={set("phone")}
        placeholder={copy.fPhone}
        className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          value={values.rank}
          onChange={set("rank")}
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass"
        >
          <option value="">{copy.fRank}</option>
          {RANK_GROUPS.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.ranks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </optgroup>
          ))}
        </select>

        <select
          value={values.fleet}
          onChange={set("fleet")}
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass"
        >
          <option value="">{copy.fFleet}</option>
          {FLEETS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.labels[lang] ?? f.labels.en}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={values.note}
        onChange={set("note")}
        placeholder={copy.fNote}
        rows={3}
        className="resize-none rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
      />

      <button
        type="submit"
        disabled={sending || !values.email.trim()}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
      >
        <Send size={15} />
        {sending ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
