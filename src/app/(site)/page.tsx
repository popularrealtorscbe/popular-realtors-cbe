import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { PropertyCard } from "@/components/site/PropertyCard";
import { listProperties } from "@/lib/listings/store";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await listProperties({ featuredOnly: true });
  const fallback = await listProperties();
  const show = (featured.length ? featured : fallback).slice(0, 6);

  return (
    <>
      <Hero />

      <section className="site-shell py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
            Why Popular Realtors
          </p>
          <h2 className="display mt-3 text-4xl text-ink md:text-5xl">
            Coimbatore land deals, handled with clarity.
          </h2>
          <p className="mt-4 text-lg text-ink/70">{SITE.description}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {SITE.specialties.map((item) => (
            <div
              key={item}
              className="border border-[var(--line)] bg-white/70 px-5 py-6"
            >
              <div className="text-sm font-semibold text-forest">{item}</div>
              <p className="mt-2 text-sm text-ink/60">
                Verified local inventory with transparent pricing.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist/70 py-20">
        <div className="site-shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
                Featured listings
              </p>
              <h2 className="display mt-3 text-4xl text-ink">
                Available now in Coimbatore
              </h2>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 font-semibold text-forest"
            >
              View all properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {show.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-20">
        <div className="grid overflow-hidden bg-forest text-white md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-12">
            <h2 className="display text-4xl md:text-5xl">
              Looking to buy or sell at the right price?
            </h2>
            <p className="mt-4 max-w-lg text-white/75">
              Share your requirement — plots, farmland, industrial land, or
              ready-to-move homes around Perur and greater Coimbatore.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="bg-white px-5 py-3 font-semibold text-forest">
                Contact us
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="border border-white/40 px-5 py-3 font-semibold"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="border-t border-white/10 p-8 md:border-l md:border-t-0 md:p-12">
            <div className="space-y-5 text-white/80">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-copper">
                  Office
                </div>
                <p className="mt-2">{SITE.address}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-copper">
                  Phone
                </div>
                <p className="mt-2">{SITE.phone}</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-copper">
                  Since
                </div>
                <p className="mt-2">{SITE.established}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
