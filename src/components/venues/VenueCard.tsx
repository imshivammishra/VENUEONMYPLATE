"use client";

import Image from "next/image";
import Link from "next/link";
import { formatGuests } from "@/lib/utils";
import Reveal from "../ui/Reveal";

export default function VenueCard({ venue, index = 0 }: { venue: import("@/types").Venue; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 90} scale className="h-full">
      <article className="s-card group flex h-full flex-col overflow-hidden">
        <Link
          href={`/venues/${venue.slug}`}
          className="img-zoom relative block overflow-hidden bg-[#f5f5f7]"
          aria-label={`View ${venue.name}`}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={venue.image}
              alt={venue.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              loading="lazy"
              quality={70}
              className="object-cover"
            />
          </div>
          {venue.priceHint && (
            <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[12px] font-medium text-white backdrop-blur">
              {venue.priceHint}
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col px-6 pt-5 pb-6 text-center">
          <p className="text-[13px] font-semibold text-[#6e6e73]">
            {venue.city} · {venue.type}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[3.35rem] text-[21px] leading-snug font-bold tracking-tight text-[#1d1d1f]">
            <Link href={`/venues/${venue.slug}`}>
              {venue.name}
            </Link>
          </h3>
          <p className="mt-1 text-[14px] text-[#6e6e73]">
            {venue.area} · {formatGuests(venue.capacityMin, venue.capacityMax)}
          </p>
          <div className="mt-auto flex items-center justify-center gap-5 pt-5">
            <Link href={`/venues/${venue.slug}`} className="text-[14px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black">
              Learn more &rsaquo;
            </Link>
            <Link href={`/contact?venue=${venue.slug}`} className="s-btn-dark btn-sheen px-5 py-2 text-[14px]">
              Get quote
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
