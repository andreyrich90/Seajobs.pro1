"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang, useT } from "./DictProvider";
import { href } from "@/lib/nav";

const KEY = "recepto-cookie";

// A lightweight cookie-consent notice (required copy for AdSense/GDPR-style
// disclosure). Stored client-side so it shows once; no data leaves the browser.
export default function CookieBanner() {
  const t = useT();
  const lang = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* localStorage unavailable — just don't show */
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 rounded-xl2 border border-line bg-surface p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink/80">
          {t("cookie.text")}{" "}
          <Link href={href(lang, "/privacy")} className="font-semibold text-clay hover:underline">
            {t("cookie.more")}
          </Link>
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-full bg-clay px-5 py-2 text-sm font-bold text-white transition hover:bg-clay2"
        >
          {t("cookie.accept")}
        </button>
      </div>
    </div>
  );
}
