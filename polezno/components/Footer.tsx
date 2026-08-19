"use client";

import Link from "next/link";
import { useLang, useT } from "./DictProvider";
import { href } from "@/lib/nav";

export default function Footer() {
  const t = useT();
  const lang = useLang();
  const year = new Date().getFullYear();

  const sections = [
    { path: "/recipes", label: t("nav.recipes") },
    { path: "/pp", label: t("nav.pp") },
    { path: "/collections", label: t("nav.collections") },
    { path: "/lifehacks", label: t("nav.lifehacks") },
    { path: "/about", label: t("nav.about") },
  ];

  return (
    <footer className="mt-16 bg-ink text-cream/80">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative h-8 w-8 rounded-full logo-ring">
                <span className="absolute inset-[5px] rounded-full bg-ink" />
              </span>
              <span className="font-display text-xl font-bold text-cream">
                {t("brand")}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
              {t("footer.about")}
            </p>
          </div>

          <FootCol title={t("footer.col.sections")}>
            {sections.map((s) => (
              <Link key={s.path} href={href(lang, s.path)} className="footlink">
                {s.label}
              </Link>
            ))}
          </FootCol>

          <FootCol title={t("footer.col.about")}>
            <Link href={href(lang, "/about")} className="footlink">
              {t("footer.link.about")}
            </Link>
            <Link href={href(lang, "/about")} className="footlink">
              {t("footer.link.contacts")}
            </Link>
            <Link href={href(lang, "/about")} className="footlink">
              {t("footer.link.partners")}
            </Link>
          </FootCol>

          <FootCol title={t("footer.col.social")}>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="footlink">
              Telegram
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footlink">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footlink">
              YouTube
            </a>
          </FootCol>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/45 sm:flex-row sm:justify-between">
          <span>© {year} {t("brand")}. {t("footer.rights")}</span>
          <span>{t("footer.made")}</span>
        </div>
      </div>

      <style>{`.footlink{display:block;font-size:14px;margin-bottom:11px;color:rgb(var(--c-cream)/0.72);transition:color .2s}.footlink:hover{color:rgb(var(--c-cream))}`}</style>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-honey">
        {title}
      </h5>
      {children}
    </div>
  );
}
