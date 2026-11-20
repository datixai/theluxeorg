import type { Content } from "./types";

/**
 * Seed content. On first run it is copied into the database (Firestore, or
 * data/content.json locally); after that the admin panel is the source of truth.
 */
export const defaultContent: Content = {
  settings: {
    siteName: "The Luxe Organization",
    tagline: "A UK holding company with offices in the Middle East",
    announcement: "Vision 2035 is live: starting in Pakistan, expanding worldwide",
    email: "contact@theluxeorganization.com",
  },
  home: {
    heroEyebrow: "Vision 2035",
    heroTitle: "Investing in the infrastructure",
    heroAccent: "of tomorrow",
    heroBody:
      "Clean energy, intelligent computing, healthcare and connectivity, built to last a generation. Beginning in Pakistan, reaching the world.",
    heroImage: "/images/hero-london-dusk.jpg",
    introEyebrow: "The Luxe Organization",
    introTitle: "A holding company built for the long term",
    introBody:
      "Headquartered in the United Kingdom with offices in the Middle East, The Luxe Organization invests in the systems that modern economies depend on. Through Vision 2035 the company is directing that investment into six sectors, starting in Pakistan.",
    ctaTitle: "Partner with Vision 2035",
    ctaBody:
      "We welcome conversations with governments, investors, operators and communities who share a long-term view.",
  },
  about: {
    title: "A holding company built for the long term",
    intro:
      "The Luxe Organization is a holding company based in the United Kingdom, with offices in the Middle East.",
    quote: "We invest in the foundations that let nations grow.",
    body:
      "In late 2026 the company launched Vision 2035, a programme of investment in EV charging stations, data centres, artificial intelligence, AI-backed solar power grids and healthcare, as well as broadband that reaches even the most difficult terrain.\n\nThe company aims to deliver all of this by 2035. The work begins in Pakistan and will expand worldwide.",
    image: "/images/office-uk.jpg",
  },
  vision: {
    title: "Six sectors. One horizon.",
    intro:
      "Launched in late 2026, Vision 2035 directs long-term investment into the systems that modern economies depend on.",
    body:
      "Each sector strengthens the others. Solar grids power charging networks and data centres; data centres run artificial intelligence; AI and broadband bring better healthcare to people wherever they live.\n\nThe programme begins in Pakistan, where the need and the opportunity are greatest, and the model will then be taken worldwide.",
    image: "/images/pakistan.jpg",
  },
  sectors: [
    {
      slug: "ev-charging",
      title: "EV Charging Stations",
      label: "EV Charging",
      summary: "Fast charging networks along highways and in cities, ready for the move to electric transport.",
      body:
        "Electric transport needs reliable charging wherever people live and travel. Vision 2035 plans charging stations along major highways and in city centres, so drivers and fleets can make the switch with confidence.\n\nPaired with solar generation, the network is designed to keep running costs low and to reduce dependence on imported fuel.",
      focus: "Highway fast-charging corridors\nCity and destination charging\nFleet and commercial charging hubs",
      image: "/images/sector-ev.jpg",
    },
    {
      slug: "data-centres",
      title: "Data Centres",
      label: "Data Centres",
      summary: "Secure, efficient facilities that keep national and regional data close to home.",
      body:
        "Modern economies run on data. Vision 2035 plans secure, energy-efficient data centres that keep national and regional data close to home and give businesses the capacity they need to grow.\n\nThe facilities are planned to draw on clean power and to support the artificial intelligence work across the programme.",
      focus: "Secure local hosting and cloud capacity\nEnergy-efficient design\nCapacity for AI workloads",
      image: "/images/sector-datacentres.jpg",
    },
    {
      slug: "artificial-intelligence",
      title: "Artificial Intelligence",
      label: "Artificial Intelligence",
      summary: "Investment in AI capability that serves industry, government and everyday life.",
      body:
        "Artificial intelligence is changing how services are delivered and how decisions are made. Vision 2035 invests in AI capability that serves industry, government and everyday life.\n\nAI also sits at the heart of the programme itself, helping to manage solar grids, plan networks and improve healthcare.",
      focus: "AI services for industry and government\nIntelligent energy management\nSkills and local talent",
      image: "/images/sector-ai.jpg",
    },
    {
      slug: "ai-solar-grids",
      title: "AI-Backed Solar Power Grids",
      label: "Solar Grids",
      summary: "Solar generation managed by intelligent software that balances supply and demand in real time.",
      body:
        "Sunlight is one of the region's greatest resources. Vision 2035 plans solar generation managed by intelligent software that forecasts output and balances supply and demand in real time.\n\nThe result is cleaner, more reliable power for homes, industry and the rest of the programme.",
      focus: "Utility-scale solar generation\nAI forecasting and grid balancing\nStorage for reliable supply",
      image: "/images/sector-solar.jpg",
    },
    {
      slug: "healthcare",
      title: "Healthcare",
      label: "Healthcare",
      summary: "Modern care facilities and services that widen access to quality treatment.",
      body:
        "Good health underpins every other ambition. Vision 2035 invests in modern care facilities and services that widen access to quality treatment.\n\nWith broadband and AI, care can also reach people far from major cities.",
      focus: "Modern care facilities\nDigital and remote care\nAccess beyond major cities",
      image: "/images/sector-healthcare.jpg",
    },
    {
      slug: "broadband",
      title: "Broadband for Every Terrain",
      label: "Broadband",
      summary: "Connectivity that reaches mountains, deserts and remote valleys, even the hardest terrain.",
      body:
        "Millions of people still live beyond the reach of fast, reliable internet. Vision 2035 plans broadband that reaches mountains, deserts and remote valleys, even the hardest terrain.\n\nConnectivity opens the door to education, business, healthcare and opportunity for every community.",
      focus: "Coverage for remote and mountain regions\nResilient network design\nAffordable access for communities",
      image: "/images/sector-broadband.jpg",
    },
  ],
  roadmap: {
    title: "From launch to 2035",
    intro: "A decade-long programme, beginning in Pakistan and expanding worldwide.",
    note: "Indicative outline. Phase dates to be confirmed by The Luxe Organization.",
    image: "/images/pakistan.jpg",
    milestones: [
      { years: "2026", title: "Vision 2035 launched", body: "The programme is announced and the six investment sectors are defined." },
      { years: "2027 - 2028", title: "Foundations in Pakistan", body: "Partnerships, sites and first projects in energy, charging and connectivity." },
      { years: "2029 - 2031", title: "Scale across Pakistan", body: "Data centres, AI services and healthcare grow alongside the solar grid." },
      { years: "2032 - 2034", title: "Expansion worldwide", body: "The proven model is taken to new markets across the region and beyond." },
      { years: "2035", title: "Vision delivered", body: "All six sectors complete and operating as one connected portfolio." },
    ],
  },
  offices: [
    {
      slug: "united-kingdom",
      region: "United Kingdom",
      role: "Headquarters",
      city: "",
      address: "",
        email: "contact@theluxeorganization.com",
      image: "/images/office-uk.jpg",
    },
    {
      slug: "middle-east",
      region: "Middle East",
      role: "Regional office",
      city: "",
      address: "",
        email: "",
      image: "/images/office-middle-east.jpg",
    },
  ],
  news: [
    {
      slug: "vision-2035-launched",
      title: "The Luxe Organization launches Vision 2035",
      date: "2026-11-19",
      excerpt:
        "A decade-long programme of investment in clean energy, computing, healthcare and connectivity, beginning in Pakistan.",
      body:
        "The Luxe Organization has launched Vision 2035, a programme of investment in EV charging stations, data centres, artificial intelligence, AI-backed solar power grids, healthcare and broadband that reaches even the most difficult terrain.\n\nThe company aims to complete the programme by 2035. Work begins in Pakistan and will then expand worldwide.",
      image: "/images/hero-london-dusk.jpg",
      published: true,
    },
  ],
};
