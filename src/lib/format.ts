import { PROPERTY_TYPE_LABELS, type Property, type PropertyType } from "./types";

export function formatPrice(price: number): string {
  if (price >= 1_00_00_000) {
    const crores = price / 1_00_00_000;
    return `₹ ${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  if (price >= 1_00_000) {
    const lakhs = price / 1_00_000;
    return `₹ ${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakh`;
  }
  return `₹ ${Math.round(price).toLocaleString("en-IN")}`;
}

export function formatPricePerCent(rate: number | null | undefined): string {
  if (!rate || rate <= 0) return "";
  return `${formatPrice(rate)} / cent`;
}

export function formatArea(property: Property): string {
  const parts: string[] = [];
  if (property.area_cents && property.area_cents > 0) {
    parts.push(
      `${property.area_cents} cent${property.area_cents === 1 ? "" : "s"}`,
    );
  }
  if (property.dimensions?.trim()) {
    parts.push(property.dimensions.trim());
  }
  if (property.area_sqft && property.area_sqft > 0) {
    parts.push(`${property.area_sqft.toLocaleString("en-IN")} sq.ft`);
  }
  if (property.area_acres && property.area_acres > 0) {
    parts.push(
      `${property.area_acres} acre${property.area_acres === 1 ? "" : "s"}`,
    );
  }
  return parts.length ? parts.join(" · ") : "Area on request";
}

export function propertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPE_LABELS[type];
}

/** Parse "35x50" / "35*50" / "35 x 50" into sq.ft when possible */
export function sqftFromDimensions(raw: string): number | null {
  const m = raw.trim().match(/^(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)$/i);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) return null;
  return Math.round(a * b);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
