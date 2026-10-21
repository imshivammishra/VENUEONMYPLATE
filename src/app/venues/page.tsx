import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VenueFilters from "@/components/venues/VenueFilters";
import VenueGrid from "@/components/venues/VenueGrid";
import { getVenues } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Explore wedding & celebration venues across India",
  description:
    "Browse curated palaces, resorts, lawns, hotels and banquets across Udaipur, Jaipur, Goa, Delhi NCR, Mumbai and Bangalore. Filter by city, size and type.",
  path: "/venues",
});

function matchesGuests(venueMax: number, band: string | null): boolean {
  if (!band) return true;
  if (band === "Under 100") return venueMax >= 50;
  if (band === "100–300") return venueMax >= 100;
  if (band === "300–600") return venueMax >= 300;
  if (band === "600–1000") return venueMax >= 600;
  if (band === "1000+") return venueMax >= 1000;
  return true;
}

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const venues = await getVenues();
  const city = params.city?.trim() || null;
  const guests = params.guests?.trim() || null;
  const type = params.type?.trim() || null;
  const event = params.event?.trim() || null;

  const filtered = venues.filter(
    (v) =>
      (!city || v.city.toLowerCase() === city.toLowerCase()) &&
      (!type || v.type === type) &&
      (!event || v.eventTypes.some((e) => e.toLowerCase().includes(event.toLowerCase().split(" ")[0]))) &&
      matchesGuests(v.capacityMax, guests)
  );

  const cities = [...new Set(venues.map((v) => v.city))];
  const summary =
    filtered.length > 0
      ? `${filtered.length} ${filtered.length === 1 ? "venue" : "venues"}${city ? ` in ${city}` : " across India"} — every one visited or vetted by our team.`
      : venues.length === 0
        ? "Every property is visited or vetted before it appears here. Share your brief and we will send a private shortlist of real venues."
        : "No venues match these filters yet. Widen the city or guest count — or ask us for a personal shortlist.";

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
          <Reveal>
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Venues" }]} />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-6">
              <SectionHeading
                eyebrow="Directory"
                title="Venues, curated."
                copy={summary}
              />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 rounded-[18px] bg-[#f5f5f7] px-5 py-5 md:px-7 md:py-6">
              <Suspense fallback={<p className="text-sm text-[#6e6e73]">Loading filters…</p>}>
                <VenueFilters cities={cities} />
              </Suspense>
            </div>
          </Reveal>
          <div aria-hidden="true" className="mt-10 border-t border-black/10" />
          <Reveal delay={100}>
            <div className="py-10">
              <VenueGrid venues={filtered} />
            </div>
          </Reveal>
        </div>
      </div>
      <CTASection
        title="Can't find the one?"
        copy="Share your date and guest count — we will send a personal shortlist within one business day."
      />
    </>
  );
}
