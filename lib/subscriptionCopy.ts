// The words on /seafarer/subscription, in five languages.
//
// Kept apart from lib/subscription.ts on purpose: that file is imported by the
// vacancy, company and CV pages for their lock lines, and this map — about 10 KB
// — would otherwise ride along on every vacancy anybody opens.

import { FREE_UNLOCKS_PER_WEEK, type PlanId } from "@/lib/subscription";

export type SubCopy = {
  title: string;
  lede: string;
  perks: string[];
  free: string;
  plan: Record<PlanId, string>;
  /** `{price}` is that plan's price per month, rounded. */
  perMonth: string;
  best: string;
  buy: string;
  extend: string;
  /** `{date}` is the last day of access. */
  activeUntil: string;
  inactive: string;
  waiting: string;
  trouble: string;
  soon: string;
  noRenew: string;
  /** `{email}` is the account's address. */
  payNote: string;
  legal: string;
  back: string;
  backCv: string;
};

export const SUB_COPY: Record<string, SubCopy> = {
  en: {
    title: "SeaJobs subscription",
    lede: "Without a subscription you can open contacts {free} times a week, with applying. A subscription removes the limit:",
    perks: [
      "Applying through the portal — the site sends your CV straight to the agency",
      "Crewing agencies' e-mails and phones on every vacancy",
      "Writing to the agency from your own mailbox, with a link to your CV",
      "Contact people of crewing companies on their pages",
      "Your CV as PDF, image and editable Word, in every fleet template",
    ],
    free: "Free without a subscription: vacancies, your profile, building and editing your CV, and {free} contact views a week, with applying.",
    plan: { "3m": "3 months", "6m": "6 months", "12m": "12 months" },
    perMonth: "≈ {price} a month",
    best: "Best value",
    buy: "Subscribe",
    extend: "Add",
    activeUntil: "Your subscription is active until {date}",
    inactive: "No active subscription",
    waiting: "Waiting for the payment to arrive. It usually takes a few seconds; this page unlocks by itself.",
    trouble: "Paid and still locked? Write to partners@seajobs.pro — we will open it by hand.",
    soon: "Subscriptions open in a few days.",
    noRenew: "One payment, no auto-renewal. Paying again before it ends adds the months on top.",
    payNote: "Pay with {email}, the address of this account — that is how the payment finds you.",
    legal: "We never take money for a contract, a place on board, a medical, certificates or visas. The subscription pays for the portal's tools — applying through the portal, contacts and CV files — and does not guarantee a contract.",
    back: "Back to the vacancy",
    backCv: "Back to my CV",
  },
  ru: {
    title: "Подписка SeaJobs",
    lede: "Без подписки можно открыть контакты {free} раза в неделю — с откликом. Подписка снимает лимит:",
    perks: [
      "Отклик через портал — сайт сам отправит ваше CV в крюинг",
      "E-mail и телефоны крюингов в каждой вакансии",
      "Письмо крюингу со своей почты, со ссылкой на ваше CV",
      "Контактные лица крюинговых компаний на их страницах",
      "Ваше CV в PDF, картинкой и редактируемым Word во всех шаблонах флота",
    ],
    free: "Бесплатно и без подписки: вакансии, профиль, сборка и редактирование CV и {free} просмотра контактов в неделю с откликом.",
    plan: { "3m": "3 месяца", "6m": "6 месяцев", "12m": "12 месяцев" },
    perMonth: "≈ {price} в месяц",
    best: "Выгоднее всего",
    buy: "Оформить",
    extend: "Добавить",
    activeUntil: "Подписка активна до {date}",
    inactive: "Подписки нет",
    waiting: "Ждём подтверждения оплаты. Обычно это несколько секунд, страница откроется сама.",
    trouble: "Оплатили, а доступа нет? Напишите на partners@seajobs.pro — откроем вручную.",
    soon: "Подписка откроется через несколько дней.",
    noRenew: "Один платёж, без автопродления. Если оплатить ещё раз до окончания, месяцы добавятся сверху.",
    payNote: "Оплачивайте с почты {email} — это адрес этого аккаунта, по нему оплата находит вас.",
    legal: "Мы никогда не берём денег за контракт, место на судне, медкомиссию, сертификаты или визы. Подписка — это оплата инструментов портала: отклика через портал, контактов и файлов CV. Контракт она не гарантирует.",
    back: "Вернуться к вакансии",
    backCv: "Вернуться к моему CV",
  },
  ua: {
    title: "Підписка SeaJobs",
    lede: "Без підписки можна відкрити контакти {free} рази на тиждень — з відгуком. Підписка знімає ліміт:",
    perks: [
      "Відгук через портал — сайт сам надішле ваше CV у крюїнг",
      "E-mail і телефони крюїнгів у кожній вакансії",
      "Лист крюїнгу зі своєї пошти, з посиланням на ваше CV",
      "Контактні особи крюїнгових компаній на їхніх сторінках",
      "Ваше CV у PDF, картинкою та редагованим Word у всіх шаблонах флоту",
    ],
    free: "Безкоштовно і без підписки: вакансії, профіль, збірка й редагування CV та {free} перегляди контактів на тиждень з відгуком.",
    plan: { "3m": "3 місяці", "6m": "6 місяців", "12m": "12 місяців" },
    perMonth: "≈ {price} на місяць",
    best: "Найвигідніше",
    buy: "Оформити",
    extend: "Додати",
    activeUntil: "Підписка активна до {date}",
    inactive: "Підписки немає",
    waiting: "Чекаємо підтвердження оплати. Зазвичай це кілька секунд, сторінка відкриється сама.",
    trouble: "Оплатили, а доступу немає? Напишіть на partners@seajobs.pro — відкриємо вручну.",
    soon: "Підписка відкриється за кілька днів.",
    noRenew: "Один платіж, без автопродовження. Якщо оплатити ще раз до кінця, місяці додадуться зверху.",
    payNote: "Оплачуйте з пошти {email} — це адреса цього акаунта, за нею оплата знаходить вас.",
    legal: "Ми ніколи не беремо грошей за контракт, місце на судні, медкомісію, сертифікати чи візи. Підписка — це оплата інструментів порталу: відгуку через портал, контактів і файлів CV. Контракт вона не гарантує.",
    back: "Повернутися до вакансії",
    backCv: "Повернутися до мого CV",
  },
  pl: {
    title: "Subskrypcja SeaJobs",
    lede: "Bez subskrypcji możesz odkryć kontakty {free} razy w tygodniu — z aplikowaniem. Subskrypcja znosi limit:",
    perks: [
      "Aplikowanie przez portal — strona sama wyśle Twoje CV do agencji",
      "E-maile i telefony agencji crewingowych w każdej ofercie",
      "List do agencji z własnej skrzynki, z linkiem do Twojego CV",
      "Osoby kontaktowe firm crewingowych na ich stronach",
      "Twoje CV jako PDF, obraz i edytowalny Word, we wszystkich szablonach floty",
    ],
    free: "Za darmo, bez subskrypcji: oferty, profil, tworzenie i edycja CV oraz {free} odsłony kontaktów tygodniowo z aplikowaniem.",
    plan: { "3m": "3 miesiące", "6m": "6 miesięcy", "12m": "12 miesięcy" },
    perMonth: "≈ {price} miesięcznie",
    best: "Najkorzystniej",
    buy: "Wykup",
    extend: "Dodaj",
    activeUntil: "Subskrypcja aktywna do {date}",
    inactive: "Brak aktywnej subskrypcji",
    waiting: "Czekamy na potwierdzenie płatności. Zwykle kilka sekund, strona odblokuje się sama.",
    trouble: "Zapłacone, a nadal zablokowane? Napisz na partners@seajobs.pro — otworzymy ręcznie.",
    soon: "Subskrypcja ruszy za kilka dni.",
    noRenew: "Jedna płatność, bez automatycznego odnawiania. Zapłata przed końcem dodaje miesiące na wierzch.",
    payNote: "Płać z adresu {email} — to adres tego konta, po nim płatność Cię znajduje.",
    legal: "Nigdy nie bierzemy pieniędzy za kontrakt, miejsce na statku, badania, certyfikaty ani wizy. Subskrypcja to opłata za narzędzia portalu — aplikowanie przez portal, kontakty i pliki CV — i nie gwarantuje kontraktu.",
    back: "Wróć do oferty",
    backCv: "Wróć do mojego CV",
  },
  ro: {
    title: "Abonament SeaJobs",
    lede: "Fără abonament poți deschide contactele de {free} ori pe săptămână — cu aplicare. Abonamentul ridică limita:",
    perks: [
      "Aplicarea prin portal — site-ul trimite singur CV-ul tău agenției",
      "E-mailurile și telefoanele agențiilor de crewing la fiecare post",
      "Scrisoare către agenție din propriul e-mail, cu link la CV-ul tău",
      "Persoanele de contact ale companiilor de crewing pe paginile lor",
      "CV-ul tău ca PDF, imagine și Word editabil, în toate șabloanele de flotă",
    ],
    free: "Gratuit, fără abonament: posturile, profilul, crearea și editarea CV-ului și {free} vizualizări de contacte pe săptămână, cu aplicare.",
    plan: { "3m": "3 luni", "6m": "6 luni", "12m": "12 luni" },
    perMonth: "≈ {price} pe lună",
    best: "Cel mai avantajos",
    buy: "Abonează-te",
    extend: "Adaugă",
    activeUntil: "Abonamentul este activ până la {date}",
    inactive: "Niciun abonament activ",
    waiting: "Așteptăm confirmarea plății. De obicei durează câteva secunde, pagina se deblochează singură.",
    trouble: "Ai plătit și tot e blocat? Scrie la partners@seajobs.pro — îl deschidem manual.",
    soon: "Abonamentul se deschide în câteva zile.",
    noRenew: "O singură plată, fără reînnoire automată. Dacă plătești din nou înainte de final, lunile se adaugă peste.",
    payNote: "Plătește de pe {email}, adresa acestui cont — după ea te găsește plata.",
    legal: "Nu luăm niciodată bani pentru un contract, un loc la bord, vizita medicală, certificate sau vize. Abonamentul plătește uneltele portalului — aplicarea prin portal, contacte și fișiere CV — și nu garantează un contract.",
    back: "Înapoi la post",
    backCv: "Înapoi la CV-ul meu",
  },
};

/** `SUB_COPY[lang]`, English when the language is missing, with `{free}` filled. `perMonth` is filled per plan by the page. */
export function subCopy(lang: string): SubCopy {
  const c = SUB_COPY[lang] ?? SUB_COPY.en;
  const n = String(FREE_UNLOCKS_PER_WEEK);
  return { ...c, lede: c.lede.replace("{free}", n), free: c.free.replace("{free}", n) };
}
