"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Anchor, CheckCircle, ArrowRight, Send,
  Users, Briefcase, Globe, ShieldCheck, Bell, BarChart3, Zap,
  Building2, ChevronRight, AlertCircle, Mail,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

export default function ForCompaniesPage() {
  const { lang } = useLang();
  const t = T[lang];

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BENEFITS = [
    { icon: Users,      title: t.fc_b1_t, description: t.fc_b1_d, color: "text-teal",  bg: "bg-teal/10 border-teal/20" },
    { icon: Bell,       title: t.fc_b2_t, description: t.fc_b2_d, color: "text-brass2", bg: "bg-brass/10 border-brass/20" },
    { icon: ShieldCheck,title: t.fc_b3_t, description: t.fc_b3_d, color: "text-teal",  bg: "bg-teal/10 border-teal/20" },
    { icon: BarChart3,  title: t.fc_b4_t, description: t.fc_b4_d, color: "text-brass2", bg: "bg-brass/10 border-brass/20" },
    { icon: Globe,      title: t.fc_b5_t, description: t.fc_b5_d, color: "text-teal",  bg: "bg-teal/10 border-teal/20" },
    { icon: Zap,        title: t.fc_b6_t, description: t.fc_b6_d, color: "text-brass2", bg: "bg-brass/10 border-brass/20" },
  ];

  const STEPS = [
    { n: "01", title: t.fc_s1_t, description: t.fc_s1_d },
    { n: "02", title: t.fc_s2_t, description: t.fc_s2_d },
    { n: "03", title: t.fc_s3_t, description: t.fc_s3_d },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !company.trim()) return;
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          subject: `Partnership request: ${company.trim()}`,
          content: `Company: ${company.trim()}\nContact: ${name.trim()}\nEmail: ${email.trim()}\n\nInterested in free vacancy posting.`,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error("request_failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please email us directly at partners@seajobs.pro");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_80%_-20%,#0e2a45,#061523_65%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-teal">
              <Building2 size={13} /> {t.fc_badge}
            </div>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              {t.fc_hero_title}<br />
              <span className="text-brass2">{t.fc_hero_title2}</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-mist">{t.fc_hero_sub}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NextLink
                href="/auth/register?role=company"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3.5 text-base font-bold text-[#061523] transition hover:-translate-y-0.5 shadow-lg"
              >
                {t.fc_cta_post} <ArrowRight size={17} />
              </NextLink>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {t.fc_cta_talk}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              {[t.fc_trust_1, t.fc_trust_2, t.fc_trust_3].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-mist">
                  <CheckCircle size={15} className="text-teal shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/10 bg-card">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { n: "12 000+", l: t.fc_stat_1 },
              { n: "40+",     l: t.fc_stat_2 },
              { n: "2 min",   l: t.fc_stat_3 },
              { n: t.fc_stat_4, l: "" },
            ].map((s, i) => (
              <div key={i} className="min-w-0 text-center">
                <div className="font-display text-2xl font-bold leading-tight text-brass2 break-words sm:text-3xl">{s.n}</div>
                {s.l && <div className="mt-1 text-xs font-medium text-mist">{s.l}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
            {t.fc_benefits_title}
          </h2>
          <p className="mt-3 text-mist max-w-xl mx-auto">{t.fc_benefits_sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className={`rounded-2xl border p-6 ${b.bg} transition hover:scale-[1.01]`}>
              <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${b.color}`}>
                <b.icon size={20} />
              </div>
              <h3 className="font-semibold text-white mb-1">{b.title}</h3>
              <p className="text-sm text-mist leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-card border-y border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
              {t.fc_how_title}
            </h2>
            <p className="mt-3 text-mist">{t.fc_how_sub}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="rounded-2xl border border-white/10 bg-navy2 p-6">
                  <div className="font-display text-5xl font-bold text-white/10 mb-3">{s.n}</div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-mist leading-relaxed">{s.description}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={22} className="absolute -right-4 top-1/2 -translate-y-1/2 text-brass2/40 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <NextLink
              href="/auth/register?role=company"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-7 py-3.5 text-base font-bold text-[#061523] transition hover:-translate-y-0.5 shadow-lg"
            >
              {t.fc_cta_create} <ArrowRight size={16} />
            </NextLink>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="bg-navy border-t border-white/10">
        <div className="mx-auto max-w-xl px-5 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brass/10 border border-brass/20 mb-4">
              <Mail size={26} className="text-brass2" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-white">{t.fc_contact_title}</h2>
            <p className="mt-2 text-sm text-mist">{t.fc_contact_sub}</p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-teal/20 bg-teal/10 p-8 text-center">
              <CheckCircle size={32} className="mx-auto mb-3 text-teal" />
              <p className="font-semibold text-white">{t.fc_ok_title}</p>
              <p className="mt-1 text-sm text-mist">{t.fc_ok_sub}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                  <p className="text-sm text-coral">{error}</p>
                </div>
              )}
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder={t.fc_name_ph}
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50" />
              <input value={company} onChange={(e) => setCompany(e.target.value)}
                placeholder={`${t.fc_company_ph} *`} required
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={`${t.fc_email_ph} *`} required
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50" />
              <button type="submit" disabled={sending || !email.trim() || !company.trim()}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0">
                <Send size={15} />
                {sending ? t.fc_sending : t.fc_send_btn}
              </button>
              <p className="text-center text-xs text-mist/60">
                Or email us:{" "}
                <a href="mailto:partners@seajobs.pro" className="text-brass2 hover:underline">partners@seajobs.pro</a>
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
