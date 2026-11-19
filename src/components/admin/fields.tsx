"use client";

import { useRef, useState, type ReactNode } from "react";

export const inputCls =
  "w-full rounded-md border border-mist bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold-deep focus:ring-2 focus:ring-gold/25";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/50">{hint}</span>}
    </label>
  );
}

export function TextInput({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
}

export function TextArea({ value, onChange, rows = 4, placeholder }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return <textarea value={value} rows={rows} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 text-sm">
      <span className={"relative h-6 w-11 rounded-full transition " + (checked ? "bg-gold-deep" : "bg-mist")}>
        <span className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (checked ? "left-[22px]" : "left-0.5")} />
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      {label}
    </label>
  );
}

export async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(j.error || "Upload failed");
  return j.url as string;
}

export function ImageInput({ value, onChange, label = "Image" }: { value: string; onChange: (v: string) => void; label?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    setBusy(true);
    try {
      onChange(await uploadFile(file));
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1.5 block text-[0.8rem] font-medium text-ink">{label}</span>
      <div className="flex gap-3">
        <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden rounded-md border border-mist bg-paper">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-ink/40">No image</span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/... or https://..." className={inputCls} />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gold-deep disabled:opacity-60"
            >
              {busy ? "Uploading..." : "Upload photo"}
            </button>
            {value && (
              <button type="button" onClick={() => onChange("")} className="rounded-md px-3 py-1.5 text-xs text-ink/50 hover:text-red-600">
                Clear
              </button>
            )}
          </div>
          {err && <p className="text-xs text-red-600">{err}</p>}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={onFile} />
    </div>
  );
}

export function Card({ title, description, children, actions }: { title?: string; description?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="rounded-lg border border-mist bg-white p-6 shadow-sm">
      {(title || actions) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="font-display text-xl">{title}</h3>}
            {description && <p className="mt-1 text-sm text-ink/55">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function RepeatItem({ title, onRemove, onUp, onDown, children }: { title: string; onRemove?: () => void; onUp?: () => void; onDown?: () => void; children: ReactNode }) {
  return (
    <div className="rounded-md border border-mist bg-paper p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gold-deep">{title}</span>
        <div className="flex items-center gap-1 text-xs">
          {onUp && (
            <button type="button" onClick={onUp} className="rounded px-2 py-1 text-ink/60 hover:bg-white" aria-label="Move up">
              Up
            </button>
          )}
          {onDown && (
            <button type="button" onClick={onDown} className="rounded px-2 py-1 text-ink/60 hover:bg-white" aria-label="Move down">
              Down
            </button>
          )}
          {onRemove && (
            <button type="button" onClick={onRemove} className="rounded px-2 py-1 font-medium text-red-600 hover:bg-red-50">
              Remove
            </button>
          )}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}
