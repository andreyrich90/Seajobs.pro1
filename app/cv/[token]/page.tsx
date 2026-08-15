import type { Metadata } from "next";
import { getServerSupabase } from "@/lib/supabase/admin";
import { buildCvHtml } from "@/lib/cvHtml";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The CV a seafarer links to from a letter they send themselves.
//
// Deliberately outside [locale]: the reader is a crewing manager arriving from
// an email, not a site visitor with a language preference, and the CV itself is
// English. Deliberately noindex too — a page holding a passport number and
// visas has no business in a search index, token or no token.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

const shell = (title: string, body: string) => (
  <main
    style={{
      minHeight: "100vh",
      background: "#0a1f33",
      color: "#e4edf1",
      fontFamily: "Arial, Helvetica, sans-serif",
      display: "grid",
      placeItems: "center",
      padding: "40px 20px",
    }}
  >
    <div style={{ maxWidth: 460, textAlign: "center" }}>
      <h1 style={{ fontSize: 22, margin: "0 0 10px" }}>{title}</h1>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: "#99aebe", margin: 0 }}>{body}</p>
      <p style={{ marginTop: 26 }}>
        <a
          href="https://seajobs.pro"
          style={{ color: "#e3c04a", fontWeight: "bold", textDecoration: "none", fontSize: 14 }}
        >
          SeaJobs.pro — maritime vacancies →
        </a>
      </p>
    </div>
  </main>
);

export default async function SharedCvPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const admin = getServerSupabase();

  const { data: link } = await admin
    .from("cv_share_tokens")
    .select("seafarer_id, expires_at, revoked_at, opened_count")
    .eq("token", token)
    .maybeSingle();

  // One message for all three failures on purpose. Telling a stranger which
  // tokens once existed, and when they died, is information they cannot use for
  // anything good.
  if (!link || link.revoked_at || new Date(link.expires_at as string) < new Date()) {
    return shell(
      "This link is no longer available",
      "CV links expire after 30 days and can be withdrawn by the seafarer at any time. Ask them for a fresh one.",
    );
  }

  const { data: { user } } = await admin.auth.admin.getUserById(link.seafarer_id as string);
  const cv = await buildCvHtml(admin, link.seafarer_id as string, user?.email ?? null);

  // Best-effort: the seafarer never learns whether their letter was sent, so
  // "the agency opened the CV" is the only signal this flow can give them back.
  await admin
    .from("cv_share_tokens")
    .update({ opened_at: new Date().toISOString(), opened_count: (link.opened_count as number) + 1 })
    .eq("token", token);

  return (
    <main style={{ background: "#f4f6f8", minHeight: "100vh", padding: "24px 16px" }}>
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 14,
          padding: "8px 24px 28px",
          boxShadow: "0 10px 40px -12px rgba(10,31,51,.35)",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: cv.html }} />
        <hr style={{ margin: "26px 0 14px", border: "none", borderTop: "1px solid #e3e8ee" }} />
        <p style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 12, color: "#8a949e", margin: 0 }}>
          Shared via{" "}
          <a href="https://seajobs.pro" style={{ color: "#8a949e" }}>
            SeaJobs.pro
          </a>{" "}
          — maritime vacancies from verified crewing agencies. This link expires 30 days after it was created.
        </p>
      </div>
    </main>
  );
}
