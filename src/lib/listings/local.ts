import { promises as fs } from "fs";
import path from "path";
import { slugify } from "../format";
import { normalizeProperty } from "../images";
import { FALLBACK_IMAGE, type Property, type PropertyInput } from "../types";
import { SEED_LISTINGS } from "./seed";

const DATA_PATH = path.join(process.cwd(), "data", "listings.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.access(DATA_PATH);
  } catch {
    // On Vercel the filesystem is read-only — never crash the site for seed writes
    try {
      await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
      await fs.writeFile(DATA_PATH, JSON.stringify(SEED_LISTINGS, null, 2));
    } catch {
      // ignore
    }
  }
}

async function readAll(): Promise<Property[]> {
  try {
    await ensureFile();
    const raw = await fs.readFile(DATA_PATH, "utf8");
    const listings = JSON.parse(raw) as Property[];
    return listings.map((item) => normalizeProperty(item));
  } catch {
    return SEED_LISTINGS.map((item) => normalizeProperty(item));
  }
}

async function writeAll(listings: Property[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
    await fs.writeFile(DATA_PATH, JSON.stringify(listings, null, 2));
  } catch (error) {
    throw new Error(
      "Cannot save listings on this host. Connect Supabase env vars on Vercel.",
    );
  }
}

export async function localListProperties(options?: {
  includeSold?: boolean;
  featuredOnly?: boolean;
}): Promise<Property[]> {
  let listings = await readAll();
  if (!options?.includeSold) {
    listings = listings.filter((p) => p.status === "available");
  }
  if (options?.featuredOnly) {
    listings = listings.filter((p) => p.featured && p.status === "available");
  }
  return listings.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function localGetProperty(id: string): Promise<Property | null> {
  const listings = await readAll();
  return listings.find((p) => p.id === id || p.slug === id) ?? null;
}

export async function localCreateProperty(
  input: PropertyInput,
): Promise<Property> {
  const listings = await readAll();
  const now = new Date().toISOString();
  const title = input.title.trim();
  const thumbnail = input.thumbnail?.trim() || input.images?.[0] || FALLBACK_IMAGE;
  const images = (input.images ?? []).filter((src) => src && src !== thumbnail);

  const property: Property = {
    id: input.id ?? `prop-${Date.now()}`,
    title,
    slug: input.slug?.trim() || slugify(title),
    description: input.description,
    property_type: input.property_type,
    status: input.status,
    price: Number(input.price),
    area_sqft: input.area_sqft ?? null,
    area_acres: input.area_acres ?? null,
    area_cents: input.area_cents ?? null,
    price_per_cent: input.price_per_cent ?? null,
    dimensions: input.dimensions?.trim() || "",
    site_no: input.site_no?.trim() || "",
    facing: input.facing?.trim() || "",
    negotiable: Boolean(input.negotiable),
    location: input.location,
    city: input.city || "Coimbatore",
    locality: input.locality,
    address: input.address?.trim() || "",
    maps_url: input.maps_url?.trim() || "",
    features: input.features ?? [],
    thumbnail,
    images,
    featured: Boolean(input.featured),
    created_at: now,
    updated_at: now,
    expires_at: input.expires_at ?? null,
  };
  listings.unshift(property);
  await writeAll(listings);
  return property;
}

export async function localUpdateProperty(
  id: string,
  input: Partial<PropertyInput>,
): Promise<Property | null> {
  const listings = await readAll();
  const index = listings.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = listings[index];
  const title = input.title?.trim() ?? current.title;
  const thumbnail =
    input.thumbnail !== undefined
      ? input.thumbnail.trim() || current.images[0] || FALLBACK_IMAGE
      : current.thumbnail;
  const images =
    input.images !== undefined
      ? input.images.filter((src) => src && src !== thumbnail)
      : current.images.filter((src) => src !== thumbnail);

  const updated: Property = {
    ...current,
    ...input,
    title,
    slug: input.slug?.trim() || (input.title ? slugify(title) : current.slug),
    price: input.price !== undefined ? Number(input.price) : current.price,
    area_sqft:
      input.area_sqft !== undefined ? input.area_sqft : current.area_sqft,
    area_acres:
      input.area_acres !== undefined ? input.area_acres : current.area_acres,
    area_cents:
      input.area_cents !== undefined ? input.area_cents : current.area_cents,
    price_per_cent:
      input.price_per_cent !== undefined
        ? input.price_per_cent
        : current.price_per_cent,
    dimensions:
      input.dimensions !== undefined
        ? input.dimensions.trim()
        : current.dimensions || "",
    site_no:
      input.site_no !== undefined ? input.site_no.trim() : current.site_no || "",
    facing:
      input.facing !== undefined ? input.facing.trim() : current.facing || "",
    negotiable:
      input.negotiable !== undefined
        ? Boolean(input.negotiable)
        : Boolean(current.negotiable),
    features: input.features ?? current.features,
    address:
      input.address !== undefined ? input.address.trim() : current.address || "",
    maps_url:
      input.maps_url !== undefined
        ? input.maps_url.trim()
        : current.maps_url || "",
    thumbnail,
    images,
    featured:
      input.featured !== undefined ? Boolean(input.featured) : current.featured,
    updated_at: new Date().toISOString(),
  };
  listings[index] = updated;
  await writeAll(listings);
  return updated;
}

export async function localDeleteProperty(id: string): Promise<boolean> {
  const listings = await readAll();
  const next = listings.filter((p) => p.id !== id);
  if (next.length === listings.length) return false;
  await writeAll(next);
  return true;
}
