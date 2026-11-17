// Copy for the weekly vacancy digest e-mail and the unsubscribe page, five
// languages. Server-side only (the cron and the unsubscribe route), so the
// size costs no page anything.

export type DigestCopy = {
  subjectRank: string; // {n} {rank}
  subjectAny: string; // {n}
  headerSub: string;
  heroRank: string; // {rank}
  heroAny: string;
  intro: string;
  others: string;
  cta: string;
  perMonth: string;
  perDay: string;
  noSalary: string;
  why: string;
  unsubscribe: string;
  doneTitle: string;
  doneBody: string;
  badTitle: string;
  badBody: string;
  back: string;
};

export const DIGEST_COPY: Record<string, DigestCopy> = {
  en: {
    subjectRank: "New {rank} vacancies this week: {n}",
    subjectAny: "New vacancies this week on SeaJobs.pro: {n}",
    headerSub: "Weekly vacancy digest",
    heroRank: "New vacancies for {rank}",
    heroAny: "Fresh vacancies this week",
    intro: "The latest postings from crewing agencies on SeaJobs.pro, with salaries where the agency gave one.",
    others: "Other fresh vacancies",
    cta: "All vacancies",
    perMonth: "month",
    perDay: "day",
    noSalary: "salary on request",
    why: "You get this e-mail because you asked for vacancy digests on SeaJobs.pro.",
    unsubscribe: "Unsubscribe",
    doneTitle: "You are unsubscribed",
    doneBody: "We will not send you vacancy digests or news by e-mail any more. You can switch them back on in your account, under Privacy and account.",
    badTitle: "This link does not work",
    badBody: "Switch the digest off in your account, under Privacy and account, or write to partners@seajobs.pro.",
    back: "Go to SeaJobs.pro",
  },
  ru: {
    subjectRank: "Новые вакансии {rank} за неделю: {n}",
    subjectAny: "Новые вакансии за неделю на SeaJobs.pro: {n}",
    headerSub: "Еженедельная подборка вакансий",
    heroRank: "Новые вакансии: {rank}",
    heroAny: "Свежие вакансии недели",
    intro: "Последние вакансии крюинговых компаний на SeaJobs.pro — с зарплатой, если агентство её указало.",
    others: "Другие свежие вакансии",
    cta: "Все вакансии",
    perMonth: "мес",
    perDay: "день",
    noSalary: "зарплата по запросу",
    why: "Вы получили это письмо, потому что подписались на подборки вакансий на SeaJobs.pro.",
    unsubscribe: "Отписаться",
    doneTitle: "Вы отписались",
    doneBody: "Мы больше не будем присылать вам подборки вакансий и новости на почту. Включить их снова можно в кабинете, в разделе «Приватность и аккаунт».",
    badTitle: "Ссылка не работает",
    badBody: "Отключите подборку в кабинете, в разделе «Приватность и аккаунт», или напишите на partners@seajobs.pro.",
    back: "На SeaJobs.pro",
  },
  ua: {
    subjectRank: "Нові вакансії {rank} за тиждень: {n}",
    subjectAny: "Нові вакансії за тиждень на SeaJobs.pro: {n}",
    headerSub: "Щотижнева добірка вакансій",
    heroRank: "Нові вакансії: {rank}",
    heroAny: "Свіжі вакансії тижня",
    intro: "Останні вакансії крюїнгових компаній на SeaJobs.pro — із зарплатою, якщо агентство її вказало.",
    others: "Інші свіжі вакансії",
    cta: "Усі вакансії",
    perMonth: "міс",
    perDay: "день",
    noSalary: "зарплата за запитом",
    why: "Ви отримали цей лист, бо підписалися на добірки вакансій на SeaJobs.pro.",
    unsubscribe: "Відписатися",
    doneTitle: "Ви відписалися",
    doneBody: "Ми більше не надсилатимемо вам добірки вакансій і новини на пошту. Увімкнути їх знову можна в кабінеті, у розділі «Приватність і акаунт».",
    badTitle: "Посилання не працює",
    badBody: "Вимкніть добірку в кабінеті, у розділі «Приватність і акаунт», або напишіть на partners@seajobs.pro.",
    back: "На SeaJobs.pro",
  },
  pl: {
    subjectRank: "Nowe oferty {rank} w tym tygodniu: {n}",
    subjectAny: "Nowe oferty w tym tygodniu na SeaJobs.pro: {n}",
    headerSub: "Cotygodniowy przegląd ofert",
    heroRank: "Nowe oferty: {rank}",
    heroAny: "Świeże oferty tygodnia",
    intro: "Najnowsze oferty agencji crewingowych na SeaJobs.pro — z wynagrodzeniem, jeśli agencja je podała.",
    others: "Inne świeże oferty",
    cta: "Wszystkie oferty",
    perMonth: "mies.",
    perDay: "dzień",
    noSalary: "wynagrodzenie na zapytanie",
    why: "Otrzymujesz ten e-mail, ponieważ zapisałeś się na przegląd ofert w SeaJobs.pro.",
    unsubscribe: "Wypisz się",
    doneTitle: "Wypisano Cię",
    doneBody: "Nie będziemy już wysyłać Ci przeglądów ofert ani wiadomości e-mailem. Możesz je ponownie włączyć na swoim koncie, w sekcji Prywatność i konto.",
    badTitle: "Ten link nie działa",
    badBody: "Wyłącz przegląd na swoim koncie, w sekcji Prywatność i konto, albo napisz na partners@seajobs.pro.",
    back: "Przejdź do SeaJobs.pro",
  },
  ro: {
    subjectRank: "Posturi noi de {rank} săptămâna aceasta: {n}",
    subjectAny: "Posturi noi săptămâna aceasta pe SeaJobs.pro: {n}",
    headerSub: "Selecția săptămânală de posturi",
    heroRank: "Posturi noi: {rank}",
    heroAny: "Posturile noi ale săptămânii",
    intro: "Cele mai noi posturi ale agențiilor de crewing de pe SeaJobs.pro — cu salariu, dacă agenția l-a indicat.",
    others: "Alte posturi noi",
    cta: "Toate posturile",
    perMonth: "lună",
    perDay: "zi",
    noSalary: "salariu la cerere",
    why: "Primești acest e-mail pentru că te-ai abonat la selecțiile de posturi pe SeaJobs.pro.",
    unsubscribe: "Dezabonare",
    doneTitle: "Te-ai dezabonat",
    doneBody: "Nu îți vom mai trimite selecții de posturi sau noutăți pe e-mail. Le poți reactiva din cont, la Confidențialitate și cont.",
    badTitle: "Acest link nu funcționează",
    badBody: "Oprește selecția din cont, la Confidențialitate și cont, sau scrie la partners@seajobs.pro.",
    back: "Mergi la SeaJobs.pro",
  },
};

export function digestCopy(lang: string | null | undefined): DigestCopy {
  return DIGEST_COPY[lang ?? "en"] ?? DIGEST_COPY.en;
}
