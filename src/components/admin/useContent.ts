"use client";

import { useCallback, useEffect, useState } from "react";
import type { Content } from "@/lib/types";

/** Loads the site content for the admin editors and saves it back. */
export function useContent() {
  const [content, setContent] = useState<Content | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("Could not load content"))))
      .then((c: Content) => setContent(c))
      .catch((e: Error) => setStatus({ kind: "error", text: e.message }));
  }, []);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const update = useCallback((fn: (c: Content) => Content) => {
    setContent((c) => (c ? fn(structuredClone(c)) : c));
    setDirty(true);
    setStatus(null);
  }, []);

  const save = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Save failed");
      setDirty(false);
      setStatus({ kind: "ok", text: "Saved. The website is updated." });
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }, [content]);

  return { content, update, save, saving, dirty, status };
}
