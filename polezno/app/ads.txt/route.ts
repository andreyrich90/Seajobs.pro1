// ads.txt — declares Google AdSense as an authorised seller of this site's
// inventory. AdSense reads it during and after approval. The publisher id
// comes from NEXT_PUBLIC_ADSENSE_ID (e.g. "ca-pub-1234567890123456"); ads.txt
// wants it without the "ca-" prefix, so we strip it.
export const dynamic = "force-dynamic";

export function GET() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_ID || "";
  const pub = raw.replace(/^ca-/, "").trim();

  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Set NEXT_PUBLIC_ADSENSE_ID to publish your ads.txt line.\n";

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
