"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QRCodeSVG } from "qrcode.react";
import { UtensilsCrossed, Lightbulb, QrCode } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { MENU, MENU_CHROME } from "@/lib/menu";

export default function MenuPage() {
  const { lang } = useLang();
  const c = MENU_CHROME[lang] ?? MENU_CHROME.en;
  const categories = MENU[lang] ?? MENU.en;

  // Canonical, locale-aware URL the QR code points to (English has no prefix).
  const menuUrl = lang === "en" ? "https://seajobs.pro/menu" : `https://seajobs.pro/${lang}/menu`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_0%,#0e2a45,#0a1f33_60%)]" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brass to-brass2 shadow-xl">
              <UtensilsCrossed size={30} className="text-[#061523]" strokeWidth={2.2} />
            </div>
            <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">{c.h1}</h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-mist leading-relaxed">{c.sub}</p>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat) => (
          <section key={cat.key} className="mx-auto max-w-5xl px-5 py-12">
            <h2 className="font-display text-2xl font-semibold text-white">{cat.title}</h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.recipes.map((r, i) => (
                <article
                  key={r.title}
                  className="flex flex-col rounded-2xl border border-white/10 bg-card p-5"
                >
                  <h3 className="flex items-start gap-2 font-semibold text-white">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-brass/15 text-xs font-bold text-brass2">
                      {i + 1}
                    </span>
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm text-foam leading-relaxed">
                    <span className="font-semibold text-brass2">{c.ingredientsLabel}:</span>{" "}
                    {r.ingredients}
                  </p>
                  <p className="mt-2 text-sm text-mist leading-relaxed">
                    <span className="font-semibold text-teal">{c.howLabel}:</span> {r.steps}
                  </p>
                </article>
              ))}
            </div>

            {/* Pro tip */}
            <div className="mt-5 flex gap-3 rounded-2xl border border-brass/25 bg-brass/5 p-5">
              <Lightbulb size={20} className="mt-0.5 shrink-0 text-brass2" />
              <p className="text-sm text-foam leading-relaxed">
                <span className="font-semibold text-brass2">{c.tipLabel}:</span> {cat.tip}
              </p>
            </div>
          </section>
        ))}

        {/* QR share */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-card p-8 text-center sm:flex-row sm:text-left">
            <div className="rounded-2xl bg-white p-4 shadow-xl">
              <QRCodeSVG value={menuUrl} size={148} level="M" />
            </div>
            <div>
              <h2 className="flex items-center justify-center gap-2 font-display text-xl font-semibold text-white sm:justify-start">
                <QrCode size={22} className="text-brass2" /> {c.qrTitle}
              </h2>
              <p className="mt-2 text-mist leading-relaxed">{c.qrSub}</p>
              <p className="mt-3 break-all text-sm text-brass2">{menuUrl}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
