"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  Anchor, LayoutDashboard, Users, Briefcase, MessageSquare,
  Newspaper, LogOut, Menu, X, ShieldCheck, Mail, Upload,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard",  href: "/admin/dashboard",  icon: LayoutDashboard },
  { label: "Users",      href: "/admin/users",       icon: Users },
  { label: "Vacancies",  href: "/admin/vacancies",   icon: Briefcase },
  { label: "Import",     href: "/admin/import",      icon: Upload },
  { label: "Messages",   href: "/admin/messages",    icon: Mail },
  { label: "Forum",      href: "/admin/forum",       icon: MessageSquare },
  { label: "News",       href: "/admin/news",        icon: Newspaper },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router    = useRouter();
  const nextRouter = useNextRouter();
  const pathname  = usePathname();
  const [checking, setChecking] = useState(true);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) { nextRouter.replace("/auth/login"); return; }
        const { data: profile } = await supabase
          .from("profiles").select("is_admin").eq("id", session.user.id).single();
        if (!profile?.is_admin) { router.replace("/"); return; }
        setChecking(false);
      } catch { router.replace("/"); }
    }
    check();
  }, [router, nextRouter]);

  useEffect(() => { setOpen(false); }, [pathname]);

  async function logout() {
    await supabase.auth.signOut();
    nextRouter.push("/auth/login");
  }

  if (checking) return (
    <div className="min-h-screen bg-deep flex items-center justify-center">
      <p className="text-mist text-sm">Checking permissions...</p>
    </div>
  );

  const sidebar = (
    <aside className="flex h-full w-64 flex-col bg-deep border-r border-white/10">
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2">
          <ShieldCheck size={18} className="text-deep" />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white">Admin Panel</p>
          <p className="text-xs text-mist">SeaJobs.pro</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active ? "bg-brass/15 text-brass2 border border-brass/20" : "text-mist hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 border-t border-white/10 pt-3 flex flex-col gap-1">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-mist hover:text-white transition">
          <Anchor size={14} /> Back to site
        </Link>
        <button onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-mist transition hover:bg-coral/10 hover:text-coral">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="h-screen bg-navy flex overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:flex md:h-full md:shrink-0" style={{ width: 256 }}>{sidebar}</div>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setOpen(false)} />}
      <div className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-transform duration-200 md:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebar}
      </div>

      <main className="flex-1 overflow-auto bg-navy">
        <div className="flex items-center gap-3 border-b border-white/10 bg-deep px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} className="text-mist hover:text-white transition">
            <Menu size={22} />
          </button>
          <span className="font-display text-lg font-bold text-white">Admin Panel</span>
          {open && <button onClick={() => setOpen(false)} className="ml-auto text-mist hover:text-white"><X size={22} /></button>}
        </div>
        {children}
      </main>
    </div>
  );
}
