import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { paragraphs } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/site/PageHero";
import { SectorMosaic } from "@/components/site/SectorMosaic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vision 2035",
  description:
    "Vision 2035 invests in EV charging, data centres, artificial intelligence, AI-backed solar grids, healthcare and broadband, starting in Pakistan and expanding worldwide.",
  alternates: { canonical: "/vision-2035" },
};

export default async function VisionPage() {
  const c = await getContent();
  const { vision } = c;
  return (
    <>
      <PageHero eyebrow="Vision 2035" title={vision.title} intro={vision.intro} image={vision.image} />

      <section className="mx-auto max-w-[900px] px-5 py-24 text-center sm:px-8 lg:py-28">
        <Reveal className="prose-luxe text-[1.1rem] leading-[1.9] text-ink/75">
          {paragraphs(vision.body).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      <SectorMosaic sectors={c.sectors} />

      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:py-28">
        <div className="grid gap-px bg-mist sm:grid-cols-2 lg:grid-cols-3">
          {c.sectors.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 100} className="bg-white p-9">
              <p className="font-display text-3xl text-gold-deep">0{i + 1}</p>
              <h2 className="mt-4 font-display text-2xl">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{s.summary}</p>
              <Link href={`/sectors/${s.slug}`} className="label-caps mt-6 inline-block border-b border-gold-deep pb-1 text-[0.6rem] hover:text-gold-deep">
                Learn more
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link href="/roadmap" className="label-caps inline-block bg-ink px-9 py-4 text-[0.7rem] text-white hover:bg-gold-deep">
            See the roadmap to 2035
          </Link>
        </div>
      </section>
    </>
  );
}
