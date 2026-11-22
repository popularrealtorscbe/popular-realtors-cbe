import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Reveal } from "@/components/site/Reveal";
import { SearchHero } from "@/components/site/SearchHero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { listProperties } from "@/lib/listings/store";
import { SITE } from "@/lib/site";
import { SITE_IMAGES } from "@/lib/site-images";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let listings: Awaited<ReturnType<typeof listProperties>> = [];
  try {
    listings = await listProperties();
  } catch (error) {
    console.error("[home] listings:", error);
  }

  const recent = listings.slice(0, 8);

  return (
    <>
      <SearchHero />
      <TrustStrip />

      <section className="site-shell py-12 md:py-16">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Live list
              </p>
              <h2 className="display mt-2 text-3xl text-navy md:text-4xl">
                Sites you can ask about today
              </h2>
              <p className="mt-2 max-w-lg text-sm text-muted">
                Open any card. Still unsure? Call the agent. We are here to
                understand what you need.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-transform hover:translate-x-0.5"
            >
              Full list
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {recent.map((property, i) => (
            <Reveal
              key={property.id}
              delay={(Math.min(i % 3, 2) + 1) as 1 | 2 | 3}
            >
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>

        {recent.length === 0 && (
          <Reveal>
            <div className="relative mt-8 overflow-hidden border border-line">
              <div className="relative aspect-[21/9] min-h-40">
                <Image
                  src={SITE_IMAGES.land}
                  alt="Open land"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-navy/55" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <p className="max-w-md text-sm text-white sm:text-base">
                  New sites will show here when the agent posts them. Meanwhile,
                  call us with your requirement.
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      <section className="border-y border-line bg-white py-12 md:py-14">
        <div className="site-shell">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              What we deal in
            </p>
            <h2 className="display mt-2 text-2xl text-navy md:text-3xl">
              Agri land, plots and sites around Coimbatore
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Agricultural land",
                text: "Farm and agri parcels for farming or holding.",
                href: "/properties?type=agricultural",
                image: SITE_IMAGES.farm,
              },
              {
                title: "Plots & sites",
                text: "Layout sites with facing, cents and rate.",
                href: "/properties?type=residential_plot",
                image: SITE_IMAGES.land,
              },
              {
                title: "Open land",
                text: "Open parcels for yard or long-hold use.",
                href: "/properties?type=industrial",
                image: SITE_IMAGES.field,
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={(i + 1) as 1 | 2 | 3}>
                <Link
                  href={item.href}
                  className="group relative block aspect-[4/3] overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="text-lg font-semibold">{item.title}</div>
                    <p className="mt-1 text-xs text-white/80">{item.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-page py-16 md:py-24">
        <div className="site-shell grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
              <Image
                src={SITE_IMAGES.story}
                alt="Farmers planting paddy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              Our story
            </p>
            <h2 className="display mt-3 text-3xl text-navy md:text-4xl">
              We know the land because we live here
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              For {SITE.yearsInBusiness}+ years our Perur office has helped
              people buy and sell agri land, plots and sites at the best prices
              we can arrange. We keep the list small and honest. No houses or
              high-rise.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Not sure where to start? That is fine. Call or WhatsApp. Tell us
              what you want in your own words. We will understand and guide.
            </p>
            <Link href="/about" className="btn-ghost mt-8">
              Our values
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white py-16 md:py-20">
        <div className="site-shell">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              How we help
            </p>
            <h2 className="display mt-3 max-w-xl text-3xl text-navy md:text-4xl">
              Three easy steps
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Look at the list",
                text: "See the sites. Note the locality, size and price.",
              },
              {
                step: "02",
                title: "Call or WhatsApp",
                text: "Ask anything. Documents, visit time, rate. We answer.",
              },
              {
                step: "03",
                title: "Visit together",
                text: "Come to the ground with us. Then decide in peace.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={(i + 1) as 1 | 2 | 3}>
                <div className="h-full border border-line bg-page p-6">
                  <div className="text-xs font-semibold tracking-[0.16em] text-blue">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden">
            <div className="relative aspect-[16/9] min-h-[280px] sm:min-h-[320px]">
              <Image
                src={SITE_IMAGES.values}
                alt="Farmer at work in the field"
                fill
                className="object-cover object-[50%_30%]"
                sizes="100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-navy/70" />
            </div>
            <div className="absolute inset-0 flex items-end">
              <div className="site-shell w-full pb-8 pt-16 sm:pb-10">
                <h2 className="display max-w-xl text-3xl text-white md:text-4xl">
                  Confused? Just talk to us
                </h2>
                <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
                  Tell us locality, budget and size in simple words. We will
                  understand your need and show what fits.
                </p>
                <Link href="/contact" className="btn-light mt-6">
                  Contact the office
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
