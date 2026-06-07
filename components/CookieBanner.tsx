"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const GA_ID = "G-1H5KRW7TS9";
const CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setAccepted(true);
    } else if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setAccepted(true);
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  }

  return (
    <>
      {/* Load GA only after consent */}
      {accepted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Banner */}
      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-deep/95 backdrop-blur-md px-5 py-4">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="flex-1 text-sm text-mist leading-relaxed">
              We use cookies for authentication and{" "}
              <span className="text-foam">Google Analytics</span> to improve the site.
              By clicking "Accept" you consent to analytics cookies.{" "}
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
                className="rounded-lg bg-brass px-5 py-2 text-sm font-semibold text-deep transition hover:bg-brass2"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
