import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { lines, paragraphs, waLink } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 3600;

export async function generateStaticParams() {
  const c = await getContent();
  return c.sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = (await getContent()).sectors.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.title} | Vision 2035`,
    description: s.summary,
    alternates: { canonical: `/sectors/${s.slug}` },
    openGraph: { images: s.image.startsWith("/") ? [s.image] : undefined },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getContent();
  const index = c.sectors.findIndex((x) => x.slug === slug);
  if (index < 0) notFound();
  const s = c.sectors[index];
  const others = c.sectors.filter((x) => x.slug !== slug);
  const next = c.sectors[(index + 1) % c.sectors.length];

  return (
    <>
      <PageHero eyebrow={`Vision 2035 · Sector 0${index + 1}`} title={s.title} intro={s.summary} image={s.image} />

      <section className="mx-auto grid max-w-[1200px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-24 lg:py-28">
        <Reveal className="prose-luxe text-[1.08rem] leading-[1.9] text-ink/75">
          {paragraphs(s.body).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={120}>
          <div className="border border-mist bg-paper p-8">
            <p className="eyebrow">Focus areas</p>
            <ul className="mt-6 space-y-4">
              {lines(s.focus).map((f) => (
                <li key={f} className="flex gap-4 text-[0.98rem] leading-snug">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/contact" className="label-caps bg-ink px-6 py-4 text-center text-[0.66rem] text-white hover:bg-gold-deep">
              Discuss a partnership
            </Link>
            <a
              href={waLink(c, `Hello, I would like to know more about ${s.title} in Vision 2035.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps border border-ink/25 px-6 py-4 text-center text-[0.66rem] hover:border-gold-deep hover:text-gold-deep"
            >
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <Link href={`/sectors/${next.slug}`} className="group relative block h-[46vh] min-h-[300px] overflow-hidden bg-ink">
        <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.05]">
          <Img src={next.image} alt={next.title} />
        </div>
        <div className="absolute inset-0 bg-ink/55 transition-colors duration-700 group-hover:bg-ink/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <p className="label-caps text-[0.62rem] text-gold-light">Next sector</p>
          <p className="mt-4 font-display text-4xl sm:text-5xl">{next.title}</p>
        </div>
      </Link>

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
        <p className="eyebrow">Other sectors</p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/sectors/${o.slug}`} className="label-caps text-[0.66rem] text-ink/70 hover:text-gold-deep">
                {o.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
