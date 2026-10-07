import { FileText, FileDown, Image as ImageIcon, Check, ArrowRight, ShieldAlert, Anchor } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FLEET_IDS, type FleetId } from "@/lib/cvFleets";
import type { MaritimeCvCopy } from "@/lib/maritimeCv";
import type { FleetPagesCopy } from "@/lib/maritimeCvFleets";
import Uploader from "./Uploader";

// The body of /maritime-cv and of each /maritime-cv/[fleet] page. A fleet page
// swaps the head — title, lede — and adds what its Word template puts at the
// top; everything below is the same page, so the two cannot drift apart.
export default function MaritimeCvView({
  c, locale, fleet = null, fleets,
}: {
  c: MaritimeCvCopy;
  locale: string;
  fleet?: FleetId | null;
  fleets: FleetPagesCopy;
}) {
  const fp = fleet ? fleets.pages[fleet] : null;
  const fleetName = (id: FleetId) => c.fleets[FLEET_IDS.indexOf(id)]?.name ?? id;

  // The FAQ as structured data, on the main page only: the same questions on
  // six URLs would be six competing rich results for one answer.
  const faqLd = fleet ? null : {
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
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <Header />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6">
        {/* Hero — the upload box is part of it, not something to scroll to */}
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brassInk">{c.eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{fp?.h1 ?? c.h1}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-mist">{fp?.lede ?? c.lede}</p>
        </header>
        <Uploader copy={c.upload} locale={locale} fleet={fleet} />

        {/* A fleet page says exactly what its template puts first */}
        {fleet && fp && (
          <section className="mt-12 rounded-2xl border border-teal/30 bg-teal/5 p-6">
            <h2 className="font-display text-xl font-bold text-white">{fleets.topTitle.replace("{fleet}", fleetName(fleet))}</h2>
            <ul className="mt-4 space-y-2.5">
              {fp.top.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm leading-relaxed text-foam">
                  <Check size={16} className="mt-0.5 shrink-0 text-teal" /> {line}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Steps — a real sequence, so numbered */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white">{c.stepsTitle}</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-3">
            {c.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-card p-5">
                <span className="font-display text-2xl font-bold text-brassInk">{i + 1}</span>
                <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* What each fleet is hired on */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-white">{c.fleetsTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{c.fleetsLede}</p>
          {fleet && (
            <p className="mt-2 text-sm">
              <Link href="/maritime-cv" className="text-brassInk underline hover:text-brass">{fleets.allFleets}</Link>
            </p>
          )}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {c.fleets.map((f, i) => {
              const id = FLEET_IDS[i];
              const here = id === fleet;
              return (
                <Link
                  key={f.name}
                  href={`/maritime-cv/${id}`}
                  aria-current={here ? "page" : undefined}
                  className={`group flex gap-3 rounded-2xl border p-5 transition ${
                    here ? "border-brass/50 bg-brass/10" : "border-white/10 bg-card hover:border-brass/40"
                  }`}
                >
                  <Anchor size={18} className="mt-0.5 shrink-0 text-teal" />
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-1.5 font-semibold text-white">
                      {f.name} {!here && <ArrowRight size={14} className="text-brassInk opacity-60 transition group-hover:opacity-100" />}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist">{f.body}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Price */}
        <section className="mt-16 rounded-2xl border border-brass/30 bg-card p-6">
          <h2 className="font-display text-2xl font-bold text-white">{c.priceTitle}</h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3 text-sm text-foam">
              <span className="mt-0.5 flex gap-1 text-teal"><FileDown size={16} /><ImageIcon size={16} /></span>
              {c.priceFree}
            </li>
            <li className="flex items-start gap-3 text-sm font-semibold text-foam">
              <FileText size={16} className="mt-0.5 shrink-0 text-brassInk" />
              {c.pricePaid}
            </li>
          </ul>
          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-mist">
            <Check size={16} className="mt-0.5 shrink-0 text-teal" /> {c.priceNote}
          </p>
        </section>

        {/* Which side of the "never pay for a job" line this page is on —
            the site says that everywhere, so a paid page has to say it too. */}
        <section className="mt-8 flex gap-3 rounded-2xl border border-coral/30 bg-coral/5 p-5">
          <ShieldAlert size={20} className="mt-0.5 shrink-0 text-coral" />
          <div>
            <h2 className="font-semibold text-white">{c.notTitle}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{c.notBody}</p>
          </div>
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

        {/* Closing */}
        <section className="mt-14 text-center">
          <h2 className="font-display text-2xl font-bold text-white">{c.closingTitle}</h2>
          <a
            href="#upload"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
          >
            <FileText size={16} /> {c.closingCta}
          </a>
          <p className="mt-5">
            <Link href="/cv-builder" className="inline-flex items-center gap-1.5 text-sm text-brassInk underline hover:text-brass">
              {c.articleLink} <ArrowRight size={14} />
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
