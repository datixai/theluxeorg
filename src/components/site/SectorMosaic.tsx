import Link from "next/link";
import type { Sector } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Img } from "../Img";

/* Photo mosaic: three columns of uneven tile heights on desktop (5 rows each). */
const PLACEMENT = [
  "lg:col-start-1 lg:row-start-1 lg:row-span-3",
  "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  "lg:col-start-3 lg:row-start-1 lg:row-span-3",
  "lg:col-start-2 lg:row-start-3 lg:row-span-3",
  "lg:col-start-1 lg:row-start-4 lg:row-span-2",
  "lg:col-start-3 lg:row-start-4 lg:row-span-2",
];

export function SectorMosaic({ sectors }: { sectors: Sector[] }) {
  return (
    <div className="grid grid-cols-1 gap-[3px] bg-white sm:grid-cols-2 lg:h-[min(118vh,1080px)] lg:grid-cols-3 lg:grid-rows-5">
      {sectors.map((s, i) => (
        <Link
          key={s.slug}
          href={`/sectors/${s.slug}`}
          className={cn("group relative h-[360px] overflow-hidden bg-ink sm:h-[420px] lg:h-auto", PLACEMENT[i % PLACEMENT.length])}
        >
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]">
            <Img src={s.image} alt={s.title} sizes="(min-width:1024px) 34vw, (min-width:640px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-ink/45 transition-colors duration-700 group-hover:bg-ink/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="label-caps text-[1rem] font-normal tracking-[0.24em] text-white drop-shadow-[0_2px_10px_rgb(0_0_0/0.5)] sm:text-[1.08rem]">
              {s.label}
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/90 lg:max-h-0 lg:translate-y-3 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-700 lg:group-hover:max-h-32 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              {s.summary}
            </p>
            <span className="label-caps mt-5 border-b border-gold pb-1 text-[0.6rem] text-gold-light opacity-100 transition-opacity duration-700 lg:opacity-0 lg:group-hover:opacity-100">
              Discover
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
