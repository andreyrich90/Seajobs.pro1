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
  /** What the checkout actually charges. The first real payment arrived as 6.50. */
  usd: 6.5,
  /** Buy Me a Coffee extra priced at CV_WORD.usd. Null until the product exists. */
  payUrl: "https://buymeacoffee.com/seajobs.pro/e/583093" as string | null,
};

/**
 * The provider's own id for this product, read off the checkout link.
 *
 * Buy Me a Coffee puts it in the payment body as `data.extras[].id`, which is
 * the difference between knowing what was bought and inferring it from the
 * price. With the id, a mailing package can never be mistaken for a Word export
 * however it is priced; without it, the amount is all there is to go on.
 *
 * Derived rather than written twice: a link and an id that disagree would be a
 * bug nobody notices until a payment lands on the wrong product.
 */
export const CV_WORD_EXTRA_ID: number | null = (() => {
  const m = /\/e\/(\d+)/.exec(CV_WORD.payUrl ?? "");
  return m ? Number(m[1]) : null;
})();

export const CV_WORD_SELLING = CV_WORD.payUrl !== null;

/**
 * The price as a reader sees it, and the only way it should ever be written.
 *
 * Two decimals always: `$${CV_WORD.usd}` renders "$6.5", and the one thing a
 * price must not look like is approximate. Polish and Romanian write the symbol
 * after the number with a decimal comma, so they get that form — a price in the
 * wrong notation reads as a foreign site's price.
 *
 * Every page that quotes the figure calls this. The page copy used to carry the
 * number as text in five languages, which meant a price change silently left
 * /cv-builder advertising the old one while the checkout charged the new.
 */
export function cvWordPrice(lang?: string): string {
  const n = CV_WORD.usd.toFixed(2);
  return lang === "pl" || lang === "ro" ? `${n.replace(".", ",")} $` : `$${n}`;
}

/**
 * Fill every `{price}` in a copy object — strings, arrays, nested objects —
 * with the Word price as `lang` writes it. Pages that quote the price carry the
 * token, never the figure, so a price change cannot leave one of them behind.
 */
export function withPrice<T>(node: T, lang?: string): T {
  const price = cvWordPrice(lang);
  const fill = (n: unknown): unknown => {
    if (typeof n === "string") return n.split("{price}").join(price);
    if (Array.isArray(n)) return n.map(fill);
    if (n && typeof n === "object") {
      return Object.fromEntries(Object.entries(n as Record<string, unknown>).map(([k, v]) => [k, fill(v)]));
    }
    return n;
  };
  return fill(node) as T;
}

export type CvWordCopy = {
  /** Button label before buying, e.g. "Word — $5". */
  buy: string;
  /** Button label once it is unlocked. */
  download: string;
  /** One line under the buttons saying what the file is. */
  what: string;
  /** Shown while the payment has not arrived yet. */
  waiting: string;
  /** The short label on the waiting badge — the long line sits under it. */
  waitingShort: string;
  /** Re-opens the checkout for someone who closed it before paying. */
  reopen: string;
  /** The fleet template picker for the Word file. */
  fleetLabel: string;
  fleetGeneral: string;
  fleets: Record<"merchant" | "offshore" | "tanker" | "passenger" | "tug", string>;
  /** Over the preview of what the chosen template puts at the top. */
  fleetPreview: string;
  /** `{time}` and `{types}` are filled in by the page. */
  fleetSeaTime: string;
  /** Nothing in the profile matches the chosen fleet yet. */
  fleetEmpty: string;
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
    waitingShort: "Waiting for payment…",
    reopen: "Open the checkout again",
    fleetLabel: "Word template",
    fleetGeneral: "General",
    fleets: { merchant: "Merchant fleet", offshore: "Offshore", tanker: "Tankers & gas carriers", passenger: "Cruise & passenger", tug: "Tugs & dredging" },
    fleetPreview: "At the top of the Word file, under “Key qualifications”:",
    fleetSeaTime: "{time} of sea service on {types}",
    fleetEmpty: "Nothing in your profile matches this fleet yet — add its certificates and voyages, and they will lead the Word file.",
    trouble: "Paid and still locked? Tell us — we will open it by hand.",
    soon: "The Word export is not on sale yet. PDF and image stay free.",
    why: "PDF and image stay free. Word costs money because it is the one you can edit afterwards.",
  },
  ru: {
    buy: "Получить в Word",
    download: "Скачать Word (.docx)",
    what: "Редактируемый .docx с уже заполненными данными — тот формат, который просят крюинги.",
    waiting: "Ждём подтверждения оплаты. Обычно это несколько секунд, страница откроется сама.",
    waitingShort: "Ждём оплату…",
    reopen: "Открыть оплату ещё раз",
    fleetLabel: "Шаблон Word",
    fleetGeneral: "Общий",
    fleets: { merchant: "Торговый флот", offshore: "Офшор", tanker: "Танкеры и газовозы", passenger: "Пассажирский", tug: "Буксиры и дноуглубление" },
    fleetPreview: "В начале Word-файла, в блоке «Key qualifications»:",
    fleetSeaTime: "{time} стажа на {types}",
    fleetEmpty: "В профиле пока нет ничего под этот флот — добавьте его сертификаты и суда, и они окажутся в начале Word-файла.",
    trouble: "Оплатили, а доступа нет? Напишите нам — откроем вручную.",
    soon: "Выгрузка в Word пока не продаётся. PDF и картинка остаются бесплатными.",
    why: "PDF и картинка остаются бесплатными. Word платный, потому что его можно редактировать.",
  },
  ua: {
    buy: "Отримати у Word",
    download: "Завантажити Word (.docx)",
    what: "Редагований .docx із уже заповненими даними — формат, який просять крюїнги.",
    waiting: "Чекаємо підтвердження оплати. Зазвичай це кілька секунд, сторінка відкриється сама.",
    waitingShort: "Чекаємо оплату…",
    reopen: "Відкрити оплату ще раз",
    fleetLabel: "Шаблон Word",
    fleetGeneral: "Загальний",
    fleets: { merchant: "Торговий флот", offshore: "Офшор", tanker: "Танкери й газовози", passenger: "Пасажирський", tug: "Буксири й днопоглиблення" },
    fleetPreview: "На початку Word-файлу, у блоці «Key qualifications»:",
    fleetSeaTime: "{time} стажу на {types}",
    fleetEmpty: "У профілі поки немає нічого під цей флот — додайте його сертифікати й судна, і вони опиняться на початку Word-файлу.",
    trouble: "Оплатили, а доступу немає? Напишіть нам — відкриємо вручну.",
    soon: "Вивантаження у Word поки не продається. PDF і зображення лишаються безкоштовними.",
    why: "PDF і зображення лишаються безкоштовними. Word платний, бо його можна редагувати.",
  },
  pl: {
    buy: "Pobierz w Wordzie",
    download: "Pobierz Word (.docx)",
    what: "Edytowalny plik .docx z już wypełnionymi danymi — format, o który proszą crewingi.",
    waiting: "Czekamy na potwierdzenie płatności. Zwykle kilka sekund, strona odblokuje się sama.",
    waitingShort: "Czekamy na płatność…",
    reopen: "Otwórz płatność ponownie",
    fleetLabel: "Szablon Word",
    fleetGeneral: "Ogólny",
    fleets: { merchant: "Flota handlowa", offshore: "Offshore", tanker: "Tankowce i gazowce", passenger: "Pasażerskie", tug: "Holowniki i pogłębiarki" },
    fleetPreview: "Na początku pliku Word, w bloku „Key qualifications”:",
    fleetSeaTime: "{time} stażu na {types}",
    fleetEmpty: "W profilu nie ma jeszcze nic pod tę flotę — dodaj jej certyfikaty i statki, a znajdą się na początku pliku Word.",
    trouble: "Zapłacone, a nadal zablokowane? Napisz do nas — otworzymy ręcznie.",
    soon: "Eksport do Worda nie jest jeszcze w sprzedaży. PDF i obraz pozostają darmowe.",
    why: "PDF i obraz pozostają darmowe. Word kosztuje, bo to ten, który możesz edytować.",
  },
  ro: {
    buy: "Obține în Word",
    download: "Descarcă Word (.docx)",
    what: "Un fișier .docx editabil cu datele deja completate — formatul cerut de agențiile de crewing.",
    waiting: "Așteptăm confirmarea plății. De obicei durează câteva secunde, pagina se deblochează singură.",
    waitingShort: "Așteptăm plata…",
    reopen: "Deschide din nou plata",
    fleetLabel: "Șablon Word",
    fleetGeneral: "General",
    fleets: { merchant: "Flota comercială", offshore: "Offshore", tanker: "Petroliere și gaziere", passenger: "Pasageri", tug: "Remorchere și drage" },
    fleetPreview: "La începutul fișierului Word, în blocul «Key qualifications»:",
    fleetSeaTime: "{time} de vechime pe {types}",
    fleetEmpty: "Profilul nu are încă nimic pentru această flotă — adaugă-i certificatele și navele, și vor apărea la începutul fișierului Word.",
    trouble: "Ai plătit și tot e blocat? Scrie-ne — îl deschidem manual.",
    soon: "Exportul în Word nu este încă la vânzare. PDF și imaginea rămân gratuite.",
    why: "PDF și imaginea rămân gratuite. Word costă pentru că pe acesta îl poți edita.",
  },
};
