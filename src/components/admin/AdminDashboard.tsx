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
  const [error, setError] = useState("");

  async function markSold(id: string) {
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ status: "sold" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not mark sold");
      }
    } catch {
      setError("Network error while updating.");
    }
    setBusyId(null);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this listing permanently?")) return;
    setBusyId(id);
    setError("");
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not delete");
      }
    } catch {
      setError("Network error while deleting.");
    }
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
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Agent control panel
          </p>
          <h1 className="display mt-2 text-3xl text-ink sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Add, edit, or remove listings on phone or desktop. Sold properties
            leave the public site immediately. Backend:{" "}
            <strong>{backend}</strong>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Link
            href="/admin/properties/new"
            className="btn-primary col-span-2 justify-center sm:col-span-1"
          >
            Add property
          </Link>
          <Link
            href="/properties"
            className="border border-[var(--line)] bg-white px-4 py-2 text-center text-sm font-medium"
          >
            View website
          </Link>
          <button
            type="button"
            onClick={logout}
            className="border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium"
          >
            Log out
          </button>
        </div>
      </div>

      {error && (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "Total", value: listings.length },
          { label: "Available", value: available },
          { label: "Sold", value: sold },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-3 shadow-sm sm:p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.16em]">
              {stat.label}
            </div>
            <div className="display mt-1 text-2xl text-navy sm:mt-2 sm:text-4xl">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden bg-white shadow-sm">
        <div className="border-b border-[var(--line)] px-4 py-3 font-semibold sm:px-5 sm:py-4">
          All properties
        </div>
        <div className="divide-y divide-[var(--line)]">
          {listings.map((property) => {
            const thumb = property.thumbnail || property.images[0] || "";
            return (
              <div
                key={property.id}
                className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:flex-row md:items-center"
              >
                <div className="relative h-36 w-full shrink-0 overflow-hidden sm:h-24 md:h-20 md:w-28">
                  <Image
                    src={thumb || "/listings/placeholder-property.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 112px"
                    unoptimized={
                      thumb.startsWith("/uploads/") ||
                      thumb.startsWith("/listings/")
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink">{property.title}</div>
                  <div className="mt-1 text-sm text-ink/60">
                    {propertyTypeLabel(property.property_type)} ·{" "}
                    {property.location} · {formatPrice(property.price)}
                  </div>
                  <div className="mt-2 inline-flex bg-page px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-navy">
                    {property.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <Link
                    href={`/admin/properties/${property.id}/edit`}
                    className="border border-[var(--line)] px-3 py-2 text-center text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/properties/${property.slug || property.id}`}
                    className="border border-[var(--line)] px-3 py-2 text-center text-sm font-medium"
                  >
                    View
                  </Link>
                  {property.status !== "sold" && (
                    <button
                      type="button"
                      disabled={busyId === property.id}
                      onClick={() => markSold(property.id)}
                      className="border border-copper/40 px-3 py-2 text-sm font-medium text-blue-deep"
                    >
                      Mark sold
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={busyId === property.id}
                    onClick={() => remove(property.id)}
                    className="border border-red-200 px-3 py-2 text-sm font-medium text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
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
