import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from The Luxe Organization and Vision 2035.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const c = await getContent();
  const news = c.news.filter((n) => n.published).sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="mx-auto max-w-[1000px] px-5 pb-14 pt-20 text-center sm:px-8 lg:pt-28">
        <Reveal>
          <p className="eyebrow">News</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl">News and announcements</h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-[1200px] px-5 pb-28 sm:px-8">
        {news.length === 0 ? (
          <p className="text-center text-ink/60">News will be published here soon.</p>
        ) : (
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <Link key={n.slug} href={`/news/${n.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] group-hover:scale-105">
                    <Img src={n.image} alt="" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
                  </div>
                </div>
                <p className="label-caps mt-5 text-[0.6rem] text-stone">{formatDate(n.date)}</p>
                <h2 className="mt-2 font-display text-2xl leading-snug group-hover:text-gold-deep">{n.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
