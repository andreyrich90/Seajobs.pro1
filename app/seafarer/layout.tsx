"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Anchor,
  LayoutDashboard,
  User,
  Award,
  Ship,
  FileText,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/seafarer/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/seafarer/profile", icon: User },
  { label: "Certificates", href: "/seafarer/certificates", icon: Award },
  { label: "Sea Experience", href: "/seafarer/experience", icon: Ship },
  { label: "My CV", href: "/seafarer/cv", icon: FileText },
];

export default function SeafarerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/auth/login");
          return;
        }

        // Check role
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (!profile || profile.role !== "seafarer") {
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

  return (
    <div className="min-h-screen bg-navy flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-deep flex flex-col border-r border-white/10">
        {/* Logo */}
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

        {/* Navigation */}
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

        {/* Logout */}
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

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-navy">
        {children}
      </main>
    </div>
  );
}
