import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { formatArea, formatPrice, propertyTypeLabel } from "@/lib/format";
import { getProperty } from "@/lib/listings/store";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property || property.status !== "available") notFound();

  const waText = encodeURIComponent(
    `Hi, I'm interested in "${property.title}" listed on Popular Realtors CBE.`,
  );

  return (
    <div className="pt-28 pb-20">
      <div className="site-shell">
        <Link href="/properties" className="text-sm font-medium text-forest">
          ← Back to properties
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden bg-mist">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            {property.images.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {property.images.slice(1, 4).map((src) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
                {propertyTypeLabel(property.property_type)}
              </p>
              <h1 className="display mt-3 text-4xl text-ink md:text-5xl">
                {property.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-ink/65">
                <MapPin className="h-4 w-4 text-copper" />
                {property.location}
              </div>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/75">
                {property.description}
              </p>

              {property.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink/50">
                    Highlights
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {property.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-mist px-3 py-1.5 text-sm font-medium text-forest"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <div className="text-xs uppercase tracking-[0.16em] text-ink/45">
              Asking price
            </div>
            <div className="display mt-2 text-4xl text-forest">
              {formatPrice(property.price)}
            </div>
            <div className="mt-2 text-ink/60">{formatArea(property)}</div>

            <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/50">Type</span>
                <span className="font-medium">
                  {propertyTypeLabel(property.property_type)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Locality</span>
                <span className="font-medium">{property.locality}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">City</span>
                <span className="font-medium">{property.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/50">Status</span>
                <span className="font-medium capitalize">{property.status}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${SITE.phone}`} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {SITE.shortName}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[var(--line)] px-4 py-3 font-semibold text-forest"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp enquiry
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
