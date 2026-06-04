"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  userId?: string | null;
  userEmail?: string | null;
  title?: string;
  subtitle?: string;
  compact?: boolean;
};

export default function ContactForm({ userId, userEmail, title, subtitle, compact }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(userEmail ?? "");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setSending(true);
    setError(null);

    const { error: insertError } = await supabase.from("messages").insert({
      user_id: userId ?? null,
      name: name.trim() || null,
      email: email.trim() || null,
      subject: subject.trim() || null,
      content: content.trim(),
    });

    if (insertError) {
      setError("Failed to send. Please try again.");
      setSending(false);
      return;
    }

    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 text-center ${compact ? "py-6" : "py-10"}`}>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10">
          <CheckCircle size={28} className="text-teal" />
        </div>
        <p className="font-semibold text-white">Message sent!</p>
        <p className="text-sm text-mist">We'll get back to you soon.</p>
        <button
          onClick={() => { setSent(false); setContent(""); setSubject(""); }}
          className="mt-2 text-xs text-brass2 hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className={`${compact ? "mb-4" : "mb-6"}`}>
          {title && (
            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-brass2" />
              <h3 className={`font-display font-semibold text-white ${compact ? "text-base" : "text-xl"}`}>{title}</h3>
            </div>
          )}
          {subtitle && <p className="mt-1 text-sm text-mist">{subtitle}</p>}
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-coral/30 bg-coral/10 px-4 py-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-coral" />
          <p className="text-sm text-coral">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {!userId && (
          <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
            />
          </div>
        )}

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject (optional)"
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass placeholder:text-mist/50"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your message or suggestion..."
          required
          rows={compact ? 3 : 4}
          className="rounded-xl border border-white/10 bg-navy2 px-4 py-3 text-sm text-white outline-none focus:border-brass resize-none placeholder:text-mist/50"
        />

        <button
          type="submit"
          disabled={sending || !content.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brass to-brass2 px-5 py-3 text-sm font-bold text-deep transition hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
        >
          <Send size={15} />
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
