import type { Lang } from "@/lib/i18n";

// Forum section names/descriptions are stored in English in forum_categories
// (plain text). These maps localise the built-in sections for display; custom
// sections fall back to their stored text.
const NAMES: Record<string, Partial<Record<Lang, string>>> = {
  "Questions & Answers": { ru: "Вопрос — Ответ", ua: "Питання — Відповідь", pl: "Pytania i odpowiedzi" },
  "Crewing Reviews": { ru: "Отзывы о крюингах", ua: "Відгуки про крюінги", pl: "Opinie o agencjach crewingowych" },
  "Life at Sea": { ru: "Жизнь в море", ua: "Життя в морі", pl: "Życie na morzu" },
  "Career & Employment": { ru: "Карьера и трудоустройство", ua: "Кар'єра та працевлаштування", pl: "Kariera i zatrudnienie" },
  "Documents & Visas": { ru: "Документы и визы", ua: "Документи та візи", pl: "Dokumenty i wizy" },
  "Ships, Engine & Safety": { ru: "Суда, машина и безопасность", ua: "Судна, машина та безпека", pl: "Statki, maszyna i bezpieczeństwo" },
  "General discussion": { ru: "Общие обсуждения", ua: "Загальні обговорення", pl: "Dyskusje ogólne" },
};

const DESCS: Record<string, Partial<Record<Lang, string>>> = {
  "Questions & Answers": { ru: "Задайте вопрос — без заголовка", ua: "Поставте запитання — без заголовка", pl: "Zadaj pytanie — bez tytułu" },
  "Crewing Reviews": { ru: "Отзывы и предупреждения о крюинговых агентствах — без заголовка", ua: "Відгуки та попередження про крюінгові агентства — без заголовка", pl: "Opinie i ostrzeżenia o agencjach — bez tytułu" },
  "Life at Sea": { ru: "Жизнь на борту, традиции, самочувствие и истории", ua: "Життя на борту, традиції, самопочуття та історії", pl: "Życie na pokładzie, tradycje i historie" },
  "Career & Employment": { ru: "Карьера, деньги, контракты и крюинг", ua: "Кар'єра, гроші, контракти та крюінг", pl: "Kariera, pieniądze, kontrakty i crewing" },
  "Documents & Visas": { ru: "Визы, документы моряка и оформление", ua: "Візи, документи моряка та оформлення", pl: "Wizy, dokumenty marynarza i formalności" },
  "Ships, Engine & Safety": { ru: "Типы судов, машинное отделение и безопасность в море", ua: "Типи суден, машинне відділення та безпека в морі", pl: "Typy statków, maszynownia i bezpieczeństwo" },
};

export function sectionLabel(name: string, lang: string): string {
  return NAMES[name]?.[lang as Lang] ?? name;
}

export function sectionDesc(name: string, lang: string, fallback?: string | null): string | null {
  return DESCS[name]?.[lang as Lang] ?? fallback ?? null;
}
