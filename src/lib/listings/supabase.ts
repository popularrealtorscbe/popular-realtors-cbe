import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "../format";
import { normalizeProperty } from "../images";
import { FALLBACK_IMAGE, type Property, type PropertyInput } from "../types";

function uniqueSlug(title: string, explicit?: string): string {
  const base = explicit?.trim() || slugify(title) || "property";
  return `${base}-${Date.now().toString(36)}`;
}

export async function supabaseListProperties(options?: {
  includeSold?: boolean;
  featuredOnly?: boolean;
}): Promise<Property[]> {
  const supabase = options?.includeSold
    ? createAdminClient()
    : await createClient();

  let query = supabase
    .from("properties")
    .select("*")
    .order("updated_at", { ascending: false });

  if (!options?.includeSold) {
    query = query.eq("status", "available");
  }
  if (options?.featuredOnly) {
    query = query.eq("featured", true).eq("status", "available");
  }

  const { data, error } = await query;
  if (error) {
    console.error("[supabase] list properties:", error.message);
    return [];
  }
  return ((data ?? []) as Property[]).map((item) => normalizeProperty(item));
}

export async function supabaseGetProperty(
  id: string,
): Promise<Property | null> {
  let client;
  try {
    client = createAdminClient();
  } catch {
    client = await createClient();
  }

  const { data, error } = await client
    .from("properties")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .maybeSingle();
  if (error) {
    console.error("[supabase] get property:", error.message);
    return null;
  }
  if (!data) return null;
  return normalizeProperty(data as Property);
}

export async function supabaseCreateProperty(
  input: PropertyInput,
): Promise<Property> {
  const supabase = createAdminClient();
  const title = input.title.trim();
  const thumbnail =
    input.thumbnail?.trim() || input.images?.[0] || FALLBACK_IMAGE;
  const images = (input.images ?? []).filter((src) => src && src !== thumbnail);

  // Always unique slug so re-adding similar titles never collides with seed data
  const slug = uniqueSlug(title, input.slug);

  const payload = {
    title,
    slug,
    description: input.description || "",
    property_type: input.property_type,
    status: input.status || "available",
    price: Number(input.price),
    area_sqft:
      input.area_sqft === null || input.area_sqft === undefined
        ? null
        : Number(input.area_sqft),
    area_acres:
      input.area_acres === null || input.area_acres === undefined
        ? null
        : Number(input.area_acres),
    location: input.location,
    city: input.city || "Coimbatore",
    locality: input.locality || "Coimbatore",
    features: input.features ?? [],
    thumbnail,
    images,
    featured: Boolean(input.featured),
    expires_at: input.expires_at ?? null,
  };

  if (!Number.isFinite(payload.price) || payload.price < 0) {
    throw new Error("Price must be a valid number.");
  }

  const { data, error } = await supabase
    .from("properties")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    console.error("[supabase] create property:", error);
    throw new Error(error.message || "Supabase insert failed");
  }
  return normalizeProperty(data as Property);
}

export async function supabaseUpdateProperty(
  id: string,
  input: Partial<PropertyInput>,
): Promise<Property | null> {
  const supabase = createAdminClient();
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (input.title !== undefined) payload.title = input.title.trim();
  if (input.slug !== undefined) payload.slug = input.slug.trim();
  if (input.description !== undefined) payload.description = input.description;
  if (input.property_type !== undefined)
    payload.property_type = input.property_type;
  if (input.status !== undefined) payload.status = input.status;
  if (input.price !== undefined) payload.price = Number(input.price);
  if (input.area_sqft !== undefined) payload.area_sqft = input.area_sqft;
  if (input.area_acres !== undefined) payload.area_acres = input.area_acres;
  if (input.location !== undefined) payload.location = input.location;
  if (input.city !== undefined) payload.city = input.city;
  if (input.locality !== undefined) payload.locality = input.locality;
  if (input.features !== undefined) payload.features = input.features;
  if (input.featured !== undefined) payload.featured = Boolean(input.featured);
  if (input.expires_at !== undefined) payload.expires_at = input.expires_at;
  if (input.thumbnail !== undefined) {
    payload.thumbnail = input.thumbnail.trim() || FALLBACK_IMAGE;
  }
  if (input.images !== undefined) {
    const thumb = (payload.thumbnail as string | undefined) || input.thumbnail;
    payload.images = input.images.filter((src) => src && src !== thumb);
  }

  const { data, error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) {
    console.error("[supabase] update property:", error);
    throw new Error(error.message || "Supabase update failed");
  }
  if (!data) return null;
  return normalizeProperty(data as Property);
}

export async function supabaseDeleteProperty(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { error, count } = await supabase
    .from("properties")
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) {
    console.error("[supabase] delete property:", error);
    throw new Error(error.message || "Supabase delete failed");
  }
  return (count ?? 0) > 0;
}
