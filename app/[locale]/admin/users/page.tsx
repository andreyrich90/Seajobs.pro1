"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { ShieldOff, ShieldCheck, Trash2, Search, Anchor, Building2, MessageCircle } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase/client";

type UserRow = {
  id: string;
  role: "seafarer" | "company";
  is_blocked: boolean;
  is_admin: boolean;
  created_at: string;
  name: string;
  is_verified?: boolean;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers]     = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<"all" | "seafarer" | "company" | "blocked">("all");
  const [query, setQuery]     = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [messaging, setMessaging] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAdminId(data.session?.user.id ?? null));
  }, []);

  useEffect(() => {
    async function load() {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, role, is_blocked, is_admin, created_at")
        .order("created_at", { ascending: false });

      if (!profiles) { setLoading(false); return; }

      const [{ data: seafarers }, { data: companies }] = await Promise.all([
        supabase.from("seafarers").select("id, first_name, last_name"),
        supabase.from("companies").select("id, name, is_verified"),
      ]);

      const sfMap: Record<string, string> = {};
      for (const s of seafarers ?? []) {
        sfMap[s.id] = [s.first_name, s.last_name].filter(Boolean).join(" ") || "(no name)";
      }
      const coMap: Record<string, { name: string; is_verified: boolean }> = {};
      for (const c of companies ?? []) {
        coMap[c.id] = { name: c.name ?? "(no name)", is_verified: c.is_verified ?? false };
      }

      setUsers(profiles.map((p) => ({
        ...p,
        name: p.role === "seafarer" ? (sfMap[p.id] || "(no name)") : (coMap[p.id]?.name || "(no name)"),
        is_verified: p.role === "company" ? (coMap[p.id]?.is_verified ?? false) : undefined,
      })));
      setLoading(false);
    }
    load();
  }, []);

  async function toggleVerified(user: UserRow) {
    if (user.role !== "company") return;
    const newVal = !user.is_verified;
    const { error } = await supabase
      .from("companies")
      .update({ is_verified: newVal })
      .eq("id", user.id);
    if (!error) setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, is_verified: newVal } : u));
  }

  async function toggleBlock(user: UserRow) {
    const { error } = await supabase
      .from("profiles")
      .update({ is_blocked: !user.is_blocked })
      .eq("id", user.id);
    if (!error) setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, is_blocked: !u.is_blocked } : u));
  }

  async function deleteUser(id: string) {
    if (!confirm("Delete this user and all their data? This cannot be undone.")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (!error) setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Open (or start) an admin↔user chat. The admin sits in the column opposite
  // the user's natural role, so the user sees the thread in their own Messages
  // page and can reply. One thread per user (unique company_id+seafarer_id).
  async function messageUser(user: UserRow) {
    if (!adminId || messaging) return;
    setMessaging(user.id);
    const company_id  = user.role === "seafarer" ? adminId : user.id;
    const seafarer_id = user.role === "seafarer" ? user.id : adminId;

    const { data: existing } = await supabase
      .from("conversations").select("id")
      .eq("company_id", company_id).eq("seafarer_id", seafarer_id).maybeSingle();

    let convoId = existing?.id ?? null;
    if (!convoId) {
      const { data: created, error } = await supabase
        .from("conversations").insert({ company_id, seafarer_id }).select("id").single();
      if (error) { alert(error.message); setMessaging(null); return; }
      convoId = created.id;
    }
    router.push(`/admin/chats?c=${convoId}`);
  }

  const filtered = users.filter((u) => {
    if (filter === "seafarer" && u.role !== "seafarer") return false;
    if (filter === "company"  && u.role !== "company")  return false;
    if (filter === "blocked"  && !u.is_blocked)          return false;
    if (query && !u.name.toLowerCase().includes(query.toLowerCase()) && !u.id.includes(query)) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Users</h1>
        <p className="mt-1 text-sm text-mist">{users.length} total registered users</p>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="rounded-xl border border-white/10 bg-card pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-brass w-56"
          />
        </div>
        {(["all","seafarer","company","blocked"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${filter === f ? "bg-brass/15 text-brass2 border border-brass/20" : "border border-white/10 text-mist hover:text-white"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><p className="text-mist text-sm">Loading...</p></div>
      ) : (
        <div className="rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-deep">
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase hidden sm:table-cell">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase hidden md:table-cell">Registered</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-mist uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-mist uppercase">Actions</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-mist uppercase hidden lg:table-cell">Verified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-mist text-sm">No users found.</td></tr>
              ) : filtered.map((u) => (
                <tr key={u.id} className="bg-card hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-bold text-white">
                        {u.name[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-white">{u.name}</p>
                          {u.role === "company" && u.is_verified && (
                            <span title="Verified company" className="inline-flex">
                              <ShieldCheck size={13} className="text-teal" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-mist font-mono">{u.id.slice(0,8)}…</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      u.role === "seafarer" ? "border-teal/20 bg-teal/10 text-teal" : "border-brass/20 bg-brass/10 text-brass2"
                    }`}>
                      {u.role === "seafarer" ? <Anchor size={10} /> : <Building2 size={10} />}
                      {u.role}
                    </span>
                    {u.is_admin && <span className="ml-1.5 inline-flex rounded-full border border-brass/30 bg-brass/10 px-2 py-0.5 text-xs font-bold text-brass2">admin</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-mist text-xs">{formatDate(u.created_at)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      u.is_blocked ? "border-coral/20 bg-coral/10 text-coral" : "border-teal/20 bg-teal/10 text-teal"
                    }`}>
                      {u.is_blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {!u.is_admin && (
                        <button onClick={() => messageUser(u)} disabled={messaging === u.id || !adminId}
                          title="Message this user"
                          className="rounded-lg border border-brass/20 bg-brass/10 p-1.5 text-brass2 hover:bg-brass/20 transition disabled:opacity-30"
                        >
                          <MessageCircle size={14} />
                        </button>
                      )}
                      <button onClick={() => toggleBlock(u)} disabled={u.is_admin}
                        title={u.is_blocked ? "Unblock" : "Block"}
                        className={`rounded-lg border p-1.5 transition disabled:opacity-30 ${
                          u.is_blocked
                            ? "border-teal/20 bg-teal/10 text-teal hover:bg-teal/20"
                            : "border-coral/20 bg-coral/10 text-coral hover:bg-coral/20"
                        }`}
                      >
                        {u.is_blocked ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
                      </button>
                      <button onClick={() => deleteUser(u.id)} disabled={u.is_admin}
                        title="Delete user"
                        className="rounded-lg border border-coral/20 bg-coral/10 p-1.5 text-coral hover:bg-coral/20 transition disabled:opacity-30"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {u.role === "company" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleVerified(u)}
                          title={u.is_verified ? "Remove verified status" : "Mark as verified"}
                          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${
                            u.is_verified
                              ? "border-teal/30 bg-teal/10 text-teal hover:bg-teal/20"
                              : "border-white/10 bg-white/5 text-mist hover:text-white"
                          }`}
                        >
                          {u.is_verified ? <ShieldCheck size={12} /> : <ShieldOff size={12} />}
                          {u.is_verified ? "Verified" : "Unverified"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-mist/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
