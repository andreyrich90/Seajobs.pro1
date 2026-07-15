"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Anchor, Globe, ChevronDown, ChevronRight, LogIn, Briefcase, MessageSquare,
  Newspaper, LayoutDashboard, Menu, X, ShieldCheck, UserPlus, Sun, Moon,
  Ship, Wind, Sailboat, Waves, Fish, BookOpen,
} from "lucide-react";
import { LANGS, T } from "@/lib/i18n";
import { GUIDES_UI } from "@/lib/guidesUi";
import { useLang } from "@/components/LangProvider";
import { useTheme } from "@/components/ThemeProvider";
import { FLEETS, fleetLabel, type FleetKey } from "@/lib/fleets";
import { supabase } from "@/lib/supabase/client";
import NotificationBell from "@/components/NotificationBell";

// Header-only copy that isn't part of the main T map (tagline + fleet menu).
const HDR: Record<string, { tagline: string; fleetTitle: string; allJobs: string }> = {
  en: { tagline: "Maritime jobs from crewing agencies across Europe", fleetTitle: "By fleet type", allJobs: "All vacancies" },
  ru: { tagline: "Морская работа от крюингов по всей Европе", fleetTitle: "По типу флота", allJobs: "Все вакансии" },
  ua: { tagline: "Морська робота від крюїнгів по всій Європі", fleetTitle: "За типом флоту", allJobs: "Усі вакансії" },
  pl: { tagline: "Praca na morzu od agencji crewingowych w całej Europie", fleetTitle: "Według typu floty", allJobs: "Wszystkie oferty" },
  ro: { tagline: "Joburi maritime de la agenții de crewing din toată Europa", fleetTitle: "După tipul flotei", allJobs: "Toate posturile" },
};

const FLEET_ICON: Record<FleetKey, typeof Ship> = {
  merchant: Ship, offshore: Wind, passenger: Sailboat, workboats: Waves, fishing: Fish,
};

const FLEET_DESC: Record<FleetKey, Record<string, string>> = {
  merchant: { en: "Tankers · bulkers · container ships", ru: "Танкеры · балкеры · контейнеровозы", ua: "Танкери · балкери · контейнеровози", pl: "Tankowce · masowce · kontenerowce", ro: "Tancuri · vrachiere · portcontainere" },
  offshore: { en: "AHTS · PSV · wind farms", ru: "AHTS · PSV · ветряные фермы", ua: "AHTS · PSV · вітрові ферми", pl: "AHTS · PSV · farmy wiatrowe", ro: "AHTS · PSV · parcuri eoliene" },
  passenger: { en: "Cruise liners · ferries · RoPax", ru: "Лайнеры · паромы · RoPax", ua: "Лайнери · пороми · RoPax", pl: "Wycieczkowce · promy · RoPax", ro: "Nave de croazieră · feriboturi · RoPax" },
  workboats: { en: "Tugs · dredgers · barges", ru: "Буксиры · дноуглубление · баржи", ua: "Буксири · днопоглиблення · баржі", pl: "Holowniki · pogłębiarki · barki", ro: "Remorchere · drage · barje" },
  fishing: { en: "Trawlers · seiners", ru: "Траулеры · сейнеры", ua: "Траулери · сейнери", pl: "Trawlery · sejnery", ro: "Traulere · seinere" },
};

export default function Header() {
  const { lang, setLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardHref, setDashboardHref] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const t = T[lang];
  const hdr = HDR[lang] ?? HDR.en;
  const current = LANGS.find((l) => l.code === lang)!;
  const fleetDesc = (k: FleetKey) => FLEET_DESC[k][lang] ?? FLEET_DESC[k].en;

  const nav = [
    { label: t.nav_forum, icon: MessageSquare, href: "/forum" },
    { label: t.nav_news,  icon: Newspaper,     href: "/news" },
    { label: (GUIDES_UI[lang] ?? GUIDES_UI.en).nav, icon: BookOpen, href: "/guides" },
  ];

  useEffect(() => { setMobileOpen(false); setLangOpen(false); setFleetOpen(false); }, [pathname]);

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

  const themeBtn = (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex items-center rounded-lg p-2 text-foam transition hover:bg-white/10"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );

  const authButton = dashboardHref ? (
    <Link
      href={dashboardHref}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-3 py-2 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 md:px-4 md:py-2.5"
    >
      <LayoutDashboard size={16} />
      <span className="hidden lg:inline">Cabinet</span>
    </Link>
  ) : (
    <NextLink
      href="/auth/login"
      className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-3 py-2 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5 md:px-4 md:py-2.5"
    >
      <LogIn size={16} />
      <span className="hidden lg:inline">{t.login}</span>
    </NextLink>
  );

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/15 bg-deep/70 shadow-2xl backdrop-blur-xl">

        {/* Tier 1 — utility strip (desktop only, no counters) */}
        <div className="hidden items-center gap-4 border-b border-white/10 px-5 py-1.5 text-xs text-mist md:flex">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal shadow-[0_0_0_3px_rgba(45,212,191,0.22)]" />
            {hdr.tagline}
          </span>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/for-companies" className="font-semibold transition hover:text-brass2">{t.footer_for_companies}</Link>
            <Link href="/about" className="font-semibold transition hover:text-brass2">{t.footer_about}</Link>
            <span className="h-3.5 w-px bg-white/15" />
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => { setLangOpen((o) => !o); }}
                aria-label="Change language"
                aria-expanded={langOpen}
                className="flex items-center gap-1.5 font-semibold text-foam transition hover:text-brass2"
              >
                <Globe size={14} /> {current.label} <ChevronDown size={13} />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-7 z-50 min-w-[150px] rounded-xl border border-white/10 bg-navy2 p-1.5 shadow-2xl">
                  {LANGS.map((l) => (
                    <div key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-foam transition hover:bg-white/5 ${
                        lang === l.code ? "bg-brass/15" : ""
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {themeBtn}
          </div>
        </div>

        {/* Tier 2 — main navigation */}
        <div className="flex items-center gap-2 px-4 py-2.5 md:gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg md:h-10 md:w-10">
              <Anchor size={20} className="text-[#061523]" strokeWidth={2.4} />
            </div>
            <span className="font-display text-xl font-bold text-white md:text-2xl">
              SeaJobs<span className="text-brass2">.pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-3 hidden items-center gap-1 md:flex">
            {/* Vacancies + fleet mega menu */}
            <div
              className="relative"
              onMouseEnter={() => setFleetOpen(true)}
              onMouseLeave={() => setFleetOpen(false)}
            >
              <Link
                href="/jobs"
                aria-expanded={fleetOpen}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  fleetOpen ? "bg-white/5 text-brass2" : "text-foam hover:bg-white/5 hover:text-brass2"
                }`}
              >
                <Briefcase size={16} className="text-mist" /> {t.nav_jobs}
                <ChevronDown size={14} className={`transition-transform ${fleetOpen ? "rotate-180" : ""}`} />
              </Link>

              {fleetOpen && (
                <div className="absolute left-0 top-full w-[520px] pt-3">
                  <div className="rounded-2xl border border-white/15 bg-deep/90 p-3 shadow-2xl backdrop-blur-xl">
                    <p className="mb-1.5 px-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-mist">{hdr.fleetTitle}</p>
                    <div className="grid grid-cols-2 gap-1">
                      {FLEETS.map((f) => {
                        const Icon = FLEET_ICON[f.key];
                        return (
                          <Link
                            key={f.key}
                            href={{ pathname: "/jobs", query: { fleet: f.key } }}
                            className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-brass/10"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brass/10 text-brass2">
                              <Icon size={18} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-white">{fleetLabel(f.key, lang)}</span>
                              <span className="block truncate text-[11.5px] text-mist">{fleetDesc(f.key)}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-1 border-t border-white/10 pt-2">
                      <Link href="/jobs" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-brass2 transition hover:bg-white/5">
                        {hdr.allJobs} <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {nav.map((n) => (
              <Link key={n.href} href={n.href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2">
                <n.icon size={16} className="text-mist" /> {n.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            {dashboardHref && <NotificationBell />}

            {/* Language — mobile only (desktop has it in tier 1) */}
            <div className="relative md:hidden">
              <button
                onClick={() => { setLangOpen((o) => !o); setMobileOpen(false); }}
                aria-label="Change language"
                aria-expanded={langOpen}
                className="flex items-center gap-1 rounded-lg p-2 text-foam transition hover:bg-white/10"
              >
                <Globe size={18} />
                <span className="text-xs font-bold">{current.flag}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-12 z-50 min-w-[150px] rounded-xl border border-white/10 bg-navy2 p-1.5 shadow-2xl">
                  {LANGS.map((l) => (
                    <div key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-foam transition hover:bg-white/5 ${
                        lang === l.code ? "bg-brass/15" : ""
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span> {l.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin — md+ */}
            {isAdmin && (
              <div className="hidden md:block">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 rounded-lg border border-brass/30 bg-brass/10 px-3 py-2 text-sm font-bold text-brass2 transition hover:bg-brass/20"
                >
                  <ShieldCheck size={15} />
                  <span className="hidden lg:inline">Admin</span>
                </Link>
              </div>
            )}

            {/* Auth — md+ */}
            <div className="hidden md:block">{authButton}</div>

            {/* Theme toggle — mobile only (desktop has it in tier 1) */}
            <div className="md:hidden">{themeBtn}</div>

            {/* Mobile burger */}
            <button
              onClick={() => { setMobileOpen((o) => !o); setLangOpen(false); }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-lg bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              <Link href="/jobs"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2">
                <Briefcase size={18} /> {t.nav_jobs}
              </Link>
              {/* Fleet quick links */}
              <div className="flex flex-wrap gap-1.5 px-3 pb-1">
                {FLEETS.map((f) => (
                  <Link key={f.key} href={{ pathname: "/jobs", query: { fleet: f.key } }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-mist transition hover:border-brass/50 hover:text-brass2">
                    {fleetLabel(f.key, lang)}
                  </Link>
                ))}
              </div>
              {nav.map((n) => (
                <Link key={n.href} href={n.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2">
                  <n.icon size={18} /> {n.label}
                </Link>
              ))}
              <Link href="/for-companies"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2">
                <Briefcase size={18} /> {t.footer_for_companies}
              </Link>
            </nav>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-xl border border-brass/30 bg-brass/10 px-3 py-3 text-sm font-bold text-brass2 transition hover:bg-brass/20"
                >
                  <ShieldCheck size={18} /> Admin Panel
                </Link>
              )}
              {dashboardHref ? (
                <>
                  <Link
                    href={dashboardHref.replace("/dashboard", "/messages")}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foam transition hover:bg-white/5 hover:text-brass2"
                  >
                    <MessageSquare size={18} /> {t.cab_messages}
                  </Link>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
                  >
                    <LayoutDashboard size={16} /> Cabinet
                  </Link>
                </>
              ) : (
                <>
                  <NextLink
                    href="/auth/login"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-brass to-brass2 px-4 py-2.5 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
                  >
                    <LogIn size={16} /> {t.login}
                  </NextLink>
                  <NextLink
                    href="/auth/register"
                    className="flex items-center gap-2 rounded-lg border border-brass/40 px-4 py-2.5 text-sm font-bold text-brass2 transition hover:bg-brass/10"
                  >
                    <UserPlus size={16} /> {t.register}
                  </NextLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
