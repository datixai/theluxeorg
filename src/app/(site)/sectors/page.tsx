import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectorMosaic } from "@/components/site/SectorMosaic";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "The six Vision 2035 sectors: EV charging stations, data centres, artificial intelligence, AI-backed solar power grids, healthcare and broadband for every terrain.",
  alternates: { canonical: "/sectors" },
};

export default async function SectorsPage() {
  const c = await getContent();
  return (
    <>
      <section className="mx-auto max-w-[1000px] px-5 pb-16 pt-20 text-center sm:px-8 lg:pb-20 lg:pt-28">
        <Reveal>
          <p className="eyebrow">Sectors</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl">The six pillars of Vision 2035</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">{c.vision.intro}</p>
        </Reveal>
      </section>
      <SectorMosaic sectors={c.sectors} />
    </>
  );
}
