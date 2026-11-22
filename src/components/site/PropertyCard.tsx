import Image from "next/image";
import Link from "next/link";
import { formatArea, formatPrice, propertyTypeLabel } from "@/lib/format";
import { getThumbnail } from "@/lib/images";
import type { Property } from "@/lib/types";

export function PropertyCard({ property }: { property: Property }) {
  const image = getThumbnail(property);

  return (
    <Link
      href={`/properties/${property.slug || property.id}`}
      className="listing-card group block w-full"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-sand">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          unoptimized={
            image.startsWith("/uploads/") ||
            image.startsWith("/listings/") ||
            image.endsWith(".svg") ||
            image.includes("supabase.co")
          }
        />
        <div className="absolute bottom-2 left-2 max-w-[85%] bg-white/95 px-2.5 py-1.5 backdrop-blur-sm">
          <div className="text-[13px] font-bold leading-tight text-ink">
            {formatPrice(property.price)}
            {property.negotiable ? (
              <span className="ml-1 text-[10px] font-semibold text-green-accent">
                Negotiable
              </span>
            ) : null}
          </div>
          <div className="text-[10px] font-medium text-muted">
            {formatArea(property)}
          </div>
        </div>
      </div>
      <div className="space-y-1 px-3 py-3">
        <div className="truncate text-[12px] font-medium text-ink">
          {propertyTypeLabel(property.property_type)}
          {property.facing ? ` · ${property.facing}` : ""}
        </div>
        <p className="truncate text-[12px] text-muted">
          {property.site_no
            ? `${property.site_no}, ${property.locality}`
            : property.locality}
        </p>
      </div>
    </Link>
  );
}
