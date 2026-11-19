"use client";

import { useEffect, useState } from "react";
import type { ContactMessage } from "@/lib/types";

export function MessagesPanel() {
  const [list, setList] = useState<ContactMessage[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/messages")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Could not load messages"))))
      .then(setList)
      .catch((e: Error) => setErr(e.message));
  }, []);

  async function toggle(m: ContactMessage) {
    const next = open === m.id ? null : m.id;
    setOpen(next);
    if (next && !m.read) {
      setList((l) => l?.map((x) => (x.id === m.id ? { ...x, read: true } : x)) ?? l);
      await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: m.id, read: true }) });
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this message permanently?")) return;
    const res = await fetch(`/api/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) setList((l) => l?.filter((x) => x.id !== id) ?? l);
  }

  if (err) return <p className="text-sm text-red-600">{err}</p>;
  if (!list) return <p className="text-sm text-ink/55">Loading messages...</p>;
  if (list.length === 0) return <p className="rounded-lg border border-mist bg-white p-8 text-center text-sm text-ink/55">No messages yet. Enquiries from the contact form will appear here.</p>;

  return (
    <ul className="space-y-3">
      {list.map((m) => (
        <li key={m.id} className="rounded-lg border border-mist bg-white shadow-sm">
          <button type="button" onClick={() => toggle(m)} className="flex w-full items-center gap-4 px-5 py-4 text-left">
            <span className={"h-2.5 w-2.5 shrink-0 rounded-full " + (m.read ? "bg-mist" : "bg-gold-deep")} aria-label={m.read ? "Read" : "New"} />
            <span className="min-w-0 flex-1">
              <span className={"block truncate " + (m.read ? "" : "font-medium")}>
                {m.name} {m.organisation && <span className="text-ink/50">· {m.organisation}</span>}
              </span>
              <span className="block truncate text-sm text-ink/55">{m.message}</span>
            </span>
            <span className="hidden shrink-0 text-xs text-ink/45 sm:block">{new Date(m.createdAt).toLocaleString("en-GB")}</span>
          </button>
          {open === m.id && (
            <div className="border-t border-mist px-5 py-5 text-sm">
              <dl className="grid gap-2 sm:grid-cols-[120px_1fr]">
                <dt className="text-ink/50">Email</dt>
                <dd>
                  <a href={`mailto:${m.email}`} className="text-gold-deep hover:underline">
                    {m.email}
                  </a>
                </dd>
                {m.interest && (
                  <>
                    <dt className="text-ink/50">Interest</dt>
                    <dd>{m.interest}</dd>
                  </>
                )}
                <dt className="text-ink/50">Received</dt>
                <dd>{new Date(m.createdAt).toLocaleString("en-GB")}</dd>
              </dl>
              <p className="mt-4 whitespace-pre-line leading-relaxed">{m.message}</p>
              <div className="mt-5 flex gap-3">
                <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your enquiry to The Luxe Organization")}`} className="rounded-md bg-ink px-4 py-2 text-xs font-medium text-white hover:bg-gold-deep">
                  Reply by email
                </a>
                <button type="button" onClick={() => remove(m.id)} className="rounded-md px-4 py-2 text-xs text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
