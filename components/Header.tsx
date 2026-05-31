"use client";

import { useState } from "react";
import Link from "next/link";
import { Anchor, Globe, ChevronDown, LogIn, Briefcase, MessageSquare, Newspaper } from "lucide-react";
import { LANGS, T } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";

export default function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const t = T[lang];
  const current = LANGS.find((l) => l.code === lang)!;

  const nav = [
    { label: t.nav_jobs, icon: Briefcase, href: "/jobs" },
    { label: t.nav_forum, icon: MessageSquare, href: "/forum" },
    { label: t.nav_news, icon:
