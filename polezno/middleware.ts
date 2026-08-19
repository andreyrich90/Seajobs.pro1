import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LANG, LOCALES } from "@/lib/langs";

// Everything lives under /[locale]. Any path without a known locale prefix is
// redirected to the default language. Assets and _next are excluded by the
// matcher below.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
