import type { ConsentKind } from "@/lib/consent";

// Copy for the consent boxes: the registration form (outside the [locale]
// tree, so not in lib/i18n.ts), the banner in both cabinets and the
// "Privacy and account" page. About 1.5 KB a language; kept here rather than
// in the site dictionary for the same reason as lib/authI18n.ts.
//
// In a box label, the first [...] links to the Terms and the second to the
// Privacy Policy (renderConsentLabel in components/ConsentText.tsx).

export type ConsentCopy = {
  boxes: Record<ConsentKind, string>;
  googleNotice: string;
  needAll: string;
  bannerTitle: string;
  bannerBody: string;
  confirm: string;
  later: string;
  failed: string;
  thanks: string;
  listTitle: string;
  given: string;
  withdraw: string;
};

export const CONSENT_COPY: Record<string, ConsentCopy> = {
  en: {
    boxes: {
      privacy: "I accept the [Terms of Service] and the [Privacy Policy] and consent to the processing of my personal data to run my account on SeaJobs.pro.",
      profile_sharing: "I agree that crewing companies on SeaJobs.pro may see my profile and CV, and receive them when I apply for a vacancy.",
      candidate_data: "I will use seafarers' personal data only to recruit crew and will not pass it on to third parties.",
    },
    googleNotice: "By continuing with Google you accept the [Terms of Service] and the [Privacy Policy].",
    needAll: "Please tick the consent boxes to continue.",
    bannerTitle: "Please confirm your consent to the processing of personal data",
    bannerBody: "We have updated our Privacy Policy and Terms. It takes one click.",
    confirm: "I confirm",
    later: "Later",
    failed: "Could not save. Try again in a minute.",
    thanks: "Thank you — your consent is saved.",
    listTitle: "Consent to data processing",
    given: "given {date}",
    withdraw: "To withdraw consent, delete your account below or write to partners@seajobs.pro.",
  },
  ru: {
    boxes: {
      privacy: "Принимаю [Условия использования] и [Политику конфиденциальности] и даю согласие на обработку моих персональных данных для работы моего аккаунта на SeaJobs.pro.",
      profile_sharing: "Согласен, что крюинговые компании на SeaJobs.pro видят мой профиль и CV и получают их, когда я откликаюсь на вакансию.",
      candidate_data: "Обязуюсь использовать персональные данные моряков только для подбора экипажа и не передавать их третьим лицам.",
    },
    googleNotice: "Продолжая через Google, вы принимаете [Условия использования] и [Политику конфиденциальности].",
    needAll: "Отметьте галочки согласия, чтобы продолжить.",
    bannerTitle: "Подтвердите согласие на обработку персональных данных",
    bannerBody: "Мы обновили Политику конфиденциальности и Условия. Это займёт один клик.",
    confirm: "Подтверждаю",
    later: "Позже",
    failed: "Не удалось сохранить. Попробуйте через минуту.",
    thanks: "Спасибо — согласие сохранено.",
    listTitle: "Согласие на обработку данных",
    given: "дано {date}",
    withdraw: "Чтобы отозвать согласие, удалите аккаунт ниже или напишите на partners@seajobs.pro.",
  },
  ua: {
    boxes: {
      privacy: "Приймаю [Умови використання] та [Політику конфіденційності] і даю згоду на обробку моїх персональних даних для роботи мого акаунта на SeaJobs.pro.",
      profile_sharing: "Погоджуюся, що крюїнгові компанії на SeaJobs.pro бачать мій профіль і CV та отримують їх, коли я відгукуюся на вакансію.",
      candidate_data: "Зобов'язуюся використовувати персональні дані моряків лише для підбору екіпажу і не передавати їх третім особам.",
    },
    googleNotice: "Продовжуючи через Google, ви приймаєте [Умови використання] та [Політику конфіденційності].",
    needAll: "Позначте галочки згоди, щоб продовжити.",
    bannerTitle: "Підтвердьте згоду на обробку персональних даних",
    bannerBody: "Ми оновили Політику конфіденційності та Умови. Це займе один клік.",
    confirm: "Підтверджую",
    later: "Пізніше",
    failed: "Не вдалося зберегти. Спробуйте за хвилину.",
    thanks: "Дякуємо — згоду збережено.",
    listTitle: "Згода на обробку даних",
    given: "надано {date}",
    withdraw: "Щоб відкликати згоду, видаліть акаунт нижче або напишіть на partners@seajobs.pro.",
  },
  pl: {
    boxes: {
      privacy: "Akceptuję [Regulamin] i [Politykę prywatności] oraz wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia mojego konta w SeaJobs.pro.",
      profile_sharing: "Zgadzam się, aby firmy crewingowe w SeaJobs.pro widziały mój profil i CV oraz otrzymywały je, gdy aplikuję na ofertę.",
      candidate_data: "Zobowiązuję się wykorzystywać dane osobowe marynarzy wyłącznie do rekrutacji załogi i nie przekazywać ich osobom trzecim.",
    },
    googleNotice: "Kontynuując przez Google, akceptujesz [Regulamin] i [Politykę prywatności].",
    needAll: "Zaznacz pola zgody, aby kontynuować.",
    bannerTitle: "Potwierdź zgodę na przetwarzanie danych osobowych",
    bannerBody: "Zaktualizowaliśmy Politykę prywatności i Regulamin. To jedno kliknięcie.",
    confirm: "Potwierdzam",
    later: "Później",
    failed: "Nie udało się zapisać. Spróbuj za minutę.",
    thanks: "Dziękujemy — zgoda została zapisana.",
    listTitle: "Zgoda na przetwarzanie danych",
    given: "udzielona {date}",
    withdraw: "Aby wycofać zgodę, usuń konto poniżej lub napisz na partners@seajobs.pro.",
  },
  ro: {
    boxes: {
      privacy: "Accept [Termenii și condițiile] și [Politica de confidențialitate] și îmi dau consimțământul pentru prelucrarea datelor mele personale în scopul funcționării contului meu pe SeaJobs.pro.",
      profile_sharing: "Sunt de acord ca agențiile de crewing de pe SeaJobs.pro să vadă profilul și CV-ul meu și să le primească atunci când aplic la un post.",
      candidate_data: "Mă angajez să folosesc datele personale ale marinarilor doar pentru recrutarea echipajului și să nu le transmit terților.",
    },
    googleNotice: "Continuând cu Google, accepți [Termenii și condițiile] și [Politica de confidențialitate].",
    needAll: "Bifează căsuțele de consimțământ pentru a continua.",
    bannerTitle: "Confirmă consimțământul pentru prelucrarea datelor personale",
    bannerBody: "Am actualizat Politica de confidențialitate și Termenii. Durează un clic.",
    confirm: "Confirm",
    later: "Mai târziu",
    failed: "Nu s-a putut salva. Încearcă din nou peste un minut.",
    thanks: "Mulțumim — consimțământul a fost salvat.",
    listTitle: "Consimțământ pentru prelucrarea datelor",
    given: "acordat {date}",
    withdraw: "Pentru a retrage consimțământul, șterge contul mai jos sau scrie la partners@seajobs.pro.",
  },
};

export function consentCopy(lang: string): ConsentCopy {
  return CONSENT_COPY[lang] ?? CONSENT_COPY.en;
}
