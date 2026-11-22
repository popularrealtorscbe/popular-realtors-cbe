import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata = {
  title: "About",
  description:
    "Popular Realtors Coimbatore — buying & selling at best prices. Perur brokers for agri land, plots and sites.",
};

const COLLAGE = SITE_IMAGES.collage;

export default function AboutPage() {
  return (
    <div className="bg-page pb-16 pt-10 md:pb-20 md:pt-14">
      <div className="site-shell max-w-4xl">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            About
          </p>
          <h1 className="display mt-3 text-4xl text-navy md:text-5xl">
            {SITE.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
            {SITE.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="border border-line bg-white p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Since
              </div>
              <div className="display mt-2 text-4xl text-navy">
                {SITE.established}
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="border border-line bg-white p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Office
              </div>
              <div className="display mt-2 text-3xl text-navy md:text-4xl">
                {SITE.location}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative mt-10 overflow-hidden bg-navy">
            <div className="grid grid-cols-3 gap-1.5 p-1.5 sm:gap-2 sm:p-2">
              {COLLAGE.map((src, i) => (
                <div
                  key={src}
                  className={`relative overflow-hidden border border-white/15 ${
                    i === 1 || i === 4 ? "aspect-[4/5]" : "aspect-[5/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 896px) 33vw, 280px"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[11px]">
                  {SITE.yearsInBusiness}+ years · Perur
                </p>
                <p className="display mt-3 max-w-md text-2xl leading-snug text-white sm:text-3xl md:text-4xl">
                  Agri land, plots and sites — bought and sold at the best
                  prices
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Our values
            </p>
            <h2 className="display mt-2 text-3xl text-navy">
              How we work with you
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SITE.values.map((value) => (
                <div
                  key={value.title}
                  className="border border-line bg-white p-5"
                >
                  <h3 className="text-base font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={SITE_IMAGES.land}
                alt="Open plot land near Coimbatore"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                We broker agri land, plots and sites. Buyers come for clear
                details: facing, cents, size and rate. Sellers trust us to list
                only what is real, and to take it down when sold. We do not deal
                in houses or high-rise buildings.
              </p>
              <p>
                If the list feels confusing, do not worry. Call or WhatsApp.
                Speak in your language. We are here to understand your
                requirement and show the right option.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-navy">
              Ready to talk?
            </h2>
            <p className="mt-2 text-sm text-muted">
              No long forms. Just a call or a message.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Contact
              </Link>
              <Link href="/properties" className="btn-ghost">
                See sites
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
