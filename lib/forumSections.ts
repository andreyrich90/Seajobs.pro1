import type { Lang } from "@/lib/i18n";

// Forum section names/descriptions are stored in English in forum_categories
// (plain text). These maps localise the built-in sections for display; custom
// sections fall back to their stored text.
const NAMES: Record<string, Partial<Record<Lang, string>>> = {
  "Questions & Answers": { ru: "Вопрос — Ответ", ua: "Питання — Відповідь", pl: "Pytania i odpowiedzi", ro: "Întrebări și răspunsuri" },
  "Crewing Reviews": { ru: "Отзывы о крюингах", ua: "Відгуки про крюінги", pl: "Opinie o agencjach crewingowych", ro: "Recenzii agenții de crewing" },
  "Life at Sea": { ru: "Жизнь в море", ua: "Життя в морі", pl: "Życie na morzu", ro: "Viața pe mare" },
  "Career & Employment": { ru: "Карьера и трудоустройство", ua: "Кар'єра та працевлаштування", pl: "Kariera i zatrudnienie", ro: "Carieră și angajare" },
  "Documents & Visas": { ru: "Документы и визы", ua: "Документи та візи", pl: "Dokumenty i wizy", ro: "Documente și vize" },
  "Ships, Engine & Safety": { ru: "Суда, машина и безопасность", ua: "Судна, машина та безпека", pl: "Statki, maszyna i bezpieczeństwo", ro: "Nave, mașină și siguranță" },
  "General discussion": { ru: "Общие обсуждения", ua: "Загальні обговорення", pl: "Dyskusje ogólne", ro: "Discuții generale" },
};

const DESCS: Record<string, Partial<Record<Lang, string>>> = {
  "Questions & Answers": { ru: "Задайте вопрос — без заголовка", ua: "Поставте запитання — без заголовка", pl: "Zadaj pytanie — bez tytułu", ro: "Pune o întrebare — fără titlu" },
  "Crewing Reviews": { ru: "Отзывы и предупреждения о крюинговых агентствах — без заголовка", ua: "Відгуки та попередження про крюінгові агентства — без заголовка", pl: "Opinie i ostrzeżenia o agencjach — bez tytułu", ro: "Recenzii și avertismente despre agenții — fără titlu" },
  "Life at Sea": { ru: "Жизнь на борту, традиции, самочувствие и истории", ua: "Життя на борту, традиції, самопочуття та історії", pl: "Życie na pokładzie, tradycje i historie", ro: "Viața la bord, tradiții și povești" },
  "Career & Employment": { ru: "Карьера, деньги, контракты и крюинг", ua: "Кар'єра, гроші, контракти та крюінг", pl: "Kariera, pieniądze, kontrakty i crewing", ro: "Carieră, bani, contracte și crewing" },
  "Documents & Visas": { ru: "Визы, документы моряка и оформление", ua: "Візи, документи моряка та оформлення", pl: "Wizy, dokumenty marynarza i formalności", ro: "Vize, documentele marinarului și formalități" },
  "Ships, Engine & Safety": { ru: "Типы судов, машинное отделение и безопасность в море", ua: "Типи суден, машинне відділення та безпека в морі", pl: "Typy statków, maszynownia i bezpieczeństwo", ro: "Tipuri de nave, sala mașinilor și siguranța pe mare" },
};

export function sectionLabel(name: string, lang: string): string {
  return NAMES[name]?.[lang as Lang] ?? name;
}

export function sectionDesc(name: string, lang: string, fallback?: string | null): string | null {
  return DESCS[name]?.[lang as Lang] ?? fallback ?? null;
}
