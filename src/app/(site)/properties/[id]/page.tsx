import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { ContactActions } from "@/components/site/ContactActions";
import {
  formatArea,
  formatPrice,
  formatPricePerCent,
  propertyTypeLabel,
} from "@/lib/format";
import { getGallery } from "@/lib/images";
import { getProperty } from "@/lib/listings/store";
import { mapsEmbedUrl, normalizeMapsUrl } from "@/lib/maps";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({
  params,
}: PageProps<"/properties/[id]">) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property || property.status !== "available") notFound();

  const gallery = getGallery(property);
  const mainImage = gallery[0];
  const moreImages = gallery.slice(1);
  const mapsLink = normalizeMapsUrl(property.maps_url || "");
  const embedSrc = mapsEmbedUrl(property.maps_url || "");

  const waText = encodeURIComponent(
    `Hi, I'm interested in "${property.title}" listed on Popular Realtors CBE.`,
  );

  return (
    <div className="bg-page pb-16 pt-6 sm:pt-8">
      <div className="site-shell">
        <Link
          href="/properties"
          className="text-sm font-semibold text-blue transition-opacity hover:opacity-70"
        >
          ← All properties
        </Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.45fr_0.7fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-[#ddd]">
              <Image
                src={mainImage}
                alt={property.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized={
                  mainImage.startsWith("/uploads/") ||
                  mainImage.startsWith("/listings/") ||
                  mainImage.endsWith(".svg") ||
                  mainImage.includes("supabase.co")
                }
              />
            </div>
            {moreImages.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {moreImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden border border-line"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="160px"
                      unoptimized={
                        src.startsWith("/uploads/") ||
                        src.startsWith("/listings/") ||
                        src.endsWith(".svg") ||
                        src.includes("supabase.co")
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border border-line bg-white p-4 sm:p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-blue">
                {propertyTypeLabel(property.property_type)}
              </div>
              <h1 className="mt-2 text-xl font-bold text-ink sm:text-2xl md:text-3xl">
                {property.title}
              </h1>
              <div className="mt-2 flex items-start gap-1.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <span className="whitespace-pre-line">
                  {[
                    property.site_no,
                    property.locality,
                    property.address,
                    property.location,
                  ]
                    .filter(Boolean)
                    .filter((v, i, arr) => arr.indexOf(v) === i)
                    .join("\n")}
                </span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#444]">
                {property.description}
              </p>

              {property.features.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {property.features.map((feature) => (
                    <span
                      key={feature}
                      className="border border-line bg-page px-2.5 py-1 text-xs font-medium text-ink"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {(embedSrc || mapsLink || property.address) && (
              <div className="mt-4 border border-line bg-white p-4 sm:p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-navy">
                  Location
                </h2>
                {property.address && (
                  <p className="mt-2 text-sm text-ink">{property.address}</p>
                )}
                {embedSrc ? (
                  <div className="mt-3 overflow-hidden border border-line">
                    <iframe
                      title="Property location"
                      src={embedSrc}
                      className="h-52 w-full sm:h-64"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : null}
                {mapsLink && (
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <aside className="h-fit border border-line bg-white p-4 sm:p-5 lg:sticky lg:top-20">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted">
              Asking price
            </div>
            <div className="mt-1 text-3xl font-bold text-navy">
              {formatPrice(property.price)}
            </div>
            {property.negotiable && (
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-green-accent">
                Negotiable
              </div>
            )}
            <div className="mt-1 text-sm text-muted">{formatArea(property)}</div>
            {property.price_per_cent ? (
              <div className="mt-1 text-sm text-muted">
                {formatPricePerCent(property.price_per_cent)}
              </div>
            ) : null}

            <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-muted">Type</span>
                <span className="font-medium text-right">
                  {propertyTypeLabel(property.property_type)}
                </span>
              </div>
              {property.site_no && (
                <div className="flex justify-between gap-3">
                  <span className="text-muted">Site no</span>
                  <span className="font-medium text-right">{property.site_no}</span>
                </div>
              )}
              {property.facing && (
                <div className="flex justify-between gap-3">
                  <span className="text-muted">Facing</span>
                  <span className="font-medium text-right">{property.facing}</span>
                </div>
              )}
              {property.dimensions && (
                <div className="flex justify-between gap-3">
                  <span className="text-muted">Dimensions</span>
                  <span className="font-medium text-right">
                    {property.dimensions}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-3">
                <span className="text-muted">Locality</span>
                <span className="font-medium text-right">{property.locality}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Posted by</span>
                <span className="font-medium">{SITE.shortName}</span>
              </div>
            </div>

            <ContactActions
              variant="stack"
              fullWidth
              className="mt-5"
              callLabel="Call agent"
              whatsappLabel="WhatsApp"
              message={decodeURIComponent(waText)}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
