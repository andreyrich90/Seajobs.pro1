import { emailShell } from "@/lib/emailShell";

// SeaJobs Partners — crewing companies whose documents an admin has checked
// (`companies.is_verified`, set only through api/admin/company-verifications;
// a trigger stops a company setting it itself — 20261123000000_company_verification.sql).
//
// Their vacancies open the board in the "SeaJobs Partners" block
// (components/PartnerBlock.tsx): the freshest PARTNER_BLOCK_MAX posted within
// PARTNER_BLOCK_DAYS, logo or not. The block is hidden while there are none.
// This file holds the server side: the e-mails and the bell texts.

export const PARTNER_BLOCK_MAX = 9;
export const PARTNER_BLOCK_DAYS = 30;

export const NOTIF_PARTNER_INVITE = "partner_invite";
export const NOTIF_PARTNER_APPROVED = "partner_approved";
export const NOTIF_PARTNER_REJECTED = "partner_rejected";

/**
 * Companies keep no language. Guess one from the e-mail's country domain or
 * the location text, English otherwise — a wrong guess costs a letter in a
 * neighbouring language, not a lost one.
 */
export function companyLang(email: string | null | undefined, location: string | null | undefined): string {
  const tld = (email ?? "").toLowerCase().split(".").pop() ?? "";
  if (tld === "ua") return "ua";
  if (tld === "pl") return "pl";
  if (tld === "ro") return "ro";
  if (tld === "ru" || tld === "by") return "ru";
  const loc = (location ?? "").toLowerCase();
  if (/ukrain|україн|украин|odesa|odessa|одес|kyiv|київ|киев|mykola|миколаї|izmail|ізмаїл|kherson|херсон/.test(loc)) return "ua";
  if (/poland|polska|польш|gdyni|gdańsk|gdansk|szczecin|warsz/.test(loc)) return "pl";
  if (/romania|românia|constan|bucure|galați|galati/.test(loc)) return "ro";
  return "en";
}

type InviteCopy = { subject: string; sub: string; hero: string; intro: string; rows: [string, string, string][]; cta: string; note: string; footer: string };

const INVITE: Record<string, InviteCopy> = {
  en: {
    subject: "Become a SeaJobs Partner — your vacancies at the top of the site",
    sub: "SeaJobs Partners",
    hero: "Become a SeaJobs Partner",
    intro: "We are launching the \"SeaJobs Partners\" block: vacancies of verified crewing agencies are shown to seafarers first, with the ✓ badge. To join it, upload your crewing agency licence or certificate in your company account — it takes 2 minutes.",
    rows: [
      ["⬆️", "Your vacancies first", "Partner vacancies open the job board and the home page."],
      ["✓", "A badge seafarers trust", "Seafarers see that your documents were checked by SeaJobs."],
      ["🔒", "Documents stay private", "Only the SeaJobs team sees them. The check takes up to 2 working days."],
    ],
    cta: "Become a partner",
    note: "Free of charge. Verification is voluntary.",
    footer: "You get this e-mail because your company has an account on SeaJobs.pro.",
  },
  ru: {
    subject: "Станьте Партнёром SeaJobs — ваши вакансии в начале сайта",
    sub: "Партнёры SeaJobs",
    hero: "Станьте Партнёром SeaJobs",
    intro: "Мы запускаем блок «Партнёры SeaJobs»: вакансии проверенных крюинговых компаний показываются морякам первыми, со значком ✓. Чтобы попасть в него, загрузите в кабинете лицензию или сертификат крюингового агентства — это займёт 2 минуты.",
    rows: [
      ["⬆️", "Ваши вакансии — первыми", "Вакансии партнёров открывают ленту вакансий и главную страницу."],
      ["✓", "Значок, которому доверяют моряки", "Моряки видят, что ваши документы проверены SeaJobs."],
      ["🔒", "Документы не публикуются", "Их видит только команда SeaJobs. Проверка — до 2 рабочих дней."],
    ],
    cta: "Стать партнёром",
    note: "Бесплатно. Проверка добровольная.",
    footer: "Вы получили это письмо, потому что у вашей компании есть аккаунт на SeaJobs.pro.",
  },
  ua: {
    subject: "Станьте Партнером SeaJobs — ваші вакансії на початку сайту",
    sub: "Партнери SeaJobs",
    hero: "Станьте Партнером SeaJobs",
    intro: "Ми запускаємо блок «Партнери SeaJobs»: вакансії перевірених крюїнгових компаній показуються морякам першими, зі значком ✓. Щоб потрапити до нього, завантажте в кабінеті ліцензію або сертифікат крюїнгового агентства — це займе 2 хвилини.",
    rows: [
      ["⬆️", "Ваші вакансії — першими", "Вакансії партнерів відкривають стрічку вакансій і головну сторінку."],
      ["✓", "Значок, якому довіряють моряки", "Моряки бачать, що ваші документи перевірені SeaJobs."],
      ["🔒", "Документи не публікуються", "Їх бачить лише команда SeaJobs. Перевірка — до 2 робочих днів."],
    ],
    cta: "Стати партнером",
    note: "Безкоштовно. Перевірка добровільна.",
    footer: "Ви отримали цей лист, бо ваша компанія має акаунт на SeaJobs.pro.",
  },
  pl: {
    subject: "Zostań Partnerem SeaJobs — Twoje oferty na początku serwisu",
    sub: "Partnerzy SeaJobs",
    hero: "Zostań Partnerem SeaJobs",
    intro: "Uruchamiamy blok „Partnerzy SeaJobs”: oferty zweryfikowanych agencji crewingowych są pokazywane marynarzom jako pierwsze, z oznaczeniem ✓. Aby się w nim znaleźć, prześlij na koncie firmy licencję lub certyfikat agencji crewingowej — to zajmie 2 minuty.",
    rows: [
      ["⬆️", "Twoje oferty jako pierwsze", "Oferty partnerów otwierają listę ofert i stronę główną."],
      ["✓", "Oznaczenie, któremu ufają marynarze", "Marynarze widzą, że Twoje dokumenty zweryfikował SeaJobs."],
      ["🔒", "Dokumenty nie są publikowane", "Widzi je tylko zespół SeaJobs. Weryfikacja trwa do 2 dni roboczych."],
    ],
    cta: "Zostań partnerem",
    note: "Bezpłatnie. Weryfikacja jest dobrowolna.",
    footer: "Otrzymujesz ten e-mail, ponieważ Twoja firma ma konto w SeaJobs.pro.",
  },
  ro: {
    subject: "Deveniți Partener SeaJobs — posturile dumneavoastră la începutul site-ului",
    sub: "Parteneri SeaJobs",
    hero: "Deveniți Partener SeaJobs",
    intro: "Lansăm blocul „Parteneri SeaJobs”: posturile agențiilor de crewing verificate sunt arătate marinarilor primele, cu insigna ✓. Pentru a intra în el, încărcați în contul firmei licența sau certificatul agenției de crewing — durează 2 minute.",
    rows: [
      ["⬆️", "Posturile dumneavoastră primele", "Posturile partenerilor deschid lista de posturi și pagina principală."],
      ["✓", "O insignă în care marinarii au încredere", "Marinarii văd că documentele dumneavoastră au fost verificate de SeaJobs."],
      ["🔒", "Documentele nu sunt publicate", "Le vede doar echipa SeaJobs. Verificarea durează până la 2 zile lucrătoare."],
    ],
    cta: "Deveniți partener",
    note: "Gratuit. Verificarea este voluntară.",
    footer: "Primiți acest e-mail pentru că firma dumneavoastră are un cont pe SeaJobs.pro.",
  },
};

function cabinetUrl(lang: string): string {
  return `https://seajobs.pro${lang === "en" ? "" : `/${lang}`}/company/verification`;
}

export function partnerInviteEmail(lang: string): { subject: string; html: string } {
  const c = INVITE[lang] ?? INVITE.en;
  return {
    subject: c.subject,
    html: emailShell(lang === "ua" ? "uk" : lang, c.sub, c.hero, c.intro, c.rows, c.cta, c.note, c.footer, cabinetUrl(lang)),
  };
}

type DecisionCopy = { okSubject: string; okHero: string; okIntro: string; noSubject: string; noHero: string; noIntro: string; reason: string; cta: string; footer: string };

const DECISION: Record<string, DecisionCopy> = {
  en: {
    okSubject: "Your company is now a SeaJobs Partner",
    okHero: "Welcome to SeaJobs Partners",
    okIntro: "We have checked your documents. Your vacancies are now shown in the \"SeaJobs Partners\" block at the top of the site, with the ✓ badge.",
    noSubject: "SeaJobs Partner: the documents were not accepted",
    noHero: "The documents were not accepted",
    noIntro: "We could not confirm your company from the documents you sent. You can upload them again in your company account.",
    reason: "Reason",
    cta: "Open the company account",
    footer: "You get this e-mail because your company asked to become a SeaJobs Partner.",
  },
  ru: {
    okSubject: "Ваша компания — Партнёр SeaJobs",
    okHero: "Добро пожаловать в Партнёры SeaJobs",
    okIntro: "Мы проверили ваши документы. Теперь ваши вакансии показываются в блоке «Партнёры SeaJobs» в начале сайта, со значком ✓.",
    noSubject: "Партнёр SeaJobs: документы не приняты",
    noHero: "Документы не приняты",
    noIntro: "По присланным документам мы не смогли подтвердить вашу компанию. Вы можете загрузить их ещё раз в кабинете компании.",
    reason: "Причина",
    cta: "Открыть кабинет компании",
    footer: "Вы получили это письмо, потому что ваша компания подала заявку на статус Партнёра SeaJobs.",
  },
  ua: {
    okSubject: "Ваша компанія — Партнер SeaJobs",
    okHero: "Ласкаво просимо до Партнерів SeaJobs",
    okIntro: "Ми перевірили ваші документи. Тепер ваші вакансії показуються в блоці «Партнери SeaJobs» на початку сайту, зі значком ✓.",
    noSubject: "Партнер SeaJobs: документи не прийнято",
    noHero: "Документи не прийнято",
    noIntro: "За надісланими документами ми не змогли підтвердити вашу компанію. Ви можете завантажити їх ще раз у кабінеті компанії.",
    reason: "Причина",
    cta: "Відкрити кабінет компанії",
    footer: "Ви отримали цей лист, бо ваша компанія подала заявку на статус Партнера SeaJobs.",
  },
  pl: {
    okSubject: "Twoja firma jest Partnerem SeaJobs",
    okHero: "Witamy wśród Partnerów SeaJobs",
    okIntro: "Zweryfikowaliśmy Twoje dokumenty. Twoje oferty są teraz wyświetlane w bloku „Partnerzy SeaJobs” na początku serwisu, z oznaczeniem ✓.",
    noSubject: "Partner SeaJobs: dokumenty nie zostały przyjęte",
    noHero: "Dokumenty nie zostały przyjęte",
    noIntro: "Na podstawie przesłanych dokumentów nie mogliśmy potwierdzić Twojej firmy. Możesz przesłać je ponownie na koncie firmy.",
    reason: "Powód",
    cta: "Otwórz konto firmy",
    footer: "Otrzymujesz ten e-mail, ponieważ Twoja firma złożyła wniosek o status Partnera SeaJobs.",
  },
  ro: {
    okSubject: "Firma dumneavoastră este Partener SeaJobs",
    okHero: "Bine ați venit printre Partenerii SeaJobs",
    okIntro: "Am verificat documentele dumneavoastră. Posturile dumneavoastră apar acum în blocul „Parteneri SeaJobs” la începutul site-ului, cu insigna ✓.",
    noSubject: "Partener SeaJobs: documentele nu au fost acceptate",
    noHero: "Documentele nu au fost acceptate",
    noIntro: "Nu am putut confirma firma dumneavoastră pe baza documentelor trimise. Le puteți încărca din nou în contul firmei.",
    reason: "Motiv",
    cta: "Deschideți contul firmei",
    footer: "Primiți acest e-mail pentru că firma dumneavoastră a cerut statutul de Partener SeaJobs.",
  },
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function partnerDecisionEmail(lang: string, approved: boolean, reason?: string | null): { subject: string; html: string } {
  const c = DECISION[lang] ?? DECISION.en;
  const rows: [string, string, string][] = !approved && reason ? [["📝", c.reason, esc(reason)]] : [];
  return {
    subject: approved ? c.okSubject : c.noSubject,
    html: emailShell(
      lang === "ua" ? "uk" : lang,
      INVITE[lang]?.sub ?? INVITE.en.sub,
      approved ? c.okHero : c.noHero,
      approved ? c.okIntro : c.noIntro,
      rows,
      c.cta,
      "",
      c.footer,
      cabinetUrl(lang),
    ),
  };
}
