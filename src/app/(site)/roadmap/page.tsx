import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/site/PageHero";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Roadmap 2035",
  description: "The Vision 2035 roadmap: from launch in 2026 to delivery in 2035, beginning in Pakistan and expanding worldwide.",
  alternates: { canonical: "/roadmap" },
};

export default async function RoadmapPage() {
  const c = await getContent();
  const { roadmap } = c;
  return (
    <>
      <PageHero eyebrow="Roadmap" title={roadmap.title} intro={roadmap.intro} image={roadmap.image} />

      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-[900px] px-5 py-24 sm:px-8 lg:py-32">
          <ol className="relative">
            <span className="absolute bottom-3 left-[6px] top-3 w-px bg-gold/40 sm:left-[calc(9rem+6px)]" aria-hidden />
            {roadmap.milestones.map((m, i) => (
              <li key={m.years + m.title} className="relative grid gap-2 pb-14 pl-10 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-12 sm:pl-0">
                <span
                  className={
                    "absolute left-0 top-2.5 h-[13px] w-[13px] rotate-45 border border-gold sm:left-[9rem] " +
                    (i === 0 || i === roadmap.milestones.length - 1 ? "bg-gold" : "bg-white")
                  }
                  aria-hidden
                />
                <p className="font-display text-2xl text-gold-deep sm:text-right">{m.years}</p>
                <Reveal className="sm:pl-10">
                  <h2 className="label-caps text-[0.78rem] font-medium">{m.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink/70">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-16 text-sm italic text-stone">{roadmap.note}</p>
          <div className="mt-12">
            <Link href="/contact" className="label-caps inline-block bg-ink px-9 py-4 text-[0.7rem] text-white hover:bg-gold-deep">
              Join us on the journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
