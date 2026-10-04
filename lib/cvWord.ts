/**
 * The paid Word export — price, checkout link, and the copy around them.
 *
 * Mirrors how `lib/cvBlast.ts` sells the CV distribution, for the same reason:
 * whether this sells at all is one field. Paste a Buy Me a Coffee "extra" into
 * `CV_WORD.payUrl` and the button becomes a checkout; leave it null and the
 * page says the export is not on sale yet instead of taking money it cannot
 * deliver against.
 *
 * **The price here must match the product the link points at.** The button
 * shows this number, the checkout charges whatever BMC was told, and a reader
 * who sees $5 and is charged $9 is right to be angry.
 *
 * **Dollars only**, like /cv-distribution: the checkout charges in dollars, so
 * quoting euro would be a figure nobody is ever billed.
 */
export const CV_WORD = {
  usd: 6.49,
  /** Buy Me a Coffee extra priced at CV_WORD.usd. Null until the product exists. */
  payUrl: "https://buymeacoffee.com/seajobs.pro/e/583093" as string | null,
};

export const CV_WORD_SELLING = CV_WORD.payUrl !== null;

export type CvWordCopy = {
  /** Button label before buying, e.g. "Word — $5". */
  buy: string;
  /** Button label once it is unlocked. */
  download: string;
  /** One line under the buttons saying what the file is. */
  what: string;
  /** Shown while the payment has not arrived yet. */
  waiting: string;
  /** The "I paid but nothing happened" escape hatch. */
  trouble: string;
  /** Shown when no checkout link is configured yet. */
  soon: string;
  /** Why this one costs money when the others do not. */
  why: string;
};

export const CV_WORD_COPY: Record<string, CvWordCopy> = {
  en: {
    buy: "Get it in Word",
    download: "Download Word (.docx)",
    what: "An editable .docx with your details already filled in — the format crewing managers ask for.",
    waiting: "Waiting for the payment to arrive. It usually takes a few seconds; this page unlocks by itself.",
    trouble: "Paid and still locked? Tell us — we will open it by hand.",
    soon: "The Word export is not on sale yet. PDF and image stay free.",
    why: "PDF and image stay free. Word costs money because it is the one you can edit afterwards.",
  },
  ru: {
    buy: "Получить в Word",
    download: "Скачать Word (.docx)",
    what: "Редактируемый .docx с уже заполненными данными — тот формат, который просят крюинги.",
    waiting: "Ждём подтверждения оплаты. Обычно это несколько секунд, страница откроется сама.",
    trouble: "Оплатили, а доступа нет? Напишите нам — откроем вручную.",
    soon: "Выгрузка в Word пока не продаётся. PDF и картинка остаются бесплатными.",
    why: "PDF и картинка остаются бесплатными. Word платный, потому что его можно редактировать.",
  },
  ua: {
    buy: "Отримати у Word",
    download: "Завантажити Word (.docx)",
    what: "Редагований .docx із уже заповненими даними — формат, який просять крюїнги.",
    waiting: "Чекаємо підтвердження оплати. Зазвичай це кілька секунд, сторінка відкриється сама.",
    trouble: "Оплатили, а доступу немає? Напишіть нам — відкриємо вручну.",
    soon: "Вивантаження у Word поки не продається. PDF і зображення лишаються безкоштовними.",
    why: "PDF і зображення лишаються безкоштовними. Word платний, бо його можна редагувати.",
  },
  pl: {
    buy: "Pobierz w Wordzie",
    download: "Pobierz Word (.docx)",
    what: "Edytowalny plik .docx z już wypełnionymi danymi — format, o który proszą crewingi.",
    waiting: "Czekamy na potwierdzenie płatności. Zwykle kilka sekund, strona odblokuje się sama.",
    trouble: "Zapłacone, a nadal zablokowane? Napisz do nas — otworzymy ręcznie.",
    soon: "Eksport do Worda nie jest jeszcze w sprzedaży. PDF i obraz pozostają darmowe.",
    why: "PDF i obraz pozostają darmowe. Word kosztuje, bo to ten, który możesz edytować.",
  },
  ro: {
    buy: "Obține în Word",
    download: "Descarcă Word (.docx)",
    what: "Un fișier .docx editabil cu datele deja completate — formatul cerut de agențiile de crewing.",
    waiting: "Așteptăm confirmarea plății. De obicei durează câteva secunde, pagina se deblochează singură.",
    trouble: "Ai plătit și tot e blocat? Scrie-ne — îl deschidem manual.",
    soon: "Exportul în Word nu este încă la vânzare. PDF și imaginea rămân gratuite.",
    why: "PDF și imaginea rămân gratuite. Word costă pentru că pe acesta îl poți edita.",
  },
};
