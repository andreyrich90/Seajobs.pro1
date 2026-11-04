// Where a subscription checkout started: `seafarer_subscriptions.source`, the
// path the subscription screen was opened from (its ?back=). Read by
// /admin/subscriptions and by the payment notice in Telegram, so both name
// the place the same way.

const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export type SubSource =
  | { kind: "vacancy"; id: string; path: string }
  | { kind: "cv"; path: string }
  | { kind: "page"; path: string };

/** What kind of place a stored source path is; null when there is none. */
export function parseSubSource(path: string | null | undefined): SubSource | null {
  if (!path) return null;
  const bare = path.replace(/^\/(ru|ua|pl|ro|en)(?=\/)/, "");
  if (bare.startsWith("/jobs/")) {
    const id = bare.match(UUID)?.[0];
    if (id) return { kind: "vacancy", id: id.toLowerCase(), path };
  }
  if (bare.startsWith("/seafarer/cv")) return { kind: "cv", path };
  return { kind: "page", path };
}
