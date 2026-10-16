import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "../format";
import { normalizeProperty } from "../images";
import { FALLBACK_IMAGE, type Property, type PropertyInput } from "../types";

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
  if (error) throw error;
  return ((data ?? []) as Property[]).map((item) => normalizeProperty(item));
}

export async function supabaseGetProperty(
  id: string,
): Promise<Property | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("properties")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .maybeSingle();
  if (error) throw error;
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

  const payload = {
    title,
    slug: input.slug?.trim() || slugify(title),
    description: input.description,
    property_type: input.property_type,
    status: input.status,
    price: Number(input.price),
    area_sqft: input.area_sqft ?? null,
    area_acres: input.area_acres ?? null,
    location: input.location,
    city: input.city || "Coimbatore",
    locality: input.locality,
    features: input.features ?? [],
    thumbnail,
    images,
    featured: Boolean(input.featured),
    expires_at: input.expires_at ?? null,
  };

  const { data, error } = await supabase
    .from("properties")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return normalizeProperty(data as Property);
}

export async function supabaseUpdateProperty(
  id: string,
  input: Partial<PropertyInput>,
): Promise<Property | null> {
  const supabase = createAdminClient();
  const payload: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };
  if (input.title) {
    payload.title = input.title.trim();
    if (!input.slug) payload.slug = slugify(input.title);
  }
  if (input.price !== undefined) payload.price = Number(input.price);
  if (input.thumbnail !== undefined) {
    payload.thumbnail = input.thumbnail.trim() || FALLBACK_IMAGE;
  }
  if (input.images !== undefined) {
    const thumb =
      (payload.thumbnail as string | undefined) || input.thumbnail || "";
    payload.images = input.images.filter((src) => src && src !== thumb);
  }

  const { data, error } = await supabase
    .from("properties")
    .update(payload)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return normalizeProperty(data as Property);
}

export async function supabaseDeleteProperty(id: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { error, count } = await supabase
    .from("properties")
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) throw error;
  return (count ?? 0) > 0;
}
