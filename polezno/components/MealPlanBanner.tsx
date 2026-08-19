"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { href } from "@/lib/nav";

export default function MealPlanBanner() {
  const t = useT();
  const lang = useLang();

  const features = [t("home.plan.f1"), t("home.plan.f2"), t("home.plan.f3")];
  const week: [string, string][] = [
    [t("day.mon"), "1 680"],
    [t("day.tue"), "1 720"],
    [t("day.wed"), "1 650"],
    [t("day.thu"), "1 700"],
    [t("day.fri"), "1 690"],
  ];

  return (
    <section className="mx-auto max-w-content px-5 py-14 sm:px-8">
      <div className="grid items-center gap-10 rounded-[2rem] border border-line bg-cream2 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-wide text-clay">
            {t("home.plan.eyebrow")}
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-basil">
            {t("home.plan.title")}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{t("home.plan.body")}</p>

          <div className="mt-6 flex flex-col gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-leaf text-white">
                  <Check size={13} strokeWidth={3} />
                </span>
                {f}
              </div>
            ))}
          </div>

          <Link
            href={href(lang, "/pp")}
            className="mt-7 inline-block rounded-full bg-clay px-6 py-3.5 font-bold text-white shadow-soft transition hover:bg-clay2"
          >
            {t("home.plan.cta")}
          </Link>
        </div>

        <div className="rounded-2xl bg-basil p-7 text-cream shadow-soft">
          <div className="mb-3 text-xs font-bold uppercase tracking-wider text-honey">
            {t("home.plan.week")}
          </div>
          {week.map(([day, kcal], i) => (
            <div
              key={day}
              className={`flex items-center justify-between py-3 text-[14.5px] ${
                i < week.length - 1 ? "border-b border-dashed border-cream/20" : ""
              }`}
            >
              <span>{day}</span>
              <b className="font-bold text-honey">
                {kcal} {t("recipe.kcal")}
              </b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
