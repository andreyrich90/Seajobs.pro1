"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { T, type Lang } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<Lang>("ua");
  const t = T[lang];

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />

      <main className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-5 py-32 text-center">
        <h1 className="font-display text-5xl font-semibold text-foam md:text-6xl">
          SeaJobs<span className="text-brass2">.pro</span>
        </h1>
        <p className="text-lg text-mist">{t.tagline} ⚓</p>
        <span className="mt-4 rounded-full bg-brass px-5 py-2 font-semibold text-deep">
          {t.login} → попробуйте сменить язык вверху справа
        </span>
      </main>
    </div>
  );
}
