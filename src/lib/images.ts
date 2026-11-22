import { FALLBACK_IMAGE, type Property } from "./types";

/** Normalize older records that may miss newer fields. */
export function normalizeProperty<
  T extends Partial<Property> & { images?: string[] },
>(property: T): Property {
  const images = property.images?.filter(Boolean) ?? [];
  const thumbnail =
    property.thumbnail?.trim() || images[0] || FALLBACK_IMAGE;
  const gallery = images.filter((src) => src !== thumbnail);

  return {
    id: property.id || "",
    title: property.title || "",
    slug: property.slug || "",
    description: property.description || "",
    property_type: property.property_type || "residential_plot",
    status: property.status || "available",
    price: Number(property.price || 0),
    area_sqft: property.area_sqft ?? null,
    area_acres: property.area_acres ?? null,
    area_cents: property.area_cents ?? null,
    price_per_cent: property.price_per_cent ?? null,
    dimensions: property.dimensions || "",
    site_no: property.site_no || "",
    facing: property.facing || "",
    negotiable: Boolean(property.negotiable),
    location: property.location || "",
    city: property.city || "Coimbatore",
    locality: property.locality || "",
    address: property.address || "",
    maps_url: property.maps_url || "",
    features: property.features || [],
    thumbnail,
    images: gallery,
    featured: Boolean(property.featured),
    created_at: property.created_at || new Date().toISOString(),
    updated_at: property.updated_at || new Date().toISOString(),
    expires_at: property.expires_at ?? null,
  };
}

export function getThumbnail(property: Property): string {
  return property.thumbnail || property.images[0] || FALLBACK_IMAGE;
}

/** Thumbnail first, then gallery (no duplicates). */
export function getGallery(property: Property): string[] {
  const thumb = getThumbnail(property);
  const rest = (property.images || []).filter((src) => src && src !== thumb);
  return [thumb, ...rest];
}
