import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseUrl } from "./env";

/** Server-only client. Bypasses RLS for admin CRUD. Never expose to the browser. */
export function createAdminClient() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawUrl || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY (and URL) are required for admin operations.",
    );
  }

  return createClient(normalizeSupabaseUrl(rawUrl), serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
