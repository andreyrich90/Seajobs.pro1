// Canonical data for the crewing-agency outreach invite.
// Used by BOTH the browser-triggered route (app/api/outreach) and the CLI
// mailer (scripts/outreach/send-invites.ts), so there is a single source of
// truth for copy, subjects and the recipient list.

import recipients from "../scripts/outreach/recipients.json";

export type OutreachLang = "en" | "pl" | "uk";
export interface OutreachRecipient { company: string; email: string; lang?: OutreachLang }

export const RECIPIENTS: OutreachRecipient[] = recipients as OutreachRecipient[];

export const FROM = "SeaJobs.pro <partners@seajobs.pro>";
export const REPLY_TO = "partners@seajobs.pro";

export const SUBJECTS: Record<OutreachLang, string> = {
  en: "SeaJobs.pro — post your crew vacancies for free (Google-indexed in ~1h)",
  pl: "SeaJobs.pro — publikuj oferty crewingowe za darmo (w Google w ~1h)",
  uk: "SeaJobs.pro — розміщуйте вакансії безкоштовно (у Google за ~1 год)",
};

// Domain heuristic used only when a recipient has no explicit lang.
export function pickLang(email: string): OutreachLang {
  const e = email.toLowerCase();
  const domain = e.split("@")[1] ?? "";
  if (domain.endsWith(".pl")) return "pl";
  if (domain.endsWith(".ua") || /ukraine|odes/.test(e)) return "uk";
  return "en";
}

function shell(lang: string, headerSub: string, hero: string, intro: string, benefits: [string, string, string][], cta: string, ctaNote: string, footer: string): string {
  const rows = benefits.map(([icon, title, body]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;"><tr>
<td width="44" valign="top" style="font-size:24px;padding-top:2px;">${icon}</td>
<td valign="top"><div style="font-size:15px;font-weight:bold;color:#0d1f33;margin-bottom:2px;">${title}</div>
<div style="font-size:14px;line-height:1.5;color:#3d4b5c;">${body}</div></td>
</tr></table>`).join("");
  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:24px 0;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(13,31,51,.12);">
<tr><td style="background:#0d1f33;padding:28px 32px;text-align:center;">
<div style="font-size:26px;font-weight:bold;color:#ffffff;letter-spacing:.5px;">Sea<span style="color:#f2b134;">Jobs</span>.pro</div>
<div style="color:#7fd1c8;font-size:13px;margin-top:6px;">${headerSub}</div>
</td></tr>
<tr><td style="padding:32px 32px 8px 32px;">
<h1 style="margin:0 0 12px 0;font-size:22px;line-height:1.3;color:#0d1f33;">${hero}</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#3d4b5c;">${intro}</p>
</td></tr>
<tr><td style="padding:20px 32px 4px 32px;">${rows}</td></tr>
<tr><td style="padding:24px 32px;text-align:center;">
<a href="https://seajobs.pro/register" style="display:inline-block;background:#f2b134;color:#0d1f33;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 40px;border-radius:8px;">${cta}</a>
<p style="margin:12px 0 0 0;font-size:12px;color:#8a97a5;">${ctaNote}</p>
</td></tr>
<tr><td style="background:#0d1f33;padding:20px 32px;text-align:center;">
<p style="margin:0;font-size:13px;color:#aebccb;line-height:1.6;">${footer}<br>
<a href="mailto:partners@seajobs.pro" style="color:#7fd1c8;text-decoration:none;">partners@seajobs.pro</a> &nbsp;•&nbsp;
<a href="https://seajobs.pro" style="color:#7fd1c8;text-decoration:none;">seajobs.pro</a></p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

export const TEMPLATES: Record<OutreachLang, string> = {
  en: shell("en", "Maritime jobs portal — Eastern Europe &amp; the Baltics",
    "Reach thousands of active seafarers — post your vacancies for free",
    "Hello! SeaJobs.pro is a job portal built by seafarers, for seafarers from Ukraine, Poland, Eastern Europe and the Baltic states. We invite your crewing agency to join the platform and publish vacancies directly to the crew you're looking for.",
    [
      ["⚓", "Audience that matches your needs", "Our visitors are active seafarers — ratings and officers from Ukraine, Poland and the Baltics who are searching for a contract right now."],
      ["🚀", "Google for Jobs in ~1 hour", "Every vacancy gets JobPosting structured markup and appears in Google job search results within about an hour of publication."],
      ["🌍", "Automatic translation into 4 languages", "Post once — the vacancy is instantly available in English, Polish, Ukrainian and Russian. No extra work for your team."],
      ["🎯", "Smart candidate matching", "The platform matches vacancies with seafarers' ranks, certificates and experience, so applications you receive are relevant."],
      ["💼", "Your own agency dashboard", "Manage vacancies, edit and repost in a couple of clicks — built to be simple for crewing managers."],
    ],
    "Register your agency — free", "Registration takes 5 minutes. No fees for posting vacancies.",
    "SeaJobs.pro — maritime jobs portal, built for seafarers"),

  pl: shell("pl", "Portal pracy na morzu — Europa Wschodnia i kraje bałtyckie",
    "Dotrzyj do tysięcy aktywnych marynarzy — publikuj oferty pracy za darmo",
    "Dzień dobry! SeaJobs.pro to portal pracy stworzony przez marynarzy, dla marynarzy z Polski, Ukrainy, Europy Wschodniej i krajów bałtyckich. Zapraszamy Państwa agencję crewingową do dołączenia do platformy i publikowania ofert bezpośrednio wśród załóg, których Państwo szukają.",
    [
      ["⚓", "Odbiorcy, których Państwo szukają", "Nasi użytkownicy to aktywni marynarze — szeregowi i oficerowie z Polski, Ukrainy i krajów bałtyckich, którzy właśnie teraz szukają kontraktu."],
      ["🚀", "Google for Jobs w ok. 1 godzinę", "Każda oferta otrzymuje znaczniki strukturalne JobPosting i pojawia się w wynikach wyszukiwania pracy Google w ciągu około godziny od publikacji."],
      ["🌍", "Automatyczne tłumaczenie na 4 języki", "Publikują Państwo raz — oferta jest od razu dostępna po polsku, angielsku, ukraińsku i rosyjsku. Bez dodatkowej pracy."],
      ["🎯", "Inteligentne dopasowanie kandydatów", "Platforma dopasowuje oferty do stopni, certyfikatów i doświadczenia marynarzy, dzięki czemu otrzymują Państwo trafne zgłoszenia."],
      ["💼", "Własny panel agencji", "Zarządzanie ofertami, edycja i ponowna publikacja w kilka kliknięć — prosto i wygodnie dla crewing managerów."],
    ],
    "Zarejestruj agencję — bezpłatnie", "Rejestracja zajmuje 5 minut. Publikacja ofert jest bezpłatna.",
    "SeaJobs.pro — portal pracy na morzu dla marynarzy"),

  uk: shell("uk", "Портал морських вакансій — Східна Європа та Балтія",
    "Тисячі активних моряків — розміщуйте вакансії безкоштовно",
    "Вітаю! SeaJobs.pro — це портал вакансій, створений моряками для моряків з України, Польщі, Східної Європи та країн Балтії. Запрошуємо вашу крюїнгову компанію приєднатися до платформи та публікувати вакансії напряму для екіпажів, яких ви шукаєте.",
    [
      ["⚓", "Саме та аудиторія, яка вам потрібна", "Наші відвідувачі — активні моряки: рядовий склад та офіцери з України, Польщі та Балтії, які шукають контракт просто зараз."],
      ["🚀", "Google for Jobs за ~1 годину", "Кожна вакансія отримує структуровану розмітку JobPosting і з'являється в пошуку вакансій Google приблизно за годину після публікації."],
      ["🌍", "Автоматичний переклад на 4 мови", "Публікуєте один раз — вакансія одразу доступна українською, англійською, польською та російською. Без додаткової роботи."],
      ["🎯", "Розумний підбір кандидатів", "Платформа зіставляє вакансії з посадами, сертифікатами та досвідом моряків, тож ви отримуєте релевантні відгуки."],
      ["💼", "Власний кабінет крюїнгу", "Керування вакансіями, редагування та повторна публікація за кілька кліків — зручно для крюїнг-менеджерів."],
    ],
    "Зареєструвати крюїнг — безкоштовно", "Реєстрація займає 5 хвилин. Розміщення вакансій — безкоштовне.",
    "SeaJobs.pro — портал морських вакансій для моряків"),
};
