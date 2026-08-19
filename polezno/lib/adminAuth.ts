// Simple shared-password gate for the admin API routes. The password lives in
// the ADMIN_PASSWORD env var (server-only) and is sent by the admin UI as a
// Bearer token. If ADMIN_PASSWORD is unset, every admin route is denied.
export function requireAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const header = req.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  // length-guarded equality (avoids leaking length via early return only)
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export const IMAGE_BUCKET = "recipe-images";
