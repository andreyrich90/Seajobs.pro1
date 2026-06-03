"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Anchor, LayoutDashboard, Building2, Briefcase, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/company/dashboard", icon: LayoutDashboard },
  { label: "Company Profile", href: "/company/profile", icon: Building2 },
  { label: "Vacancies", href: "/company/vacancies", icon: Briefcase },
];

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { router.replace("/auth/login"); return; }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (!profile || profile.role !== "company") {
          router.replace("/auth/login");
          return;
        }
        setChecking(false);
      } catch {
        router.replace("/auth/login");
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
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
        {navItems.map((item) => {
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
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-mist transition hover:bg-coral/10 hover:text-coral"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:shrink-0 md:flex-col" style={{ width: 256 }}>
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
          <span className="font-display text-lg font-bold text-white">
            SeaJobs<span className="text-brass2">.pro</span>
          </span>
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto text-mist hover:text-white transition"
            >
              <X size={22} />
            </button>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}
