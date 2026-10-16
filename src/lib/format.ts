import { PROPERTY_TYPE_LABELS, type Property, type PropertyType } from "./types";

export function formatPrice(price: number): string {
  if (price >= 1_00_00_000) {
    const crores = price / 1_00_00_000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  if (price >= 1_00_000) {
    const lakhs = price / 1_00_000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(1)} Lakh`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatArea(property: Property): string {
  if (property.area_acres && property.area_acres > 0) {
    return `${property.area_acres} acre${property.area_acres === 1 ? "" : "s"}`;
  }
  if (property.area_sqft && property.area_sqft > 0) {
    return `${property.area_sqft.toLocaleString("en-IN")} sq.ft`;
  }
  return "Area on request";
}

export function propertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPE_LABELS[type];
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
