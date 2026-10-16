export type PropertyType =
  | "residential_plot"
  | "agricultural"
  | "industrial"
  | "house"
  | "commercial";

export type PropertyStatus = "available" | "sold" | "reserved";

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  property_type: PropertyType;
  status: PropertyStatus;
  price: number;
  area_sqft: number | null;
  area_acres: number | null;
  location: string;
  city: string;
  locality: string;
  features: string[];
  /** Main card / hero image */
  thumbnail: string;
  /** Extra gallery photos */
  images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
}

export type PropertyInput = Omit<
  Property,
  "id" | "slug" | "created_at" | "updated_at"
> & {
  id?: string;
  slug?: string;
};

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  residential_plot: "Residential Plot",
  agricultural: "Agricultural / Farmland",
  industrial: "Industrial",
  house: "Ready-to-Move House",
  commercial: "Commercial",
};

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80";
