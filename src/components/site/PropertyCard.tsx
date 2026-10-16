import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatArea, formatPrice, propertyTypeLabel } from "@/lib/format";
import { getThumbnail } from "@/lib/images";
import type { Property } from "@/lib/types";

export function PropertyCard({ property }: { property: Property }) {
  const image = getThumbnail(property);

  return (
    <Link
      href={`/properties/${property.slug || property.id}`}
      className="property-card group block overflow-hidden bg-white"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized={image.startsWith("/uploads/")}
        />
        <div className="absolute left-3 top-3 bg-forest px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {propertyTypeLabel(property.property_type)}
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-xl leading-snug text-ink">
            {property.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-ink/65">
          <MapPin className="h-4 w-4 text-copper" />
          {property.location}
        </div>
        <div className="flex items-end justify-between border-t border-[var(--line)] pt-3">
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-ink/45">
              Price
            </div>
            <div className="text-lg font-semibold text-forest">
              {formatPrice(property.price)}
            </div>
          </div>
          <div className="text-right text-sm text-ink/60">
            {formatArea(property)}
          </div>
        </div>
      </div>
    </Link>
  );
}
