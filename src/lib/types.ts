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
  /** Total asking price in INR */
  price: number;
  area_sqft: number | null;
  area_acres: number | null;
  /** Common in Coimbatore plot deals (1 cent ≈ 435.6 sq.ft) */
  area_cents: number | null;
  /** Rate per cent in INR, e.g. 700000 for 7 lakh/cent */
  price_per_cent: number | null;
  /** Plot size text, e.g. "35 x 50" */
  dimensions: string;
  /** e.g. Site no 52 */
  site_no: string;
  /** South / East / Corner etc. */
  facing: string;
  negotiable: boolean;
  location: string;
  city: string;
  /** Nagar / layout / village name buyers search by */
  locality: string;
  /** Roads + landmarks, multi-line friendly */
  address: string;
  maps_url: string;
  features: string[];
  thumbnail: string;
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
  residential_plot: "Plot / site",
  agricultural: "Agricultural land",
  industrial: "Open / industrial land",
  house: "House (not our focus)",
  commercial: "Commercial land",
};

/** Public browse filters — land brokerage only (no houses / high-rise) */
export const PUBLIC_PROPERTY_TYPES: PropertyType[] = [
  "agricultural",
  "residential_plot",
  "industrial",
];

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available: "Available",
  sold: "Sold",
  reserved: "Reserved",
};

export const FACING_OPTIONS = [
  "South facing",
  "North facing",
  "East facing",
  "West facing",
  "North East",
  "North West",
  "South East",
  "South West",
  "Corner plot",
] as const;

/** Soft WhatsApp-style placeholder when the agent skips photos */
export const FALLBACK_IMAGE = "/listings/placeholder-property.svg";

export const FEATURE_EXAMPLES = [
  "DTCP Approved",
  "Clear Title",
  "Corner Plot",
  "Borewell",
  "Road Access",
  "Near School",
  "Gated Layout",
  "Negotiable",
];
