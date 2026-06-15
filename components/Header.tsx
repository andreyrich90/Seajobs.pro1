"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Anchor, Globe, ChevronDown, LogIn, Briefcase, MessageSquare,
  Newspaper, LayoutDashboard, Menu, X, ShieldCheck,
} from "lucide-react";
import { LANGS, T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { supabase } from "@/lib/supabase/client";

export default function Header() {
  const { lang, setLang } = useLang();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardHref, setDashboardHref] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const t = T[lang];
  const current = LANGS.find((l) => l.code === lang)!;

  const nav = [
    { label: t.nav_jobs,  icon: Briefcase,     href: "/jobs" },
    { label: t.nav_forum, icon: MessageSquare, href: "/forum" },
    { label: t.nav_news,  icon: Newspaper,     href: "/news" },
  ];

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    async function applySession(session: import("@supabase/supabase-js").Session | null) {
      if (!session) { setDashboardHref(null); setIsAdmin(false); return; }
      const role = typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
      setDashboardHref(role === "company" ? "/company/dashboard" : "/seafarer/dashboard");
      const { data: profile } = await supabase
        .from("profiles").select("is_admin").eq("id", session.user.id).single();
      setIsAdmin(!!profile?.is_admin);
    }
    supabase.auth.getSession().then(({ data: { session } }) => applySession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      applySession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const authButton = dashboardHref ? (
    <NextLink
      href={dashboardHref}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-3 py-2 text-sm font-bold text-deep transition hover:-translate-y-0.5 md:px-4 md:py-2.5"
    >
      <LayoutDashboard size={16} />
      <span className="hidden lg:inline">Cabinet</span>
    </NextLink>
  ) : (
    <NextLink
      href="/auth/login"
      className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-3 py-2 text-sm font-bold text-deep transition hover:-translate-y-0.5 md:px-4 md:py-2.5"
    >
      <LogIn size={16} />
      <span className="hidden lg:inline">{t.login}</span>
    </NextLink>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 md:gap-3 md:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg md:h-10 md:w-10">
            <Anchor size={20} className="text-deep" strokeWidth={2.4} />
          </div>
          <span className="font-display text-xl font-bold text-white md:text-2xl">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
        </Link>

        {/* Nav — desktop only */}
        <nav className="ml-4 hidden gap-5 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}
              className="flex items-center gap-1.5 text-sm font-semibold text-foam transition hover:text-brass2">
              <n.icon size={16} /> {n.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen((o) => !o); setMobileOpen(false); }}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:px-3"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{current.label}</span>
              <span className="sm:hidden">{current.flag}</span>
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-12 z-50 min-w-[140px] rounded-xl border border-white/10 bg-navy2 p-1.5 shadow-2xl">
                {LANGS.map((l) => (
                  <div key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/5 ${
                      lang === l.code ? "bg-brass/15" : ""
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span> {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin button — md+ only */}
          {isAdmin && (
            <div className="hidden md:block">
              <NextLink
                href="/admin/dashboard"
                className="flex items-center gap-1.5 rounded-lg border border-brass/30 bg-brass/10 px-3 py-2 text-sm font-bold text-brass2 transition hover:bg-brass/20"
              >
                <ShieldCheck size={15} />
                <span className="hidden lg:inline">Admin</span>
              </NextLink>
            </div>
          )}

          {/* Auth button — md+ only */}
          <div className="hidden md:block">{authButton}</div>

          {/* Mobile burger */}
          <button
            onClick={() => { setMobileOpen((o) => !o); setLangOpen(false); }}
            className="rounded-lg bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-deep/95 backdrop-blur-md px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2">
                <n.icon size={18} /> {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
            {isAdmin && (
              <NextLink
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-xl border border-brass/30 bg-brass/10 px-3 py-3 text-sm font-bold text-brass2 transition hover:bg-brass/20"
              >
                <ShieldCheck size={18} /> Admin Panel
              </NextLink>
            )}
            {dashboardHref ? (
              <NextLink
                href={dashboardHref}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
              >
                <LayoutDashboard size={16} /> Cabinet
              </NextLink>
            ) : (
              <NextLink
                href="/auth/login"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-deep transition hover:-translate-y-0.5"
              >
                <LogIn size={16} /> {t.login}
              </NextLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
