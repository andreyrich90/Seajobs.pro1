// The HTML chrome every outreach-style email shares: dark header with the
// wordmark, a heading and intro, a list of icon + title + body rows, a brass
// CTA button, and a footer with the contact addresses.
//
// Extracted so the crewing-agency invite (`lib/outreach.ts`) and the
// company-logo reminder (`lib/logoReminder.ts`) cannot drift into two different
// looking emails. Table-based and inline-styled on purpose — that is what mail
// clients render reliably.

/** One `icon, title, body` row in the middle block. */
export type EmailRow = [string, string, string];

export function emailShell(
  lang: string,
  headerSub: string,
  hero: string,
  intro: string,
  rows_: EmailRow[],
  cta: string,
  ctaNote: string,
  footer: string,
  // Optional so existing callers keep their button unchanged. Note the
  // /auth/ prefix: the registration screen lives outside the [locale] tree,
  // and the bare /register this used to point at is not a route at all.
  ctaHref = "https://seajobs.pro/auth/register",
): string {
  const rows = rows_.map(([icon, title, body]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
<td width="44" valign="top" style="font-size:24px;padding-top:2px;">${icon}</td>
<td valign="top"><div style="font-size:15px;font-weight:bold;color:#0d1f33;margin-bottom:2px;">${title}</div>
<div style="font-size:14px;line-height:1.5;color:#3d4b5c;">${body}</div></td>
</tr></table>`).join("");
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(13,31,51,.12);">
<tr><td style="background:#0d1f33;padding:28px 32px;text-align:center;">
<div style="font-size:26px;font-weight:bold;color:#ffffff;letter-spacing:.5px;">Sea<span style="color:#f2b134;">Jobs</span>.pro</div>
<div style="color:#7fd1c8;font-size:13px;margin-top:6px;">${headerSub}</div>
</td></tr>
<tr><td style="padding:32px 32px 8px 32px;">
<h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#0d1f33;">${hero}</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#3d4b5c;">${intro}</p>
</td></tr>
<tr><td style="padding:20px 32px 4px 32px;">${rows}</td></tr>
<tr><td style="padding:24px 32px;text-align:center;">
<a href="${ctaHref}" style="display:inline-block;background:#f2b134;color:#0d1f33;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 40px;border-radius:8px;">${cta}</a>
<p style="margin:12px 0 0 0;font-size:12px;color:#8a97a5;">${ctaNote}</p>
</td></tr>
<tr><td style="background:#0d1f33;padding:20px 32px;text-align:center;">
<p style="margin:0;font-size:13px;color:#aebccb;line-height:1.6;">${footer}<br>
<a href="mailto:partners@seajobs.pro" style="color:#7fd1c8;text-decoration:none;">partners@seajobs.pro</a> &nbsp;•&nbsp;
<a href="https://seajobs.pro" style="color:#7fd1c8;text-decoration:none;">seajobs.pro</a></p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}
