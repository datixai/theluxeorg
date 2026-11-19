"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Wordmark } from "../Wordmark";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Website content" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/media", label: "Photos and files" },
];

export function AdminSidebar({ user }: { user: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {LINKS.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              "rounded-md px-4 py-2.5 text-sm transition",
              active ? "bg-gold/15 text-gold-light" : "text-white/70 hover:bg-white/5 hover:text-white",
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between bg-ink px-5 py-4 lg:hidden">
        <Wordmark tone="gold" className="w-[150px]" />
        <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white">
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <aside
        className={cn(
          "flex-col bg-ink py-6 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64",
          open ? "flex" : "hidden",
        )}
      >
        <div className="hidden px-6 pb-8 lg:block">
          <Wordmark tone="gold" className="w-[190px]" />
        </div>
        {nav}
        <div className="mt-8 border-t border-white/10 px-6 pt-5 text-sm">
          <p className="text-white/40">Signed in as</p>
          <p className="truncate text-white">{user}</p>
          <div className="mt-4 flex gap-4">
            <a href="/" target="_blank" rel="noopener" className="text-gold hover:text-gold-light">
              View website
            </a>
            <button type="button" onClick={logout} className="text-white/60 hover:text-white">
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
