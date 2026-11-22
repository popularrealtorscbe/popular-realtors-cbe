import Image from "next/image";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import { SITE_IMAGES } from "@/lib/site-images";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="bg-page pb-16 pt-10 md:pb-20 md:pt-14">
      <div className="site-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Contact
          </p>
          <h1 className="display mt-3 text-4xl text-navy md:text-5xl">
            Talk to us
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
            Not sure which site fits? Call or WhatsApp. Tell us what you need.
            We listen and guide.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Office
              </div>
              <p className="mt-1 text-ink">{SITE.address}</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Phone
              </div>
              <p className="mt-1 text-ink">{SITE.phone}</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Email
              </div>
              <p className="mt-1 text-ink">{SITE.email}</p>
            </div>
          </div>

          <div className="relative mt-8 aspect-[16/10] overflow-hidden lg:hidden">
            <Image
              src={SITE_IMAGES.contact}
              alt="Open land site near Perur"
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="border border-line bg-white p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-navy">Quick message</h2>
            <p className="mt-2 text-sm text-muted">
              Share locality, budget and size. We reply from the office.
            </p>
            <p className="mt-6 text-sm text-muted">
              Use Call or WhatsApp at the bottom right of any page.
            </p>
            <a
              href={SITE.justdialUrl}
              className="mt-4 block text-sm font-medium text-blue"
              target="_blank"
              rel="noreferrer"
            >
              Also on JustDial
            </a>
            <div className="relative mt-8 hidden aspect-[16/10] overflow-hidden lg:block">
              <Image
                src={SITE_IMAGES.contactAlt}
                alt="Plot land in Coimbatore"
                fill
                className="object-cover"
                sizes="400px"
                unoptimized
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
