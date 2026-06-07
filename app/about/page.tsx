"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Anchor, Ship, Users, Globe } from "lucide-react";
import { T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

export default function AboutPage() {
  const { lang } = useLang();
  const t = T[lang];

  const values = [
    { icon: Ship, title: t.about_v1_title, text: t.about_v1_text },
    { icon: Users, title: t.about_v2_title, text: t.about_v2_text },
    { icon: Globe, title: t.about_v3_title, text: t.about_v3_text },
  ];

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
              {t.about_hero_sub}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="rounded-2xl border border-white/10 bg-card p-8 md:p-12">
            <h2 className="font-display text-2xl font-semibold text-white mb-4">{t.about_mission_title}</h2>
            <p className="text-mist leading-relaxed">{t.about_mission_p1}</p>
            <p className="mt-4 text-mist leading-relaxed">{t.about_mission_p2}</p>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <h2 className="font-display text-2xl font-semibold text-white mb-8 text-center">{t.about_values_title}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
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
            <h2 className="font-display text-xl font-semibold text-white mb-2">{t.about_cta_title}</h2>
            <p className="text-mist mb-5">{t.about_cta_sub}</p>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5"
            >
              {t.about_cta_btn}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
