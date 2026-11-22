import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { SITE_IMAGES } from "@/lib/site-images";

export function SearchHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <div className="hero-media relative min-h-[72svh] w-full sm:min-h-[78svh]">
        <Image
          src={SITE_IMAGES.hero}
          alt="Tea estate work near the Coimbatore hills"
          fill
          priority
          className="object-cover object-[50%_35%]"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/75 via-navy-deep/25 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="site-shell hero-copy w-full pb-10 pt-28 sm:pb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Est. {SITE.established} · {SITE.location}
            </p>
            <h1 className="display mt-3 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl">
              {SITE.name}
            </h1>
            <p className="mt-4 max-w-md text-base text-white/85 sm:text-lg">
              {SITE.tagline} Agri land, plots and sites from our Perur office.
              Confused? Call us. We listen and help you choose.
            </p>
            <div className="mt-7">
              <Link href="/properties" className="btn-light">
                See available sites
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
