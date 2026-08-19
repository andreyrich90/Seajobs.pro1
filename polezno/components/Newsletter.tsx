"use client";

import { useState } from "react";
import { useT } from "./DictProvider";

// Newsletter capture. Front-end only for now (no backend wired) — submitting
// shows a thank-you; hook it to Resend / a `subscribers` table later.
export default function Newsletter() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section className="mx-auto max-w-content px-5 py-20 text-center sm:px-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-wide text-clay">
        {t("home.news.eyebrow")}
      </span>
      <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-basil sm:text-[38px]">
        {t("home.news.title")}
      </h2>

      {done ? (
        <p className="mx-auto mt-6 text-lg font-semibold text-leaf">{t("home.news.done")}</p>
      ) : (
        <form
          onSubmit={submit}
          className="mx-auto mt-8 flex max-w-md gap-2 rounded-full border border-line bg-surface p-1.5"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("home.news.placeholder")}
            className="flex-1 rounded-full bg-transparent px-5 py-3 text-[15px] text-ink outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-clay px-6 py-3 font-bold text-white transition hover:bg-clay2"
          >
            {t("home.news.button")}
          </button>
        </form>
      )}
    </section>
  );
}
