import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[800px] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-5 font-display text-5xl">This page has moved on</h1>
      <p className="mt-6 text-ink/65">The page you are looking for does not exist or is no longer available.</p>
      <Link href="/" className="label-caps mt-10 bg-ink px-9 py-4 text-[0.7rem] text-white hover:bg-gold-deep">
        Back to home
      </Link>
    </section>
  );
}
