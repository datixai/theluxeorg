import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Official logo (TLO monogram | The Luxe Organization, Vision 2035).
 * Transparent variants cut from assets/luxe-logo-original.jpg live in public/brand/.
 */
export function Wordmark({
  className,
  tone = "black",
  priority = false,
}: {
  className?: string;
  tone?: "black" | "gold" | "white";
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/logo-${tone}.png`}
      alt="The Luxe Organization, Vision 2035"
      width={868}
      height={218}
      priority={priority}
      className={cn("h-auto w-[170px] select-none sm:w-[210px]", className)}
    />
  );
}
