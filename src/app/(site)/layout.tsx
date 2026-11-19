import { getContent } from "@/lib/content";
import { organizationJsonLd, waLink } from "@/lib/seo";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export const revalidate = 3600;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(content)) }}
      />
      <SiteHeader
        announcement={content.settings.announcement}
        sectors={content.sectors.map((s) => ({ slug: s.slug, label: s.label }))}
      />
      <main>{children}</main>
      <SiteFooter content={content} />
      <WhatsAppButton href={waLink(content)} />
    </>
  );
}
