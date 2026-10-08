import { emailShell, type EmailRow } from "@/lib/emailShell";

// The e-mail a buyer gets when their CV-distribution payment has arrived.
//
// It answers the two things people ask straight after paying: did the money
// arrive, and when does it start. The mailing is sent by a person on working
// days, so a payment on Saturday or Sunday starts on Monday — and saying so in
// the receipt removes the weekend of "where is my mailing?" messages.
//
// The weekday is read in Kyiv time: that is where the work is done, and a
// Saturday 01:00 in Kyiv is still Friday in Lisbon.

const TZ = "Europe/Kyiv";

type Copy = {
  subject: string;
  headerSub: string;
  hero: string;
  intro: (pkg: string, when: string) => string;
  weekday: string;
  monday: (date: string) => string;
  rows: EmailRow[];
  cta: string;
  ctaNote: string;
  footer: string;
};

const COPY: Record<string, Copy> = {
  en: {
    subject: "Payment received — your CV mailing",
    headerSub: "CV distribution",
    hero: "Payment received — thank you!",
    intro: (p, w) => `Your <b>${p}</b> is paid. The mailing of your CV will start <b>${w}</b>.`,
    weekday: "within one working day",
    monday: (d) => `on Monday, ${d}`,
    rows: [
      ["📄", "We check your CV first", "If something important is missing — a phone number, a rank, a certificate date — we will write to you before sending."],
      ["📬", "Then we send it out", "Your CV goes to the crewing agencies of the package you chose, with a short cover letter."],
      ["✉️", "Agencies answer you directly", "Replies come to the e-mail and phone in your CV. Keep them within reach."],
    ],
    cta: "Open SeaJobs.pro",
    ctaNote: "We never charge for a job, a contract or a place on a ship — what you paid for is the preparation and sending of your CV.",
    footer: "Questions? Just reply to this e-mail.",
  },
  ru: {
    subject: "Оплата получена — рассылка вашего CV",
    headerSub: "Рассылка CV",
    hero: "Оплата получена — спасибо!",
    intro: (p, w) => `Пакет <b>${p}</b> оплачен. Рассылка вашего CV начнётся <b>${w}</b>.`,
    weekday: "в течение одного рабочего дня",
    monday: (d) => `в понедельник, ${d}`,
    rows: [
      ["📄", "Сначала проверим CV", "Если не хватает чего-то важного — телефона, должности, срока сертификата — напишем вам до отправки."],
      ["📬", "Затем разошлём", "Ваше CV уйдёт в крюинговые агентства выбранного пакета вместе с коротким сопроводительным письмом."],
      ["✉️", "Крюинги отвечают вам напрямую", "Ответы придут на почту и телефон из вашего CV — держите их под рукой."],
    ],
    cta: "Открыть SeaJobs.pro",
    ctaNote: "Мы никогда не берём деньги за работу, контракт или место на судне — оплачена подготовка и отправка вашего CV.",
    footer: "Есть вопросы? Просто ответьте на это письмо.",
  },
  ua: {
    subject: "Оплату отримано — розсилка вашого CV",
    headerSub: "Розсилка CV",
    hero: "Оплату отримано — дякуємо!",
    intro: (p, w) => `Пакет <b>${p}</b> оплачено. Розсилка вашого CV почнеться <b>${w}</b>.`,
    weekday: "протягом одного робочого дня",
    monday: (d) => `у понеділок, ${d}`,
    rows: [
      ["📄", "Спершу перевіримо CV", "Якщо бракує чогось важливого — телефону, посади, строку сертифіката — напишемо вам до відправлення."],
      ["📬", "Потім розішлемо", "Ваше CV піде в крюїнгові агентства обраного пакета разом із коротким супровідним листом."],
      ["✉️", "Крюїнги відповідають вам напряму", "Відповіді прийдуть на пошту й телефон із вашого CV — тримайте їх під рукою."],
    ],
    cta: "Відкрити SeaJobs.pro",
    ctaNote: "Ми ніколи не беремо гроші за роботу, контракт чи місце на судні — оплачено підготовку й відправлення вашого CV.",
    footer: "Є запитання? Просто дайте відповідь на цей лист.",
  },
  pl: {
    subject: "Płatność otrzymana — wysyłka Twojego CV",
    headerSub: "Wysyłka CV",
    hero: "Płatność otrzymana — dziękujemy!",
    intro: (p, w) => `Pakiet <b>${p}</b> jest opłacony. Wysyłka Twojego CV rozpocznie się <b>${w}</b>.`,
    weekday: "w ciągu jednego dnia roboczego",
    monday: (d) => `w poniedziałek, ${d}`,
    rows: [
      ["📄", "Najpierw sprawdzimy CV", "Jeśli brakuje czegoś ważnego — telefonu, stanowiska, daty certyfikatu — napiszemy przed wysyłką."],
      ["📬", "Potem je wyślemy", "Twoje CV trafi do agencji crewingowych z wybranego pakietu razem z krótkim listem przewodnim."],
      ["✉️", "Agencje odpowiadają bezpośrednio Tobie", "Odpowiedzi przyjdą na e-mail i telefon z Twojego CV — miej je pod ręką."],
    ],
    cta: "Otwórz SeaJobs.pro",
    ctaNote: "Nigdy nie pobieramy opłat za pracę, kontrakt ani miejsce na statku — opłacone jest przygotowanie i wysyłka Twojego CV.",
    footer: "Pytania? Po prostu odpowiedz na tę wiadomość.",
  },
  ro: {
    subject: "Plată primită — trimiterea CV-ului tău",
    headerSub: "Distribuirea CV-ului",
    hero: "Plată primită — mulțumim!",
    intro: (p, w) => `Pachetul <b>${p}</b> este plătit. Trimiterea CV-ului tău începe <b>${w}</b>.`,
    weekday: "în cel mult o zi lucrătoare",
    monday: (d) => `luni, ${d}`,
    rows: [
      ["📄", "Mai întâi verificăm CV-ul", "Dacă lipsește ceva important — telefonul, funcția, data unui certificat — îți scriem înainte de trimitere."],
      ["📬", "Apoi îl trimitem", "CV-ul tău ajunge la agențiile de crewing din pachetul ales, cu o scurtă scrisoare de intenție."],
      ["✉️", "Agențiile îți răspund direct", "Răspunsurile vin pe e-mailul și telefonul din CV — ține-le la îndemână."],
    ],
    cta: "Deschide SeaJobs.pro",
    ctaNote: "Nu cerem niciodată bani pentru un loc de muncă, un contract sau un loc pe navă — ai plătit pregătirea și trimiterea CV-ului.",
    footer: "Întrebări? Răspunde pur și simplu la acest e-mail.",
  },
};

const DATE_LOCALE: Record<string, string> = { en: "en-GB", ru: "ru-RU", ua: "uk-UA", pl: "pl-PL", ro: "ro-RO" };

/** Is `now` a Saturday or Sunday in Kyiv, and which date is the Monday after. */
export function mailingStart(now: Date): { weekend: boolean; monday: Date } {
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" }).format(now);
  const ahead = wd === "Sat" ? 2 : wd === "Sun" ? 1 : 0;
  return { weekend: ahead > 0, monday: new Date(now.getTime() + ahead * 864e5) };
}

export function servicePaidEmail(lang: string, packageLabel: string, now = new Date()): { subject: string; html: string } {
  const c = COPY[lang] ?? COPY.en;
  const { weekend, monday } = mailingStart(now);
  const when = weekend
    ? c.monday(new Intl.DateTimeFormat(DATE_LOCALE[lang] ?? "en-GB", { timeZone: TZ, day: "numeric", month: "long" }).format(monday))
    : c.weekday;
  const safePkg = packageLabel.replace(/[<>&]/g, "");
  const prefix = lang === "en" ? "" : `/${lang}`;
  return {
    subject: c.subject,
    html: emailShell(lang === "ua" ? "uk" : lang, c.headerSub, c.hero, c.intro(safePkg, when), c.rows, c.cta, c.ctaNote, c.footer, `https://seajobs.pro${prefix}`),
  };
}
