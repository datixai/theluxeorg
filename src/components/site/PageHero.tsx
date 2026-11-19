import { Img } from "../Img";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[54svh] items-end overflow-hidden bg-ink text-white lg:min-h-[62svh]">
      <div className="absolute inset-0 animate-hero-zoom">
        <Img src={image} alt="" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/20" />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-14 pt-32 sm:px-8 lg:pb-20">
        <p className="eyebrow eyebrow-light animate-rise">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl animate-rise font-display text-4xl leading-[1.08] [animation-delay:150ms] sm:text-5xl lg:text-[4.2rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl animate-rise text-base leading-relaxed text-white/80 [animation-delay:300ms] sm:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
