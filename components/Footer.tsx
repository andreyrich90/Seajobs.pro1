"use client";

import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { Anchor, Linkedin } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/seajobspro",
    icon: (
      <Linkedin size={18} />
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/seajobspro",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.47l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.946-.001-.001-.001 0 0 0h-.664z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/seajobspro",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const { lang } = useLang();
  const t = T[lang];

  const PLATFORM = [
    { label: t.footer_vacancies, href: "/jobs" },
    { label: t.footer_forum, href: "/forum" },
    { label: t.footer_news, href: "/news" },
  ];

  const COMPANY = [
    { label: t.footer_for_companies, href: "/for-companies" },
    { label: t.footer_about, href: "/about" },
    { label: t.footer_terms, href: "/terms" },
    { label: t.footer_privacy, href: "/privacy" },
  ];

  const ACCOUNT = [
    { label: t.footer_reg_seafarer, href: "/auth/register?role=seafarer" },
    { label: t.footer_reg_company, href: "/auth/register?role=company" },
    { label: t.footer_signin, href: "/auth/login" },
  ];

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
              {t.footer_tagline}
            </p>

            {/* Social links */}
            <div className="mt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-mist">
                {t.footer_follow}
              </p>
              <div className="flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-mist transition hover:border-brass/40 hover:text-brass2"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist">
              {t.footer_platform}
            </h4>
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
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist">
              {t.footer_company_col}
            </h4>
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
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mist">
              {t.footer_get_started}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {ACCOUNT.map((l) => (
                <li key={l.href}>
                  <NextLink href={l.href} className="text-sm text-mist transition hover:text-brass2">
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-mist">© {new Date().getFullYear()} SeaJobs.pro. {t.footer_rights}</p>
          <p className="text-xs text-mist">{t.footer_built}</p>
        </div>
      </div>
    </footer>
  );
}
