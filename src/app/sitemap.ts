import type { MetadataRoute } from "next";
import { listProperties } from "@/lib/listings/store";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE.siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.siteUrl}/properties`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE.siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let listingPages: MetadataRoute.Sitemap = [];
  try {
    const listings = await listProperties();
    listingPages = listings.map((property) => ({
      url: `${SITE.siteUrl}/properties/${property.slug || property.id}`,
      lastModified: property.updated_at
        ? new Date(property.updated_at)
        : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    listingPages = [];
  }

  return [...staticPages, ...listingPages];
}
