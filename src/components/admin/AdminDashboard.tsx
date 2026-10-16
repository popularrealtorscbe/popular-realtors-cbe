"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice, propertyTypeLabel } from "@/lib/format";
import type { Property } from "@/lib/types";

export function AdminDashboard({
  listings,
  backend,
}: {
  listings: Property[];
  backend: string;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function markSold(id: string) {
    setBusyId(id);
    await fetch(`/api/listings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "sold" }),
    });
    setBusyId(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this listing permanently?")) return;
    setBusyId(id);
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    setBusyId(null);
    router.refresh();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const available = listings.filter((l) => l.status === "available").length;
  const sold = listings.filter((l) => l.status === "sold").length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
            Agent control panel
          </p>
          <h1 className="display mt-2 text-4xl text-ink">Dashboard</h1>
          <p className="mt-2 text-ink/65">
            Add, edit, or remove listings. Sold properties leave the public site
            immediately. Backend: <strong>{backend}</strong>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/properties/new" className="btn-primary">
            Add property
          </Link>
          <Link
            href="/properties"
            className="border border-[var(--line)] bg-white px-4 py-2 font-medium"
          >
            View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="border border-[var(--line)] bg-white px-4 py-2 font-medium"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total listings", value: listings.length },
          { label: "Available", value: available },
          { label: "Sold / hidden", value: sold },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 shadow-sm">
            <div className="text-xs uppercase tracking-[0.16em] text-ink/45">
              {stat.label}
            </div>
            <div className="display mt-2 text-4xl text-forest">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden bg-white shadow-sm">
        <div className="border-b border-[var(--line)] px-5 py-4 font-semibold">
          All properties
        </div>
        <div className="divide-y divide-[var(--line)]">
          {listings.map((property) => (
            <div
              key={property.id}
              className="flex flex-col gap-4 p-4 md:flex-row md:items-center"
            >
              <div className="relative h-20 w-full shrink-0 overflow-hidden md:w-28">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-ink">{property.title}</div>
                <div className="mt-1 text-sm text-ink/60">
                  {propertyTypeLabel(property.property_type)} ·{" "}
                  {property.location} · {formatPrice(property.price)}
                </div>
                <div className="mt-2 inline-flex bg-mist px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-forest">
                  {property.status}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/properties/${property.id}/edit`}
                  className="border border-[var(--line)] px-3 py-1.5 text-sm font-medium"
                >
                  Edit
                </Link>
                {property.status !== "sold" && (
                  <button
                    type="button"
                    disabled={busyId === property.id}
                    onClick={() => markSold(property.id)}
                    className="border border-copper/40 px-3 py-1.5 text-sm font-medium text-copper-deep"
                  >
                    Mark sold
                  </button>
                )}
                <button
                  type="button"
                  disabled={busyId === property.id}
                  onClick={() => remove(property.id)}
                  className="border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {listings.length === 0 && (
            <div className="p-8 text-center text-ink/60">
              No listings yet. Add your first property.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
