"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { Anchor, LayoutDashboard, Building2, Briefcase, LogOut, Menu, X, Globe, Users, Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLang } from "@/components/LangProvider";
import { LANGS, T } from "@/lib/i18n";
import NotificationBell from "@/components/NotificationBell";

const NAV_KEYS = [
  { key: "cab_dashboard",       href: "/company/dashboard",    icon: LayoutDashboard },
  { key: "cab_company_profile", href: "/company/profile",      icon: Building2 },
  { key: "cab_vacancies",       href: "/company/vacancies",    icon: Briefcase },
  { key: "cab_applicants",      href: "/company/applications", icon: Users },
  { key: "cab_seafarers",       href: "/company/seafarers",    icon: Search },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = T[lang];
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = LANGS.find((l) => l.code === lang)!;

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { nextRouter.replace("/auth/login"); return; }
        setChecking(false);
        // Check blocked status in background — doesn't delay render
        supabase.from("profiles").select("is_blocked").eq("id", session.user.id).single()
          .then(({ data }) => {
            if (data?.is_blocked) {
              supabase.auth.signOut().then(() => nextRouter.replace("/auth/login?blocked=1"));
            }
          });
      } catch {
        nextRouter.replace("/auth/login");
      }
    }
    checkAuth();
  }, [nextRouter]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  async function handleLogout() {
    if (typeof window !== "undefined") localStorage.removeItem("user_role");
    await supabase.auth.signOut();
    nextRouter.push("/auth/login");
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-deep flex items-center justify-center">
        <p className="text-mist text-sm">Loading...</p>
      </div>
    );
  }

  const sidebar = (
    <aside className="flex h-full w-64 flex-col bg-deep border-r border-white/10">
      <div className="px-5 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg">
            <Anchor size={18} className="text-deep" strokeWidth={2.4} />
          </div>
          <span className="font-display text-xl font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_KEYS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-brass/15 text-brass2 border border-brass/20"
                  : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {t[item.key]}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
        {/* Notifications */}
        <div className="mb-1 flex items-center gap-3 px-3 py-1">
          <NotificationBell />
          <span className="text-sm font-semibold text-mist">Notifications</span>
        </div>

        {/* Language switcher */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-mist transition hover:bg-white/5 hover:text-white"
          >
            <Globe size={18} />
            <span className="flex-1 text-left">{currentLang.flag} {currentLang.label}</span>
          </button>
          {langOpen && (
            <div className="absolute bottom-full mb-1 left-0 w-full rounded-xl border border-white/10 bg-navy2 p-1.5 shadow-2xl z-10">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setLangOpen(false); }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold transition hover:bg-white/5 ${
                    lang === l.code ? "text-brass2 bg-brass/10" : "text-foam"
                  }`}
                >
                  <span className="text-base">{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-mist transition hover:bg-coral/10 hover:text-coral"
        >
          <LogOut size={18} />
          {t.cab_logout}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="h-screen bg-navy flex overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:h-full md:shrink-0 md:flex-col" style={{ width: 256 }}>
        {sidebar}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-200 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-navy">
        {/* Mobile topbar */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-deep px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-mist hover:text-white transition"
          >
            <Menu size={22} />
          </button>
          <Link href="/" className="font-display text-lg font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <NotificationBell />
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-mist hover:text-white transition"
              >
                <X size={22} />
              </button>
            )}
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
