"use client";

import { Mail, Send, Linkedin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { useLang } from "@/components/LangProvider";

// Public contact page — a real, reachable way to get in touch (contact form +
// direct channels). Required for trust and for ad-network / AdSense review.
const C = {
  en: {
    title: "Contact us",
    intro:
      "Have a question, feedback, a partnership idea, or a privacy/data request? Send us a message below and we'll get back to you within 1–2 business days.",
    formTitle: "Send a message",
    formSub: "Fill in the form and we'll reply by email.",
    also: "You can also reach us here:",
    tg: "Telegram",
    li: "LinkedIn",
  },
  ru: {
    title: "Связаться с нами",
    intro:
      "Есть вопрос, отзыв, идея сотрудничества или запрос по данным/конфиденциальности? Напишите нам ниже — ответим в течение 1–2 рабочих дней.",
    formTitle: "Написать сообщение",
    formSub: "Заполните форму, и мы ответим на email.",
    also: "Также нас можно найти здесь:",
    tg: "Telegram",
    li: "LinkedIn",
  },
  ua: {
    title: "Зв'язатися з нами",
    intro:
      "Маєте питання, відгук, ідею співпраці або запит щодо даних/конфіденційності? Напишіть нам нижче — відповімо протягом 1–2 робочих днів.",
    formTitle: "Написати повідомлення",
    formSub: "Заповніть форму, і ми відповімо на email.",
    also: "Також нас можна знайти тут:",
    tg: "Telegram",
    li: "LinkedIn",
  },
  pl: {
    title: "Kontakt",
    intro:
      "Masz pytanie, opinię, pomysł na współpracę lub prośbę dotyczącą danych/prywatności? Napisz do nas poniżej — odpowiemy w ciągu 1–2 dni roboczych.",
    formTitle: "Wyślij wiadomość",
    formSub: "Wypełnij formularz, a odpowiemy e-mailem.",
    also: "Możesz też skontaktować się z nami tutaj:",
    tg: "Telegram",
    li: "LinkedIn",
  },
  ro: {
    title: "Contact",
    intro:
      "Ai o întrebare, feedback, o idee de parteneriat sau o cerere privind datele/confidențialitatea? Trimite-ne un mesaj mai jos și îți răspundem în 1–2 zile lucrătoare.",
    formTitle: "Trimite un mesaj",
    formSub: "Completează formularul și îți răspundem pe e-mail.",
    also: "Ne poți contacta și aici:",
    tg: "Telegram",
    li: "LinkedIn",
  },
};

export default function ContactPage() {
  const { lang } = useLang();
  const c = C[lang] ?? C.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <h1 className="font-display text-4xl font-semibold text-white">{c.title}</h1>
          <p className="mt-4 text-mist leading-relaxed">{c.intro}</p>

          <div className="mt-6 flex items-center gap-2 text-mist">
            <Mail size={18} className="text-brass2" />
            <a href="mailto:support@seajobs.pro" className="text-brass2 transition hover:text-brass">
              support@seajobs.pro
            </a>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
            <ContactForm title={c.formTitle} subtitle={c.formSub} />
          </div>

          <div className="mt-10">
            <p className="text-sm font-semibold text-white">{c.also}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://t.me/seajobspro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-mist transition hover:text-white"
              >
                <Send size={16} /> {c.tg}
              </a>
              <a
                href="https://www.linkedin.com/in/seajobs-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-mist transition hover:text-white"
              >
                <Linkedin size={16} /> {c.li}
              </a>
              <a
                href="https://facebook.com/seajobspro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-mist transition hover:text-white"
              >
                <MessageCircle size={16} /> Facebook
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
