import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import VideoCard from "@/components/home/VideoCard";
import { getContentBlocks } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "About — curated venues, honest guidance",
  description:
    "Venue On My Plate is a curated venue discovery platform for weddings and celebrations across India. Learn how we shortlist venues and help you decide.",
  path: "/about",
});

const FALLBACK_VALUES: Array<[string, string]> = [
  ["Curated, not listed", "Fewer venues, each vetted for capacity, access, food and guest comfort."],
  ["Trade-offs, stated", "Every shortlist explains what you gain and what you give up — season, distance, cost."],
  ["You decide", "We coordinate visits and quotes. Nothing is booked without your written approval."],
];

const FALLBACK_STATS: Array<{ value: string; label: string }> = [
  { value: "Venue-only", label: "No decor or catering commissions" },
  { value: "Human", label: "Assisted follow-up" },
  { value: "Private", label: "Quote-led proposals" },
];

function metaString(meta: Record<string, unknown> | undefined, key: string, fallback: string) {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function metaStats(meta: Record<string, unknown> | undefined, fallback: typeof FALLBACK_STATS) {
  if (!Array.isArray(meta?.stats)) return fallback;
  const rows = meta.stats
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({ value: typeof item.value === "string" ? item.value : "", label: typeof item.label === "string" ? item.label : "" }))
    .filter((item) => item.value || item.label);
  return rows.length > 0 ? rows : fallback;
}

function filmPlacement(block: ContentBlock) {
  return typeof block.meta?.placement === "string" ? block.meta.placement : "grid";
}

export default async function AboutPage() {
  const content = await getContentBlocks();
  const aboutBlock = content.find((block) => block.section === "about");
  const featureBlocks = content.filter((block) => block.section === "feature");
  const filmBlocks = content.filter((block) => block.section === "film");
  const band = filmBlocks.find((block) => filmPlacement(block) === "band") || filmBlocks[0];

  const hero = {
    eyebrow: aboutBlock?.subtitle || "Our story",
    title: aboutBlock?.title || "A calmer way to find your venue.",
    body:
      aboutBlock?.body ||
      "Venue On My Plate began with a simple frustration: beautiful venues, scattered information, and quotes that arrive too late. We visit venues, verify capacity and logistics, and present honest trade-offs — so you decide with confidence.",
    image:
      aboutBlock?.image?.startsWith("/")
        ? aboutBlock.image
        : "/images/wedding-decor.jpg",
    alt: aboutBlock?.imageAlt || "Wedding reception decor with florals and warm lighting",
    badge: metaString(aboutBlock?.meta, "badge", "Private, quote-led shortlists"),
    stats: metaStats(aboutBlock?.meta, FALLBACK_STATS),
  };

  const values = featureBlocks.length
    ? featureBlocks.map((block) => [block.title, block.body] as [string, string])
    : FALLBACK_VALUES;

  const film = {
    src:
      band?.image?.startsWith("/") && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(band.image)
        ? band.image
        : "/images/indian-ceremony.jpg",
    caption: band?.title || "Floral details, verified in person",
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="s-eyebrow text-[#6e6e73]">{hero.eyebrow}</p>
            <h1 className="s-headline font-display mt-4 text-4xl leading-tight text-balance text-[#1d1d1f] md:text-5xl">
              {hero.title}
            </h1>
            <div aria-hidden="true" className="lux-divider mt-6 w-40" />
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed whitespace-pre-line text-[#424245] md:text-base">
              {hero.body}
            </p>
          </Reveal>
          <Reveal delay={120} scale className="relative">
            <div className="gold-frame relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#f5f5f7]">
              <Image
                src={hero.image}
                alt={hero.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="kenburns object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-2xl border border-black/10 bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
              <p className="text-[13px] font-semibold text-[#6e6e73]">Visited &amp; verified</p>
              <p className="font-display mt-0.5 text-lg text-[#1d1d1f]">{hero.badge}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-16 overflow-hidden rounded-3xl bg-black">
            <dl className="grid gap-px sm:grid-cols-3">
              {hero.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="flex flex-col px-8 py-10 text-center">
                  <dt className="order-2 mt-2 block text-[13px] font-medium text-white/60">{stat.label}</dt>
                  <dd className="font-display order-1 text-4xl font-semibold text-white md:text-5xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal scale>
            <VideoCard src={film.src} caption={film.caption} />
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
            {values.map(([title, copy], index) => (
              <Reveal key={`${title}-${index}`} delay={(index % 3) * 90}>
                <div className="s-card h-full p-8">
                  <h2 className="font-display text-2xl text-[#1d1d1f]">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#424245]">{copy}</p>
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
