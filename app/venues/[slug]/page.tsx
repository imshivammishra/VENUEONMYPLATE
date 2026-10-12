import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import EnquiryForm from "@/components/EnquiryForm";
import FAQ from "@/components/FAQ";
import FloatingEnquire from "@/components/FloatingEnquire";
import Reveal from "@/components/Reveal";
import VenueGrid from "@/components/VenueGrid";
import { getVenueBySlug, getVenues } from "@/lib/api";
import { absoluteUrl } from "@/lib/utils";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { formatGuests } from "@/lib/utils";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: "Venue not found" };
  return buildMetadata({
    title: `${venue.name} — ${venue.city} wedding & event venue`,
    description: `${venue.name} in ${venue.area}, ${venue.city}. ${venue.shortDescription} Capacity ${venue.capacityMin}–${venue.capacityMax} guests. Request a proposal.`,
    path: `/venues/${venue.slug}`,
    image: venue.image.startsWith("http") ? venue.image : absoluteUrl("/images/og-cover.jpg"),
  });
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) notFound();

  const all = await getVenues();
  const similar = all.filter((v) => v.slug !== venue.slug && v.citySlug === venue.citySlug).slice(0, 3);
  const fallbackSimilar = similar.length > 0 ? similar : all.filter((v) => v.slug !== venue.slug).slice(0, 3);

  const faqs = [
    {
      question: `What is the capacity of ${venue.name}?`,
      answer: `${venue.name} comfortably hosts ${venue.capacityMin} to ${venue.capacityMax} guests, depending on layout and season. Share your guest count and we will confirm the right configuration.`,
    },
    {
      question: "How do I check availability and pricing?",
      answer:
        "Send an enquiry with your date and guest count. The venue team responds with availability, a detailed quote and what the advance locks — dates, spaces and rooms.",
    },
    {
      question: "Can I visit before deciding?",
      answer:
        "Yes — we coordinate site visits on working days and weekends. Visits are most useful when you carry your function flow (haldi, sangeet, pheras) and a rough guest count.",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
          <Reveal>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Venues", href: "/venues" },
                { name: venue.name },
              ]}
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="text-[15px] font-semibold text-[#6e6e73]">
                  {venue.city} · {venue.type}
                </p>
                <h1 className="font-display mt-4 text-4xl leading-tight text-[#1d1d1f] md:text-6xl">
                  {venue.name}
                </h1>
                <p className="mt-3 text-[#424245]">
                  {venue.area}, {venue.city} · {formatGuests(venue.capacityMin, venue.capacityMax)} ·{" "}
                  {venue.setting}
                </p>
              </div>
              <div className="md:justify-self-end">
                <a
                  href="#enquire"
                  className="s-btn-dark btn-sheen inline-block px-8 py-4"
                >
                  Request a proposal
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200} scale>
            <div className="img-zoom relative mt-8 aspect-[16/9] overflow-hidden rounded-[18px] bg-[#f5f5f7] ring-1 ring-black/5">
              <Image
                src={venue.image}
                alt={venue.imageAlt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="kenburns object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="float-slow absolute bottom-4 left-4 rounded-full bg-white/85 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-[#1d1d1f] shadow-lg ring-1 ring-black/5 backdrop-blur-md md:bottom-6 md:left-6">
                {venue.priceHint ?? venue.type} · {venue.city}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-[1.5fr_1fr]">
            <div>
              <Reveal>
                <h2 className="font-display text-3xl text-[#1d1d1f]">Overview</h2>
                <p className="mt-4 leading-relaxed text-[#424245]">
                  {venue.shortDescription} The estate works across {venue.setting.toLowerCase()}{" "}
                  settings and suits {venue.eventTypes.join(", ").toLowerCase()} particularly well.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-8 grid gap-px overflow-hidden rounded-[18px] bg-[#e8e8ed] ring-1 ring-[#e8e8ed] sm:grid-cols-3">
                  {[
                    ["Capacity", formatGuests(venue.capacityMin, venue.capacityMax)],
                    ["Setting", venue.setting],
                    ["Guide price", venue.priceHint ?? "On request"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-white p-5">
                      <p className="text-sm font-medium text-[#6e6e73]">{k}</p>
                      <p className="mt-1 text-lg font-bold text-[#1d1d1f]">{v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-display mt-10 text-3xl text-[#1d1d1f]">Suited for</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {venue.eventTypes.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#424245] transition-colors hover:border-black/20 hover:text-[#1d1d1f]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-display mt-10 text-3xl text-[#1d1d1f]">Amenities</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {venue.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-sm text-[#424245]">
                      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#86868b]" /> {a}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-display mt-10 text-3xl text-[#1d1d1f]">Food & catering</h2>
                <p className="mt-4 text-sm leading-relaxed text-[#424245]">
                  Catering is handled in-house or through the venue&apos;s preferred partners, with
                  tastings arranged before you confirm. Dietary formats — Jain, sattvik, continental —
                  are planned per function, not per venue default. Confirm kitchen placement and
                  service staff ratios in your written quote.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <h2 className="font-display mt-10 text-3xl text-[#1d1d1f]">Questions, answered</h2>
                <div className="mt-4">
                  <FAQ faqs={faqs} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="md:sticky md:top-28 md:self-start">
              <aside aria-label="Enquiry">
                <div id="enquire" className="scroll-mt-32 overflow-hidden rounded-[18px] bg-white shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <div aria-hidden="true" className="h-1 rounded-t-[18px] bg-black" />
                  <div className="p-6 md:p-8">
                    <p className="text-[15px] font-semibold text-[#6e6e73]">Enquire now</p>
                    <p className="font-display mt-2 text-2xl text-[#1d1d1f]">
                      Check availability for {venue.name}
                    </p>
                    <div className="mt-6">
                      <Suspense fallback={<p className="text-sm text-[#6e6e73]">Loading form…</p>}>
                        <EnquiryForm venueName={venue.name} />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <section aria-labelledby="similar-heading" className="py-16 md:py-20">
              <div aria-hidden="true" className="mb-10 border-t border-black/10" />
              <div className="flex items-end justify-between gap-6">
                <h2 id="similar-heading" className="font-display text-3xl text-[#1d1d1f] md:text-4xl">
                  Similar venues
                </h2>
                <Link href="/venues" className="s-link hidden text-sm sm:block">
                  All venues ›
                </Link>
              </div>
              <div className="mt-8">
                <VenueGrid venues={fallbackSimilar} />
              </div>
            </section>
          </Reveal>
        </div>
      </div>

      <CTASection
        title={`Planning at ${venue.name}?`}
        copy="Send one enquiry — we will confirm availability, gather quotes and line up your visit."
        primaryHref="#enquire"
        primaryLabel="Enquire now"
      />
      <div aria-hidden="true" className="h-16 md:hidden" />
      <FloatingEnquire venueName={venue.name} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Venues", path: "/venues" },
              { name: venue.name, path: `/venues/${venue.slug}` },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "Place",
              name: venue.name,
              address: { "@type": "PostalAddress", addressLocality: venue.city, addressRegion: "IN" },
              image: venue.image,
              description: venue.shortDescription,
            },
          ]),
        }}
      />
    </>
  );
}
