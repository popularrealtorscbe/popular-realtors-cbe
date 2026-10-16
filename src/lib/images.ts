import { FALLBACK_IMAGE, type Property } from "./types";

/** Normalize older records that only had `images`. */
export function normalizeProperty<T extends Partial<Property> & { images?: string[] }>(
  property: T,
): T & { thumbnail: string; images: string[] } {
  const images = property.images?.filter(Boolean) ?? [];
  const thumbnail =
    property.thumbnail?.trim() || images[0] || FALLBACK_IMAGE;
  const gallery = images.filter((src) => src !== thumbnail);
  return {
    ...property,
    thumbnail,
    images: gallery,
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
