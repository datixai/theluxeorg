export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <path d="M16.04 3C9 3 3.3 8.7 3.3 15.73c0 2.25.59 4.44 1.7 6.37L3.2 28.8l6.87-1.8a12.7 12.7 0 0 0 5.96 1.5h.01c7.03 0 12.74-5.7 12.74-12.74 0-3.4-1.33-6.6-3.73-9A12.66 12.66 0 0 0 16.04 3Zm0 23.35h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.08 1.07 1.09-3.98-.25-.41a10.56 10.56 0 0 1-1.62-5.6c0-5.85 4.76-10.6 10.62-10.6 2.83 0 5.5 1.1 7.5 3.11a10.53 10.53 0 0 1 3.1 7.5c0 5.86-4.76 10.62-10.56 10.62Zm5.82-7.95c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.56-1.58-.95-.85-1.59-1.89-1.77-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="label-caps pointer-events-none hidden translate-x-2 bg-ink px-4 py-2.5 text-[0.62rem] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="animate-wa grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.45)] transition-transform duration-300 group-hover:scale-105">
        <WhatsAppIcon className="h-7 w-7" />
      </span>
    </a>
  );
}
