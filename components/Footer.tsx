"use client";

import Link from "next/link";
import { Anchor } from "lucide-react";

const PLATFORM = [
  { label: "Vacancies", href: "/jobs" },
  { label: "Forum", href: "/forum" },
  { label: "News", href: "/news" },
];

const COMPANY = [
  { label: "For Companies", href: "/for-companies" },
  { label: "About", href: "/about" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const ACCOUNT = [
  { label: "Register as Seafarer", href: "/auth/register?role=seafarer" },
  { label: "Register as Company", href: "/auth/register?role=company" },
  { label: "Sign In", href: "/auth/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 shadow-lg">
                <Anchor size={18} className="text-deep" strokeWidth={2.4} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                SeaJobs<span className="text-brass2">.pro</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-mist leading-relaxed">
              The harbour for maritime careers. Connecting seafarers with crewing agencies across Europe.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist/60">Platform</h4>
            <ul className="flex flex-col gap-2.5">
              {PLATFORM.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mist transition hover:text-brass2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist/60">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mist transition hover:text-brass2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist/60">Get Started</h4>
            <ul className="flex flex-col gap-2.5">
              {ACCOUNT.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-mist transition hover:text-brass2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-mist/50">© {new Date().getFullYear()} SeaJobs.pro. All rights reserved.</p>
          <p className="text-xs text-mist/50">Built for seafarers, by seafarers.</p>
        </div>
      </div>
    </footer>
  );
}
