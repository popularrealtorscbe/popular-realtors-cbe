"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PROPERTY_TYPE_LABELS, type PropertyType } from "@/lib/types";

const types = Object.entries(PROPERTY_TYPE_LABELS) as [PropertyType, string][];

export function PropertyFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const activeType = params.get("type") || "all";
  const query = params.get("q") || "";

  function update(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") sp.delete(key);
      else sp.set(key, value);
    });
    router.push(`/properties?${sp.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 border border-[var(--line)] bg-white/80 p-4 backdrop-blur md:flex-row md:items-end">
      <div className="flex-1">
        <label className="label" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          className="input"
          placeholder="Locality, plot, farmland…"
          defaultValue={query}
          onChange={(e) => update({ q: e.target.value })}
        />
      </div>
      <div className="md:w-64">
        <label className="label" htmlFor="type">
          Property type
        </label>
        <select
          id="type"
          className="input"
          value={activeType}
          onChange={(e) => update({ type: e.target.value })}
        >
          <option value="all">All types</option>
          {types.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
