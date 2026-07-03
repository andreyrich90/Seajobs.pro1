import type { Metadata } from "next";

// Seafarer profiles are personal CVs (shared with companies, not the public web).
// They are thin, near-duplicate pages that add no search value and raise privacy
// concerns, so we keep them out of the index. This also clears Google Search
// Console's "Duplicate without user-selected canonical" reports for these URLs.
export const metadata: Metadata = {
  title: "Seafarer profile | SeaJobs.pro",
  robots: { index: false, follow: true },
};

export default function SeafarerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
