"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/langs";

// The Privacy Policy. Rewritten on 17 November 2026 together with the consent
// boxes (lib/consent.ts): when its substance changes, move the date here and
// CONSENT_VERSION there, so every account is asked to confirm again.
//
// It must describe what the site actually does. Google Analytics loads for
// every visitor by the owner's decision (see CLAUDE.md, Routing), so the text
// does not claim analytics waits for a cookie answer.

type Policy = { title: string; updated: string; intro: string; sections: { title: string; body: string }[] };

const TRANSLATIONS: Record<Lang, Policy> = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: 17 November 2026",
    intro: "This policy explains what personal data SeaJobs.pro collects, why, who receives it, how long it is kept and what rights you have. It applies to seafarers, crewing companies and visitors of the site.",
    sections: [
      {
        title: "1. Who is responsible for your data",
        body: "The controller of personal data is the owner of the website SeaJobs.pro, a private individual. For any question about your data, to withdraw consent or to have your data deleted, write to partners@seajobs.pro.",
      },
      {
        title: "2. What we collect",
        body: "Account: e-mail, role, and a password (kept by our sign-in provider in hashed form), or your name and e-mail from Google if you sign in with Google. Seafarer profile and CV, as far as you fill them in: name, photo, date and place of birth, nationality, contact details, rank, passport and seaman's book details, visas, medical certificate dates, certificates and their scans, diplomas, sea service, languages and uploaded CV files. Company profile: company name, contacts, contact persons, logo and vacancies. Activity: applications, messages between companies and seafarers, forum posts and comments, notifications, saved vacancies and job alerts, and your Telegram account id if you connect our bot. Payments: the name, e-mail and amount Buy Me a Coffee passes to us when you pay; we never see card details. Technical data: IP address, browser and device data, and pages visited. Consent records: which boxes you ticked, when, from which IP address and in which language.",
      },
      {
        title: "3. Why we use it and on what basis",
        body: "To run your account and the services you asked for — the profile, the CV builder, applications, messages, the subscription and paid services (performance of a contract with you). To show your profile and CV to crewing companies and to pass them to a company when you apply (your consent). To send account and application e-mails and notifications (performance of a contract). To keep the site secure, prevent abuse and count visits (our legitimate interest). To send the weekly vacancy digest and news by e-mail, only if you ticked that box (your consent, withdrawn with one click in any such e-mail or in your account). To keep payment records (legal obligation). We do not sell personal data and do not make automated decisions about you.",
      },
      {
        title: "4. Who receives your data",
        body: "Crewing companies registered on SeaJobs.pro see seafarer profiles in the search (unless you hide your profile) and receive your CV when you apply through the site. When you apply from your own mailbox, you send the letter and the CV yourself. If you order CV distribution, your CV is sent to the crewing agencies of the package you chose. Service providers process data on our behalf: Supabase (database, sign-in, file storage), Vercel (hosting), Resend (e-mail delivery), Anthropic (AI reading of an uploaded CV to fill in the profile, and translation of texts), Google (sign-in with Google, Google Analytics), Telegram (notifications if you connect our bot; CV-distribution orders are handled in the site team's Telegram chat), Buy Me a Coffee (payments) and Brevo (the weekly vacancy digest and news by e-mail, only if you asked for them).",
      },
      {
        title: "5. Transfers outside Ukraine and the EU",
        body: "Some of these providers store or process data in the United States and other countries. Such transfers rely on the providers' standard contractual clauses or equivalent safeguards.",
      },
      {
        title: "6. Your consent",
        body: "When you register, and in the banner in your account, you confirm your consent to the processing of personal data, and we keep a record of it. You can withdraw consent at any time by deleting your account (cabinet → Privacy and account) or by writing to partners@seajobs.pro. Withdrawal does not affect processing done before it.",
      },
      {
        title: "7. How long we keep data",
        body: "As long as your account exists. When a seafarer deletes their account, the profile, CV, certificates, sea service, applications, messages and other account data are deleted at once; forum posts stay without the name; payment records are kept as long as accounting requires. A company account is deleted on request to partners@seajobs.pro.",
      },
      {
        title: "8. Your rights",
        body: "You have the right to access your data, correct it, delete it, restrict or object to its processing, receive it in a portable form and withdraw consent. Most of it you can edit or delete yourself in your account; for anything else write to partners@seajobs.pro — we answer within 30 days, usually much sooner. You may also complain to a data protection authority: in Ukraine, the Ukrainian Parliament Commissioner for Human Rights; in the EU, the authority of your country.",
      },
      {
        title: "9. Cookies and analytics",
        body: "We use cookies and browser storage needed for sign-in and your settings (language, theme), and Google Analytics to count visits and see which pages are used. Google Analytics sets its own cookies and receives your IP address and device data. You can block cookies in your browser settings; signing in will not work without them.",
      },
      {
        title: "10. Security",
        body: "Data travels over encrypted connections (HTTPS). Access rules in the database let each user read only what they are allowed to: passport numbers, dates of birth, visas and document scans are not shown in public profiles or the search — a company receives them only in the CV you send it when you apply. Private files, such as CVs for distribution, sit in closed storage and are opened by the site team through short-lived links.",
      },
      {
        title: "11. Children",
        body: "SeaJobs.pro is not intended for people under 18. We do not knowingly collect their data; if you believe a minor has given us personal data, write to partners@seajobs.pro and we will delete it.",
      },
      {
        title: "12. Changes to this policy",
        body: "When this policy changes in substance, we update the date above and ask you to confirm your consent again in your account.",
      },
      {
        title: "13. Contact",
        body: "partners@seajobs.pro",
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    updated: "Обновлено: 17 ноября 2026",
    intro: "Эта политика объясняет, какие персональные данные собирает SeaJobs.pro, зачем, кто их получает, сколько они хранятся и какие у вас права. Она касается моряков, крюинговых компаний и посетителей сайта.",
    sections: [
      {
        title: "1. Кто отвечает за ваши данные",
        body: "Оператор персональных данных — владелец сайта SeaJobs.pro, частное лицо. По любым вопросам о ваших данных, чтобы отозвать согласие или удалить данные, пишите на partners@seajobs.pro.",
      },
      {
        title: "2. Какие данные мы собираем",
        body: "Аккаунт: e-mail, роль и пароль (хранится у провайдера входа в зашифрованном виде) или имя и e-mail из Google, если вы входите через Google. Профиль и CV моряка — в той мере, в какой вы их заполняете: имя, фото, дата и место рождения, гражданство, контакты, должность, данные паспорта и мореходной книжки, визы, даты медицинской справки, сертификаты и их сканы, дипломы, морской стаж, языки и загруженные файлы CV. Профиль компании: название, контакты, контактные лица, логотип и вакансии. Активность: отклики, переписка компаний и моряков, сообщения и комментарии на форуме, уведомления, сохранённые вакансии и подписки, а также id вашего аккаунта Telegram, если вы подключили нашего бота. Оплаты: имя, e-mail и сумма, которые передаёт нам Buy Me a Coffee; данных карты мы не видим. Технические данные: IP-адрес, данные браузера и устройства, просмотренные страницы. Записи о согласии: какие галочки вы отметили, когда, с какого IP-адреса и на каком языке.",
      },
      {
        title: "3. Зачем мы их используем и на каком основании",
        body: "Чтобы работал ваш аккаунт и услуги, о которых вы просили, — профиль, конструктор CV, отклики, переписка, подписка и платные услуги (исполнение договора с вами). Чтобы показывать ваш профиль и CV крюинговым компаниям и передавать их компании, когда вы откликаетесь (ваше согласие). Чтобы присылать письма и уведомления об аккаунте и откликах (исполнение договора). Чтобы защищать сайт, предотвращать злоупотребления и считать посещения (наш законный интерес). Чтобы присылать на почту еженедельную подборку вакансий и новости — только если вы отметили эту галочку (ваше согласие; отозвать его можно одним кликом в любом таком письме или в кабинете). Чтобы хранить записи об оплатах (требование закона). Мы не продаём персональные данные и не принимаем о вас автоматических решений.",
      },
      {
        title: "4. Кто получает ваши данные",
        body: "Крюинговые компании, зарегистрированные на SeaJobs.pro, видят профили моряков в поиске (если вы не скрыли профиль) и получают ваше CV, когда вы откликаетесь через сайт. Когда вы откликаетесь со своей почты, письмо и CV вы отправляете сами. Если вы заказали рассылку CV, ваше CV отправляется крюинговым агентствам выбранного пакета. Данные по нашему поручению обрабатывают сервисы: Supabase (база данных, вход, хранение файлов), Vercel (хостинг), Resend (доставка писем), Anthropic (чтение загруженного CV с помощью ИИ для заполнения профиля и перевод текстов), Google (вход через Google, Google Analytics), Telegram (уведомления, если вы подключили бота; заказы рассылки CV обрабатываются в Telegram-чате команды сайта), Buy Me a Coffee (оплаты) и Brevo (еженедельная подборка вакансий и новости на почту — только если вы на них подписались).",
      },
      {
        title: "5. Передача данных за пределы Украины и ЕС",
        body: "Часть этих сервисов хранит или обрабатывает данные в США и других странах. Такая передача опирается на стандартные договорные условия этих сервисов или равноценные гарантии.",
      },
      {
        title: "6. Ваше согласие",
        body: "При регистрации и в баннере в личном кабинете вы подтверждаете согласие на обработку персональных данных, и мы храним запись об этом. Отозвать согласие можно в любой момент: удалить аккаунт (кабинет → Приватность и аккаунт) или написать на partners@seajobs.pro. Отзыв не влияет на обработку, проведённую до него.",
      },
      {
        title: "7. Сколько мы храним данные",
        body: "Пока существует ваш аккаунт. Когда моряк удаляет аккаунт, профиль, CV, сертификаты, морской стаж, отклики, переписка и другие данные аккаунта удаляются сразу; сообщения на форуме остаются без имени; записи об оплатах хранятся столько, сколько требует учёт. Аккаунт компании удаляется по запросу на partners@seajobs.pro.",
      },
      {
        title: "8. Ваши права",
        body: "Вы вправе получить доступ к своим данным, исправить их, удалить, ограничить их обработку или возразить против неё, получить их в переносимом виде и отозвать согласие. Большую часть вы можете изменить или удалить сами в кабинете; по остальному пишите на partners@seajobs.pro — мы отвечаем в течение 30 дней, обычно намного быстрее. Вы также можете подать жалобу в орган по защите данных: в Украине — Уполномоченному Верховной Рады по правам человека, в ЕС — в орган своей страны.",
      },
      {
        title: "9. Cookies и аналитика",
        body: "Мы используем cookies и хранилище браузера, нужные для входа и ваших настроек (язык, тема), и Google Analytics, чтобы считать посещения и видеть, какие страницы используются. Google Analytics ставит свои cookies и получает ваш IP-адрес и данные устройства. Cookies можно заблокировать в настройках браузера; без них вход работать не будет.",
      },
      {
        title: "10. Безопасность",
        body: "Данные передаются по зашифрованному соединению (HTTPS). Правила доступа в базе данных позволяют каждому пользователю читать только то, что ему положено: номера паспортов, даты рождения, визы и сканы документов не показываются в публичных профилях и в поиске — компания получает их только в CV, которое вы отправляете ей при отклике. Закрытые файлы, например CV для рассылки, лежат в закрытом хранилище, и команда сайта открывает их по ссылкам с коротким сроком действия.",
      },
      {
        title: "11. Дети",
        body: "SeaJobs.pro не предназначен для лиц младше 18 лет. Мы сознательно не собираем их данные; если вы считаете, что несовершеннолетний передал нам персональные данные, напишите на partners@seajobs.pro, и мы их удалим.",
      },
      {
        title: "12. Изменения политики",
        body: "Если политика существенно меняется, мы обновляем дату выше и просим вас снова подтвердить согласие в личном кабинете.",
      },
      {
        title: "13. Контакты",
        body: "partners@seajobs.pro",
      },
    ],
  },
  ua: {
    title: "Політика конфіденційності",
    updated: "Оновлено: 17 листопада 2026",
    intro: "Ця політика пояснює, які персональні дані збирає SeaJobs.pro, навіщо, хто їх отримує, скільки вони зберігаються та які у вас права. Вона стосується моряків, крюїнгових компаній і відвідувачів сайту.",
    sections: [
      {
        title: "1. Хто відповідає за ваші дані",
        body: "Володілець персональних даних — власник сайту SeaJobs.pro, приватна особа. З будь-яких питань щодо ваших даних, щоб відкликати згоду або видалити дані, пишіть на partners@seajobs.pro.",
      },
      {
        title: "2. Які дані ми збираємо",
        body: "Акаунт: e-mail, роль і пароль (зберігається у провайдера входу в зашифрованому вигляді) або ім'я та e-mail з Google, якщо ви входите через Google. Профіль і CV моряка — тією мірою, якою ви їх заповнюєте: ім'я, фото, дата і місце народження, громадянство, контакти, посада, дані паспорта та посвідчення моряка, візи, дати медичної довідки, сертифікати та їх скани, дипломи, морський стаж, мови та завантажені файли CV. Профіль компанії: назва, контакти, контактні особи, логотип і вакансії. Активність: відгуки, листування компаній і моряків, повідомлення та коментарі на форумі, сповіщення, збережені вакансії та підписки, а також id вашого акаунта Telegram, якщо ви підключили нашого бота. Оплати: ім'я, e-mail і сума, які передає нам Buy Me a Coffee; даних картки ми не бачимо. Технічні дані: IP-адреса, дані браузера і пристрою, переглянуті сторінки. Записи про згоду: які галочки ви позначили, коли, з якої IP-адреси та якою мовою.",
      },
      {
        title: "3. Навіщо ми їх використовуємо і на якій підставі",
        body: "Щоб працював ваш акаунт і послуги, про які ви просили, — профіль, конструктор CV, відгуки, листування, підписка та платні послуги (виконання договору з вами). Щоб показувати ваш профіль і CV крюїнговим компаніям і передавати їх компанії, коли ви відгукуєтеся (ваша згода). Щоб надсилати листи та сповіщення щодо акаунта й відгуків (виконання договору). Щоб захищати сайт, запобігати зловживанням і рахувати відвідування (наш законний інтерес). Щоб надсилати на пошту щотижневу добірку вакансій і новини — лише якщо ви позначили цю галочку (ваша згода; відкликати її можна одним кліком у будь-якому такому листі або в кабінеті). Щоб зберігати записи про оплати (вимога закону). Ми не продаємо персональні дані й не ухвалюємо щодо вас автоматичних рішень.",
      },
      {
        title: "4. Хто отримує ваші дані",
        body: "Крюїнгові компанії, зареєстровані на SeaJobs.pro, бачать профілі моряків у пошуку (якщо ви не приховали профіль) і отримують ваше CV, коли ви відгукуєтеся через сайт. Коли ви відгукуєтеся зі своєї пошти, лист і CV ви надсилаєте самі. Якщо ви замовили розсилку CV, ваше CV надсилається крюїнговим агентствам обраного пакета. Дані за нашим дорученням обробляють сервіси: Supabase (база даних, вхід, зберігання файлів), Vercel (хостинг), Resend (доставка листів), Anthropic (читання завантаженого CV за допомогою ШІ для заповнення профілю та переклад текстів), Google (вхід через Google, Google Analytics), Telegram (сповіщення, якщо ви підключили бота; замовлення розсилки CV обробляються в Telegram-чаті команди сайту), Buy Me a Coffee (оплати) і Brevo (щотижнева добірка вакансій і новини на пошту — лише якщо ви на них підписалися).",
      },
      {
        title: "5. Передача даних за межі України та ЄС",
        body: "Частина цих сервісів зберігає або обробляє дані у США та інших країнах. Така передача спирається на стандартні договірні умови цих сервісів або рівноцінні гарантії.",
      },
      {
        title: "6. Ваша згода",
        body: "Під час реєстрації та в банері в особистому кабінеті ви підтверджуєте згоду на обробку персональних даних, і ми зберігаємо запис про це. Відкликати згоду можна будь-коли: видалити акаунт (кабінет → Приватність і акаунт) або написати на partners@seajobs.pro. Відкликання не впливає на обробку, проведену до нього.",
      },
      {
        title: "7. Скільки ми зберігаємо дані",
        body: "Доки існує ваш акаунт. Коли моряк видаляє акаунт, профіль, CV, сертифікати, морський стаж, відгуки, листування та інші дані акаунта видаляються одразу; повідомлення на форумі залишаються без імені; записи про оплати зберігаються стільки, скільки вимагає облік. Акаунт компанії видаляється на запит на partners@seajobs.pro.",
      },
      {
        title: "8. Ваші права",
        body: "Ви маєте право отримати доступ до своїх даних, виправити їх, видалити, обмежити їх обробку або заперечити проти неї, отримати їх у переносному вигляді та відкликати згоду. Більшість ви можете змінити або видалити самі в кабінеті; щодо решти пишіть на partners@seajobs.pro — ми відповідаємо протягом 30 днів, зазвичай набагато швидше. Ви також можете поскаржитися до органу із захисту даних: в Україні — Уповноваженому Верховної Ради України з прав людини, в ЄС — до органу своєї країни.",
      },
      {
        title: "9. Cookies та аналітика",
        body: "Ми використовуємо cookies і сховище браузера, потрібні для входу та ваших налаштувань (мова, тема), і Google Analytics, щоб рахувати відвідування та бачити, які сторінки використовуються. Google Analytics встановлює власні cookies і отримує вашу IP-адресу та дані пристрою. Cookies можна заблокувати в налаштуваннях браузера; без них вхід не працюватиме.",
      },
      {
        title: "10. Безпека",
        body: "Дані передаються зашифрованим з'єднанням (HTTPS). Правила доступу в базі даних дозволяють кожному користувачеві читати лише те, що йому належить: номери паспортів, дати народження, візи та скани документів не показуються в публічних профілях і в пошуку — компанія отримує їх лише в CV, яке ви надсилаєте їй під час відгуку. Закриті файли, наприклад CV для розсилки, лежать у закритому сховищі, і команда сайту відкриває їх за посиланнями з коротким строком дії.",
      },
      {
        title: "11. Діти",
        body: "SeaJobs.pro не призначений для осіб, молодших за 18 років. Ми свідомо не збираємо їхні дані; якщо ви вважаєте, що неповнолітній передав нам персональні дані, напишіть на partners@seajobs.pro, і ми їх видалимо.",
      },
      {
        title: "12. Зміни політики",
        body: "Якщо політика суттєво змінюється, ми оновлюємо дату вище і просимо вас знову підтвердити згоду в особистому кабінеті.",
      },
      {
        title: "13. Контакти",
        body: "partners@seajobs.pro",
      },
    ],
  },
  pl: {
    title: "Polityka prywatności",
    updated: "Ostatnia aktualizacja: 17 listopada 2026",
    intro: "Ta polityka wyjaśnia, jakie dane osobowe zbiera SeaJobs.pro, w jakim celu, kto je otrzymuje, jak długo są przechowywane i jakie masz prawa. Dotyczy marynarzy, firm crewingowych i odwiedzających serwis.",
    sections: [
      {
        title: "1. Kto odpowiada za Twoje dane",
        body: "Administratorem danych osobowych jest właściciel serwisu SeaJobs.pro, osoba prywatna. W każdej sprawie dotyczącej Twoich danych, aby wycofać zgodę lub usunąć dane, napisz na partners@seajobs.pro.",
      },
      {
        title: "2. Jakie dane zbieramy",
        body: "Konto: e-mail, rola i hasło (przechowywane przez dostawcę logowania w postaci zaszyfrowanej) albo imię i e-mail z Google, jeśli logujesz się przez Google. Profil i CV marynarza — w zakresie, w jakim je wypełnisz: imię i nazwisko, zdjęcie, data i miejsce urodzenia, obywatelstwo, dane kontaktowe, stanowisko, dane paszportu i książeczki żeglarskiej, wizy, daty świadectwa zdrowia, certyfikaty i ich skany, dyplomy, staż morski, języki oraz przesłane pliki CV. Profil firmy: nazwa, kontakty, osoby kontaktowe, logo i oferty pracy. Aktywność: aplikacje, wiadomości między firmami a marynarzami, posty i komentarze na forum, powiadomienia, zapisane oferty i alerty oraz id Twojego konta Telegram, jeśli połączysz naszego bota. Płatności: imię, e-mail i kwota, które przekazuje nam Buy Me a Coffee; nie widzimy danych karty. Dane techniczne: adres IP, dane przeglądarki i urządzenia, odwiedzone strony. Zapisy zgód: które pola zaznaczyłeś, kiedy, z jakiego adresu IP i w jakim języku.",
      },
      {
        title: "3. Cel i podstawa przetwarzania",
        body: "Aby działało Twoje konto i usługi, o które prosisz — profil, kreator CV, aplikacje, wiadomości, subskrypcja i usługi płatne (wykonanie umowy z Tobą). Aby pokazywać Twój profil i CV firmom crewingowym i przekazywać je firmie, gdy aplikujesz (Twoja zgoda). Aby wysyłać e-maile i powiadomienia dotyczące konta i aplikacji (wykonanie umowy). Aby chronić serwis, zapobiegać nadużyciom i liczyć odwiedziny (nasz prawnie uzasadniony interes). Aby wysyłać e-mailem cotygodniowy przegląd ofert i wiadomości — tylko jeśli zaznaczyłeś to pole (Twoja zgoda; wycofasz ją jednym kliknięciem w każdym takim e-mailu lub na koncie). Aby przechowywać zapisy płatności (obowiązek prawny). Nie sprzedajemy danych osobowych i nie podejmujemy wobec Ciebie zautomatyzowanych decyzji.",
      },
      {
        title: "4. Kto otrzymuje Twoje dane",
        body: "Firmy crewingowe zarejestrowane w SeaJobs.pro widzą profile marynarzy w wyszukiwarce (chyba że ukryjesz profil) i otrzymują Twoje CV, gdy aplikujesz przez serwis. Gdy aplikujesz ze swojej skrzynki, list i CV wysyłasz sam. Jeśli zamówisz rozsyłkę CV, Twoje CV trafia do agencji crewingowych z wybranego pakietu. Dane w naszym imieniu przetwarzają: Supabase (baza danych, logowanie, przechowywanie plików), Vercel (hosting), Resend (dostarczanie e-maili), Anthropic (odczyt przesłanego CV przez AI w celu wypełnienia profilu oraz tłumaczenie tekstów), Google (logowanie przez Google, Google Analytics), Telegram (powiadomienia, jeśli połączysz bota; zamówienia rozsyłki CV są obsługiwane na czacie zespołu serwisu w Telegramie), Buy Me a Coffee (płatności) i Brevo (cotygodniowy przegląd ofert i wiadomości e-mailem — tylko jeśli się na nie zapisałeś).",
      },
      {
        title: "5. Przekazywanie danych poza Ukrainę i UE",
        body: "Część tych dostawców przechowuje lub przetwarza dane w Stanach Zjednoczonych i innych krajach. Takie przekazanie opiera się na standardowych klauzulach umownych tych dostawców lub równoważnych zabezpieczeniach.",
      },
      {
        title: "6. Twoja zgoda",
        body: "Przy rejestracji oraz w banerze na swoim koncie potwierdzasz zgodę na przetwarzanie danych osobowych, a my przechowujemy zapis tej zgody. Możesz ją wycofać w każdej chwili: usuwając konto (panel → Prywatność i konto) lub pisząc na partners@seajobs.pro. Wycofanie zgody nie wpływa na przetwarzanie dokonane przed nim.",
      },
      {
        title: "7. Jak długo przechowujemy dane",
        body: "Tak długo, jak istnieje Twoje konto. Gdy marynarz usuwa konto, profil, CV, certyfikaty, staż morski, aplikacje, wiadomości i inne dane konta są usuwane od razu; posty na forum pozostają bez imienia; zapisy płatności przechowujemy tak długo, jak wymaga tego księgowość. Konto firmy jest usuwane na prośbę wysłaną na partners@seajobs.pro.",
      },
      {
        title: "8. Twoje prawa",
        body: "Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania lub sprzeciwu wobec niego, otrzymania ich w przenośnej formie oraz wycofania zgody. Większość możesz zmienić lub usunąć sam w panelu; w pozostałych sprawach napisz na partners@seajobs.pro — odpowiadamy w ciągu 30 dni, zwykle znacznie szybciej. Możesz też złożyć skargę do organu ochrony danych: w Polsce do Prezesa UODO, w innych krajach UE do organu swojego kraju, na Ukrainie do Rzecznika Praw Obywatelskich Rady Najwyższej.",
      },
      {
        title: "9. Cookies i analityka",
        body: "Używamy cookies i pamięci przeglądarki potrzebnych do logowania i Twoich ustawień (język, motyw) oraz Google Analytics, aby liczyć odwiedziny i widzieć, które strony są używane. Google Analytics zapisuje własne cookies i otrzymuje Twój adres IP oraz dane urządzenia. Cookies możesz zablokować w ustawieniach przeglądarki; bez nich logowanie nie będzie działać.",
      },
      {
        title: "10. Bezpieczeństwo",
        body: "Dane są przesyłane szyfrowanym połączeniem (HTTPS). Reguły dostępu w bazie danych pozwalają każdemu użytkownikowi czytać tylko to, co mu przysługuje: numery paszportów, daty urodzenia, wizy i skany dokumentów nie są pokazywane w publicznych profilach ani w wyszukiwarce — firma otrzymuje je tylko w CV, które wysyłasz jej, aplikując. Pliki prywatne, np. CV do rozsyłki, leżą w zamkniętym magazynie, a zespół serwisu otwiera je przez linki o krótkiej ważności.",
      },
      {
        title: "11. Dzieci",
        body: "SeaJobs.pro nie jest przeznaczony dla osób poniżej 18 lat. Nie zbieramy świadomie ich danych; jeśli uważasz, że osoba niepełnoletnia przekazała nam dane osobowe, napisz na partners@seajobs.pro, a usuniemy je.",
      },
      {
        title: "12. Zmiany polityki",
        body: "Gdy polityka zmienia się istotnie, aktualizujemy datę powyżej i prosimy o ponowne potwierdzenie zgody na Twoim koncie.",
      },
      {
        title: "13. Kontakt",
        body: "partners@seajobs.pro",
      },
    ],
  },
  ro: {
    title: "Politica de confidențialitate",
    updated: "Ultima actualizare: 17 noiembrie 2026",
    intro: "Această politică explică ce date personale colectează SeaJobs.pro, de ce, cine le primește, cât timp sunt păstrate și ce drepturi ai. Se aplică marinarilor, agențiilor de crewing și vizitatorilor site-ului.",
    sections: [
      {
        title: "1. Cine răspunde de datele tale",
        body: "Operatorul datelor personale este proprietarul site-ului SeaJobs.pro, persoană fizică. Pentru orice întrebare despre datele tale, pentru retragerea consimțământului sau ștergerea datelor, scrie la partners@seajobs.pro.",
      },
      {
        title: "2. Ce date colectăm",
        body: "Cont: e-mail, rol și parolă (păstrată criptat de furnizorul de autentificare) sau numele și e-mailul din Google, dacă te conectezi cu Google. Profilul și CV-ul marinarului, în măsura în care le completezi: nume, fotografie, data și locul nașterii, cetățenie, date de contact, funcție, datele pașaportului și ale carnetului de marinar, vize, datele certificatului medical, certificate și scanările lor, diplome, stagiu pe mare, limbi și fișiere CV încărcate. Profilul companiei: denumire, contacte, persoane de contact, logo și posturi. Activitate: aplicări, mesaje între companii și marinari, postări și comentarii pe forum, notificări, posturi salvate și alerte, precum și id-ul contului tău Telegram, dacă conectezi botul nostru. Plăți: numele, e-mailul și suma pe care ni le transmite Buy Me a Coffee; nu vedem datele cardului. Date tehnice: adresa IP, datele browserului și ale dispozitivului, paginile vizitate. Evidența consimțământului: ce căsuțe ai bifat, când, de pe ce adresă IP și în ce limbă.",
      },
      {
        title: "3. De ce le folosim și pe ce temei",
        body: "Pentru funcționarea contului tău și a serviciilor cerute — profilul, generatorul de CV, aplicările, mesajele, abonamentul și serviciile plătite (executarea unui contract cu tine). Pentru a arăta profilul și CV-ul tău agențiilor de crewing și a le transmite unei companii când aplici (consimțământul tău). Pentru a trimite e-mailuri și notificări despre cont și aplicări (executarea contractului). Pentru a proteja site-ul, a preveni abuzurile și a număra vizitele (interesul nostru legitim). Pentru a trimite pe e-mail selecția săptămânală de posturi și noutăți — doar dacă ai bifat această căsuță (consimțământul tău; îl retragi cu un clic în orice astfel de e-mail sau din cont). Pentru a păstra evidența plăților (obligație legală). Nu vindem date personale și nu luăm decizii automate despre tine.",
      },
      {
        title: "4. Cine primește datele tale",
        body: "Agențiile de crewing înregistrate pe SeaJobs.pro văd profilurile marinarilor în căutare (dacă nu ți-ai ascuns profilul) și primesc CV-ul tău când aplici prin site. Când aplici din propria căsuță de e-mail, trimiți tu scrisoarea și CV-ul. Dacă comanzi distribuirea CV-ului, acesta este trimis agențiilor de crewing din pachetul ales. Datele sunt prelucrate în numele nostru de: Supabase (bază de date, autentificare, stocare fișiere), Vercel (găzduire), Resend (livrare e-mail), Anthropic (citirea cu AI a CV-ului încărcat pentru completarea profilului și traducerea textelor), Google (autentificare cu Google, Google Analytics), Telegram (notificări, dacă conectezi botul; comenzile de distribuire a CV-ului sunt gestionate în chatul Telegram al echipei site-ului), Buy Me a Coffee (plăți) și Brevo (selecția săptămânală de posturi și noutăți pe e-mail — doar dacă te-ai abonat).",
      },
      {
        title: "5. Transferuri în afara Ucrainei și a UE",
        body: "Unii dintre acești furnizori stochează sau prelucrează date în Statele Unite și în alte țări. Astfel de transferuri se bazează pe clauzele contractuale standard ale furnizorilor sau pe garanții echivalente.",
      },
      {
        title: "6. Consimțământul tău",
        body: "La înregistrare și în bannerul din contul tău îți confirmi consimțământul pentru prelucrarea datelor personale, iar noi păstrăm evidența acestuia. Îl poți retrage oricând: ștergând contul (cont → Confidențialitate și cont) sau scriind la partners@seajobs.pro. Retragerea nu afectează prelucrarea efectuată înainte de ea.",
      },
      {
        title: "7. Cât timp păstrăm datele",
        body: "Cât timp există contul tău. Când un marinar își șterge contul, profilul, CV-ul, certificatele, stagiul pe mare, aplicările, mesajele și celelalte date ale contului sunt șterse imediat; postările de pe forum rămân fără nume; evidența plăților se păstrează cât cere contabilitatea. Contul unei companii se șterge la cerere, prin e-mail la partners@seajobs.pro.",
      },
      {
        title: "8. Drepturile tale",
        body: "Ai dreptul de acces la datele tale, de rectificare, de ștergere, de restricționare a prelucrării sau de opoziție, de a le primi într-un format portabil și de a-ți retrage consimțământul. Majoritatea le poți modifica sau șterge singur din cont; pentru restul scrie la partners@seajobs.pro — răspundem în 30 de zile, de obicei mult mai repede. Poți depune și o plângere la autoritatea de protecție a datelor: în România la ANSPDCP, în alte țări UE la autoritatea țării tale, în Ucraina la Comisarul Radei Supreme pentru drepturile omului.",
      },
      {
        title: "9. Cookie-uri și analiză",
        body: "Folosim cookie-uri și stocarea browserului necesare pentru autentificare și setările tale (limbă, temă), precum și Google Analytics pentru a număra vizitele și a vedea ce pagini sunt folosite. Google Analytics setează propriile cookie-uri și primește adresa ta IP și datele dispozitivului. Poți bloca cookie-urile din setările browserului; fără ele autentificarea nu va funcționa.",
      },
      {
        title: "10. Securitate",
        body: "Datele circulă prin conexiuni criptate (HTTPS). Regulile de acces din baza de date permit fiecărui utilizator să citească doar ce i se cuvine: numerele de pașaport, datele nașterii, vizele și scanările documentelor nu apar în profilurile publice sau în căutare — o companie le primește doar în CV-ul pe care i-l trimiți când aplici. Fișierele private, de exemplu CV-urile pentru distribuire, stau într-o stocare închisă, iar echipa site-ului le deschide prin linkuri valabile scurt timp.",
      },
      {
        title: "11. Copii",
        body: "SeaJobs.pro nu se adresează persoanelor sub 18 ani. Nu colectăm cu bună știință datele lor; dacă crezi că un minor ne-a transmis date personale, scrie la partners@seajobs.pro și le vom șterge.",
      },
      {
        title: "12. Modificări ale politicii",
        body: "Când politica se schimbă substanțial, actualizăm data de mai sus și îți cerem să confirmi din nou consimțământul în contul tău.",
      },
      {
        title: "13. Contact",
        body: "partners@seajobs.pro",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { lang } = useLang();
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">{t.title}</h1>
          <p className="mt-3 text-mist">{t.updated}</p>
          <p className="mt-4 text-mist leading-relaxed">{t.intro}</p>

          <div className="mt-10 flex flex-col gap-8">
            {t.sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-semibold text-white mb-3">{s.title}</h2>
                <p className="text-mist leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
