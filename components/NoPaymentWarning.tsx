"use client";

import { ShieldAlert } from "lucide-react";
import { useLang } from "@/components/LangProvider";

// Anti-scam notice shown across the site (footer, forum, vacancy apply, seafarer
// cabinet). Legitimate crewing never charges seafarers — this warns them not to
// pay for jobs, medicals, certificates, visas or "processing". Two variants:
// "banner" (full card) and "compact" (slim one-liner near action buttons).

type Copy = { heading: string; body: string; short: string };

const WARN: Record<string, Copy> = {
  en: {
    heading: "Never pay to get a job at sea",
    body: "Legitimate crewing agencies never ask seafarers for money. Do not pay anyone for a contract, a place on board, a medical, certificates, visas or “processing”. If you are asked to pay to be hired — it is a scam. Stop all contact and let us know.",
    short: "Never pay for a job, medical, certificates or a contract — a request for money is a scam.",
  },
  ru: {
    heading: "Никогда не платите за трудоустройство в море",
    body: "Настоящий крюинг никогда не берёт с моряков деньги. Не платите никому за контракт, за место на судне, за медкомиссию, сертификаты, визы или «оформление». Просят деньги за работу — это развод. Прекратите общение и сообщите нам.",
    short: "Никогда не платите за работу, медкомиссию, сертификаты или контракт — просят деньги, это развод.",
  },
  ua: {
    heading: "Ніколи не платіть за працевлаштування в морі",
    body: "Справжній крюїнг ніколи не бере з моряків гроші. Не платіть нікому за контракт, за місце на судні, за медкомісію, сертифікати, візи чи «оформлення». Просять гроші за роботу — це шахрайство. Припиніть спілкування та повідомте нам.",
    short: "Ніколи не платіть за роботу, медкомісію, сертифікати чи контракт — просять гроші, це шахрайство.",
  },
  pl: {
    heading: "Nigdy nie płać za pracę na morzu",
    body: "Uczciwe agencje crewingowe nigdy nie żądają pieniędzy od marynarzy. Nie płać nikomu za kontrakt, miejsce na statku, badania lekarskie, certyfikaty, wizy ani „obsługę”. Jeśli ktoś żąda zapłaty za zatrudnienie — to oszustwo. Zerwij kontakt i daj nam znać.",
    short: "Nigdy nie płać za pracę, badania, certyfikaty ani kontrakt — prośba o pieniądze to oszustwo.",
  },
  ro: {
    heading: "Nu plăti niciodată pentru un loc de muncă pe mare",
    body: "O agenție de crewing corectă nu cere niciodată bani de la navigatori. Nu plăti nimănui pentru contract, un loc la bord, vizita medicală, certificate, vize sau „procesare”. Dacă ți se cere să plătești pentru angajare — este o înșelătorie. Întrerupe orice contact și anunță-ne.",
    short: "Nu plăti niciodată pentru muncă, vizită medicală, certificate sau contract — cererea de bani este o escrocherie.",
  },
};

export default function NoPaymentWarning({
  variant = "banner",
  className = "",
}: {
  variant?: "banner" | "compact";
  className?: string;
}) {
  const { lang } = useLang();
  const c = WARN[lang] ?? WARN.en;

  if (variant === "compact") {
    return (
      <div
        role="note"
        className={`flex items-start gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2.5 ${className}`}
      >
        <ShieldAlert size={16} className="mt-0.5 shrink-0 text-coral" />
        <p className="text-xs leading-relaxed text-foam/90">{c.short}</p>
      </div>
    );
  }

  return (
    <div
      role="note"
      className={`rounded-2xl border border-coral/30 bg-coral/10 p-4 sm:p-5 ${className}`}
    >
      <div className="flex gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-coral/15">
          <ShieldAlert size={20} className="text-coral" />
        </div>
        <div>
          <p className="font-display text-base font-bold text-coral">{c.heading}</p>
          <p className="mt-1 text-sm leading-relaxed text-foam/90">{c.body}</p>
        </div>
      </div>
    </div>
  );
}
