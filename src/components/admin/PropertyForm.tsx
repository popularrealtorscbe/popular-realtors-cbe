"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PropertyCard } from "@/components/site/PropertyCard";
import { formatPrice, sqftFromDimensions } from "@/lib/format";
import { mapsEmbedUrl, normalizeMapsUrl } from "@/lib/maps";
import {
  FACING_OPTIONS,
  FALLBACK_IMAGE,
  FEATURE_EXAMPLES,
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
  property_type: "agricultural",
  status: "available",
  price: 0,
  area_sqft: null,
  area_acres: null,
  area_cents: null,
  price_per_cent: null,
  dimensions: "",
  site_no: "",
  facing: "",
  negotiable: true,
  location: "",
  city: "Coimbatore",
  locality: "",
  address: "",
  maps_url: "",
  features: [],
  thumbnail: "",
  images: [],
  featured: false,
  expires_at: null,
};

function parseFeatures(text: string): string[] {
  return text
    .split(/[,;\n]+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

function splitDimensions(raw: string): { length: string; width: string } {
  const m = raw.trim().match(/^(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)$/i);
  if (!m) return { length: "", width: "" };
  return { length: m[1], width: m[2] };
}

function fromInitial(initial: Property): PropertyInput {
  return {
    title: initial.title,
    description: initial.description,
    property_type: initial.property_type,
    status: initial.status,
    price: initial.price,
    area_sqft: initial.area_sqft,
    area_acres: initial.area_acres,
    area_cents: initial.area_cents,
    price_per_cent: initial.price_per_cent,
    dimensions: initial.dimensions || "",
    site_no: initial.site_no || "",
    facing: initial.facing || "",
    negotiable: Boolean(initial.negotiable),
    location: initial.location,
    city: initial.city,
    locality: initial.locality,
    address: initial.address || "",
    maps_url: initial.maps_url || "",
    features: initial.features,
    thumbnail: initial.thumbnail || initial.images[0] || "",
    images: initial.images.filter((src) => src !== initial.thumbnail),
    featured: initial.featured,
    expires_at: initial.expires_at,
  };
}

export function PropertyForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyInput>(
    initial ? fromInitial(initial) : empty,
  );
  const initialDims = splitDimensions(initial?.dimensions || "");
  const [dimLength, setDimLength] = useState(initialDims.length);
  const [dimWidth, setDimWidth] = useState(initialDims.width);
  const [featuresText, setFeaturesText] = useState(
    (initial?.features || []).join(", "),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const features = useMemo(() => parseFeatures(featuresText), [featuresText]);
  const embedSrc = useMemo(
    () => mapsEmbedUrl(form.maps_url || ""),
    [form.maps_url],
  );
  const mapsOk = Boolean(normalizeMapsUrl(form.maps_url || ""));

  const dimensionsText =
    dimLength && dimWidth ? `${dimLength} x ${dimWidth}` : "";

  const suggestedTotal =
    form.area_cents && form.price_per_cent
      ? Math.round(Number(form.area_cents) * Number(form.price_per_cent))
      : null;

  const previewProperty: Property = useMemo(() => {
    const thumbnail = form.thumbnail || form.images[0] || FALLBACK_IMAGE;
    const images = form.images.filter((src) => src && src !== thumbnail);
    const locality = form.locality.trim() || "Locality";
    const city = form.city.trim() || "Coimbatore";
    const location =
      form.location.trim() ||
      [form.address.trim(), locality, city].filter(Boolean).join(", ");
    const dims = dimensionsText;
    const sqft = sqftFromDimensions(dims) ?? form.area_sqft;

    return {
      id: initial?.id || "preview",
      title: form.title.trim() || "Property title appears here",
      slug: initial?.slug || "preview",
      description: form.description,
      property_type: form.property_type,
      status: form.status,
      price: Number(form.price) || 0,
      area_sqft: sqft,
      area_acres: form.area_acres,
      area_cents: form.area_cents,
      price_per_cent: form.price_per_cent,
      dimensions: dims,
      site_no: form.site_no.trim(),
      facing: form.facing.trim(),
      negotiable: Boolean(form.negotiable),
      location,
      city,
      locality,
      address: form.address.trim(),
      maps_url: form.maps_url.trim(),
      features,
      thumbnail,
      images,
      featured: Boolean(form.featured),
      created_at: initial?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      expires_at: form.expires_at ?? null,
    };
  }, [
    form,
    features,
    dimensionsText,
    initial?.id,
    initial?.slug,
    initial?.created_at,
  ]);

  function setField<K extends keyof PropertyInput>(
    key: K,
    value: PropertyInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateDimension(nextL: string, nextW: string) {
    setDimLength(nextL);
    setDimWidth(nextW);
    const dims = nextL && nextW ? `${nextL} x ${nextW}` : "";
    const sqft = sqftFromDimensions(dims);
    setForm((prev) => ({
      ...prev,
      dimensions: dims,
      area_sqft: sqft ?? (dims ? prev.area_sqft : prev.area_sqft),
    }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (form.maps_url.trim() && !normalizeMapsUrl(form.maps_url)) {
      setSaving(false);
      setError("Paste a valid Google Maps link.");
      return;
    }

    const dims = dimLength && dimWidth ? `${dimLength} x ${dimWidth}` : "";
    const dimsSqft = sqftFromDimensions(dims);
    const thumbnail = form.thumbnail || form.images[0] || FALLBACK_IMAGE;
    const images = form.images.filter((src) => src !== thumbnail);
    const locality = form.locality.trim();
    const city = form.city.trim() || "Coimbatore";

    const payload: PropertyInput = {
      ...form,
      thumbnail,
      images,
      features,
      city,
      locality,
      address: form.address.trim(),
      maps_url: normalizeMapsUrl(form.maps_url) || form.maps_url.trim(),
      dimensions: dims,
      site_no: form.site_no.trim(),
      facing: form.facing.trim(),
      negotiable: Boolean(form.negotiable),
      area_sqft: form.area_sqft ?? dimsSqft,
      location:
        form.location.trim() ||
        [form.address.trim(), locality, city].filter(Boolean).join(", "),
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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
      <aside className="sticky top-0 z-10 order-1 border-b border-[var(--line)] bg-page pb-3 pt-1 lg:order-2 lg:top-20 lg:self-start lg:border-0 lg:pb-0 lg:pt-0">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Live preview
        </div>
        <div className="mx-auto max-w-[240px] pointer-events-none select-none sm:max-w-[280px]">
          <PropertyCard property={previewProperty} />
        </div>
      </aside>

      <form
        onSubmit={onSubmit}
        className="order-2 space-y-5 bg-white p-4 shadow-sm sm:p-6 lg:order-1"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Title</label>
            <input
              className="input"
              required
              placeholder="4 cent south facing site, Lakshmi Ganapathy Nagar"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Property type</label>
            <select
              className="input"
              value={form.property_type}
              onChange={(e) =>
                setField("property_type", e.target.value as PropertyType)
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
                setField("status", e.target.value as PropertyStatus)
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
            <label className="label">Nagar / village</label>
            <input
              className="input"
              required
              placeholder="Lakshmi Ganapathy Nagar, Bilichi"
              value={form.locality}
              onChange={(e) => setField("locality", e.target.value)}
            />
          </div>

          <div>
            <label className="label">Site no</label>
            <input
              className="input"
              placeholder="Site no 52"
              value={form.site_no}
              onChange={(e) => setField("site_no", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Roads / landmarks</label>
            <textarea
              className="input min-h-20"
              placeholder={"Mettupalayam Road\nOnnipalayam Road"}
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Location line</label>
            <input
              className="input"
              placeholder="Bilichi, Coimbatore"
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Dimensions (ft)</label>
            <div className="flex items-center gap-2">
              <input
                className="input"
                type="number"
                inputMode="decimal"
                placeholder="35"
                value={dimLength}
                onChange={(e) => updateDimension(e.target.value, dimWidth)}
              />
              <span className="shrink-0 text-sm font-semibold text-muted">x</span>
              <input
                className="input"
                type="number"
                inputMode="decimal"
                placeholder="50"
                value={dimWidth}
                onChange={(e) => updateDimension(dimLength, e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">Facing</label>
            <select
              className="input"
              value={form.facing}
              onChange={(e) => setField("facing", e.target.value)}
            >
              <option value="">Select</option>
              {FACING_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Cents</label>
            <input
              className="input"
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="4"
              value={form.area_cents ?? ""}
              onChange={(e) =>
                setField(
                  "area_cents",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>

          <div>
            <label className="label">Sq.ft</label>
            <input
              className="input"
              type="number"
              inputMode="numeric"
              placeholder="1750"
              value={form.area_sqft ?? ""}
              onChange={(e) =>
                setField(
                  "area_sqft",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>

          <div>
            <label className="label">Acres</label>
            <input
              className="input"
              type="number"
              step="0.1"
              inputMode="decimal"
              placeholder="1.5"
              value={form.area_acres ?? ""}
              onChange={(e) =>
                setField(
                  "area_acres",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>

          <div>
            <label className="label">Rate / cent</label>
            <input
              className="input"
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="700000"
              value={form.price_per_cent ?? ""}
              onChange={(e) =>
                setField(
                  "price_per_cent",
                  e.target.value ? Number(e.target.value) : null,
                )
              }
            />
          </div>

          <div>
            <label className="label">Total price</label>
            <input
              className="input"
              type="number"
              required
              min={0}
              inputMode="numeric"
              placeholder="2800000"
              value={form.price || ""}
              onChange={(e) => setField("price", Number(e.target.value))}
            />
            {suggestedTotal != null && suggestedTotal > 0 && (
              <button
                type="button"
                className="mt-1 text-xs font-semibold text-blue"
                onClick={() => setField("price", suggestedTotal)}
              >
                Fill {formatPrice(suggestedTotal)}
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
            <input
              type="checkbox"
              checked={form.negotiable}
              onChange={(e) => setField("negotiable", e.target.checked)}
            />
            Negotiable
          </label>

          <div className="sm:col-span-2">
            <label className="label">Google Maps link</label>
            <input
              className="input"
              type="url"
              inputMode="url"
              placeholder="https://maps.app.goo.gl/..."
              value={form.maps_url}
              onChange={(e) => setField("maps_url", e.target.value)}
            />
            {form.maps_url.trim() && !mapsOk && (
              <p className="mt-1 text-xs text-red-700">Invalid Maps link</p>
            )}
            {embedSrc ? (
              <div className="mt-3 overflow-hidden border border-[var(--line)] bg-white">
                <iframe
                  title="Maps preview"
                  src={embedSrc}
                  className="h-48 w-full sm:h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea
              className="input min-h-28 sm:min-h-32"
              required
              placeholder="Near main road, clear title, DTCP layout…"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Highlights</label>
            <textarea
              className="input min-h-16"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="DTCP Approved, Clear Title, Borewell"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {FEATURE_EXAMPLES.map((example) => {
                const selected = features.includes(example);
                return (
                  <button
                    key={example}
                    type="button"
                    className={`border px-2 py-1 text-[11px] font-medium ${
                      selected
                        ? "border-navy bg-navy text-white"
                        : "border-[var(--line)] bg-white text-ink"
                    }`}
                    onClick={() => {
                      if (selected) {
                        setFeaturesText(
                          parseFeatures(featuresText)
                            .filter((f) => f !== example)
                            .join(", "),
                        );
                      } else {
                        setFeaturesText(
                          [...parseFeatures(featuresText), example].join(", "),
                        );
                      }
                    }}
                  >
                    {example}
                  </button>
                );
              })}
            </div>
          </div>

          <ImageUploader
            thumbnail={form.thumbnail}
            images={form.images}
            onThumbnailChange={(thumbnail) => setField("thumbnail", thumbnail)}
            onImagesChange={(images) => setField("images", images)}
          />

          <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setField("featured", e.target.checked)}
            />
            Featured on homepage
          </label>
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            type="submit"
            className="btn-primary w-full sm:w-auto"
            disabled={saving}
          >
            {saving
              ? "Saving…"
              : mode === "create"
                ? "Add property"
                : "Save changes"}
          </button>
          <button
            type="button"
            className="w-full border border-[var(--line)] px-4 py-2 sm:w-auto"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
