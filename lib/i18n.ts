export type Lang = "ua" | "pl" | "ru" | "en";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "ua", label: "UA", flag: "🇺🇦" },
  { code: "pl", label: "PL", flag: "🇵🇱" },
  { code: "ru", label: "RU", flag: "🌐" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export const T: Record<Lang, Record<string, string>> = {
  ua: {
    nav_jobs: "Вакансії", nav_forum: "Форум", nav_news: "Новини", login: "Увійти",
    tagline: "Гавань для морської кар'єри",
    hero_kicker: "Платформа морської кар'єри",
    hero_title: "Твій наступний рейс починається тут",
    hero_sub: "Тисячі перевірених вакансій від крюїнгових агенцій по всій Європі. Створи CV, відстежуй заявки, вкажи дату готовності — все в одній гавані.",
    hero_search: "Посада, ранг або тип судна…",
    hero_cta: "Знайти вакансії",
    stat_jobs: "Відкритих вакансій", stat_companies: "Крюїнгових компаній", stat_seafarers: "Зареєстрованих моряків",
    jobs_latest: "Свіжі вакансії", view_all: "Дивитися всі",
    salary: "Зарплата", duration: "Контракт", joining: "Посадка", flag_l: "Прапор",
    apply: "Подати заявку", applied: "Подано",
    jobs_title: "Вакансії", jobs_found: "вакансій знайдено",
    f_rank: "Ранг", f_vessel: "Тип судна", f_all: "Усі", nothing: "Нічого не знайдено",
    overview: "Опис", requirements: "Вимоги", we_offer: "Ми пропонуємо",
    details: "Детальніше", back: "Назад до вакансій", similar: "Схожі вакансії",
    orig_note: "Опис вакансії наведено мовою оригіналу (надано агенцією).",
    // Cabinet — seafarer
    cab_dashboard: "Головна", cab_profile: "Мій профіль", cab_certificates: "Сертифікати",
    cab_experience: "Досвід роботи", cab_cv: "Моє резюме", cab_applications: "Мої відгуки",
    cab_saved: "Збережені", cab_logout: "Вийти", cab_loading: "Завантаження…",
    // Cabinet — company
    cab_vacancies: "Вакансії", cab_company_profile: "Профіль компанії", cab_applicants: "Відгуки", cab_seafarers: "База моряків",
    // Common
    save: "Зберегти", cancel: "Скасувати", delete: "Видалити", edit: "Редагувати",
    add: "Додати", close: "Закрити", send: "Надіслати", search: "Пошук",
  },
  pl: {
    nav_jobs: "Oferty", nav_forum: "Forum", nav_news: "Aktualności", login: "Zaloguj",
    tagline: "Port kariery morskiej",
    hero_kicker: "Platforma kariery morskiej",
    hero_title: "Twój następny rejs zaczyna się tutaj",
    hero_sub: "Tysiące zweryfikowanych ofert od agencji crewingowych w całej Europie. Stwórz CV, śledź aplikacje, ustaw datę gotowości — wszystko w jednym porcie.",
    hero_search: "Stanowisko, ranga lub typ statku…",
    hero_cta: "Znajdź oferty",
    stat_jobs: "Otwartych ofert", stat_companies: "Firm crewingowych", stat_seafarers: "Zarejestrowanych marynarzy",
    jobs_latest: "Najnowsze oferty", view_all: "Zobacz wszystkie",
    salary: "Wynagrodzenie", duration: "Kontrakt", joining: "Zaokrętowanie", flag_l: "Bandera",
    apply: "Aplikuj", applied: "Wysłano",
    jobs_title: "Oferty pracy", jobs_found: "ofert znalezionych",
    f_rank: "Ranga", f_vessel: "Typ statku", f_all: "Wszystkie", nothing: "Nic nie znaleziono",
    overview: "Opis", requirements: "Wymagania", we_offer: "Oferujemy",
    details: "Szczegóły", back: "Powrót do ofert", similar: "Podobne oferty",
    orig_note: "Opis oferty podano w języku oryginału (dostarczony przez agencję).",
    // Cabinet — seafarer
    cab_dashboard: "Pulpit", cab_profile: "Mój profil", cab_certificates: "Certyfikaty",
    cab_experience: "Doświadczenie", cab_cv: "Moje CV", cab_applications: "Moje aplikacje",
    cab_saved: "Zapisane", cab_logout: "Wyloguj", cab_loading: "Ładowanie…",
    // Cabinet — company
    cab_vacancies: "Oferty", cab_company_profile: "Profil firmy", cab_applicants: "Aplikacje", cab_seafarers: "Baza marynarzy",
    // Common
    save: "Zapisz", cancel: "Anuluj", delete: "Usuń", edit: "Edytuj",
    add: "Dodaj", close: "Zamknij", send: "Wyślij", search: "Szukaj",
  },
  ru: {
    nav_jobs: "Вакансии", nav_forum: "Форум", nav_news: "Новости", login: "Войти",
    tagline: "Гавань для морской карьеры",
    hero_kicker: "Платформа морской карьеры",
    hero_title: "Твой следующий рейс начинается здесь",
    hero_sub: "Тысячи проверенных вакансий от крюинговых агентств по всей Европе. Создай CV, отслеживай заявки, укажи дату готовности — всё в одной гавани.",
    hero_search: "Должность, ранг или тип судна…",
    hero_cta: "Найти вакансии",
    stat_jobs: "Открытых вакансий", stat_companies: "Крюинговых компаний", stat_seafarers: "Зарегистрированных моряков",
    jobs_latest: "Свежие вакансии", view_all: "Смотреть все",
    salary: "Зарплата", duration: "Контракт", joining: "Посадка", flag_l: "Флаг",
    apply: "Откликнуться", applied: "Отклик отправлен",
    jobs_title: "Вакансии", jobs_found: "вакансий найдено",
    f_rank: "Ранг", f_vessel: "Тип судна", f_all: "Все", nothing: "Ничего не найдено",
    overview: "Описание", requirements: "Требования", we_offer: "Что предлагаем",
    details: "Подробнее", back: "Назад к вакансиям", similar: "Похожие вакансии",
    orig_note: "Описание вакансии приведено на языке оригинала (предоставлено агентством).",
    // Cabinet — seafarer
    cab_dashboard: "Главная", cab_profile: "Мой профиль", cab_certificates: "Сертификаты",
    cab_experience: "Опыт работы", cab_cv: "Моё резюме", cab_applications: "Мои отклики",
    cab_saved: "Сохранённые", cab_logout: "Выйти", cab_loading: "Загрузка…",
    // Cabinet — company
    cab_vacancies: "Вакансии", cab_company_profile: "Профиль компании", cab_applicants: "Отклики", cab_seafarers: "База моряков",
    // Common
    save: "Сохранить", cancel: "Отмена", delete: "Удалить", edit: "Изменить",
    add: "Добавить", close: "Закрыть", send: "Отправить", search: "Поиск",
  },
  en: {
    nav_jobs: "Vacancies", nav_forum: "Forum", nav_news: "News", login: "Log in",
    tagline: "The harbour for maritime careers",
    hero_kicker: "Maritime career platform",
    hero_title: "Your next voyage starts here",
    hero_sub: "Thousands of verified vacancies from crewing agencies across Europe. Build your CV, track applications, set your readiness date — all in one harbour.",
    hero_search: "Position, rank or vessel type…",
    hero_cta: "Find vacancies",
    stat_jobs: "Open vacancies", stat_companies: "Crewing companies", stat_seafarers: "Registered seafarers",
    jobs_latest: "Latest vacancies", view_all: "View all",
    salary: "Salary", duration: "Contract", joining: "Joining", flag_l: "Flag",
    apply: "Apply", applied: "Applied",
    jobs_title: "Vacancies", jobs_found: "vacancies found",
    f_rank: "Rank", f_vessel: "Vessel type", f_all: "All", nothing: "Nothing found",
    overview: "Overview", requirements: "Requirements", we_offer: "We offer",
    details: "Details", back: "Back to vacancies", similar: "Similar vacancies",
    orig_note: "The vacancy description is shown in its original language (provided by the agency).",
    // Cabinet — seafarer
    cab_dashboard: "Dashboard", cab_profile: "My Profile", cab_certificates: "Certificates",
    cab_experience: "Sea Experience", cab_cv: "My CV", cab_applications: "Applications",
    cab_saved: "Saved Jobs", cab_logout: "Logout", cab_loading: "Loading…",
    // Cabinet — company
    cab_vacancies: "Vacancies", cab_company_profile: "Company Profile", cab_applicants: "Applications", cab_seafarers: "Seafarers",
    // Common
    save: "Save", cancel: "Cancel", delete: "Delete", edit: "Edit",
    add: "Add", close: "Close", send: "Send", search: "Search",
  },
};
