// What a crewing manager hiring for a given fleet looks for first in a CV,
// and how to find it in the seafarer's own data.
//
// Used by the Word export (lib/cvDocx.ts), which puts a "Key qualifications"
// block at the top for the chosen fleet, and by the CV page, which previews
// that block before anyone pays for it. One module for both, so the preview
// cannot promise something the file does not contain.
//
// Nothing here invents a fact. The block lists certificates the seafarer
// actually holds and sea time they actually served, picked out by name; when
// nothing matches, the block is left out rather than shown empty.
//
// Pure: no database, no React — safe to import on either side.

export const FLEET_IDS = ["merchant", "offshore", "tanker", "passenger", "tug"] as const;
export type FleetId = (typeof FLEET_IDS)[number];

export function isFleetId(v: unknown): v is FleetId {
  return typeof v === "string" && (FLEET_IDS as readonly string[]).includes(v);
}

type FleetRule = {
  /** How the fleet is named in the CV, which is in English like the rest of it. */
  label: string;
  /** Certificates that belong at the top for this fleet. */
  certs: RegExp;
  /** Vessel types that count as this fleet's sea time. */
  vessels: RegExp;
  /**
   * Certificates before identity documents. Where endorsements decide the
   * hire — tankers, offshore, passenger — they are what is read first.
   */
  certsFirst: boolean;
};

export const FLEETS: Record<FleetId, FleetRule> = {
  merchant: {
    label: "Merchant fleet",
    certs: /\b(GMDSS|ECDIS|ARPA|radar|BRM|BTM|ERM|bridge (resource|team)|engine.?room resource|ship security|SSO|high.?voltage|advanced fire|medical care|leadership)\b/i,
    vessels: /\b(bulk|container|general cargo|reefer|car carrier|pctc|ro-?ro\b(?!-?pax)|mpp|multi.?purpose|heavy.?lift|cement|timber|coaster|feeder|vehicle|log)\w*/i,
    certsFirst: false,
  },
  offshore: {
    label: "Offshore",
    certs: /\b(DP|dynamic positioning|BOSIET|FOET|HUET|CA-?EBS|OPITO|OGUK|GWO|offshore|helideck|anchor handling|crane operator|rigging|banksman)\b/i,
    vessels: /\b(AHTS|PSV|OSV|SOV|DSV|CSV|FPSO|FSO|jack-?up|platform|multicat|crew boat|CTV|supply|anchor handl|walk.?to.?work|rig|ERRV|standby)\w*/i,
    certsFirst: true,
  },
  tanker: {
    label: "Tankers & gas carriers",
    certs: /\b(tanker|oil|chemical|gas|LNG|LPG|IGF|cargo (operations|handling)|inert gas|COW|crude|petroleum)\w*/i,
    vessels: /\b(tanker|LNG|LPG|gas|chemical|product|crude|bitumen|asphalt|oil|bunker|FSRU|VLCC|aframax|suezmax)\w*/i,
    certsFirst: true,
  },
  passenger: {
    label: "Cruise & passenger",
    // Not Security Awareness: every seafarer holds it, so it would say nothing.
    certs: /\b(crowd|passenger|ro-?pax|crisis management|human behaviou?r|pax|food (safety|hygiene))\w*/i,
    vessels: /\b(cruise|ferry|ro-?pax|passenger|yacht|expedition|river cruise|catamaran)\w*/i,
    certsFirst: true,
  },
  tug: {
    label: "Tugs & dredging",
    certs: /\b(tow|tug|dredg|crane|rigging|winch|mooring)\w*/i,
    vessels: /\b(tug|towing|dredg|hopper|workboat|work boat|multicat|pusher|barge|pilot)\w*/i,
    certsFirst: false,
  },
};

type Cert = { name: string | null; expiry_date?: string | null; issuing_authority?: string | null };
type Voyage = { vessel_type: string | null; from_date: string | null; to_date: string | null };

export type FleetHighlights = {
  fleet: FleetId;
  label: string;
  /** The seafarer's own certificates that matter most for this fleet. */
  certs: Cert[];
  /** Months served on this fleet's vessel types, across the voyages given. */
  months: number;
  /** Those vessel types as written in the profile, deduplicated. */
  vesselTypes: string[];
  /** Nothing matched: the block should not be shown at all. */
  empty: boolean;
};

function monthsBetween(from: string, to: string | null): number {
  const a = new Date(from).getTime();
  const b = to ? new Date(to).getTime() : Date.now();
  if (Number.isNaN(a) || Number.isNaN(b) || b < a) return 0;
  // Calendar months as a seafarer counts them: 1 Jul – 1 Aug is one month.
  return Math.max(0, Math.round((b - a) / (30.44 * 24 * 3600 * 1000)));
}

/** "3y 2mo", "11 mo", "2 yrs". */
export function formatSeaTime(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (!y) return `${m} mo`;
  if (!m) return `${y} ${y === 1 ? "yr" : "yrs"}`;
  return `${y}y ${m}mo`;
}

export function fleetHighlights(fleet: FleetId, certs: Cert[], voyages: Voyage[]): FleetHighlights {
  const rule = FLEETS[fleet];
  const matchedCerts = certs.filter((c) => c.name && rule.certs.test(c.name));
  const matchedVoyages = voyages.filter((v) => v.vessel_type && rule.vessels.test(v.vessel_type));
  const months = matchedVoyages.reduce((n, v) => n + (v.from_date ? monthsBetween(v.from_date, v.to_date) : 0), 0);
  const vesselTypes = [...new Set(matchedVoyages.map((v) => (v.vessel_type as string).trim()))];
  return {
    fleet,
    label: rule.label,
    certs: matchedCerts,
    months,
    vesselTypes,
    empty: matchedCerts.length === 0 && months === 0,
  };
}

/** Is this voyage on one of the fleet's vessel types? Used to bold it in the sea-service table. */
export function isFleetVoyage(fleet: FleetId, vesselType: string | null): boolean {
  return !!vesselType && FLEETS[fleet].vessels.test(vesselType);
}
