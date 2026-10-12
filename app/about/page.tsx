import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import VideoCard from "@/components/VideoCard";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About — curated venues, honest guidance",
  description:
    "Venue On My Plate is a curated venue discovery platform for weddings and celebrations across India. Learn how we shortlist venues and help you decide.",
  path: "/about",
});

const VALUES = [
  ["Curated, not listed", "Fewer venues, each vetted for capacity, access, food and guest comfort."],
  ["Trade-offs, stated", "Every shortlist explains what you gain and what you give up — season, distance, cost."],
  ["You decide", "We coordinate visits and quotes. Nothing is booked without your written approval."],
] as Array<[string, string]>;

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="s-eyebrow text-[#6e6e73]">Our story</p>
            <h1 className="s-headline font-display mt-4 text-4xl leading-tight text-balance text-[#1d1d1f] md:text-5xl">
              A calmer way to find your venue.
            </h1>
            <div aria-hidden="true" className="lux-divider mt-6 w-40" />
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#424245] md:text-base">
              Venue On My Plate began with a simple frustration: beautiful venues, scattered
              information, and quotes that arrive too late. We visit venues, verify capacity and
              logistics, and present honest trade-offs — so you decide with confidence.
            </p>
          </Reveal>
          <Reveal delay={120} scale className="relative">
            <div className="gold-frame relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f5f5f7]">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1400&auto=format&fit=crop"
                alt="Newlywed send-off with sparklers"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="kenburns object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-2xl border border-black/10 bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
              <p className="text-[13px] font-semibold text-[#6e6e73]">
                Visited &amp; verified
              </p>
              <p className="font-display mt-0.5 text-lg text-[#1d1d1f]">Honest shortlists, always</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-16 overflow-hidden rounded-3xl bg-black">
            <dl className="grid gap-px sm:grid-cols-3">
              {SITE.stats.map(([num, label]) => (
                <div key={label} className="flex flex-col px-8 py-10 text-center">
                  <dt className="order-2 mt-2 block text-[13px] font-medium text-white/60">
                    {label}
                  </dt>
                  <dd className="font-display order-1 text-4xl font-semibold text-white md:text-5xl">
                    {num}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal scale>
            <VideoCard
              src="https://videos.pexels.com/video-files/35222217/14921664_960_540_50fps.mp4"
              caption="Floral details, verified in person"
            />
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title="Principles before properties."
              copy="Every recommendation is measured against the same three promises."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 3) * 90}>
                <div className="s-card h-full p-8">
                  <h2 className="font-display text-2xl text-[#1d1d1f]">{t}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#424245]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CTASection title="Meet us over your requirements." copy="Two minutes of details — one business day to a shortlist." />
      </div>
    </div>
  );
}
