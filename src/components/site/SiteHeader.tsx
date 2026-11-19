"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Wordmark } from "../Wordmark";

interface NavSector {
  slug: string;
  label: string;
}

const LEFT = [
  { label: "Vision 2035", href: "/vision-2035" },
  { label: "Sectors", href: "/sectors" },
  { label: "About", href: "/about" },
];
const RIGHT = [
  { label: "Roadmap", href: "/roadmap" },
  { label: "News", href: "/news" },
];
const ALL = [
  { label: "Home", href: "/" },
  { label: "Vision 2035", href: "/vision-2035" },
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Offices", href: "/offices" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader({ announcement, sectors }: { announcement: string; sectors: NavSector[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkCls = (href: string) =>
    cn(
      "label-caps text-[0.68rem] transition-colors hover:text-gold-deep",
      active(href) ? "text-gold-deep" : "text-ink/80",
    );

  return (
    <>
      <div className="bg-ink px-4 py-2.5 text-center">
        <Link href="/vision-2035" className="label-caps text-[0.6rem] text-gold-light transition-colors hover:text-white sm:text-[0.66rem]">
          {announcement}
        </Link>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
          scrolled ? "border-mist shadow-[0_6px_24px_-18px_rgb(0_0_0/0.4)]" : "border-transparent",
        )}
      >
        <div className="mx-auto grid h-[78px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:h-[92px]">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="group flex h-11 w-11 flex-col items-start justify-center gap-[7px]"
            >
              <span className="h-[1.5px] w-7 bg-ink transition-all group-hover:w-5" />
              <span className="h-[1.5px] w-7 bg-ink" />
              <span className="h-[1.5px] w-7 bg-ink transition-all group-hover:w-5" />
            </button>
            <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
              {LEFT.map((l) =>
                l.href === "/sectors" ? (
                  <div key={l.href} className="group relative flex items-center">
                    <Link href={l.href} className={linkCls(l.href)}>
                      {l.label}
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-10 w-64 -translate-x-1/2 pt-6 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="border border-mist bg-white py-3 shadow-xl">
                        {sectors.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/sectors/${s.slug}`}
                              className="label-caps block px-5 py-2.5 text-[0.64rem] text-ink/75 transition-colors hover:bg-ivory hover:text-gold-deep"
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link key={l.href} href={l.href} className={linkCls(l.href)}>
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <Link href="/" aria-label="The Luxe Organization home">
            <Wordmark priority className="w-[150px] sm:w-[200px] lg:w-[230px]" />
          </Link>

          <div className="flex items-center justify-end gap-8">
            <nav aria-label="Secondary" className="hidden items-center gap-8 xl:flex">
              {RIGHT.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls(l.href)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="label-caps bg-ink px-3.5 py-2.5 text-[0.6rem] text-white transition-colors hover:bg-gold-deep sm:px-5 sm:py-3 sm:text-[0.66rem]"
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-in menu */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] flex w-full max-w-[420px] flex-col overflow-y-auto bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-hidden={!open}
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Wordmark tone="gold" className="w-[170px]" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="relative h-11 w-11"
          >
            <span className="absolute left-2 top-1/2 h-px w-7 rotate-45 bg-gold" />
            <span className="absolute left-2 top-1/2 h-px w-7 -rotate-45 bg-gold" />
          </button>
        </div>
        <nav className="flex-1 px-6 pb-10 pt-4">
          <ul className="space-y-1">
            {ALL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block py-2 font-display text-[1.9rem] leading-tight transition-colors hover:text-gold",
                    active(l.href) ? "text-gold" : "text-white",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow eyebrow-light mt-10">Sectors</p>
          <ul className="mt-4 grid grid-cols-1 gap-1">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/sectors/${s.slug}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="label-caps block py-1.5 text-[0.7rem] text-white/70 transition-colors hover:text-gold"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="label-caps px-6 pb-8 text-[0.6rem] text-white/45">United Kingdom &nbsp;·&nbsp; Middle East</p>
      </aside>
    </>
  );
}
