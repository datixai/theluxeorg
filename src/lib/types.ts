export interface SiteSettings {
  siteName: string;
  tagline: string;
  announcement: string;
  /** WhatsApp number in international format, digits only (e.g. 447786100650). */
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  phone: string;
}

export interface HomeContent {
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroBody: string;
  heroImage: string;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  ctaTitle: string;
  ctaBody: string;
}

export interface AboutContent {
  title: string;
  intro: string;
  quote: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  image: string;
}

export interface VisionContent {
  title: string;
  intro: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  image: string;
}

export interface Sector {
  slug: string;
  title: string;
  label: string;
  summary: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  /** One focus area per line. */
  focus: string;
  image: string;
}

export interface Milestone {
  years: string;
  title: string;
  body: string;
}

export interface RoadmapContent {
  title: string;
  intro: string;
  note: string;
  image: string;
  milestones: Milestone[];
}

export interface Office {
  slug: string;
  region: string;
  role: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  image: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  /** Paragraphs separated by a blank line. */
  body: string;
  image: string;
  published: boolean;
}

export interface Content {
  settings: SiteSettings;
  home: HomeContent;
  about: AboutContent;
  vision: VisionContent;
  sectors: Sector[];
  roadmap: RoadmapContent;
  offices: Office[];
  news: NewsItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  organisation: string;
  interest: string;
  message: string;
  createdAt: string;
  read: boolean;
}
