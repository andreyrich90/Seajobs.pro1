"use client";

import Link from "next/link";
import { Salad } from "lucide-react";
import { useLang, useT } from "./DictProvider";
import { href } from "@/lib/nav";

export default function Footer() {
  const t = useT();
  const lang = useLang();
  const year = new Date().getFullYear();

  const links = [
    { path: "/recipes", label: t("nav.recipes") },
    { path: "/pp", label: t("nav.pp") },
    { path: "/lifehacks", label: t("nav.lifehacks") },
    { path: "/about", label: t("nav.about") },
  ];

  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-basil text-white">
              <Salad size={17} />
            </span>
            <span className="font-display text-base font-bold text-ink">
              {t("brand")}
            </span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-muted">{t("brand.tagline")}</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted">
          {links.map((l) => (
            <Link key={l.path} href={href(lang, l.path)} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted sm:flex-row sm:justify-between">
          <span>
            © {year} {t("brand")}. {t("footer.rights")}
          </span>
          <span>{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}
