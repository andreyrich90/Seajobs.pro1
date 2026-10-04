import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { FileText, FileDown, Image as ImageIcon, Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import { CV_MAKER_COPY } from "@/lib/cvMaker";
import { CV_WORD } from "@/lib/cvWord";
import type { Lang } from "@/lib/langs";

// The public page about making a CV on the site — and the page search engines
// are meant to land on for "скачать анкету моряка в Word" and its neighbours.
//
// A Server Component on purpose. There is nothing interactive here, so the
// whole thing arrives as HTML with no JavaScript behind it: faster for the
// reader, and there is no client bundle carrying five languages of copy, since
// the server picks one and renders it.
//
// Cached for a day. The content changes when the copy file does, which means a
// deployment, and a deployment clears the cache anyway.
export const revalidate = 86400;

export function generateStaticParams() {
  // A static page with a known, short list of locales — prerender all of them
  // rather than leaving the first reader of each language to wait.
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CvBuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const c = CV_MAKER_COPY[locale as Lang] ?? CV_MAKER_COPY.en;

  // Google reads the FAQ block as structured data when it is marked up, and a
  // question people actually type is worth more as a rich result than as a
  // paragraph. The answers are the same ones on the page — never a separate set.
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6">
        {/* Hero */}
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brassInk">SeaJobs.pro</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{c.h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist">{c.lede}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/seafarer/cv"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
            >
              <FileText size={16} /> {c.ctaPrimary}
            </Link>
            <Link
              href="/jobs"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foam transition hover:bg-white/10"
            >
              {c.ctaSecondary} <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        {/* Steps */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">{c.stepsTitle}</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {c.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-card p-5">
                <span className="font-display text-3xl font-bold text-brassInk">{i + 1}</span>
                <h3 className="mt-2 font-semibold leading-snug text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The long-form sections — this is what the page is indexed on. */}
        {c.sections.map((s) => (
          <section key={s.title} className="mt-12">
            <h2 className="font-display text-2xl font-bold leading-tight text-white">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-[15px] leading-relaxed text-mist">{p}</p>
            ))}
          </section>
        ))}

        {/* What the document contains */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">{c.insideTitle}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mist">{c.insideLede}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {c.inside.map((b) => (
              <div key={b.title} className="rounded-2xl border border-white/10 bg-card p-5">
                <h3 className="flex items-center gap-2 font-semibold text-white">
                  <Check size={16} className="shrink-0 text-teal" /> {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Price */}
        <section className="mt-14 rounded-2xl border border-brass/25 bg-brass/5 p-6">
          <h2 className="font-display text-2xl font-bold text-white">{c.priceTitle}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-mist">{c.priceBody}</p>
          <ul className="mt-5 space-y-3">
            <li className="flex items-start gap-3 text-sm text-foam">
              <span className="mt-0.5 flex gap-1 text-teal"><FileDown size={16} /><ImageIcon size={16} /></span>
              {c.priceFree}
            </li>
            <li className="flex items-start gap-3 text-sm font-semibold text-foam">
              <FileText size={16} className="mt-0.5 shrink-0 text-brassInk" />
              {c.pricePaid}
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-mist">{c.priceNote}</p>
          <Link
            href="/seafarer/cv"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            {c.ctaPrimary} <ArrowRight size={15} />
          </Link>
          <p className="sr-only">{CV_WORD.usd} USD</p>
        </section>

        {/* FAQ — mirrored into the JSON-LD above */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-white">{c.faqTitle}</h2>
          <dl className="mt-5 space-y-4">
            {c.faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-white/10 bg-card p-5">
                <dt className="font-semibold text-white">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-mist">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The line the whole site makes: never pay for a job. A page that sells
            something has to say which side of it that sits on. */}
        <section className="mt-14 rounded-2xl border border-coral/25 bg-coral/5 p-6">
          <h2 className="font-display text-xl font-bold text-white">{c.notTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-mist">{c.notBody}</p>
        </section>

        <section className="mt-14 text-center">
          <h2 className="font-display text-2xl font-bold text-white">{c.closingTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-mist">{c.closingBody}</p>
          <Link
            href="/seafarer/cv"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            <FileText size={16} /> {c.ctaPrimary}
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
