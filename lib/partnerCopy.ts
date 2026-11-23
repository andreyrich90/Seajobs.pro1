// Copy for "SeaJobs Partner" in the company cabinet: the invitation window,
// the banner above the vacancy form and the /company/verification page.
// Five languages, about 2 KB each; only the company cabinet imports it.

export type PartnerCopy = {
  modalTitle: string;
  modalBody: string;
  whatTitle: string;
  what: string[];
  privacy: string;
  upload: string;
  later: string;
  banner: string;
  bannerCta: string;
  pageTitle: string;
  country: string;
  registry: string;
  note: string;
  files: string;
  choose: string;
  submit: string;
  sending: string;
  pending: string;
  approved: string;
  rejected: string;
  reason: string;
  resubmit: string;
  errFiles: string;
  errTooBig: string;
  errType: string;
  errFailed: string;
  sent: string;
};

export const PARTNER_COPY: Record<string, PartnerCopy> = {
  en: {
    modalTitle: "Become a SeaJobs Partner",
    modalBody: "Seafarers keep running into fake crewing agencies. Confirm that your company is a licensed crewing agency, and your vacancies will be shown in the \"SeaJobs Partners\" block at the top of the site with the ✓ badge.",
    whatTitle: "What to attach (photo or PDF):",
    what: [
      "a licence or certificate for seafarer recruitment and placement — for example, an MLC 2006 (Regulation 1.4) certificate of compliance or an entry in your national register of employment agencies (KRAZ in Poland);",
      "an extract from the company register, or the registration number;",
      "if you have one — a letter of authority from the shipowner you recruit for.",
    ],
    privacy: "Only the SeaJobs team sees the documents: we do not publish them or pass them to anyone. The check takes up to 2 working days.",
    upload: "Upload documents",
    later: "Later",
    banner: "Become a SeaJobs Partner — your vacancies will be shown first, with the ✓ badge.",
    bannerCta: "Verify the company",
    pageTitle: "SeaJobs Partner",
    country: "Country of registration",
    registry: "Registration or licence number",
    note: "Comment (optional)",
    files: "Documents — up to 3 files, JPG, PNG, WebP or PDF. Photos are reduced automatically; PDFs up to 4 MB in total",
    choose: "Choose files",
    submit: "Send for review",
    sending: "Sending…",
    pending: "Your documents are being reviewed. We will reply within 2 working days.",
    approved: "Your company is a SeaJobs Partner. Your vacancies are shown in the \"SeaJobs Partners\" block with the ✓ badge.",
    rejected: "The documents were not accepted.",
    reason: "Reason:",
    resubmit: "Please upload the documents again.",
    errFiles: "Attach at least one file.",
    errTooBig: "The files are larger than 4 MB in total. Send a smaller PDF or a photo instead.",
    errType: "Only JPG, PNG, WebP or PDF files.",
    errFailed: "Could not send. Please try again.",
    sent: "Thank you — the documents have been sent for review.",
  },
  ru: {
    modalTitle: "Станьте Партнёром SeaJobs",
    modalBody: "Моряки всё чаще сталкиваются с фальшивыми крюингами. Подтвердите, что ваша компания — официальное крюинговое агентство, и ваши вакансии будут показываться в блоке «Партнёры SeaJobs» в начале сайта со значком ✓.",
    whatTitle: "Что приложить (фото или PDF):",
    what: [
      "лицензию или сертификат на набор и трудоустройство моряков — например, сертификат соответствия MLC 2006 (Правило 1.4) или запись в национальном реестре агентств (в Польше — KRAZ);",
      "выписку из реестра компаний или регистрационный номер;",
      "если есть — доверенность или письмо от судовладельца, для которого вы набираете экипаж.",
    ],
    privacy: "Документы видит только администрация SeaJobs: мы их не публикуем и не передаём третьим лицам. Проверка — до 2 рабочих дней.",
    upload: "Загрузить документы",
    later: "Позже",
    banner: "Станьте Партнёром SeaJobs — ваши вакансии будут показываться первыми, со значком ✓.",
    bannerCta: "Подтвердить компанию",
    pageTitle: "Партнёр SeaJobs",
    country: "Страна регистрации",
    registry: "Регистрационный номер или номер лицензии",
    note: "Комментарий (необязательно)",
    files: "Документы — до 3 файлов, JPG, PNG, WebP или PDF. Фото уменьшаются автоматически; PDF — до 4 МБ в сумме",
    choose: "Выбрать файлы",
    submit: "Отправить на проверку",
    sending: "Отправляем…",
    pending: "Документы на проверке. Мы ответим в течение 2 рабочих дней.",
    approved: "Ваша компания — Партнёр SeaJobs. Ваши вакансии показываются в блоке «Партнёры SeaJobs» со значком ✓.",
    rejected: "Документы не приняты.",
    reason: "Причина:",
    resubmit: "Загрузите документы ещё раз.",
    errFiles: "Приложите хотя бы один файл.",
    errTooBig: "Файлы больше 4 МБ в сумме. Пришлите PDF поменьше или фото.",
    errType: "Только файлы JPG, PNG, WebP или PDF.",
    errFailed: "Не удалось отправить. Попробуйте ещё раз.",
    sent: "Спасибо — документы отправлены на проверку.",
  },
  ua: {
    modalTitle: "Станьте Партнером SeaJobs",
    modalBody: "Моряки дедалі частіше натрапляють на фальшиві крюїнги. Підтвердьте, що ваша компанія — офіційне крюїнгове агентство, і ваші вакансії показуватимуться в блоці «Партнери SeaJobs» на початку сайту зі значком ✓.",
    whatTitle: "Що додати (фото або PDF):",
    what: [
      "ліцензію або сертифікат на набір і працевлаштування моряків — наприклад, сертифікат відповідності MLC 2006 (Правило 1.4) або запис у національному реєстрі агентств (у Польщі — KRAZ);",
      "витяг із реєстру компаній або реєстраційний номер;",
      "якщо є — довіреність або лист від судновласника, для якого ви набираєте екіпаж.",
    ],
    privacy: "Документи бачить лише адміністрація SeaJobs: ми їх не публікуємо і не передаємо третім особам. Перевірка — до 2 робочих днів.",
    upload: "Завантажити документи",
    later: "Пізніше",
    banner: "Станьте Партнером SeaJobs — ваші вакансії показуватимуться першими, зі значком ✓.",
    bannerCta: "Підтвердити компанію",
    pageTitle: "Партнер SeaJobs",
    country: "Країна реєстрації",
    registry: "Реєстраційний номер або номер ліцензії",
    note: "Коментар (необов'язково)",
    files: "Документи — до 3 файлів, JPG, PNG, WebP або PDF. Фото зменшуються автоматично; PDF — до 4 МБ разом",
    choose: "Вибрати файли",
    submit: "Надіслати на перевірку",
    sending: "Надсилаємо…",
    pending: "Документи на перевірці. Ми відповімо протягом 2 робочих днів.",
    approved: "Ваша компанія — Партнер SeaJobs. Ваші вакансії показуються в блоці «Партнери SeaJobs» зі значком ✓.",
    rejected: "Документи не прийнято.",
    reason: "Причина:",
    resubmit: "Завантажте документи ще раз.",
    errFiles: "Додайте хоча б один файл.",
    errTooBig: "Файли більші за 4 МБ разом. Надішліть менший PDF або фото.",
    errType: "Лише файли JPG, PNG, WebP або PDF.",
    errFailed: "Не вдалося надіслати. Спробуйте ще раз.",
    sent: "Дякуємо — документи надіслано на перевірку.",
  },
  pl: {
    modalTitle: "Zostań Partnerem SeaJobs",
    modalBody: "Marynarze coraz częściej trafiają na fałszywe agencje crewingowe. Potwierdź, że Twoja firma jest oficjalną agencją crewingową, a Twoje oferty będą wyświetlane w bloku „Partnerzy SeaJobs” na początku serwisu z oznaczeniem ✓.",
    whatTitle: "Co załączyć (zdjęcie lub PDF):",
    what: [
      "licencję lub certyfikat na rekrutację i pośrednictwo pracy dla marynarzy — na przykład certyfikat zgodności z MLC 2006 (Prawidło 1.4) lub wpis do krajowego rejestru agencji zatrudnienia (KRAZ);",
      "odpis z rejestru firm lub numer rejestrowy;",
      "jeśli masz — pełnomocnictwo lub list od armatora, dla którego rekrutujesz załogę.",
    ],
    privacy: "Dokumenty widzi tylko administracja SeaJobs: nie publikujemy ich i nie przekazujemy nikomu. Weryfikacja trwa do 2 dni roboczych.",
    upload: "Prześlij dokumenty",
    later: "Później",
    banner: "Zostań Partnerem SeaJobs — Twoje oferty będą wyświetlane jako pierwsze, z oznaczeniem ✓.",
    bannerCta: "Zweryfikuj firmę",
    pageTitle: "Partner SeaJobs",
    country: "Kraj rejestracji",
    registry: "Numer rejestrowy lub numer licencji",
    note: "Komentarz (opcjonalnie)",
    files: "Dokumenty — do 3 plików, JPG, PNG, WebP lub PDF. Zdjęcia są zmniejszane automatycznie; PDF do 4 MB łącznie",
    choose: "Wybierz pliki",
    submit: "Wyślij do weryfikacji",
    sending: "Wysyłanie…",
    pending: "Dokumenty są weryfikowane. Odpowiemy w ciągu 2 dni roboczych.",
    approved: "Twoja firma jest Partnerem SeaJobs. Twoje oferty są wyświetlane w bloku „Partnerzy SeaJobs” z oznaczeniem ✓.",
    rejected: "Dokumenty nie zostały przyjęte.",
    reason: "Powód:",
    resubmit: "Prześlij dokumenty ponownie.",
    errFiles: "Załącz co najmniej jeden plik.",
    errTooBig: "Pliki mają łącznie ponad 4 MB. Wyślij mniejszy PDF albo zdjęcie.",
    errType: "Tylko pliki JPG, PNG, WebP lub PDF.",
    errFailed: "Nie udało się wysłać. Spróbuj ponownie.",
    sent: "Dziękujemy — dokumenty zostały wysłane do weryfikacji.",
  },
  ro: {
    modalTitle: "Deveniți Partener SeaJobs",
    modalBody: "Marinarii întâlnesc tot mai des agenții de crewing false. Confirmați că firma dumneavoastră este o agenție de crewing oficială, iar posturile dumneavoastră vor apărea în blocul „Parteneri SeaJobs” la începutul site-ului, cu insigna ✓.",
    whatTitle: "Ce să atașați (fotografie sau PDF):",
    what: [
      "licența sau certificatul pentru recrutarea și plasarea marinarilor — de exemplu, certificatul de conformitate MLC 2006 (Regula 1.4) sau înscrierea în registrul național al agențiilor de ocupare;",
      "un extras din registrul comerțului sau numărul de înregistrare;",
      "dacă aveți — o împuternicire sau o scrisoare de la armatorul pentru care recrutați echipajul.",
    ],
    privacy: "Documentele le vede doar echipa SeaJobs: nu le publicăm și nu le transmitem nimănui. Verificarea durează până la 2 zile lucrătoare.",
    upload: "Încărcați documentele",
    later: "Mai târziu",
    banner: "Deveniți Partener SeaJobs — posturile dumneavoastră vor apărea primele, cu insigna ✓.",
    bannerCta: "Verificați firma",
    pageTitle: "Partener SeaJobs",
    country: "Țara de înregistrare",
    registry: "Numărul de înregistrare sau al licenței",
    note: "Comentariu (opțional)",
    files: "Documente — până la 3 fișiere, JPG, PNG, WebP sau PDF. Fotografiile se micșorează automat; PDF până la 4 MB în total",
    choose: "Alegeți fișierele",
    submit: "Trimiteți spre verificare",
    sending: "Se trimite…",
    pending: "Documentele sunt în verificare. Vă răspundem în maximum 2 zile lucrătoare.",
    approved: "Firma dumneavoastră este Partener SeaJobs. Posturile dumneavoastră apar în blocul „Parteneri SeaJobs” cu insigna ✓.",
    rejected: "Documentele nu au fost acceptate.",
    reason: "Motiv:",
    resubmit: "Încărcați documentele din nou.",
    errFiles: "Atașați cel puțin un fișier.",
    errTooBig: "Fișierele depășesc 4 MB în total. Trimiteți un PDF mai mic sau o fotografie.",
    errType: "Doar fișiere JPG, PNG, WebP sau PDF.",
    errFailed: "Nu s-a putut trimite. Încercați din nou.",
    sent: "Mulțumim — documentele au fost trimise spre verificare.",
  },
};

export function partnerCopy(lang: string): PartnerCopy {
  return PARTNER_COPY[lang] ?? PARTNER_COPY.en;
}

export const PARTNER_MAX_FILES = 3;
// In total, not per file: a Vercel function refuses a request body over
// 4.5 MB before the route sees it. Photos are shrunk in the browser first
// (app/(site)/[locale]/company/verification), so only a large PDF meets this.
export const PARTNER_MAX_BYTES = 4 * 1024 * 1024;
export const PARTNER_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
