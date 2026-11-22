import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="grain relative min-h-[100svh] overflow-hidden text-white">
      <Image
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80"
        alt="Coimbatore farmland and open plots"
        fill
        priority
        className="animate-kenburns object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

      <div className="site-shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="max-w-3xl">
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-copper">
            Est. {SITE.established} · {SITE.location}
          </p>
          <h1 className="display animate-rise-delay mt-4 text-5xl leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
            {SITE.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/80 sm:text-xl">
            {SITE.tagline} Agri land, plots and sites
            listed clearly, priced fairly, managed by a trusted Perur office.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/properties" className="btn-primary">
              Browse properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${SITE.phone}`} className="btn-secondary">
              <Phone className="h-4 w-4" />
              Call agent
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
