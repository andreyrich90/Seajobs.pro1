"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Anchor, Ship, Users, Globe } from "lucide-react";

const VALUES = [
  {
    icon: Ship,
    title: "Built for Seafarers",
    text: "We understand the maritime world because we come from it. Every feature is designed around the real needs of seafarers and crewing agencies.",
  },
  {
    icon: Users,
    title: "Trusted Network",
    text: "We verify crewing companies to ensure seafarers only see legitimate, professional job offers from reputable agencies across Europe.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    text: "From the Baltic to the Mediterranean, our platform connects maritime talent with opportunities across all major shipping routes and registries.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,#0e2a45,#0a1f33_60%)]" />
          <div className="relative mx-auto max-w-4xl px-5 py-20 text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brass to-brass2 shadow-xl">
              <Anchor size={30} className="text-deep" strokeWidth={2.4} />
            </div>
            <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">
              About SeaJobs<span className="text-brass2">.pro</span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-mist leading-relaxed">
              SeaJobs.pro is a modern maritime career platform connecting seafarers with verified crewing agencies across Europe and beyond.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="rounded-2xl border border-white/10 bg-card p-8 md:p-12">
            <h2 className="font-display text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-mist leading-relaxed">
              Maritime careers are built on trust, expertise, and the right connections. SeaJobs.pro was created to be the definitive digital harbour where experienced seafarers can find their next voyage and crewing companies can discover the talent they need.
            </p>
            <p className="mt-4 text-mist leading-relaxed">
              We believe that finding maritime work should be transparent, efficient, and dignified. That's why we provide a platform where your CV, certificates, and experience speak for themselves — no middlemen, no hidden fees.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <h2 className="font-display text-2xl font-semibold text-white mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-card p-6">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-brass/15">
                  <v.icon size={20} className="text-brass2" />
                </div>
                <h3 className="font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-mist leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <div className="rounded-2xl border border-brass/20 bg-brass/5 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-white mb-2">Have Questions?</h2>
            <p className="text-mist mb-5">Use our contact form on the home page or reach out directly.</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
