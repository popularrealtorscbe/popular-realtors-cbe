import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per file
const ALLOWED = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extFromType(type: string, filename: string): string {
  if (type.includes("png")) return "png";
  if (type.includes("webp")) return "webp";
  if (type.includes("gif")) return "gif";
  const fromName = path.extname(filename).replace(".", "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  return "jpg";
}

export function assertValidImage(file: File): void {
  if (!ALLOWED.has(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, or GIF images are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Each image must be under 8 MB. Compress large phone photos first.");
  }
}

async function uploadLocal(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = extFromType(file.type, file.name);
  const name = `${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buffer);
  return `/uploads/${name}`;
}

async function uploadSupabase(file: File): Promise<string> {
  const supabase = createAdminClient();
  const ext = extFromType(file.type, file.name);
  const name = `properties/${Date.now()}-${randomBytes(4).toString("hex")}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from("property-images")
    .upload(name, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("property-images").getPublicUrl(name);
  return data.publicUrl;
}

export async function uploadImageFile(file: File): Promise<string> {
  assertValidImage(file);
  if (isSupabaseConfigured()) {
    try {
      return await uploadSupabase(file);
    } catch (err) {
      // Fall back to local if bucket isn't created yet during testing
      const message = err instanceof Error ? err.message : String(err);
      if (message.toLowerCase().includes("bucket") || message.toLowerCase().includes("not found")) {
        return uploadLocal(file);
      }
      throw err;
    }
  }
  return uploadLocal(file);
}
