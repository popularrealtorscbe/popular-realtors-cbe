"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  PROPERTY_TYPE_LABELS,
  PUBLIC_PROPERTY_TYPES,
  type PropertyType,
} from "@/lib/types";

const types = PUBLIC_PROPERTY_TYPES.map(
  (value) => [value, PROPERTY_TYPE_LABELS[value]] as [PropertyType, string],
);

export function PropertyFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const activeType = params.get("type") || "all";
  const [query, setQuery] = useState(params.get("q") || "");

  function push(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") sp.delete(key);
      else sp.set(key, value);
    });
    router.push(`/properties?${sp.toString()}`);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    push({ q: query.trim(), type: activeType });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 border border-line bg-white p-3 sm:grid-cols-[minmax(0,1fr)_13rem_auto] sm:items-center"
    >
      <div className="relative min-w-0 overflow-hidden">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
        <input
          className="input input-with-icon"
          placeholder="Perur, Bilichi, site no…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search locality or site"
        />
      </div>
      <select
        className="h-[2.85rem] w-full min-w-0 border border-[#d2d6dc] bg-white px-3 text-sm outline-none transition focus:border-[var(--blue)] focus:shadow-[0_0_0_3px_rgba(26,95,158,0.12)]"
        value={activeType}
        onChange={(e) => push({ type: e.target.value, q: query.trim() })}
        aria-label="Property type"
      >
        <option value="all">All types</option>
        {types.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button type="submit" className="btn-primary w-full sm:w-auto sm:shrink-0">
        Search
      </button>
    </form>
  );
}
