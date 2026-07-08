import type { Metadata } from "next";

// Custom 404. Renders inside the root layout (navy background, fonts). Shown
// for any unmatched URL — most often an old, since-deleted vacancy link from
// Google's index or a bot probing random paths. Keeps the visitor on-site with
// clear links instead of a dead end. noindex so the 404 itself never ranks.
export const metadata: Metadata = {
  title: "Page not found — SeaJobs.pro",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-7xl font-bold text-brass2">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-foam">
        This page could not be found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
        The vacancy may have been filled or removed. Browse current openings instead.
        <br />
        Вакансия могла быть закрыта или удалена. Посмотрите актуальные вакансии.
        <br />
        Вакансія могла бути закрита або видалена. Перегляньте актуальні вакансії.
        <br />
        Oferta mogła zostać zamknięta lub usunięta. Zobacz aktualne oferty.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/jobs"
          className="rounded-xl bg-gradient-to-br from-brass to-brass2 px-6 py-3 text-sm font-semibold text-deep transition hover:-translate-y-0.5"
        >
          Browse jobs / Вакансии
        </a>
        <a
          href="/"
          className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-foam transition hover:bg-white/10"
        >
          Home / Главная
        </a>
      </div>
    </main>
  );
}
