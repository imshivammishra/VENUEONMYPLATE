"use client";

import { useState } from "react";
import type { Venue } from "@/types";
import VenueCard from "./VenueCard";
import { cn } from "@/lib/utils";

const TABS: Array<{ key: string; label: string; match: string[] }> = [
  { key: "wedding", label: "Weddings", match: ["Wedding", "Sangeet", "Reception", "Haldi", "Engagement"] },
  { key: "corporate", label: "Corporate", match: ["Corporate event", "Corporate offsite"] },
  { key: "private", label: "Private Parties", match: ["Birthday / Anniversary", "Reception", "Cocktail", "Engagement"] },
  { key: "destination", label: "Destination", match: ["Wedding", "Haldi"] },
] as const;

export default function HomeTabs({ venues }: { venues: Venue[] }) {
  const [active, setActive] = useState<string>("wedding");
  const tab = TABS.find((t) => t.key === active)!;
  const list = venues
    .filter((v) => v.eventTypes.some((e) => tab.match.includes(e)))
    .slice(0, 4);
  const fallback = (list.length > 0 ? list : venues).slice(0, 4);

  return (
    <div>
      {/* Samsung tab pills */}
      <div className="no-scrollbar mt-8 flex justify-start gap-2 overflow-x-auto md:justify-center">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
            className={cn(
              "rounded-full px-6 py-2 text-[14px] whitespace-nowrap transition",
              active === t.key ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {fallback.map((v) => (
          <VenueCard key={v.slug} venue={v} />
        ))}
      </div>
    </div>
  );
}
