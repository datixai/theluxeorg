"use client";

import { useRef, useState } from "react";
import { uploadFile } from "./fields";

interface Uploaded {
  name: string;
  url: string;
}

export function MediaUploader() {
  const ref = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Uploaded[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setErr("");
    for (const f of Array.from(files)) {
      try {
        const url = await uploadFile(f);
        setItems((l) => [{ name: f.name, url }, ...l]);
      } catch (e) {
        setErr(`${f.name}: ${e instanceof Error ? e.message : "Upload failed"}`);
      }
    }
    setBusy(false);
    if (ref.current) ref.current.value = "";
  }

  async function copy(url: string) {
    const full = url.startsWith("/") ? window.location.origin + url : url;
    await navigator.clipboard.writeText(full);
    setCopied(url);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        className="rounded-lg border-2 border-dashed border-gold/50 bg-white p-10 text-center"
      >
        <p className="font-display text-xl">Upload photos, documents or short videos</p>
        <p className="mt-2 text-sm text-ink/55">JPG, PNG, WebP, PDF, MP4 or WebM, up to 4 MB each. For longer videos, upload to YouTube and paste the link into a news article.</p>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="mt-6 rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-gold-deep disabled:opacity-60"
        >
          {busy ? "Uploading..." : "Choose files"}
        </button>
        <input ref={ref} type="file" multiple hidden accept="image/jpeg,image/png,image/webp,image/avif,application/pdf,video/mp4,video/webm" onChange={(e) => onFiles(e.target.files)} />
        {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
      </div>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.url} className="flex items-center justify-between gap-4 rounded-md border border-mist bg-white px-4 py-3 text-sm">
              <span className="min-w-0">
                <span className="block truncate font-medium">{it.name}</span>
                <a href={it.url} target="_blank" rel="noopener noreferrer" className="block truncate text-xs text-gold-deep hover:underline">
                  {it.url}
                </a>
              </span>
              <button type="button" onClick={() => copy(it.url)} className="shrink-0 rounded-md border border-mist px-3 py-1.5 text-xs hover:border-gold-deep">
                {copied === it.url ? "Copied" : "Copy link"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-ink/50">
        Tip: copy a link and paste it into any photo field, or link a PDF from a news article.
      </p>
    </div>
  );
}
