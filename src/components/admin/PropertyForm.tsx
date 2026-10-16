"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FALLBACK_IMAGE } from "@/lib/types";
import {
  PROPERTY_TYPE_LABELS,
  STATUS_LABELS,
  type Property,
  type PropertyInput,
  type PropertyStatus,
  type PropertyType,
} from "@/lib/types";

type Props = {
  initial?: Property;
  mode: "create" | "edit";
};

const empty: PropertyInput = {
  title: "",
  description: "",
  property_type: "residential_plot",
  status: "available",
  price: 0,
  area_sqft: null,
  area_acres: null,
  location: "",
  city: "Coimbatore",
  locality: "",
  features: [],
  thumbnail: "",
  images: [],
  featured: false,
  expires_at: null,
};

export function PropertyForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyInput>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          property_type: initial.property_type,
          status: initial.status,
          price: initial.price,
          area_sqft: initial.area_sqft,
          area_acres: initial.area_acres,
          location: initial.location,
          city: initial.city,
          locality: initial.locality,
          features: initial.features,
          thumbnail: initial.thumbnail || initial.images[0] || "",
          images: initial.images.filter((src) => src !== initial.thumbnail),
          featured: initial.featured,
          expires_at: initial.expires_at,
        }
      : empty,
  );
  const [featuresText, setFeaturesText] = useState(
    (initial?.features || []).join(", "),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!form.thumbnail && form.images.length === 0) {
      setSaving(false);
      setError("Add a main thumbnail (and optional gallery images).");
      return;
    }

    const thumbnail = form.thumbnail || form.images[0] || FALLBACK_IMAGE;
    const images = form.images.filter((src) => src !== thumbnail);

    const payload: PropertyInput = {
      ...form,
      thumbnail,
      images,
      features: featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      location:
        form.location ||
        `${form.locality || "Coimbatore"}, ${form.city || "Coimbatore"}`,
    };

    try {
      const res = await fetch(
        mode === "create" ? "/api/listings" : `/api/listings/${initial?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json().catch(() => ({}));
      setSaving(false);
      if (!res.ok) {
        setError(data.error || `Could not save property (${res.status})`);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setSaving(false);
      setError("Network error while saving. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="label">Title</label>
          <input
            className="input"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Property type</label>
          <select
            className="input"
            value={form.property_type}
            onChange={(e) =>
              setForm({
                ...form,
                property_type: e.target.value as PropertyType,
              })
            }
          >
            {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select
            className="input"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as PropertyStatus })
            }
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Price (INR)</label>
          <input
            className="input"
            type="number"
            required
            min={0}
            value={form.price || ""}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label className="label">Locality</label>
          <input
            className="input"
            required
            value={form.locality}
            onChange={(e) => setForm({ ...form, locality: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Area (sq.ft)</label>
          <input
            className="input"
            type="number"
            value={form.area_sqft ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                area_sqft: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>
        <div>
          <label className="label">Area (acres)</label>
          <input
            className="input"
            type="number"
            step="0.1"
            value={form.area_acres ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                area_acres: e.target.value ? Number(e.target.value) : null,
              })
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Full location</label>
          <input
            className="input"
            placeholder="Perur, Coimbatore"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="input min-h-32"
            required
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="label">Features (comma separated)</label>
          <input
            className="input"
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder="DTCP Approved, Clear Title, Corner Plot"
          />
        </div>

        <ImageUploader
          thumbnail={form.thumbnail}
          images={form.images}
          onThumbnailChange={(thumbnail) => setForm({ ...form, thumbnail })}
          onImagesChange={(images) => setForm({ ...form, images })}
        />

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Show as featured on homepage
        </label>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
              ? "Add property"
              : "Save changes"}
        </button>
        <button
          type="button"
          className="border border-[var(--line)] px-4 py-2"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
