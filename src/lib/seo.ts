import type { Content } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://theluxeorganization.com").replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "The Luxe Organization is a UK holding company with offices in the Middle East. Through Vision 2035 it invests in EV charging, data centres, artificial intelligence, AI-backed solar grids, healthcare and broadband, starting in Pakistan and expanding worldwide.";

/** Split a "paragraphs separated by blank lines" string. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function lines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function waLink(c: Content, text?: string): string {
  const digits = c.settings.whatsapp.replace(/\D/g, "");
  const msg = encodeURIComponent(text ?? c.settings.whatsappMessage);
  return `https://wa.me/${digits}?text=${msg}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Organisation structured data (schema.org), Package 1 level. */
export function organizationJsonLd(c: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.settings.siteName,
    alternateName: "TLO",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-black.png`,
    description: DEFAULT_DESCRIPTION,
    slogan: "Vision 2035",
    email: c.settings.email || undefined,
    telephone: c.settings.phone || undefined,
    areaServed: ["Pakistan", "United Kingdom", "Middle East", "Worldwide"],
    knowsAbout: c.sectors.map((s) => s.title),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer enquiries",
        email: c.settings.email || undefined,
        url: `${SITE_URL}/contact`,
      },
    ],
  };
}
