import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Luxe Organization about partnerships, investment and media enquiries for Vision 2035.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const c = await getContent();
  const { settings } = c;
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
          <div>
            <dt className="eyebrow">Offices</dt>
            <dd className="mt-2 text-ink/70">United Kingdom · Middle East</dd>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={120}>
        <ContactForm />
      </Reveal>
    </section>
  );
}
