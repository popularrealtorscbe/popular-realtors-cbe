import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Property, PropertyInput } from "../types";
import {
  localCreateProperty,
  localDeleteProperty,
  localGetProperty,
  localListProperties,
  localUpdateProperty,
} from "./local";
import {
  supabaseCreateProperty,
  supabaseDeleteProperty,
  supabaseGetProperty,
  supabaseListProperties,
  supabaseUpdateProperty,
} from "./supabase";

export function getDataBackend(): "supabase" | "local" {
  return isSupabaseConfigured() ? "supabase" : "local";
}

export async function listProperties(options?: {
  includeSold?: boolean;
  featuredOnly?: boolean;
}): Promise<Property[]> {
  if (getDataBackend() === "supabase") {
    try {
      return await supabaseListProperties(options);
    } catch (error) {
      console.error("[listings] Supabase list failed:", error);
      // Fail soft on public pages so the site still loads (e.g. before schema is run)
      if (!options?.includeSold) return [];
      throw error;
    }
  }
  return localListProperties(options);
}

export async function getProperty(id: string): Promise<Property | null> {
  if (getDataBackend() === "supabase") {
    try {
      return await supabaseGetProperty(id);
    } catch (error) {
      console.error("[listings] Supabase get failed:", error);
      return null;
    }
  }
  return localGetProperty(id);
}

export async function createProperty(input: PropertyInput): Promise<Property> {
  if (getDataBackend() === "supabase") {
    return supabaseCreateProperty(input);
  }
  return localCreateProperty(input);
}

export async function updateProperty(
  id: string,
  input: Partial<PropertyInput>,
): Promise<Property | null> {
  if (getDataBackend() === "supabase") {
    return supabaseUpdateProperty(id, input);
  }
  return localUpdateProperty(id, input);
}

export async function deleteProperty(id: string): Promise<boolean> {
  if (getDataBackend() === "supabase") {
    return supabaseDeleteProperty(id);
  }
  return localDeleteProperty(id);
}
