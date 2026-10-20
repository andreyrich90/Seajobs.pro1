// Where the visitor's answer to our cookie banner is kept (components/
// CookieBanner.tsx writes it, components/GoogleScripts.tsx reads it on every
// page load).
//
// The key is versioned. Until 17 October 2026 the banner's Decline did
// nothing — Analytics counted everyone — so a "declined" stored under the old
// key was never a refusal anyone acted on. When Decline started to work, those
// visitors silently dropped out of Analytics without ever having seen a banner
// that meant it. They are asked once more instead; an old "accepted" carries
// over, since asking for it again would gain nothing.

export const CONSENT_KEY = "cookie_consent_v2";
export const LEGACY_CONSENT_KEY = "cookie_consent";
