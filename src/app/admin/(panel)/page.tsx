import Link from "next/link";
import { getContent, storageMode } from "@/lib/content";
import { getMessages } from "@/lib/messages";

export default async function Dashboard() {
  const [c, messages] = await Promise.all([getContent(), getMessages().catch(() => [])]);
  const unread = messages.filter((m) => !m.read).length;
  const mode = storageMode();
  const uploads = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.FIREBASE_STORAGE_BUCKET);

  const cards = [
    { label: "New messages", value: unread, href: "/admin/messages" },
    { label: "News articles", value: c.news.length, href: "/admin/news" },
    { label: "Sectors", value: c.sectors.length, href: "/admin/content" },
    { label: "Offices", value: c.offices.length, href: "/admin/content" },
  ];

  return (
    <div>
      <p className="eyebrow">Dashboard</p>
      <h1 className="mt-3 font-display text-4xl">Welcome back</h1>
      <p className="mt-3 text-ink/60">Edit the website text and photos, publish news and read enquiries. Changes appear on the website as soon as you save.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((k) => (
          <Link key={k.label} href={k.href} className="rounded-lg border border-mist bg-white p-6 shadow-sm transition hover:border-gold-deep">
            <p className="font-display text-4xl text-gold-deep">{k.value}</p>
            <p className="mt-2 text-sm text-ink/60">{k.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Link href="/admin/content" className="rounded-lg border border-mist bg-white p-6 shadow-sm hover:border-gold-deep">
          <h2 className="font-display text-xl">Website content</h2>
          <p className="mt-2 text-sm text-ink/60">Home page, About, Vision 2035, the six sectors, roadmap, offices, WhatsApp number and email.</p>
        </Link>
        <Link href="/admin/news" className="rounded-lg border border-mist bg-white p-6 shadow-sm hover:border-gold-deep">
          <h2 className="font-display text-xl">News</h2>
          <p className="mt-2 text-sm text-ink/60">Write announcements with a photo, save as draft or publish.</p>
        </Link>
      </div>

      <div className="mt-10 rounded-lg border border-mist bg-white p-6 text-sm">
        <h2 className="font-display text-xl">System status</h2>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center gap-3">
            <span className={"h-2.5 w-2.5 rounded-full " + (mode === "firestore" ? "bg-emerald-500" : "bg-amber-500")} />
            Database: {mode === "firestore" ? "connected (Firebase Firestore)" : "local file (development only, not yet connected to Firebase)"}
          </li>
          <li className="flex items-center gap-3">
            <span className={"h-2.5 w-2.5 rounded-full " + (uploads ? "bg-emerald-500" : "bg-amber-500")} />
            File uploads: {uploads ? "connected" : process.env.VERCEL ? "not connected yet" : "saved on this computer (development only)"}
          </li>
        </ul>
      </div>
    </div>
  );
}
