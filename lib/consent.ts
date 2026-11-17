// Consent to the processing of personal data.
//
// Every account confirms the boxes for its role once per CONSENT_VERSION;
// api/consent writes each confirmation to `user_consents` (who, what, which
// version, when, IP, language, where). Moving the version asks everyone again
// — do it when the Privacy Policy or the Terms change in substance, and move
// the date on those pages with it.
//
// The registration form cannot write the row itself: with e-mail confirmation
// switched on there is no session yet, and a Google sign-up leaves the page.
// So the ticked boxes wait in localStorage (`pending_consent`) and the banner
// in the cabinet sends them as soon as there is a session — the same round
// trip lib/referral.ts makes for a referral code. A box ticked on one device
// and an e-mail confirmed on another simply means the banner asks once more.

export const CONSENT_VERSION = "2026-11-17";

// Fired on window when a banner records the consent, so the other banner on
// the page and the notification bell drop theirs at once.
export const CONSENT_CONFIRMED_EVENT = "seajobs:consent-confirmed";

// The bell notification asking for consent (20261117010000_consent_notifications.sql);
// api/consent deletes it once the boxes are confirmed.
export const CONSENT_NOTIFICATION_TYPE = "consent_required";

export type ConsentKind = "privacy" | "profile_sharing" | "candidate_data";
export type ConsentRole = "seafarer" | "company";

export const CONSENT_KINDS: Record<ConsentRole, ConsentKind[]> = {
  seafarer: ["privacy", "profile_sharing"],
  company: ["privacy", "candidate_data"],
};

export function isConsentRole(r: unknown): r is ConsentRole {
  return r === "seafarer" || r === "company";
}

const PENDING_KEY = "pending_consent";
const PENDING_TTL_MS = 7 * 24 * 3600 * 1000;

type Pending = { role: ConsentRole; kinds: ConsentKind[]; version: string; at: number };

export function savePendingConsent(role: ConsentRole, kinds: ConsentKind[]) {
  try {
    const p: Pending = { role, kinds, version: CONSENT_VERSION, at: Date.now() };
    localStorage.setItem(PENDING_KEY, JSON.stringify(p));
  } catch { /* storage blocked: the banner will ask instead */ }
}

export function readPendingConsent(): Pending | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Pending;
    if (p.version !== CONSENT_VERSION || Date.now() - p.at > PENDING_TTL_MS || !Array.isArray(p.kinds)) {
      localStorage.removeItem(PENDING_KEY);
      return null;
    }
    return p;
  } catch {
    return null;
  }
}

export function clearPendingConsent() {
  try { localStorage.removeItem(PENDING_KEY); } catch { /* storage blocked */ }
}
