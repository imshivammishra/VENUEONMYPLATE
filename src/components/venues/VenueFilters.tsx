"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GUEST_OPTIONS = ["", "Under 100", "100–300", "300–600", "600–1000", "1000+"];

export default function VenueFilters({ cities, types }: { cities: string[]; types: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function set(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}${next.toString() ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  const select =
    "rounded-full border border-black/15 bg-white px-4 py-2 text-[14px] text-[#1d1d1f] transition focus:border-black focus:outline-none focus:ring-4 focus:ring-black/10";

  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filter venues">
      <label className="flex items-center gap-2 text-[14px] text-[#424245]">
        City
        <select
          className={select}
          value={params.get("city") ?? ""}
          onChange={(e) => set("city", e.target.value)}
        >
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-[14px] text-[#424245]">
        Guests
        <select
          className={select}
          value={params.get("guests") ?? ""}
          onChange={(e) => set("guests", e.target.value)}
        >
          {GUEST_OPTIONS.map((g) => (
            <option key={g || "any"} value={g}>{g || "Any size"}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2 text-[14px] text-[#424245]">
        Type
        <select
          className={select}
          value={params.get("type") ?? ""}
          onChange={(e) => set("type", e.target.value)}
        >
          <option value="">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
