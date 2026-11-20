"use client";

import { useState } from "react";

const INTERESTS = [
  "Partnership",
  "Investment",
  "EV charging",
  "Data centres",
  "Artificial intelligence",
  "Solar power",
  "Healthcare",
  "Broadband",
  "Media",
  "Other",
];

const field =
  "w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-ink placeholder:text-ink/35 transition-colors focus:border-gold-deep focus:outline-none focus:ring-0";
const labelCls = "label-caps text-[0.62rem] text-stone";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Something went wrong");
      setName(String(data.name || ""));
      setState("sent");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center border border-mist bg-ivory p-10" role="status">
        <p className="eyebrow">Message received</p>
        <p className="mt-5 font-display text-3xl">Thank you{name ? `, ${name}` : ""}.</p>
        <p className="mt-4 max-w-md leading-relaxed text-ink/70">
          Our team will reply to you by email.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" onClick={() => setState("idle")} className="label-caps text-[0.66rem] text-gold-deep hover:text-ink">
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className={labelCls}>Full name *</span>
        <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
      </label>
      <label className="block">
        <span className={labelCls}>Email *</span>
        <input name="email" type="email" required maxLength={150} autoComplete="email" className={field} placeholder="you@company.com" />
      </label>
      <label className="block">
        <span className={labelCls}>Organisation</span>
        <input name="organisation" maxLength={150} autoComplete="organization" className={field} placeholder="Company or institution" />
      </label>
      <label className="block">
        <span className={labelCls}>Interest</span>
        <select name="interest" defaultValue="" className={field + " appearance-none"}>
          <option value="">Select a topic</option>
          {INTERESTS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={labelCls}>Message *</span>
        <textarea name="message" required maxLength={4000} rows={5} className={field + " resize-none"} placeholder="How can we help?" />
      </label>
      {/* Honeypot for bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone" role={state === "error" ? "alert" : undefined}>
          {state === "error" ? <span className="text-red-700">{error}</span> : "Fields marked * are required."}
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="label-caps w-full bg-ink px-10 py-4 text-[0.7rem] text-white transition-colors hover:bg-gold-deep disabled:opacity-60 sm:w-auto"
        >
          {state === "sending" ? "Sending..." : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
