/** Extract a usable Google Maps URL, or empty if invalid. */
export function normalizeMapsUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");
    if (
      host === "maps.google.com" ||
      host === "google.com" ||
      host.endsWith(".google.com") ||
      host === "goo.gl" ||
      host === "maps.app.goo.gl"
    ) {
      return trimmed;
    }
  } catch {
    return "";
  }
  return "";
}

export function isMapsUrl(value: string): boolean {
  return Boolean(normalizeMapsUrl(value));
}

/** Embed URL for iframe preview when possible. */
export function mapsEmbedUrl(mapsUrl: string): string | null {
  const normalized = normalizeMapsUrl(mapsUrl);
  if (!normalized) return null;

  try {
    const url = new URL(normalized);
    // Already an embed link
    if (url.pathname.includes("/embed")) return normalized;

    // maps.app.goo.gl short links — open in new tab; iframe may not work
    if (url.hostname.includes("goo.gl")) return null;

    const q =
      url.searchParams.get("q") ||
      url.searchParams.get("query") ||
      url.pathname.replace(/^\/maps\/place\//, "").split("/")[0];

    if (q) {
      return `https://www.google.com/maps?q=${encodeURIComponent(decodeURIComponent(q))}&output=embed`;
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(normalized)}&output=embed`;
  } catch {
    return null;
  }
}
