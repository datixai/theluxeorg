import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { paragraphs } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description:
    "The Luxe Organization is a holding company based in the United Kingdom with offices in the Middle East, investing through Vision 2035.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const c = await getContent();
  const { about } = c;
  const facts = [
    { value: String(c.sectors.length), label: "Strategic sectors" },
    { value: "2035", label: "Delivery horizon" },
    { value: "Pakistan", label: "First market" },
    { value: "UK", label: "Headquarters, with Middle East offices" },
  ];
  return (
    <>
      <PageHero eyebrow="About us" title={about.title} intro={about.intro} image={about.image} />

      <section className="mx-auto grid max-w-[1200px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:py-32">
        <Reveal>
          <blockquote className="border-l-2 border-gold pl-6 font-display text-3xl italic leading-snug text-gold-deep sm:text-4xl">
            {about.quote}
          </blockquote>
        </Reveal>
        <Reveal delay={120} className="prose-luxe text-[1.05rem] leading-[1.85] text-ink/75">
          {paragraphs(about.body).map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link href="/vision-2035" className="label-caps mt-10 inline-block border-b border-gold-deep pb-1 text-[0.68rem] text-ink hover:text-gold-deep">
            Discover Vision 2035
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-mist bg-paper">
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={"px-5 py-14 text-center sm:px-8 " + (i % 2 === 0 ? "border-r border-mist " : "") + (i < 2 ? "border-b border-mist lg:border-b-0 " : "") + (i === 1 ? "lg:border-r " : "")}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-4xl text-gold-deep sm:text-5xl">{f.value}</dd>
              <dd className="label-caps mt-3 text-[0.6rem] text-ink/55">{f.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-[3px] px-5 py-24 sm:px-8 md:grid-cols-2 lg:py-28">
        {c.offices.map((o) => (
          <Link key={o.slug} href="/offices" className="group relative block h-[300px] overflow-hidden bg-ink">
            <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.06]">
              <Img src={o.image} alt={o.region} sizes="(min-width:768px) 50vw, 100vw" />
            </div>
            <div className="absolute inset-0 bg-ink/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="label-caps text-[0.6rem] text-gold-light">{o.role}</p>
              <p className="label-caps mt-3 text-lg tracking-[0.24em]">{o.region}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
