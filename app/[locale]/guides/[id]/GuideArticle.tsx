"use client";

import { Link } from "@/i18n/navigation";
import { ChevronRight, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopularJobLinks from "@/components/PopularJobLinks";
import { useLang } from "@/components/LangProvider";
import { GUIDES_UI } from "@/lib/guidesUi";
import { renderMarkdown } from "@/lib/markdown";

export type ResolvedGuide = {
  id: string;
  title: string;
  body: string;
  tag: string | null;
  gradient: string;
  coverUrl: string | null;
  date: string;
};

export default function GuideArticle({ guide }: { guide: ResolvedGuide }) {
  const { lang } = useLang();
  const ui = GUIDES_UI[lang] ?? GUIDES_UI.en;

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(
      lang === "ua" ? "uk-UA" : lang === "pl" ? "pl-PL" : lang === "ru" ? "ru-RU" : lang === "ro" ? "ro-RO" : "en-GB",
      { day: "numeric", month: "long", year: "numeric" },
    );

  return (
    <div className="min-h-screen bg-navy">
      <Header />
      <div className="mx-auto max-w-3xl px-5 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-mist" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brass2">{ui.home}</Link>
          <ChevronRight size={12} />
          <Link href="/guides" className="hover:text-brass2">{ui.crumb}</Link>
          <ChevronRight size={12} />
          <span className="truncate text-foam max-w-[60vw] sm:max-w-none">{guide.title}</span>
        </nav>

        {/* Cover */}
        {guide.coverUrl ? (
          <div className="mb-6 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={guide.coverUrl} alt={guide.title} className="h-72 w-full object-cover sm:h-96" />
          </div>
        ) : (
          <div className="mb-6 h-40 overflow-hidden rounded-2xl" style={{ background: guide.gradient }} />
        )}

        {guide.tag && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brass/20 bg-brass/10 px-3 py-1 text-xs font-semibold text-brass2">
            {guide.tag}
          </span>
        )}
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{guide.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-mist">
          <Calendar size={12} /> {fmtDate(guide.date)}
        </p>

        {/* Body */}
        <article className="prose-invert mt-6 text-[15px] leading-relaxed text-foam/90">
          {renderMarkdown(guide.body)}
        </article>

        {/* Internal links to job landing pages */}
        <PopularJobLinks variant="section" />
      </div>
      <Footer />
    </div>
  );
}
