"use client";

import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import {
  Upload, PencilLine, CheckCircle2, Circle, Send, ClipboardList,
  Sparkles, ShieldAlert, ArrowRight, FileText, Search,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import { FAQ_APPLY } from "@/lib/faq";
import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/langs";

// Step-by-step instructions for seafarers, linked from the Apply button on every
// vacancy page. Copy is kept inline and localized (same approach as /about):
// it is long-form page content, not reusable UI strings.

type Item = { t: string; d: string };
type Need = { t: string; d: string; required: boolean };

type Copy = {
  kicker: string;
  h1: string;
  lead: string;
  ctaCv: string;
  ctaJobs: string;

  waysTitle: string;
  waysSub: string;
  cvBadge: string;
  cvTitle: string;
  cvText: string;
  cvSteps: string[];
  cvLink: string;
  manualBadge: string;
  manualTitle: string;
  manualText: string;
  manualSteps: string[];
  manualLink: string;

  needTitle: string;
  needSub: string;
  needs: Need[];
  requiredTag: string;
  optionalTag: string;

  applyTitle: string;
  applySub: string;
  applySteps: Item[];

  afterTitle: string;
  afterSub: string;
  afterPoints: Item[];

  warnTitle: string;
  warnText: string;

  endTitle: string;
  endText: string;
  endCta: string;
};

const C: Record<Lang, Copy> = {
  en: {
    kicker: "Step-by-step guide",
    h1: "How to apply for a job on SeaJobs.pro",
    lead: "Applying takes one click — but first the crewing manager needs a CV to read. You can either upload the CV you already have and let us fill your profile from it, or fill the profile in by hand. Either way you only do it once.",
    ctaCv: "Upload my CV",
    ctaJobs: "Browse vacancies",

    waysTitle: "Two ways to get ready",
    waysSub: "Both lead to the same place: a complete seafarer profile that is sent with every application.",
    cvBadge: "Fastest — about a minute",
    cvTitle: "Upload the CV you already have",
    cvText: "Have a CV in PDF or DOCX? Upload it and we read it for you — rank, contacts, sea service, certificates and documents are pulled out and written into your profile automatically. The profile is saved, so you never have to type it again.",
    cvSteps: [
      "Open the CV page in your seafarer account and upload a PDF or DOCX.",
      "Wait a few seconds while the file is read and the fields are filled in.",
      "Check what was recognised and correct anything that came out wrong — you stay in control of every field.",
      "Save. Your profile is ready, and the CV every application carries is built from it.",
    ],
    cvLink: "Go to CV upload",
    manualBadge: "If you have no CV file",
    manualTitle: "Fill the profile in by hand",
    manualText: "No CV yet? Nothing is lost — fill the profile in yourself and the portal builds the CV for you. It takes a few minutes, and after that every application is a single click.",
    manualSteps: [
      "Fill in your personal details: name, rank, phone and e-mail.",
      "Add your sea service — vessel, type, rank, and the dates you signed on and off.",
      "Add your certificates and documents with their expiry dates, plus visas if you hold any.",
      "Set your readiness date so crewing managers know when you can join.",
    ],
    manualLink: "Fill in the profile",

    needTitle: "What your profile needs",
    needSub: "Four details are required — first and last name, rank and phone — plus at least one sea-service record for an application through the portal (a letter from your own mailbox carries your CV file instead). The rest is optional, but each item makes your CV stronger in the crewing manager's inbox.",
    needs: [
      { t: "Phone number", d: "Crewing managers call before they write. Without a phone number an application cannot be sent.", required: true },
      { t: "Sea service — at least one record", d: "The vessel, its type, your rank and your sign-on / sign-off dates. This is the first thing a crewing manager looks at.", required: true },
      { t: "Rank, first and last name", d: "Filled in at registration — check the spelling matches your documents. An agency cannot answer an application without a name.", required: true },
      { t: "Certificates", d: "STCW, GMDSS, tanker endorsements and the rest, with their expiry dates — an expired certificate is the most common reason an application is set aside.", required: false },
      { t: "Documents and visas", d: "Seaman's book, passport, US visa, Schengen — a valid visa often decides who gets called first.", required: false },
      { t: "Readiness date", d: "When you can join. Vacancies have joining dates, and this is what they are matched against.", required: false },
      { t: "Photo", d: "Optional, but a CV with a photo reads as a real person rather than a form.", required: false },
    ],
    requiredTag: "Required",
    optionalTag: "Recommended",

    applyTitle: "Applying to a vacancy",
    applySub: "Once the profile is complete, this is the whole process.",
    applySteps: [
      { t: "Find a vacancy", d: "Filter the job board by rank, vessel type and fleet. Salaries are shown up front — you never have to write to find out what a position pays." },
      { t: "Open it and read the terms", d: "Vessel, contract length, joining date, salary and requirements are all on the page, together with our own comparison of that salary against the rest of the portal." },
      { t: "Press Apply", d: "The button sits directly under the job description. If anything is still missing from your profile, the form tells you exactly what — and lets you upload a CV right there." },
      { t: "Add a cover letter (optional)", d: "A few lines about why you fit this vessel. It is not required, but it is what separates you from an identical CV." },
      { t: "Send — to a company with an account", d: "With a subscription, or one of your 3 free contact views a week: if the crewing company posted the vacancy from its own SeaJobs.pro account, your full CV lands in its dashboard and is e-mailed to it." },
      { t: "Or from your own mailbox — vacancies from agencies' announcements", d: "If the vacancy comes from a crewing agency's own announcement (its Telegram channel or website), your mail app opens with the letter ready — the agency's address, the subject and your cover letter. Attach your CV file and press Send: it arrives as a personal letter from you and the reply comes straight to your inbox. If the agency takes applications only on its own site, the button takes you there." },
    ],

    afterTitle: "After you apply",
    afterSub: "Nothing disappears into a void — every application stays visible to you.",
    afterPoints: [
      { t: "Track the status", d: "Every application is in your dashboard. For companies with an account you see pending, viewed, accepted or rejected and get a notification when it changes; a letter from your own mailbox stays in your list, and the agency answers to your e-mail." },
      { t: "Answer messages", d: "Companies with an account can write to you through the platform; agencies you wrote to from your mailbox reply to your e-mail directly. Either way the answer comes to you, not to a middleman." },
      { t: "Keep the profile fresh", d: "Renew a certificate, finish a contract, change your readiness date — update it once and every future application carries the new version." },
    ],

    warnTitle: "Never pay for a job",
    warnText: "A genuine crewing agency is paid by the shipowner, never by you. Nobody on SeaJobs.pro may ask you for money for a vacancy, a medical, a contract, training or a visa. If a vacancy or a message asks for payment, do not send anything — report it to us and we will take the posting down.",

    endTitle: "Ready to start?",
    endText: "Upload your CV or fill in the profile — after that, every vacancy on the portal is one click away.",
    endCta: "Open the job board",
  },

  ru: {
    kicker: "Пошаговая инструкция",
    h1: "Как подать анкету на вакансию на SeaJobs.pro",
    lead: "Отклик занимает один клик — но сначала крюинг-менеджеру нужно CV, которое он прочитает. Можно загрузить уже готовое резюме, и профиль заполнится из него автоматически, либо заполнить профиль вручную. В любом случае это делается один раз.",
    ctaCv: "Загрузить своё CV",
    ctaJobs: "Смотреть вакансии",

    waysTitle: "Два пути подготовки",
    waysSub: "Оба ведут к одному: полный профиль моряка, который уходит вместе с каждым откликом.",
    cvBadge: "Быстрее всего — около минуты",
    cvTitle: "Загрузите уже готовое CV",
    cvText: "Есть резюме в PDF или DOCX? Загрузите его — мы прочитаем файл за вас: должность, контакты, морской стаж, сертификаты и документы будут извлечены и записаны в профиль автоматически. Профиль сохраняется, так что вводить всё заново больше не придётся.",
    cvSteps: [
      "Откройте раздел CV в кабинете моряка и загрузите PDF или DOCX.",
      "Подождите несколько секунд, пока файл прочитается и поля заполнятся.",
      "Проверьте, что распозналось, и поправьте всё, что вышло неверно — каждое поле остаётся под вашим контролем.",
      "Сохраните. Профиль готов — из него собирается CV, которое уходит с каждым откликом.",
    ],
    cvLink: "Перейти к загрузке CV",
    manualBadge: "Если файла с CV нет",
    manualTitle: "Заполните профиль вручную",
    manualText: "Резюме ещё нет? Ничего страшного — заполните профиль сами, и портал соберёт CV за вас. Это займёт несколько минут, зато потом каждый отклик — один клик.",
    manualSteps: [
      "Заполните личные данные: имя, должность, телефон и email.",
      "Добавьте морской стаж — судно, его тип, вашу должность и даты посадки и списания.",
      "Добавьте сертификаты и документы со сроками действия, а также визы, если они есть.",
      "Укажите дату готовности, чтобы крюинг-менеджеры видели, когда вы можете выйти.",
    ],
    manualLink: "Заполнить профиль",

    needTitle: "Что должно быть в профиле",
    needSub: "Обязательны имя и фамилия, должность и телефон, а для отклика через портал — ещё хотя бы одна запись морского стажа (в письме со своей почты стаж есть в вашем CV). Остальное по желанию, но каждый пункт усиливает ваше CV в почте крюинг-менеджера.",
    needs: [
      { t: "Номер телефона", d: "Крюинг-менеджеры сначала звонят и только потом пишут. Без телефона отклик не отправится.", required: true },
      { t: "Морской стаж — минимум одна запись", d: "Судно, его тип, ваша должность и даты посадки и списания. Это первое, на что смотрит крюинг-менеджер.", required: true },
      { t: "Должность, имя и фамилия", d: "Заполняются при регистрации — проверьте, что написание совпадает с документами. Без имени крюинг не сможет ответить на отклик.", required: true },
      { t: "Сертификаты", d: "STCW, GMDSS, танкерные допуски и остальное — со сроками действия. Просроченный сертификат — самая частая причина, по которой анкету откладывают.", required: false },
      { t: "Документы и визы", d: "Мореходная книжка, паспорт, американская виза, Шенген — действующая виза часто решает, кому позвонят первым.", required: false },
      { t: "Дата готовности", d: "Когда вы можете выйти в рейс. У вакансий есть даты посадки, и подбор идёт именно по ней.", required: false },
      { t: "Фотография", d: "Не обязательна, но CV с фото читается как живой человек, а не как анкета.", required: false },
    ],
    requiredTag: "Обязательно",
    optionalTag: "Желательно",

    applyTitle: "Как подать анкету на вакансию",
    applySub: "Когда профиль заполнен, весь процесс выглядит так.",
    applySteps: [
      { t: "Найдите вакансию", d: "Отфильтруйте доску по должности, типу судна и флоту. Зарплаты указаны сразу — писать, чтобы узнать оплату, не нужно." },
      { t: "Откройте и прочитайте условия", d: "Судно, длительность контракта, дата посадки, зарплата и требования — всё на странице, вместе с нашим сравнением этой зарплаты с остальными вакансиями портала." },
      { t: "Нажмите «Подать анкету»", d: "Кнопка стоит прямо под описанием вакансии. Если в профиле чего-то не хватает, форма скажет, чего именно, и позволит загрузить CV прямо там." },
      { t: "Добавьте сопроводительное письмо (по желанию)", d: "Несколько строк о том, почему вы подходите этому судну. Не обязательно, но именно это отличает вас от такого же CV." },
      { t: "Отправьте — компании с кабинетом", d: "С подпиской или с одним из 3 бесплатных просмотров контактов в неделю: если крюинг разместил вакансию сам из своего кабинета на SeaJobs.pro, ваше полное CV попадает к нему в кабинет и приходит ему на e-mail." },
      { t: "Или со своей почты — вакансии из объявлений крюингов", d: "Если вакансия взята из объявления самого крюинга (его Telegram-канала или сайта), откроется ваша почта с готовым письмом — адрес крюинга, тема и ваше сопроводительное письмо. Прикрепите файл CV и нажмите «Отправить»: письмо придёт менеджеру лично от вас, а ответ — прямо вам. Если крюинг принимает анкеты только на своём сайте, кнопка ведёт туда." },
    ],

    afterTitle: "Что происходит после отклика",
    afterSub: "Ничего не пропадает в пустоту — каждый отклик остаётся у вас перед глазами.",
    afterPoints: [
      { t: "Следите за статусом", d: "Все отклики — в вашем кабинете. У компаний с кабинетом видно: ожидает, просмотрен, принят или отклонён, и при изменении приходит уведомление; письмо со своей почты остаётся в вашем списке, а крюинг отвечает вам на e-mail." },
      { t: "Отвечайте на сообщения", d: "Компании с кабинетом пишут вам через портал; крюинги, которым вы написали со своей почты, отвечают вам на e-mail. В обоих случаях ответ приходит вам, а не посреднику." },
      { t: "Держите профиль актуальным", d: "Продлили сертификат, закончили контракт, изменилась дата готовности — обновите один раз, и все будущие отклики уйдут уже с новой версией." },
    ],

    warnTitle: "Никогда не платите за трудоустройство",
    warnText: "Настоящему крюинговому агентству платит судовладелец, а не вы. Никто на SeaJobs.pro не имеет права просить у вас деньги за вакансию, медкомиссию, контракт, обучение или визу. Если вакансия или сообщение требуют оплаты — ничего не отправляйте, сообщите нам, и мы снимем объявление.",

    endTitle: "Готовы начать?",
    endText: "Загрузите CV или заполните профиль — после этого любая вакансия портала в одном клике от вас.",
    endCta: "Открыть доску вакансий",
  },

  ua: {
    kicker: "Покрокова інструкція",
    h1: "Як подати анкету на вакансію на SeaJobs.pro",
    lead: "Відгук займає один клік — але спершу крюїнг-менеджеру потрібне CV, яке він прочитає. Можна завантажити вже готове резюме, і профіль заповниться з нього автоматично, або заповнити профіль вручну. У будь-якому разі це робиться один раз.",
    ctaCv: "Завантажити своє CV",
    ctaJobs: "Дивитися вакансії",

    waysTitle: "Два шляхи підготовки",
    waysSub: "Обидва ведуть до одного: повний профіль моряка, який іде разом з кожним відгуком.",
    cvBadge: "Найшвидше — близько хвилини",
    cvTitle: "Завантажте вже готове CV",
    cvText: "Є резюме у PDF чи DOCX? Завантажте його — ми прочитаємо файл за вас: посада, контакти, морський стаж, сертифікати й документи будуть витягнуті та записані в профіль автоматично. Профіль зберігається, тож вводити все заново більше не доведеться.",
    cvSteps: [
      "Відкрийте розділ CV у кабінеті моряка та завантажте PDF або DOCX.",
      "Зачекайте кілька секунд, поки файл прочитається і поля заповняться.",
      "Перевірте, що розпізналося, і виправте те, що вийшло неправильно — кожне поле лишається під вашим контролем.",
      "Збережіть. Профіль готовий — з нього збирається CV, яке йде з кожним відгуком.",
    ],
    cvLink: "Перейти до завантаження CV",
    manualBadge: "Якщо файлу з CV немає",
    manualTitle: "Заповніть профіль вручну",
    manualText: "Резюме ще немає? Нічого страшного — заповніть профіль самі, і портал складе CV за вас. Це займе кілька хвилин, зате потім кожен відгук — один клік.",
    manualSteps: [
      "Заповніть особисті дані: ім'я, посаду, телефон та email.",
      "Додайте морський стаж — судно, його тип, вашу посаду й дати посадки та списання.",
      "Додайте сертифікати й документи з термінами дії, а також візи, якщо вони є.",
      "Вкажіть дату готовності, щоб крюїнг-менеджери бачили, коли ви можете вийти.",
    ],
    manualLink: "Заповнити профіль",

    needTitle: "Що має бути в профілі",
    needSub: "Обов'язкові ім'я та прізвище, посада й телефон, а для відгуку через портал — ще хоча б один запис морського стажу (у листі зі своєї пошти стаж є у вашому CV). Решта за бажанням, але кожен пункт посилює ваше CV у пошті крюїнг-менеджера.",
    needs: [
      { t: "Номер телефону", d: "Крюїнг-менеджери спершу телефонують і лише потім пишуть. Без телефону відгук не надішлеться.", required: true },
      { t: "Морський стаж — щонайменше один запис", d: "Судно, його тип, ваша посада й дати посадки та списання. Це перше, на що дивиться крюїнг-менеджер.", required: true },
      { t: "Посада, ім'я та прізвище", d: "Заповнюються під час реєстрації — перевірте, що написання збігається з документами. Без імені крюїнг не зможе відповісти на відгук.", required: true },
      { t: "Сертифікати", d: "STCW, GMDSS, танкерні допуски та решта — з термінами дії. Прострочений сертифікат — найчастіша причина, через яку анкету відкладають.", required: false },
      { t: "Документи та візи", d: "Морехідна книжка, паспорт, американська віза, Шенген — чинна віза часто вирішує, кому зателефонують першим.", required: false },
      { t: "Дата готовності", d: "Коли ви можете вийти в рейс. У вакансій є дати посадки, і добір іде саме за нею.", required: false },
      { t: "Фотографія", d: "Не обов'язкова, але CV з фото читається як жива людина, а не як анкета.", required: false },
    ],
    requiredTag: "Обов'язково",
    optionalTag: "Бажано",

    applyTitle: "Як подати анкету на вакансію",
    applySub: "Коли профіль заповнено, весь процес виглядає так.",
    applySteps: [
      { t: "Знайдіть вакансію", d: "Відфільтруйте дошку за посадою, типом судна та флотом. Зарплати вказані одразу — писати, щоб дізнатися оплату, не потрібно." },
      { t: "Відкрийте й прочитайте умови", d: "Судно, тривалість контракту, дата посадки, зарплата та вимоги — усе на сторінці, разом із нашим порівнянням цієї зарплати з рештою вакансій порталу." },
      { t: "Натисніть «Подати анкету»", d: "Кнопка стоїть просто під описом вакансії. Якщо в профілі чогось бракує, форма скаже, чого саме, і дозволить завантажити CV прямо там." },
      { t: "Додайте супровідний лист (за бажанням)", d: "Кілька рядків про те, чому ви підходите цьому судну. Не обов'язково, але саме це відрізняє вас від такого самого CV." },
      { t: "Надішліть — компанії з кабінетом", d: "З підпискою або з одним із 3 безкоштовних переглядів контактів на тиждень: якщо крюїнг розмістив вакансію сам зі свого кабінету на SeaJobs.pro, ваше повне CV потрапляє до нього в кабінет і надходить йому на e-mail." },
      { t: "Або зі своєї пошти — вакансії з оголошень крюїнгів", d: "Якщо вакансію взято з оголошення самого крюїнгу (його Telegram-каналу чи сайту), відкриється ваша пошта з готовим листом — адреса крюїнгу, тема і ваш супровідний лист. Прикріпіть файл CV і натисніть «Надіслати»: лист прийде менеджеру особисто від вас, а відповідь — прямо вам. Якщо крюїнг приймає анкети лише на своєму сайті, кнопка веде туди." },
    ],

    afterTitle: "Що відбувається після відгуку",
    afterSub: "Ніщо не зникає в порожнечу — кожен відгук лишається у вас перед очима.",
    afterPoints: [
      { t: "Стежте за статусом", d: "Усі відгуки — у вашому кабінеті. У компаній з кабінетом видно: очікує, переглянуто, прийнято чи відхилено, а при зміні надходить сповіщення; лист зі своєї пошти залишається у вашому списку, а крюїнг відповідає вам на e-mail." },
      { t: "Відповідайте на повідомлення", d: "Компанії з кабінетом пишуть вам через портал; крюїнги, яким ви написали зі своєї пошти, відповідають вам на e-mail. В обох випадках відповідь приходить вам, а не посереднику." },
      { t: "Тримайте профіль актуальним", d: "Продовжили сертифікат, завершили контракт, змінилася дата готовності — оновіть один раз, і всі майбутні відгуки підуть уже з новою версією." },
    ],

    warnTitle: "Ніколи не платіть за працевлаштування",
    warnText: "Справжньому крюїнговому агентству платить судновласник, а не ви. Ніхто на SeaJobs.pro не має права просити у вас гроші за вакансію, медкомісію, контракт, навчання чи візу. Якщо вакансія або повідомлення вимагають оплати — нічого не надсилайте, повідомте нам, і ми знімемо оголошення.",

    endTitle: "Готові почати?",
    endText: "Завантажте CV або заповніть профіль — після цього будь-яка вакансія порталу за один клік від вас.",
    endCta: "Відкрити дошку вакансій",
  },

  pl: {
    kicker: "Instrukcja krok po kroku",
    h1: "Jak aplikować na ofertę na SeaJobs.pro",
    lead: "Aplikowanie to jedno kliknięcie — ale najpierw menedżer crewingu potrzebuje CV, które przeczyta. Możesz wgrać CV, które już masz, a profil wypełni się z niego automatycznie, albo uzupełnić profil ręcznie. Tak czy inaczej robisz to tylko raz.",
    ctaCv: "Wgraj moje CV",
    ctaJobs: "Zobacz oferty",

    waysTitle: "Dwie drogi przygotowania",
    waysSub: "Obie prowadzą do tego samego: kompletnego profilu marynarza, który idzie z każdą aplikacją.",
    cvBadge: "Najszybciej — około minuty",
    cvTitle: "Wgraj CV, które już masz",
    cvText: "Masz CV w PDF lub DOCX? Wgraj je, a my odczytamy plik za Ciebie — stanowisko, kontakty, staż morski, certyfikaty i dokumenty zostaną wyciągnięte i zapisane w profilu automatycznie. Profil się zapisuje, więc nie musisz wpisywać wszystkiego od nowa.",
    cvSteps: [
      "Otwórz sekcję CV w panelu marynarza i wgraj plik PDF lub DOCX.",
      "Poczekaj kilka sekund, aż plik zostanie odczytany, a pola wypełnione.",
      "Sprawdź, co zostało rozpoznane, i popraw to, co wyszło źle — każde pole pozostaje pod Twoją kontrolą.",
      "Zapisz. Profil jest gotowy — z niego powstaje CV, które trafia z każdą aplikacją.",
    ],
    cvLink: "Przejdź do wgrywania CV",
    manualBadge: "Jeśli nie masz pliku CV",
    manualTitle: "Uzupełnij profil ręcznie",
    manualText: "Nie masz jeszcze CV? Nic straconego — uzupełnij profil samodzielnie, a portal zbuduje CV za Ciebie. Zajmie to kilka minut, a potem każda aplikacja to jedno kliknięcie.",
    manualSteps: [
      "Uzupełnij dane osobowe: imię i nazwisko, stanowisko, telefon i e-mail.",
      "Dodaj staż morski — statek, jego typ, Twoje stanowisko oraz daty zaokrętowania i wyokrętowania.",
      "Dodaj certyfikaty i dokumenty z datami ważności, a także wizy, jeśli je posiadasz.",
      "Ustaw datę gotowości, żeby menedżerowie crewingu wiedzieli, kiedy możesz wejść na statek.",
    ],
    manualLink: "Uzupełnij profil",

    needTitle: "Co musi zawierać profil",
    needSub: "Wymagane są imię i nazwisko, stanowisko i telefon, a do aplikacji przez portal — także co najmniej jeden wpis stażu morskiego (w liście z własnej poczty staż jest w Twoim CV). Reszta jest opcjonalna, ale każdy punkt wzmacnia Twoje CV w skrzynce menedżera crewingu.",
    needs: [
      { t: "Numer telefonu", d: "Menedżerowie crewingu najpierw dzwonią, dopiero potem piszą. Bez numeru telefonu aplikacji nie da się wysłać.", required: true },
      { t: "Staż morski — co najmniej jeden wpis", d: "Statek, jego typ, Twoje stanowisko oraz daty zaokrętowania i wyokrętowania. To pierwsze, na co patrzy menedżer crewingu.", required: true },
      { t: "Stanowisko, imię i nazwisko", d: "Uzupełniane przy rejestracji — sprawdź, czy pisownia zgadza się z dokumentami. Bez nazwiska agencja nie odpowie na aplikację.", required: true },
      { t: "Certyfikaty", d: "STCW, GMDSS, uprawnienia zbiornikowcowe i pozostałe — z datami ważności. Przeterminowany certyfikat to najczęstszy powód odłożenia aplikacji.", required: false },
      { t: "Dokumenty i wizy", d: "Książeczka żeglarska, paszport, wiza amerykańska, Schengen — ważna wiza często decyduje, do kogo zadzwonią najpierw.", required: false },
      { t: "Data gotowości", d: "Kiedy możesz wejść na statek. Oferty mają daty zaokrętowania i to według niej dobiera się kandydatów.", required: false },
      { t: "Zdjęcie", d: "Nieobowiązkowe, ale CV ze zdjęciem czyta się jak żywego człowieka, a nie jak formularz.", required: false },
    ],
    requiredTag: "Wymagane",
    optionalTag: "Zalecane",

    applyTitle: "Jak aplikować na ofertę",
    applySub: "Gdy profil jest gotowy, cały proces wygląda tak.",
    applySteps: [
      { t: "Znajdź ofertę", d: "Przefiltruj tablicę ofert według stanowiska, typu statku i floty. Stawki są podane od razu — nie musisz pisać, żeby dowiedzieć się, ile płacą." },
      { t: "Otwórz ją i przeczytaj warunki", d: "Statek, długość kontraktu, data zaokrętowania, stawka i wymagania są na stronie, razem z naszym porównaniem tej stawki z resztą ofert w serwisie." },
      { t: "Kliknij „Aplikuj”", d: "Przycisk znajduje się bezpośrednio pod opisem oferty. Jeśli w profilu czegoś brakuje, formularz powie dokładnie czego — i pozwoli wgrać CV od razu." },
      { t: "Dodaj list motywacyjny (opcjonalnie)", d: "Kilka zdań o tym, dlaczego pasujesz do tego statku. Nieobowiązkowe, ale to właśnie odróżnia Cię od identycznego CV." },
      { t: "Wyślij — do firmy z kontem", d: "Z subskrypcją lub z jednym z 3 darmowych podglądów kontaktów w tygodniu: jeśli agencja opublikowała ofertę sama ze swojego konta na SeaJobs.pro, Twoje pełne CV trafia do jej panelu i na jej e-mail." },
      { t: "Albo ze swojej poczty — oferty z ogłoszeń agencji", d: "Jeśli oferta pochodzi z ogłoszenia samej agencji (jej kanału na Telegramie lub strony), otworzy się Twoja poczta z gotowym listem — adres agencji, temat i Twój list motywacyjny. Załącz plik CV i kliknij „Wyślij”: list dotrze do menedżera osobiście od Ciebie, a odpowiedź — prosto do Ciebie. Jeśli agencja przyjmuje zgłoszenia tylko na swojej stronie, przycisk prowadzi tam." },
    ],

    afterTitle: "Co dzieje się po wysłaniu",
    afterSub: "Nic nie znika w próżni — każda aplikacja pozostaje widoczna dla Ciebie.",
    afterPoints: [
      { t: "Śledź status", d: "Wszystkie aplikacje są w Twoim panelu. U firm z kontem widać: oczekuje, wyświetlona, przyjęta lub odrzucona, a przy zmianie przychodzi powiadomienie; list z własnej poczty zostaje na Twojej liście, a agencja odpowiada na Twój e-mail." },
      { t: "Odpowiadaj na wiadomości", d: "Firmy z kontem piszą do Ciebie przez portal; agencje, do których napisałeś ze swojej poczty, odpowiadają na Twój e-mail. W obu przypadkach odpowiedź trafia do Ciebie, a nie do pośrednika." },
      { t: "Utrzymuj profil aktualny", d: "Przedłużyłeś certyfikat, skończyłeś kontrakt, zmieniła się data gotowości — zaktualizuj raz, a wszystkie przyszłe aplikacje pójdą już z nową wersją." },
    ],

    warnTitle: "Nigdy nie płać za pracę",
    warnText: "Prawdziwej agencji crewingowej płaci armator, a nie Ty. Nikt na SeaJobs.pro nie ma prawa żądać od Ciebie pieniędzy za ofertę, badania, kontrakt, szkolenie ani wizę. Jeśli oferta lub wiadomość żąda opłaty — nie wysyłaj niczego, zgłoś nam to, a usuniemy ogłoszenie.",

    endTitle: "Gotowy, żeby zacząć?",
    endText: "Wgraj CV albo uzupełnij profil — potem każda oferta w serwisie jest o jedno kliknięcie od Ciebie.",
    endCta: "Otwórz tablicę ofert",
  },

  ro: {
    kicker: "Ghid pas cu pas",
    h1: "Cum aplici la un post pe SeaJobs.pro",
    lead: "Aplicarea înseamnă un singur clic — dar mai întâi managerul de crewing are nevoie de un CV pe care să îl citească. Poți încărca CV-ul pe care îl ai deja, iar profilul se completează automat din el, sau poți completa profilul manual. Oricum, o faci o singură dată.",
    ctaCv: "Încarcă-mi CV-ul",
    ctaJobs: "Vezi posturile",

    waysTitle: "Două căi de pregătire",
    waysSub: "Ambele duc în același loc: un profil complet de marinar, trimis cu fiecare aplicare.",
    cvBadge: "Cel mai rapid — circa un minut",
    cvTitle: "Încarcă CV-ul pe care îl ai deja",
    cvText: "Ai un CV în PDF sau DOCX? Încarcă-l și îl citim noi pentru tine — rangul, contactele, stagiul pe mare, certificatele și documentele sunt extrase și scrise automat în profil. Profilul se salvează, așa că nu mai trebuie să introduci nimic din nou.",
    cvSteps: [
      "Deschide secțiunea CV din contul de marinar și încarcă un fișier PDF sau DOCX.",
      "Așteaptă câteva secunde cât timp fișierul este citit și câmpurile se completează.",
      "Verifică ce a fost recunoscut și corectează ce a ieșit greșit — fiecare câmp rămâne sub controlul tău.",
      "Salvează. Profilul e gata — din el se construiește CV-ul care pleacă cu fiecare aplicare.",
    ],
    cvLink: "Mergi la încărcarea CV-ului",
    manualBadge: "Dacă nu ai un fișier CV",
    manualTitle: "Completează profilul manual",
    manualText: "Nu ai încă un CV? Nu e nicio problemă — completează profilul singur, iar portalul îți construiește CV-ul. Durează câteva minute, iar apoi fiecare aplicare înseamnă un singur clic.",
    manualSteps: [
      "Completează datele personale: nume, rang, telefon și e-mail.",
      "Adaugă stagiul pe mare — nava, tipul ei, rangul tău și datele de îmbarcare și debarcare.",
      "Adaugă certificatele și documentele cu datele de expirare, plus vizele, dacă ai.",
      "Setează data disponibilității, ca managerii de crewing să știe când te poți îmbarca.",
    ],
    manualLink: "Completează profilul",

    needTitle: "Ce trebuie să conțină profilul",
    needSub: "Obligatorii sunt numele și prenumele, rangul și telefonul, iar pentru aplicarea prin portal — și cel puțin o înregistrare de stagiu pe mare (în scrisoarea de pe e-mailul tău stagiul e în CV-ul tău). Restul e opțional, dar fiecare punct îți întărește CV-ul în căsuța managerului de crewing.",
    needs: [
      { t: "Număr de telefon", d: "Managerii de crewing sună mai întâi și abia apoi scriu. Fără număr de telefon aplicarea nu poate fi trimisă.", required: true },
      { t: "Stagiu pe mare — cel puțin o înregistrare", d: "Nava, tipul ei, rangul tău și datele de îmbarcare și debarcare. Este primul lucru la care se uită un manager de crewing.", required: true },
      { t: "Rangul, numele și prenumele", d: "Se completează la înregistrare — verifică dacă ortografia coincide cu documentele. Fără nume, agenția nu poate răspunde la aplicare.", required: true },
      { t: "Certificate", d: "STCW, GMDSS, andosări pentru tancuri și restul — cu datele de expirare. Un certificat expirat este cel mai frecvent motiv pentru care o aplicare este pusă deoparte.", required: false },
      { t: "Documente și vize", d: "Carnetul de marinar, pașaportul, viza americană, Schengen — o viză valabilă decide adesea cine este sunat primul.", required: false },
      { t: "Data disponibilității", d: "Când te poți îmbarca. Posturile au date de îmbarcare și după ele se face potrivirea.", required: false },
      { t: "Fotografie", d: "Opțională, dar un CV cu fotografie se citește ca o persoană reală, nu ca un formular.", required: false },
    ],
    requiredTag: "Obligatoriu",
    optionalTag: "Recomandat",

    applyTitle: "Cum aplici la un post",
    applySub: "Odată ce profilul este complet, tot procesul arată așa.",
    applySteps: [
      { t: "Găsește un post", d: "Filtrează lista după rang, tipul navei și flotă. Salariile sunt afișate din start — nu trebuie să scrii ca să afli cât se plătește." },
      { t: "Deschide-l și citește condițiile", d: "Nava, durata contractului, data îmbarcării, salariul și cerințele sunt toate pe pagină, împreună cu comparația noastră a acelui salariu cu restul portalului." },
      { t: "Apasă „Aplică”", d: "Butonul se află direct sub descrierea postului. Dacă lipsește ceva din profil, formularul îți spune exact ce — și îți permite să încarci un CV chiar acolo." },
      { t: "Adaugă o scrisoare de intenție (opțional)", d: "Câteva rânduri despre de ce te potrivești acestei nave. Nu e obligatorie, dar exact asta te desparte de un CV identic." },
      { t: "Trimite — către o companie cu cont", d: "Cu abonament sau cu una dintre cele 3 vizualizări gratuite de contacte pe săptămână: dacă agenția a publicat anunțul din propriul cont pe SeaJobs.pro, CV-ul tău complet ajunge în panoul ei și pe e-mailul ei." },
      { t: "Sau de pe e-mailul tău — anunțuri preluate de la agenții", d: "Dacă anunțul provine din anunțul agenției (canalul ei de Telegram sau site-ul ei), se deschide e-mailul tău cu scrisoarea gata scrisă — adresa agenției, subiectul și scrisoarea ta de intenție. Atașează fișierul CV și apasă „Trimite”: scrisoarea ajunge la manager personal, de la tine, iar răspunsul — direct la tine. Dacă agenția primește aplicări doar pe site-ul ei, butonul te duce acolo." },
    ],

    afterTitle: "Ce se întâmplă după ce aplici",
    afterSub: "Nimic nu dispare în gol — fiecare aplicare rămâne vizibilă pentru tine.",
    afterPoints: [
      { t: "Urmărește statusul", d: "Toate aplicările sunt în contul tău. La companiile cu cont vezi: în așteptare, văzută, acceptată sau respinsă și primești o notificare la schimbare; o scrisoare de pe e-mailul tău rămâne în lista ta, iar agenția îți răspunde pe e-mail." },
      { t: "Răspunde la mesaje", d: "Companiile cu cont îți scriu prin platformă; agențiile cărora le-ai scris de pe e-mail îți răspund pe e-mail. În ambele cazuri răspunsul vine la tine, nu la un intermediar." },
      { t: "Ține profilul actualizat", d: "Ai reînnoit un certificat, ai terminat un contract, ți s-a schimbat data disponibilității — actualizează o dată și toate aplicările viitoare pleacă cu noua versiune." },
    ],

    warnTitle: "Nu plăti niciodată pentru un post",
    warnText: "O agenție de crewing reală este plătită de armator, nu de tine. Nimeni de pe SeaJobs.pro nu are dreptul să îți ceară bani pentru un post, vizita medicală, contract, cursuri sau viză. Dacă un anunț sau un mesaj îți cere plată — nu trimite nimic, anunță-ne și vom retrage anunțul.",

    endTitle: "Gata de start?",
    endText: "Încarcă-ți CV-ul sau completează profilul — după aceea, orice post de pe portal e la un clic distanță.",
    endCta: "Deschide lista de posturi",
  },
};

export default function HowToApplyPage() {
  const { lang } = useLang();
  const c = C[lang] ?? C.en;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 hero-surface-center" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brassInk">
              <ClipboardList size={13} /> {c.kicker}
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold text-white md:text-5xl">{c.h1}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg">{c.lead}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <NextLink
                href="/seafarer/cv"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
              >
                <Upload size={16} /> {c.ctaCv}
              </NextLink>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-foam transition hover:bg-white/5"
              >
                <Search size={16} /> {c.ctaJobs}
              </Link>
            </div>
          </div>
        </section>

        {/* Two ways to get ready */}
        <section className="mx-auto max-w-5xl px-5 py-14">
          <h2 className="text-center font-display text-2xl font-semibold text-white md:text-3xl">{c.waysTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-mist">{c.waysSub}</p>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Upload a CV */}
            <div className="rounded-2xl border border-brass/25 bg-card p-6 md:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brass/15 px-3 py-1 text-xs font-bold text-brassInk">
                <Sparkles size={12} /> {c.cvBadge}
              </span>
              <h3 className="mt-4 flex items-center gap-2 font-display text-xl font-semibold text-white">
                <Upload size={20} className="text-brassInk" /> {c.cvTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{c.cvText}</p>
              <ol className="mt-5 space-y-3">
                {c.cvSteps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brass/15 text-xs font-bold text-brassInk">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-mist">{s}</span>
                  </li>
                ))}
              </ol>
              <NextLink
                href="/seafarer/cv"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brassInk transition hover:text-brass"
              >
                {c.cvLink} <ArrowRight size={15} />
              </NextLink>
            </div>

            {/* Fill in manually */}
            <div className="rounded-2xl border border-white/10 bg-card p-6 md:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/15 px-3 py-1 text-xs font-bold text-teal">
                <PencilLine size={12} /> {c.manualBadge}
              </span>
              <h3 className="mt-4 flex items-center gap-2 font-display text-xl font-semibold text-white">
                <FileText size={20} className="text-teal" /> {c.manualTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{c.manualText}</p>
              <ol className="mt-5 space-y-3">
                {c.manualSteps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-teal/15 text-xs font-bold text-teal">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-mist">{s}</span>
                  </li>
                ))}
              </ol>
              <NextLink
                href="/seafarer/profile"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition hover:text-white"
              >
                {c.manualLink} <ArrowRight size={15} />
              </NextLink>
            </div>
          </div>
        </section>

        {/* What the profile needs */}
        <section className="border-y border-white/10 bg-navy2/40">
          <div className="mx-auto max-w-4xl px-5 py-14">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">{c.needTitle}</h2>
            <p className="mt-3 leading-relaxed text-mist">{c.needSub}</p>

            <ul className="mt-8 flex flex-col gap-3">
              {c.needs.map((n, i) => (
                <li key={i} className="flex gap-3.5 rounded-2xl border border-white/10 bg-card p-4 md:p-5">
                  {n.required ? (
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brassInk" />
                  ) : (
                    <Circle size={20} className="mt-0.5 shrink-0 text-mist" />
                  )}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white">{n.t}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          n.required ? "bg-brass/15 text-brassInk" : "bg-white/5 text-mist"
                        }`}
                      >
                        {n.required ? c.requiredTag : c.optionalTag}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{n.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Applying */}
        <section className="mx-auto max-w-4xl px-5 py-14">
          <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">{c.applyTitle}</h2>
          <p className="mt-3 leading-relaxed text-mist">{c.applySub}</p>

          <ol className="mt-8 flex flex-col gap-4">
            {c.applySteps.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-white/10 bg-card p-5 md:p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brass to-brass2 font-display text-base font-bold text-[#061523]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* After applying */}
        <section className="border-y border-white/10 bg-navy2/40">
          <div className="mx-auto max-w-4xl px-5 py-14">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">{c.afterTitle}</h2>
            <p className="mt-3 leading-relaxed text-mist">{c.afterSub}</p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {c.afterPoints.map((p, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-card p-5">
                  <p className="font-semibold text-white">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scam warning */}
        <section className="mx-auto max-w-4xl px-5 py-14">
          <div className="flex gap-4 rounded-2xl border border-coral/30 bg-coral/10 p-6 md:p-8">
            <ShieldAlert size={24} className="mt-0.5 shrink-0 text-coral" />
            <div>
              <h2 className="font-display text-xl font-semibold text-white">{c.warnTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foam">{c.warnText}</p>
            </div>
          </div>
        </section>

        <FaqSection items={FAQ_APPLY} />

        {/* Closing CTA */}
        <section className="mx-auto max-w-4xl px-5 pb-16">
          <div className="rounded-2xl border border-brass/25 bg-gradient-to-br from-navy2 to-card p-8 text-center md:p-10">
            <h2 className="font-display text-2xl font-semibold text-white">{c.endTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-mist">{c.endText}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <NextLink
                href="/seafarer/cv"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-[#061523] transition hover:-translate-y-0.5"
              >
                <Upload size={16} /> {c.ctaCv}
              </NextLink>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-foam transition hover:bg-white/5"
              >
                <Send size={16} /> {c.endCta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
