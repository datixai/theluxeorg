import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { SITE_URL, formatDate, paragraphs } from "@/lib/seo";
import { Img } from "@/components/Img";

export const revalidate = 3600;

export async function generateStaticParams() {
  const c = await getContent();
  return c.news.filter((n) => n.published).map((n) => ({ slug: n.slug }));
}

async function find(slug: string) {
  return (await getContent()).news.find((n) => n.slug === slug && n.published);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = await find((await params).slug);
  if (!n) return {};
  return {
    title: n.title,
    description: n.excerpt,
    alternates: { canonical: `/news/${n.slug}` },
    openGraph: { type: "article", publishedTime: n.date, images: n.image.startsWith("/") ? [n.image] : undefined },
  };
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const n = await find((await params).slug);
  if (!n) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    datePublished: n.date,
    description: n.excerpt,
    publisher: { "@type": "Organization", name: "The Luxe Organization", url: SITE_URL },
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="mx-auto max-w-[860px] px-5 pb-12 pt-20 text-center sm:px-8 lg:pt-28">
        <p className="label-caps text-[0.62rem] text-stone">{formatDate(n.date)}</p>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">{n.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/65">{n.excerpt}</p>
      </header>
      {n.image && (
        <div className="relative mx-auto aspect-[16/8] max-w-[1200px] overflow-hidden bg-mist">
          <Img src={n.image} alt="" priority sizes="(min-width:1200px) 1200px, 100vw" />
        </div>
      )}
      <div className="prose-luxe mx-auto max-w-[760px] px-5 py-16 text-[1.08rem] leading-[1.9] text-ink/80 sm:px-8">
        {paragraphs(n.body).map((p) => (
          <p key={p}>{p}</p>
        ))}
        <Link href="/news" className="label-caps mt-14 inline-block border-b border-gold-deep pb-1 text-[0.66rem] hover:text-gold-deep">
          Back to all news
        </Link>
      </div>
    </article>
  );
}
