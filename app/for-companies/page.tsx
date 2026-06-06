"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anchor, CheckCircle, ArrowRight, Send, Users, Briefcase,
  Globe, ShieldCheck, Bell, BarChart3, Zap, Star,
  Building2, ChevronRight, AlertCircle, Mail,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase/client";

const BENEFITS = [
  {
    icon: Users,
    title: "Verified seafarer pool",
    description: "Access thousands of verified seafarers filtered by rank, nationality, and vessel type.",
    color: "text-teal",
    bg: "bg-teal/10 border-teal/20",
  },
  {
    icon: Bell,
    title: "Instant notifications",
    description: "Seafarers with matching job alerts are notified the moment you post a new vacancy.",
    color: "text-brass2",
    bg: "bg-brass/10 border-brass/20",
  },
  {
    icon: ShieldCheck,
    title: "Verified company badge",
    description: "Get the blue verified badge — increases application rates significantly.",
    color: "text-teal",
    bg: "bg-teal/10 border-teal/20",
  },
  {
    icon: BarChart3,
    title: "Application tracking",
    description: "Manage all incoming applications in one dashboard. Mark as viewed, accepted, or rejected.",
    color: "text-brass2",
    bg: "bg-brass/10 border-brass/20",
  },
  {
    icon: Globe,
    title: "Google for Jobs",
    description: "Every vacancy is indexed by Google for Jobs automatically — free extra traffic.",
    color: "text-teal",
    bg: "bg-teal/10 border-teal/20",
  },
  {
    icon: Zap,
    title: "Post in 2 minutes",
    description: "Simple form, no bureaucracy. Post a vacancy faster than sending an email.",
    color: "text-brass2",
    bg: "bg-brass/10 border-brass/20",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a free account",
    description: "Register as a company, fill in your profile and get verified.",
  },
  {
    n: "02",
    title: "Post your vacancy",
    description: "Fill in rank, vessel type, salary and joining date. Takes 2 minutes.",
  },
  {
    n: "03",
    title: "Receive applications",
    description: "Seafarers apply directly. You review CVs and respond in your dashboard.",
  },
];

const PRICING = [
  {
    name: "Launch",
    price: "Free",
    period: "forever",
    highlight: false,
    features: [
      "Up to 3 active vacancies",
      "Unlimited applications",
      "Company profile page",
      "Email notifications",
      "Google for Jobs indexing",
    ],
    cta: "Get started free",
    href: "/auth/register?role=company",
  },
  {
    name: "Professional",
    price: "$49",
    period: "/ month",
    highlight: true,
    features: [
      "Unlimited vacancies",
      "Verified company badge",
      "Priority placement in search",
      "Seafarer database access",
      "Dedicated account manager",
    ],
    cta: "Start free trial",
    href: "/auth/register?role=company",
  },
];

export default function ForCompaniesPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !company.trim()) return;
    setSending(true);
    setError(null);

    const { error: err } = await supabase.from("messages").insert({
      name: name.trim() || null,
      email: email.trim(),
      subject: `Partnership request: ${company.trim()}`,
      content: `Company: ${company.trim()}\nContact: ${name.trim()}\nEmail: ${email.trim()}\n\nInterested in free vacancy posting.`,
    });

    if (err) {
      setError("Something went wrong. Please email us directly at hello@seajobs.pro");
      setSending(false);
      return;
    }
    setSent(true);
    setSending(false);
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
              <Building2 size={13} /> For crewing companies & agencies
            </div>

            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Find the right seafarer.<br />
              <span className="text-brass2">Post free — no strings attached.</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-mist">
              SeaJobs.pro connects crewing companies with thousands of verified seafarers worldwide.
              Start posting vacancies today at zero cost — upgrade only when you're ready.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/register?role=company"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3.5 text-base font-bold text-deep transition hover:-translate-y-0.5 shadow-lg"
              >
                Post your first vacancy free <ArrowRight size={17} />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Talk to us first
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5">
              {[
                "No credit card required",
                "Setup in 5 minutes",
                "Google for Jobs included",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-mist">
                  <CheckCircle size={15} className="text-teal shrink-0" />
                  {t}
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
              { n: "12 000+", l: "Registered seafarers" },
              { n: "40+",     l: "Countries represented" },
              { n: "2 min",   l: "Average time to post" },
              { n: "Free",    l: "To get started" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl font-bold text-brass2">{s.n}</div>
                <div className="mt-1 text-xs font-medium text-mist">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
            Everything you need to hire at sea
          </h2>
          <p className="mt-3 text-mist max-w-xl mx-auto">
            Built specifically for maritime crewing — not a generic job board.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className={`rounded-2xl border p-6 ${b.bg} transition hover:scale-[1.01]`}
            >
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
              How it works
            </h2>
            <p className="mt-3 text-mist">From sign-up to first application in under 10 minutes.</p>
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
                  <ChevronRight
                    size={22}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 text-brass2/40 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/auth/register?role=company"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-7 py-3.5 text-base font-bold text-deep transition hover:-translate-y-0.5 shadow-lg"
            >
              Create company account <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-mist">Start free. Upgrade when your team grows.</p>
        </div>

        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-7 flex flex-col ${
                plan.highlight
                  ? "border-brass/40 bg-gradient-to-br from-brass/10 to-brass2/5"
                  : "border-white/10 bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-brass/20 border border-brass/30 px-3 py-1 text-xs font-bold text-brass2">
                  <Star size={11} /> Most popular
                </div>
              )}
              <div className="mb-1 text-sm font-semibold text-mist uppercase tracking-wider">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-mist">{plan.period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foam">
                    <CheckCircle size={15} className="text-teal shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full rounded-xl py-3 text-sm font-bold text-center transition hover:-translate-y-0.5 ${
                  plan.highlight
                    ? "bg-gradient-to-br from-brass to-brass2 text-deep shadow-lg"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-xs text-mist">
          Professional plan pricing is indicative — contact us for agency rates and annual discounts.
        </p>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="bg-card border-t border-white/10">
        <div className="mx-auto max-w-xl px-5 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brass/10 border border-brass/20 mb-4">
              <Mail size={26} className="text-brass2" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-white">
              Want to discuss first?
            </h2>
            <p className="mt-2 text-sm text-mist">
              Leave your contacts — we'll reach out within 24 hours and help you get set up.
            </p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-teal/20 bg-teal/10 p-8 text-center">
              <CheckCircle size={32} className="mx-auto mb-3 text-teal" />
              <p className="font-semibold text-white">Message received!</p>
              <p className="mt-1 text-sm text-mist">We'll contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
                  <p className="text-sm text-coral">{error}</p>
                </div>
              )}

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
              />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name *"
                required
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email *"
                required
                className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
              />

              <button
                type="submit"
                disabled={sending || !email.trim() || !company.trim()}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3.5 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
              >
                <Send size={15} />
                {sending ? "Sending..." : "Request free setup"}
              </button>

              <p className="text-center text-xs text-mist/60">
                Or email us directly:{" "}
                <a href="mailto:hello@seajobs.pro" className="text-brass2 hover:underline">
                  hello@seajobs.pro
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
