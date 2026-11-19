import Link from "next/link";
import { getContent } from "@/lib/content";
import { formatDate, waLink } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { SectorMosaic } from "@/components/site/SectorMosaic";

export const revalidate = 3600;

export default async function HomePage() {
  const c = await getContent();
  const { home } = c;
  const news = c.news.filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-118px)] items-center justify-center overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-132px)]">
        <div className="absolute inset-0 animate-hero-zoom">
          <Img src={home.heroImage} alt="City skyline at dusk" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink/80" />
        <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
          <p className="eyebrow eyebrow-light animate-rise [animation-delay:150ms]">{home.heroEyebrow}</p>
          <h1 className="mt-6 animate-rise font-display text-[2.4rem] leading-[1.08] [animation-delay:300ms] sm:text-6xl lg:text-[4.9rem]">
            {home.heroTitle} <em className="gold-text italic">{home.heroAccent}</em>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl animate-rise text-base leading-relaxed text-white/85 [animation-delay:450ms] sm:text-lg">
            {home.heroBody}
          </p>
          <div className="mt-10 flex animate-rise flex-col items-center justify-center gap-4 [animation-delay:600ms] sm:flex-row">
            <Link href="/vision-2035" className="label-caps w-full bg-gold px-9 py-4 text-[0.7rem] text-ink transition-colors hover:bg-gold-light sm:w-auto">
              Explore Vision 2035
            </Link>
            <Link href="/contact" className="label-caps w-full border border-white/50 px-9 py-4 text-[0.7rem] text-white transition-colors hover:border-gold hover:text-gold sm:w-auto">
              Speak with us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
          <span className="label-caps text-[0.56rem] text-white/60">Scroll</span>
          <span className="block h-10 w-px animate-scroll-cue bg-gold" />
        </div>
      </section>

      {/* Sector mosaic */}
      <section aria-labelledby="sectors-title">
        <div className="mx-auto max-w-[1200px] px-5 py-20 text-center sm:px-8 lg:py-28">
          <Reveal>
            <p className="eyebrow">Vision 2035</p>
            <h2 id="sectors-title" className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.5rem]">
              {c.vision.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">{c.vision.intro}</p>
          </Reveal>
        </div>
        <SectorMosaic sectors={c.sectors} />
      </section>

      {/* Intro */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <Reveal>
            <p className="eyebrow">{home.introEyebrow}</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl">{home.introTitle}</h2>
            <p className="mt-7 text-[1.05rem] leading-[1.85] text-ink/75">{home.introBody}</p>
            <Link href="/about" className="label-caps mt-9 inline-block border-b border-gold-deep pb-1 text-[0.68rem] text-ink hover:text-gold-deep">
              About the company
            </Link>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Img src={c.about.image} alt="The Luxe Organization, United Kingdom" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
        </div>
      </section>

      {/* Pakistan first band */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Img src={c.roadmap.image} alt="Pakistan at sunset" />
        </div>
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:py-32">
          <Reveal className="max-w-2xl">
            <p className="eyebrow eyebrow-light">Roadmap</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] sm:text-5xl">
              Beginning in Pakistan. <em className="gold-text italic">Reaching the world.</em>
            </h2>
            <p className="mt-6 text-white/80">{c.roadmap.intro}</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-5">
            {c.roadmap.milestones.map((m, i) => (
              <Reveal key={m.years + m.title} delay={i * 90} className="bg-ink/70 p-6 backdrop-blur-sm">
                <div>
                  <p className="font-display text-2xl text-gold">{m.years}</p>
                  <p className="label-caps mt-3 text-[0.64rem] text-white">{m.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link href="/roadmap" className="label-caps mt-12 inline-block border-b border-gold pb-1 text-[0.68rem] text-gold-light hover:text-white">
            View the roadmap
          </Link>
        </div>
      </section>

      {/* Offices */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:py-32">
        <Reveal className="text-center">
          <p className="eyebrow">Offices</p>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl">Two regions, one vision</h2>
        </Reveal>
        <div className="mt-14 grid gap-[3px] md:grid-cols-2">
          {c.offices.map((o) => (
            <Link key={o.slug} href="/offices" className="group relative block h-[340px] overflow-hidden bg-ink sm:h-[420px]">
              <div className="absolute inset-0 transition-transform duration-[1400ms] group-hover:scale-[1.06]">
                <Img src={o.image} alt={o.region} sizes="(min-width:768px) 50vw, 100vw" />
              </div>
              <div className="absolute inset-0 bg-ink/40 transition-colors duration-700 group-hover:bg-ink/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <p className="label-caps text-[0.62rem] text-gold-light">{o.role}</p>
                <h3 className="label-caps mt-3 text-lg tracking-[0.24em]">{o.region}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* News */}
      {news.length > 0 && (
        <section className="border-t border-mist bg-paper">
          <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:py-28">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <Reveal>
                <p className="eyebrow">News</p>
                <h2 className="mt-5 font-display text-4xl sm:text-5xl">Latest from the company</h2>
              </Reveal>
              <Link href="/news" className="label-caps border-b border-gold-deep pb-1 text-[0.66rem] hover:text-gold-deep">
                All news
              </Link>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {news.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                    <div className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-105">
                      <Img src={n.image} alt="" sizes="(min-width:768px) 33vw, 100vw" />
                    </div>
                  </div>
                  <p className="label-caps mt-5 text-[0.6rem] text-stone">{formatDate(n.date)}</p>
                  <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-gold-deep">{n.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[900px] px-5 py-24 text-center sm:px-8 lg:py-28">
          <Reveal>
            <p className="eyebrow eyebrow-light">Partnerships</p>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">{home.ctaTitle}</h2>
            <p className="mx-auto mt-6 max-w-xl text-white/75">{home.ctaBody}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="label-caps w-full bg-gold px-9 py-4 text-[0.7rem] text-ink hover:bg-gold-light sm:w-auto">
                Contact us
              </Link>
              <a
                href={waLink(c)}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps w-full border border-white/40 px-9 py-4 text-[0.7rem] text-white hover:border-gold hover:text-gold sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
