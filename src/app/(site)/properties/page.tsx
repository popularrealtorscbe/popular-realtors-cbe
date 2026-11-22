import { Suspense } from "react";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyFilters } from "@/components/site/PropertyFilters";
import { Reveal } from "@/components/site/Reveal";
import { listProperties } from "@/lib/listings/store";
import type { PropertyType } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Properties — Buying & Selling at Best Prices",
  description:
    "Land, plots and sites listed by Popular Realtors Coimbatore. Buying & selling at best prices.",
};

export default async function PropertiesPage({
  searchParams,
}: PageProps<"/properties">) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : "all";
  const q = typeof params.q === "string" ? params.q.toLowerCase() : "";

  let listings = await listProperties();
  if (type !== "all") {
    listings = listings.filter(
      (p) => p.property_type === (type as PropertyType),
    );
  }
  if (q) {
    listings = listings.filter((p) =>
      [p.title, p.location, p.locality, p.description, p.site_no, p.address]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }

  return (
    <div className="bg-page pb-16 pt-10 md:pt-12">
      <div className="site-shell">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Buy & sell
          </p>
          <h1 className="display mt-2 text-3xl text-navy md:text-5xl">
            Land, plots and sites in Coimbatore
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Agri land and sites we are brokering. Best-price focus. If anything
            is unclear, call us.
          </p>
        </Reveal>

        <div className="mt-6">
          <Suspense fallback={<div className="h-16 bg-white" />}>
            <PropertyFilters />
          </Suspense>
        </div>

        <div className="mt-5 text-sm text-muted">
          {listings.length} listing{listings.length === 1 ? "" : "s"}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {listings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {listings.length === 0 && (
          <div className="mt-8 border border-dashed border-line bg-white px-6 py-12 text-center text-muted">
            No matches. Try another locality, or call the agent with your
            requirement.
          </div>
        )}
      </div>
    </div>
  );
}
