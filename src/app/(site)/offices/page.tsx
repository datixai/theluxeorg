import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Offices",
  description: "The Luxe Organization is headquartered in the United Kingdom with offices in the Middle East.",
  alternates: { canonical: "/offices" },
};

export default async function OfficesPage() {
  const c = await getContent();
  return (
    <>
      <section className="mx-auto max-w-[1000px] px-5 pb-14 pt-20 text-center sm:px-8 lg:pt-28">
        <Reveal>
          <p className="eyebrow">Offices</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl">Two regions, one vision</h1>
          <p className="mx-auto mt-6 max-w-xl text-ink/70">{c.settings.tagline}.</p>
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-28 sm:px-8 md:grid-cols-2">
        {c.offices.map((o, i) => (
          <Reveal key={o.slug} delay={i * 120}>
            <article>
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <Img src={o.image} alt={o.region} sizes="(min-width:768px) 50vw, 100vw" />
              </div>
              <p className="eyebrow mt-8">{o.role}</p>
              <h2 className="mt-3 font-display text-4xl">{o.region}</h2>
              <dl className="mt-6 space-y-2 text-ink/75">
                <div>
                  <dt className="sr-only">City</dt>
                  <dd>{o.city || <span className="italic text-stone">City to be announced</span>}</dd>
                </div>
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="whitespace-pre-line">{o.address || <span className="italic text-stone">Address to follow</span>}</dd>
                </div>
                {o.email && (
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${o.email}`} className="hover:text-gold-deep">
                        {o.email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
