import Image from "next/image";
import { cn } from "@/lib/utils";

const OPTIMISABLE = [/^\//, /^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//, /^https:\/\/firebasestorage\.googleapis\.com\//, /^https:\/\/images\.unsplash\.com\//];

/**
 * Fill image that uses next/image for local and known hosts, and a plain <img>
 * for any other link pasted in the admin panel.
 */
export function Img({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) return <div className={cn("absolute inset-0 bg-ink-3", className)} aria-hidden />;
  if (OPTIMISABLE.some((r) => r.test(src))) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={cn("absolute inset-0 h-full w-full object-cover", className)} loading={priority ? "eager" : "lazy"} />;
}
