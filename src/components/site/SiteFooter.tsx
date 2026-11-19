import Link from "next/link";
import type { Content } from "@/lib/types";
import { waLink } from "@/lib/seo";
import { Wordmark } from "../Wordmark";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Vision 2035", href: "/vision-2035" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Offices", href: "/offices" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter({ content }: { content: Content }) {
  const { settings, sectors } = content;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Wordmark tone="gold" className="w-[230px]" />
          <p className="mt-7 max-w-xs text-sm leading-relaxed text-white/60">{settings.tagline}.</p>
        </div>
        <div>
          <p className="eyebrow eyebrow-light">Company</p>
          <ul className="mt-5 space-y-3">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow eyebrow-light">Sectors</p>
          <ul className="mt-5 space-y-3">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link href={`/sectors/${s.slug}`} className="text-sm text-white/75 transition-colors hover:text-gold">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow eyebrow-light">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {settings.email && (
              <li>
                <a href={`mailto:${settings.email}`} className="break-all transition-colors hover:text-gold">
                  {settings.email}
                </a>
              </li>
            )}
            {settings.phone && (
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-gold">
                  {settings.phone}
                </a>
              </li>
            )}
            <li>
              <a href={waLink(content)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li className="text-white/50">United Kingdom · Middle East</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/45 sm:flex-row sm:px-8">
          <p>
            &copy; {year} {settings.siteName}. All rights reserved.
          </p>
          <a href="https://www.datixai.com" target="_blank" rel="noopener" className="transition-colors hover:text-gold">
            Developed by Datix AI
          </a>
        </div>
      </div>
    </footer>
  );
}
