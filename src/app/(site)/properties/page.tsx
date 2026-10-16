import { Suspense } from "react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyFilters } from "@/components/site/PropertyFilters";
import { listProperties } from "@/lib/listings/store";
import type { PropertyType } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Properties",
};

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "all";
  const q = typeof params.q === "string" ? params.q.toLowerCase() : "";

  let listings = await listProperties();
  if (type !== "all") {
    listings = listings.filter((p) => p.property_type === (type as PropertyType));
  }
  if (q) {
    listings = listings.filter((p) =>
      [p.title, p.location, p.locality, p.description]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="site-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">
          Browse inventory
        </p>
        <h1 className="display mt-3 text-4xl text-ink md:text-5xl">
          Properties for sale
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Residential plots, agricultural land, industrial sites, and
          ready-to-move homes across Coimbatore. Stock listings for demo —
          replace anytime from the agent dashboard.
        </p>

        <div className="mt-8">
          <Suspense fallback={<div className="h-24 bg-white/60" />}>
            <PropertyFilters />
          </Suspense>
        </div>

        <div className="mt-6 text-sm text-ink/55">
          {listings.length} propert{listings.length === 1 ? "y" : "ies"} found
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="mt-10 border border-dashed border-[var(--line)] bg-white/70 p-10 text-center text-ink/60">
            No properties match this filter. Try another locality or type.
          </div>
        )}
      </div>
    </div>
  );
}
