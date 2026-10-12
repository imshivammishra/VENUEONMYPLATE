import type { Venue } from "@/types";
import VenueCard from "./VenueCard";
import Reveal from "../ui/Reveal";

export default function VenueGrid({ venues }: { venues: Venue[] }) {
  if (venues.length === 0) {
    return (
      <Reveal scale>
        <div className="rounded-[18px] bg-[#f5f5f7] px-6 py-16 text-center">
          <p className="text-[28px] font-bold tracking-tight text-[#1d1d1f]">No venues match those filters yet.</p>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#424245]">
            Try widening the city or guest count — or tell us what you need and we will curate
            options for you personally.
          </p>
          <a
            href="/contact"
            className="s-btn-dark btn-sheen mt-6 inline-block px-6 py-2.5 text-[15px]"
          >
            Request a shortlist
          </a>
        </div>
      </Reveal>
    );
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {venues.map((v, i) => (
        <VenueCard key={v.slug} venue={v} index={i} />
      ))}
    </div>
  );
}
