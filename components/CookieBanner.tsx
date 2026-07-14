"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-deep/95 backdrop-blur-md px-5 py-4">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-mist leading-relaxed">
          We use cookies for authentication and{" "}
          <span className="text-foam">Google Analytics</span> to improve the site.{" "}
          <Link href="/privacy" className="text-brass2 underline underline-offset-2 hover:text-brass transition">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-mist transition hover:border-white/30 hover:text-white"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-brass px-5 py-2 text-sm font-semibold text-[#061523] transition hover:bg-brass2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
