import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { waLink } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppButton";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Luxe Organization about partnerships, investment and media enquiries for Vision 2035.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const c = await getContent();
  const { settings } = c;
  const wa = waLink(c);
  return (
    <section className="mx-auto grid max-w-[1200px] gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-28">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">Begin a conversation</h1>
        <p className="mt-6 max-w-md leading-relaxed text-ink/70">
          For partnerships, investment and media enquiries, send us a message and our team will respond.
        </p>
        <dl className="mt-12 space-y-7">
          {settings.email && (
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${settings.email}`} className="break-all text-lg hover:text-gold-deep">
                  {settings.email}
                </a>
              </dd>
            </div>
          )}
          {settings.phone && (
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-2">
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-lg hover:text-gold-deep">
                  {settings.phone}
                </a>
              </dd>
            </div>
          )}
          <div>
            <dt className="eyebrow">WhatsApp</dt>
            <dd className="mt-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps inline-flex items-center gap-3 bg-[#25D366] px-6 py-3.5 text-[0.66rem] text-white hover:brightness-95"
              >
                <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Offices</dt>
            <dd className="mt-2 text-ink/70">United Kingdom · Middle East</dd>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={120}>
        <ContactForm waHref={wa} />
      </Reveal>
    </section>
  );
}
