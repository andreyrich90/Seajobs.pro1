"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle, Mail, Send, ShieldAlert } from "lucide-react";
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

export default function CvDistributionClient({ copy, lang }: { copy: CvBlastCopy; lang: Lang }) {
  const [currency, setCurrency] = useState<Currency>("eur");
  const [chosen, setChosen] = useState<BlastPackage | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rank, setRank] = useState("");
  const [fleet, setFleet] = useState("");
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  // Prefill from the session when there is one. A signed-in seafarer should not
  // retype the address we already mail them at.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!alive || !session) return;
        setUserId(session.user.id);
        setEmail((prev) => prev || session.user.email || "");
        const { data } = await supabase
          .from("seafarers")
          .select("first_name, last_name, rank, phone")
          .eq("id", session.user.id)
          .maybeSingle();
        if (!alive || !data) return;
        const fullName = [data.first_name, data.last_name].filter(Boolean).join(" ");
        setName((prev) => prev || fullName);
        setRank((prev) => prev || data.rank || "");
        setPhone((prev) => prev || data.phone || "");
      } catch {
        // Not signed in, or the profile row does not exist. The form still works.
      }
    })();
    return () => { alive = false; };
  }, []);

  const grouped = useMemo(() => {
    return GROUP_ORDER.map((group) => ({
      group,
      items: BLAST_PACKAGES.filter((p) => p.group === group),
    })).filter((g) => g.items.length > 0);
  }, []);

  function pick(pkg: BlastPackage) {
    setChosen(pkg);
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(copy.errEmail);
      return;
    }
    setSending(true);
    setError(null);

    const { error: insertError } = await supabase.from("service_requests").insert({
      user_id: userId,
      package_code: chosen?.code ?? "unspecified",
      package_label: chosen ? packageName(chosen, copy) : "—",
      price_eur: chosen?.eur ?? null,
      price_usd: chosen?.usd ?? null,
      name: name.trim() || null,
      email: trimmed,
      phone: phone.trim() || null,
      rank: rank || null,
      fleet: fleet || null,
      note: note.trim() || null,
      lang,
    });

    if (insertError) {
      setError(copy.errFail);
      setSending(false);
      return;
    }
    setSent(true);
    setSending(false);
  }

  const price = (p: BlastPackage) => (currency === "eur" ? `€${p.eur}` : `$${p.usd}`);

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
                {items.map((p) => {
                  const active = chosen?.code === p.code;
                  return (
                    <div
                      key={p.code}
                      className={`flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border bg-card px-5 py-4 transition ${
                        active ? "border-brass/60" : "border-white/10 hover:border-brass/40"
                      }`}
                    >
                      <div className="min-w-[200px] flex-1">
                        <p className="text-[15px] font-bold text-white">{packageName(p, copy)}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {p.addresses !== null && (
                            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-mist">
                              {copy.chipAddresses}: {money(p.addresses)}
                            </span>
                          )}
                          {p.sends > 0 && (
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                                p.sends > 1
                                  ? "border-teal/35 bg-teal/10 text-teal"
                                  : "border-white/15 text-mist"
                              }`}
                            >
                              {copy.chipSends}: {p.sends}
                            </span>
                          )}
                          <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-mist">
                            {p.tags}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <b className="block font-display text-2xl font-bold leading-tight text-brassInk">
                          {price(p)}
                        </b>
                        <span className="text-xs text-mist">{p.recurring ? copy.perMonth : copy.once}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => pick(p)}
                        className="rounded-xl border border-brass/40 bg-brass/10 px-4 py-2 text-[13px] font-bold text-brassInk transition hover:bg-brass/20"
                      >
                        {copy.choose}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Request form */}
        <section ref={formRef} className="mt-12 scroll-mt-24">
          <div className="rounded-2xl border border-brass/30 bg-card p-6 sm:p-7">
            <h2 className="font-display text-xl font-bold text-white">{copy.formTitle}</h2>
            <p className="mt-1 text-sm text-mist">{copy.formSub}</p>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-9 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10">
                  <CheckCircle size={28} className="text-teal" />
                </div>
                <p className="font-semibold text-white">{copy.okTitle}</p>
                <p className="max-w-md text-sm text-mist">{copy.okBody}</p>
                <button
                  onClick={() => { setSent(false); setNote(""); }}
                  className="mt-1 text-xs text-brassInk hover:underline"
                >
                  {copy.another}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 flex flex-col gap-3">
                <div className="rounded-xl border border-white/10 bg-navy2 px-4 py-3">
                  <p className="text-xs text-mist">{copy.formChosen}</p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    {chosen ? `${packageName(chosen, copy)} — ${price(chosen)}` : copy.fAny}
                  </p>
                </div>

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                    <p className="text-sm text-coral">{error}</p>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.fName}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.fEmail}
                    className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
                  />
                </div>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={copy.fPhone}
                  className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
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
                    value={fleet}
                    onChange={(e) => setFleet(e.target.value)}
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
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={copy.fNote}
                  rows={3}
                  className="resize-none rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/50 focus:border-brass"
                />

                <button
                  type="submit"
                  disabled={sending || !email.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-50"
                >
                  <Send size={15} />
                  {sending ? copy.sending : copy.submit}
                </button>
              </form>
            )}
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

      <Footer />
    </div>
  );
}
