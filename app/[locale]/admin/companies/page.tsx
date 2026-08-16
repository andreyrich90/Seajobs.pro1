"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Building2, Search, ChevronDown, ChevronRight, ShieldCheck, MapPin, Globe,
  ExternalLink, Download, Anchor, Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { slugId } from "@/lib/slug";

// Which crewing agency has how many live vacancies, and which ones. Covers both
// registered company accounts and the import-only agencies created by the
// screenshot importer (those have a `companies` row but no auth user, so they
// never show up under Users).

type VacRow = {
  id: string;
  company_id: string;
  contact_email: string | null;
  title: string;
  rank: string | null;
  vessel_type: string | null;
  is_active: boolean;
  is_imported: boolean | null;
  joining_date: string | null;
  created_at: string;
};

type CompanyRow = {
  id: string;
  name: string | null;
  location: string | null;
  website: string | null;
  emails: string[] | null;
  is_verified: boolean | null;
};

type Row = CompanyRow & {
  registered: boolean;
  active: number;
  total: number;
  vacancies: VacRow[];
  /** Every address we hold: the company profile's, plus the crewing e-mail
      carried by its vacancies (that is where imported agencies keep theirs). */
  contacts: string[];
};

const PAGE = 1000;

type Page<T> = PromiseLike<{ data: T[] | null; error: unknown }>;

// PostgREST caps a response at 1,000 rows, and the board is well past that —
// page through so the counts are the real totals rather than a truncated view.
async function pageThrough<T>(run: (from: number, to: number) => Page<T>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await run(from, from + PAGE - 1);
    if (error || !data || data.length === 0) break;
    out.push(...data);
    if (data.length < PAGE) break;
  }
  return out;
}

function formatDate(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
}

export default function AdminCompaniesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "empty" | "registered" | "leads">("active");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      // The generated Database types describe whole rows, so a hand-picked
      // column subset needs a cast — same pattern the other admin pages use.
      const [companies, vacancies, profiles] = await Promise.all([
        pageThrough<CompanyRow>((a, b) =>
          supabase.from("companies").select("id, name, location, website, emails, is_verified").range(a, b) as unknown as Page<CompanyRow>
        ),
        pageThrough<VacRow>((a, b) =>
          supabase
            .from("vacancies")
            .select("id, company_id, contact_email, title, rank, vessel_type, is_active, is_imported, joining_date, created_at")
            .range(a, b) as unknown as Page<VacRow>
        ),
        pageThrough<{ id: string; role: string | null }>((a, b) =>
          supabase.from("profiles").select("id, role").range(a, b) as unknown as Page<{ id: string; role: string | null }>
        ),
      ]);

      // A company row without a profile is an agency the importer created —
      // real enough, but nobody can log into it.
      const registered = new Set(profiles.filter((p) => p.role === "company").map((p) => p.id));
      const byCompany = new Map<string, VacRow[]>();
      for (const v of vacancies) {
        const list = byCompany.get(v.company_id);
        if (list) list.push(v);
        else byCompany.set(v.company_id, [v]);
      }

      const built: Row[] = companies.map((c) => {
        const list = (byCompany.get(c.id) ?? []).sort((a, b) => {
          if (a.is_active !== b.is_active) return a.is_active ? -1 : 1;
          return b.created_at.localeCompare(a.created_at);
        });
        const contacts = Array.from(
          new Set(
            [...(c.emails ?? []), ...list.map((v) => v.contact_email)]
              .map((e) => (e ?? "").trim().toLowerCase())
              .filter(Boolean)
          )
        );
        return {
          ...c,
          registered: registered.has(c.id),
          active: list.filter((v) => v.is_active).length,
          total: list.length,
          vacancies: list,
          contacts,
        };
      });

      // Real company accounts first, agencies created by the importer below —
      // then by how many live vacancies each one has.
      built.sort(
        (a, b) =>
          Number(b.registered) - Number(a.registered) ||
          b.active - a.active ||
          b.total - a.total ||
          (a.name ?? "").localeCompare(b.name ?? "")
      );
      setRows(built);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "active" && r.active === 0) return false;
      if (filter === "empty" && r.active > 0) return false;
      if (filter === "registered" && !r.registered) return false;
      // Outreach targets: on the board, nobody can log in, and we hold an address.
      if (filter === "leads" && (r.registered || r.contacts.length === 0 || r.total === 0)) return false;
      if (
        q &&
        !(r.name ?? "").toLowerCase().includes(q) &&
        !(r.location ?? "").toLowerCase().includes(q) &&
        !r.contacts.some((e) => e.includes(q))
      ) return false;
      return true;
    });
  }, [rows, query, filter]);

  const totals = useMemo(
    () => ({
      companies: rows.length,
      withActive: rows.filter((r) => r.active > 0).length,
      active: rows.reduce((s, r) => s + r.active, 0),
    }),
    [rows]
  );

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function exportCsv() {
    const head = ["Company", "E-mail", "Location", "Registered account", "Active vacancies", "Total vacancies"];
    const lines = filtered.map((r) =>
      [r.name ?? "", r.contacts.join("; "), r.location ?? "", r.registered ? "yes" : "no", r.active, r.total]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `companies-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const mailList = useMemo(
    () => Array.from(new Set(filtered.flatMap((r) => r.contacts))).sort(),
    [filtered]
  );

  async function copyEmails() {
    const text = mailList.join(", ");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy the addresses:", text);
    }
  }

  return (
    <div className="max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-white">Companies</h1>
        <p className="mt-1 text-sm text-mist">
          {loading
            ? "Loading..."
            : `${totals.companies} companies · ${totals.withActive} with live vacancies · ${totals.active} active vacancies in total`}
        </p>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Company or country..."
            className="w-56 rounded-xl border border-white/10 bg-card py-2.5 pl-9 pr-4 text-sm text-white outline-none focus:border-brass"
          />
        </div>
        {([
          ["active", "With active"],
          ["all", "All"],
          ["empty", "No active"],
          ["registered", "Registered"],
          ["leads", "No account · has e-mail"],
        ] as const).map(([f, label]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              filter === f
                ? "border border-brass/20 bg-brass/15 text-brassInk"
                : "border border-white/10 text-mist hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={copyEmails}
          disabled={loading || mailList.length === 0}
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-40"
        >
          <Mail size={15} /> {copied ? "Copied" : `Copy ${mailList.length} e-mails`}
        </button>
        <button
          onClick={exportCsv}
          disabled={loading || filtered.length === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-mist transition hover:text-white disabled:opacity-40"
        >
          <Download size={15} /> CSV
        </button>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <p className="text-sm text-mist">Loading...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-10 text-center">
          <p className="text-sm text-mist">No companies match this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((r, i) => {
            const isOpen = open.has(r.id);
            // The list is sorted accounts-first, so a flip marks the boundary.
            const startsGroup = i === 0 || filtered[i - 1].registered !== r.registered;
            return (
              <div key={r.id}>
                {startsGroup && (
                  <p className={`px-1 pb-1.5 text-xs font-semibold uppercase tracking-wider text-mist ${i === 0 ? "" : "pt-4"}`}>
                    {r.registered ? "Registered accounts" : "Imported agencies"}
                  </p>
                )}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
                <button
                  onClick={() => toggle(r.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
                >
                  {isOpen ? (
                    <ChevronDown size={16} className="shrink-0 text-brassInk" />
                  ) : (
                    <ChevronRight size={16} className="shrink-0 text-mist" />
                  )}
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/5">
                    <Building2 size={16} className="text-mist" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-semibold text-white">{r.name ?? "(no name)"}</span>
                      {r.is_verified && <ShieldCheck size={14} className="shrink-0 text-teal" />}
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                          r.registered
                            ? "border-teal/20 bg-teal/10 text-teal"
                            : "border-white/10 bg-white/5 text-mist"
                        }`}
                      >
                        {r.registered ? "account" : "imported"}
                      </span>
                    </div>
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-mist">
                      {r.location && (<span className="flex items-center gap-1"><MapPin size={11} /> {r.location}</span>)}
                      {r.contacts.length > 0 ? (
                        <span className="flex items-center gap-1 truncate">
                          <Mail size={11} /> {r.contacts[0]}
                          {r.contacts.length > 1 && ` +${r.contacts.length - 1}`}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-coral"><Mail size={11} /> нет адреса</span>
                      )}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg font-bold text-brassInk">{r.active}</p>
                    <p className="text-[11px] uppercase tracking-wide text-mist">
                      active{r.total !== r.active && ` / ${r.total}`}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 text-xs">
                      <Link
                        href={`/companies/${r.id}`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brassInk transition hover:text-brass"
                      >
                        <ExternalLink size={12} /> Public profile
                      </Link>
                      {r.contacts.map((e) => (
                        <a key={e} href={`mailto:${e}`} className="inline-flex items-center gap-1.5 font-semibold text-brassInk transition hover:text-brass">
                          <Mail size={12} /> {e}
                        </a>
                      ))}
                      {r.website && (
                        <a
                          href={r.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-mist transition hover:text-white"
                        >
                          <Globe size={12} /> {r.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                    </div>

                    {r.vacancies.length === 0 ? (
                      <p className="px-4 pb-4 text-sm text-mist">No vacancies for this company.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px] text-sm">
                          <thead className="bg-navy2/60">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-mist">Vacancy</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-mist">Rank</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-mist">Vessel</th>
                              <th className="px-4 py-2 text-left text-xs font-semibold uppercase text-mist">Joining</th>
                              <th className="px-4 py-2 text-right text-xs font-semibold uppercase text-mist">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.vacancies.map((v) => (
                              <tr key={v.id} className="border-t border-white/5">
                                <td className="px-4 py-2.5">
                                  <Link
                                    href={`/jobs/${slugId(v.title, v.id)}`}
                                    className="font-medium text-foam transition hover:text-brassInk"
                                  >
                                    {v.title}
                                  </Link>
                                  {v.is_imported && (
                                    <span className="ml-2 text-[11px] text-mist">imported</span>
                                  )}
                                </td>
                                <td className="px-4 py-2.5 text-mist">{v.rank ?? "—"}</td>
                                <td className="px-4 py-2.5">
                                  <span className="inline-flex items-center gap-1 text-teal">
                                    {v.vessel_type ? <Anchor size={11} /> : null}
                                    {v.vessel_type ?? "—"}
                                  </span>
                                </td>
                                <td className="px-4 py-2.5 text-xs text-mist">{formatDate(v.joining_date)}</td>
                                <td className="px-4 py-2.5 text-right">
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                                      v.is_active
                                        ? "border-teal/20 bg-teal/10 text-teal"
                                        : "border-white/10 bg-white/5 text-mist"
                                    }`}
                                  >
                                    {v.is_active ? "active" : "closed"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
