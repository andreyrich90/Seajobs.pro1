"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, User, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

type Message = {
  id: string;
  user_id: string | null;
  name: string | null;
  email: string | null;
  subject: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
};

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages((data as Message[]) ?? []);
    setLoading(false);
  }

  async function toggleRead(msg: Message) {
    await supabase.from("messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, is_read: !m.is_read } : m));
  }

  async function deleteMessage(id: string) {
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (expanded === id) setExpanded(null);
  }

  const displayed = filter === "unread" ? messages.filter((m) => !m.is_read) : messages;
  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Messages</h1>
          <p className="text-sm text-mist mt-0.5">
            {loading ? "Loading..." : `${messages.length} total · ${unreadCount} unread`}
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? "bg-brass/15 text-brass2 border border-brass/20"
                  : "border border-white/10 text-mist hover:text-white"
              }`}
            >
              {f === "all" ? "All" : `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-mist text-sm">Loading...</p>
        </div>
      ) : displayed.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
          <Mail size={40} className="mx-auto mb-3 text-mist/40" />
          <p className="text-lg font-semibold text-foam">No messages</p>
          <p className="mt-1 text-sm text-mist">
            {filter === "unread" ? "All messages have been read." : "No messages yet."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-2xl border bg-card transition ${
                msg.is_read ? "border-white/10" : "border-brass/30 bg-brass/5"
              }`}
            >
              <button
                className="w-full text-left px-5 py-4"
                onClick={() => {
                  setExpanded(expanded === msg.id ? null : msg.id);
                  if (!msg.is_read) toggleRead(msg);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${msg.is_read ? "bg-white/5" : "bg-brass/10"}`}>
                      {msg.is_read ? <MailOpen size={15} className="text-mist" /> : <Mail size={15} className="text-brass2" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${msg.is_read ? "text-white" : "text-brass2"}`}>
                          {msg.subject || "(no subject)"}
                        </span>
                        {!msg.is_read && (
                          <span className="rounded-full bg-brass/20 px-2 py-0.5 text-xs font-bold text-brass2">NEW</span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1 text-xs text-mist">
                          <User size={11} />
                          {msg.name || msg.email || (msg.user_id ? "Registered user" : "Guest")}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-mist">
                          <Clock size={11} /> {formatDate(msg.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleRead(msg); }}
                      className="rounded-lg p-1.5 text-mist transition hover:bg-white/10 hover:text-white"
                      title={msg.is_read ? "Mark unread" : "Mark read"}
                    >
                      {msg.is_read ? <Mail size={14} /> : <MailOpen size={14} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                      className="rounded-lg p-1.5 text-mist transition hover:bg-coral/10 hover:text-coral"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </button>

              {expanded === msg.id && (
                <div className="px-5 pb-5 border-t border-white/10 pt-4">
                  {msg.email && (
                    <p className="text-xs text-mist mb-3">
                      Reply to: <a href={`mailto:${msg.email}`} className="text-brass2 hover:underline">{msg.email}</a>
                    </p>
                  )}
                  <p className="text-sm text-foam whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
