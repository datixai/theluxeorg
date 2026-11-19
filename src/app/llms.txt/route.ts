import { getContent } from "@/lib/content";
import { SITE_URL, paragraphs } from "@/lib/seo";

export const revalidate = 3600;

/** llms.txt: a short, plain summary of the company for AI assistants (llmstxt.org format). */
export async function GET() {
  const c = await getContent();
  const out = [
    `# ${c.settings.siteName}`,
    "",
    `> ${c.settings.siteName} is a holding company based in the United Kingdom with offices in the Middle East. In late 2026 it launched Vision 2035, a programme of investment in EV charging stations, data centres, artificial intelligence, AI-backed solar power grids, healthcare and broadband for difficult terrain, to be completed by 2035, starting in Pakistan and expanding worldwide.`,
    "",
    ...paragraphs(c.about.body),
    "",
    "## Vision 2035 sectors",
    "",
    ...c.sectors.map((s) => `- [${s.title}](${SITE_URL}/sectors/${s.slug}): ${s.summary}`),
    "",
    "## Roadmap",
    "",
    ...c.roadmap.milestones.map((m) => `- ${m.years}: ${m.title}. ${m.body}`),
    `- Note: ${c.roadmap.note}`,
    "",
    "## Pages",
    "",
    `- [About](${SITE_URL}/about)`,
    `- [Vision 2035](${SITE_URL}/vision-2035)`,
    `- [Roadmap](${SITE_URL}/roadmap)`,
    `- [Offices](${SITE_URL}/offices): ${c.offices.map((o) => `${o.region} (${o.role})`).join(", ")}`,
    `- [News](${SITE_URL}/news)`,
    `- [Contact](${SITE_URL}/contact)${c.settings.email ? `: ${c.settings.email}` : ""}`,
    "",
  ].join("\n");
  return new Response(out, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
