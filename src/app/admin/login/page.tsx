"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wordmark } from "@/components/Wordmark";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Login failed");
      }
      const from = params.get("from");
      router.replace(from && from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-gold focus:ring-2 focus:ring-gold/25";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-white/60">Username</span>
        <input name="username" required autoComplete="username" className={field} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.2em] text-white/60">Password</span>
        <input name="password" type="password" required autoComplete="current-password" className={field} />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gold py-3 text-sm font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <div className="mb-10 flex justify-center">
          <Wordmark tone="gold" className="w-[240px]" />
        </div>
        <div className="rounded-lg border border-white/10 bg-ink-2 p-8">
          <h1 className="mb-6 text-center font-display text-2xl text-white">Website admin</h1>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs text-white/35">Developed by Datix AI</p>
      </div>
    </div>
  );
}
