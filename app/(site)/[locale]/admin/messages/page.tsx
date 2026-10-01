"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, User, Clock, Reply, ShieldCheck, Anchor, Building2 } from "lucide-react";
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

// Who a message is from, resolved from `user_id`.
//
// The contact form stores whatever was typed into its name/email fields, and a
// signed-in seafarer usually leaves them blank — so the row carries only a
// user_id and the page had nothing to show but "Registered user" and no address
// to reply to. Their real name lives in `seafarers`/`companies` and their email
// in auth.users, which needs the service-role key; /api/admin/user-emails
// already exposes that map to admins.
type Sender = { name: string | null; email: string | null; role: "seafarer" | "company" | null };

async function authFetch(url: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return fetch(url, { headers: { Authorization: `Bearer ${session.access_token}` } });
}

/** A reply that opens in the admin's own mail client, with the original quoted
 *  so they do not have to retype what they are answering. */
function replyHref(msg: Message, email: string): string {
  const subject = msg.subject ? `Re: ${msg.subject}` : "Re: your message to SeaJobs.pro";
  const quoted = msg.content.split("\n").map((l) => `> ${l}`).join("\n");
  const body = `\n\n--\nOn ${formatDate(msg.created_at)} you wrote:\n${quoted}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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
  const [senders, setSenders] = useState<Record<string, Sender>>({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    const rows = (data as Message[]) ?? [];
    setMessages(rows);
    setLoading(false);
    resolveSenders(rows);
  }

  /** Fill in name/email/role for the messages that only carry a user_id.
   *  Best-effort and after the fact: the list renders immediately, and an
   *  identity that cannot be resolved just leaves the row as it was. */
  async function resolveSenders(rows: Message[]) {
    const ids = [...new Set(rows.map((m) => m.user_id).filter((x): x is string => !!x))];
    if (ids.length === 0) return;
    try {
      const [profiles, seafarers, companies, emailRes] = await Promise.all([
        supabase.from("profiles").select("id, role").in("id", ids),
        supabase.from("seafarers").select("id, first_name, last_name").in("id", ids),
        supabase.from("companies").select("id, name").in("id", ids),
        authFetch("/api/admin/user-emails").then((r) => r.json()).catch(() => ({ emails: {} })),
      ]);
      const emails: Record<string, string> = emailRes?.emails ?? {};
      const roleOf: Record<string, "seafarer" | "company"> = {};
      for (const p of profiles.data ?? []) roleOf[p.id as string] = p.role as "seafarer" | "company";
      const nameOf: Record<string, string> = {};
      for (const sf of seafarers.data ?? []) {
        const n = [sf.first_name, sf.last_name].filter(Boolean).join(" ").trim();
        if (n) nameOf[sf.id as string] = n;
      }
      for (const c of companies.data ?? []) {
        const n = ((c.name as string | null) ?? "").trim();
        if (n) nameOf[c.id as string] = n;
      }
      const next: Record<string, Sender> = {};
      for (const id of ids) {
        next[id] = { name: nameOf[id] ?? null, email: emails[id] ?? null, role: roleOf[id] ?? null };
      }
      setSenders(next);
    } catch {
      /* leave the rows as they are — the list is still usable */
    }
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
                  ? "bg-brass/15 text-brassInk border border-brass/20"
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
                      {msg.is_read ? <MailOpen size={15} className="text-mist" /> : <Mail size={15} className="text-brassInk" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${msg.is_read ? "text-white" : "text-brassInk"}`}>
                          {msg.subject || "(no subject)"}
                        </span>
                        {!msg.is_read && (
                          <span className="rounded-full bg-brass/20 px-2 py-0.5 text-xs font-bold text-brassInk">NEW</span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-center gap-3 flex-wrap">
                        {(() => {
                          const who = msg.user_id ? senders[msg.user_id] : undefined;
                          // What the form was told, then what the account says,
                          // and only then a placeholder.
                          const label = msg.name || who?.name || msg.email || who?.email
                            || (msg.user_id ? "Registered user" : "Guest");
                          const RoleIcon = who?.role === "company" ? Building2 : Anchor;
                          return (
                            <span className="flex items-center gap-1 text-xs text-mist">
                              {who?.role ? <RoleIcon size={11} /> : <User size={11} />}
                              {label}
                              {who?.role && (
                                <span className="ml-0.5 rounded-full border border-white/10 px-1.5 py-px text-[10px] font-semibold uppercase text-mist">
                                  {who.role}
                                </span>
                              )}
                            </span>
                          );
                        })()}
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
                  {(() => {
                    const who = msg.user_id ? senders[msg.user_id] : undefined;
                    // Prefer the address typed into the form — that is where the
                    // sender asked to be answered — and fall back to the one on
                    // their account.
                    const email = msg.email || who?.email || null;
                    // No name here on purpose — the line above the fold already
                    // shows it, and repeating it just pushes the address away
                    // from the Reply button.
                    return (
                      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-mist">
                        {email ? (
                          <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 text-brassInk hover:underline">
                            <Mail size={12} /> {email}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-coral">
                            <Mail size={12} /> no email on file — cannot reply
                          </span>
                        )}
                        {msg.user_id && (
                          <a
                            href={`/${who?.role === "company" ? "companies" : "seafarers"}/${msg.user_id}`}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-white"
                          >
                            <ShieldCheck size={12} /> open profile
                          </a>
                        )}
                        {email && (
                          <a
                            href={replyHref(msg, email)}
                            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-brass/30 bg-brass/10 px-3 py-1.5 text-xs font-bold text-brassInk transition hover:bg-brass/20"
                          >
                            <Reply size={13} /> Reply
                          </a>
                        )}
                      </div>
                    );
                  })()}
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
