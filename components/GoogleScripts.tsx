"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { CONSENT_KEY } from "@/lib/consent";

// AdSense and Google Analytics, with consent.
//
// Visitors in the EEA, the UK and Switzerland get Google's own consent message
// (AdSense → Privacy & messaging → European regulations). It is a Google-
// certified TCF CMP, which AdSense requires for personalised ads there, and it
// is served by the AdSense tag itself — nothing else to embed. With "consent
// mode" switched on in that message's settings it also tells our Analytics tag
// what the visitor chose.
//
// For that to mean anything, Analytics must start in the "denied" state in
// those regions: Consent Mode v2's default below, pushed before `config`. Until
// the visitor answers, Google records cookieless pings and stores nothing.
// Everywhere else the default is "granted", unless the visitor declined our
// own banner (components/CookieBanner.tsx), which writes CONSENT_KEY.
//
// Neither tag loads on the privacy policy page: Google asks that the page the
// consent message links to carries no consent-requiring scripts, so the
// message never covers the text it points to.

const ADSENSE_CLIENT = "ca-pub-9585615049936117";
const GA_ID = "G-1H5KRW7TS9";

/** Where Google's consent message is shown: the EEA, the UK and Switzerland. */
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
];

const PRIVACY_PAGE = /^\/(?:(?:ru|ua|pl|ro)\/)?privacy\/?$/;

export default function GoogleScripts() {
  const path = usePathname() ?? "";
  if (PRIVACY_PAGE.test(path)) return null;

  return (
    <>
      {/* Ads are not needed for interactivity — load them during idle time so
          they stop adding to Total Blocking Time. The consent message rides on
          this tag, so it appears a moment after the page, not with it. */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          var denied = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
          gtag('consent', 'default', Object.assign({ region: ${JSON.stringify(CONSENT_REGIONS)}, wait_for_update: 500 }, denied));
          try { if (localStorage.getItem('${CONSENT_KEY}') === 'declined') gtag('consent', 'default', denied); } catch (e) {}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
