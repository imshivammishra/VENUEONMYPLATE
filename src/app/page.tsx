import Image from "next/image";
import Link from "next/link";
import {
  BadgePercent,
  Building2,
  Castle,
  Landmark,
  Palmtree,
  PhoneCall,
  Sparkles,
  Star,
  TentTree,
  Users,
  type LucideIcon,
} from "lucide-react";
import BlogCard from "@/components/venues/BlogCard";
import CTASection from "@/components/home/CTASection";
import CityCard from "@/components/venues/CityCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FAQ from "@/components/forms/FAQ";
import Hero, { type HeroSlide } from "@/components/home/Hero";
import HomeTabs from "@/components/home/HomeTabs";
import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/home/VideoCard";
import CinematicBand from "@/components/home/CinematicBand";
import SectionHeading, { SectionLink } from "@/components/home/SectionHeading";
import { getBlogs, getCities, getContentBlocks, getReviews, getVenues } from "@/lib/api";
import { generalFaqs } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";
import type { ContentBlock, Faq } from "@/types";

const TICKER = [
  "Mehendi",
  "Haldi",
  "Sangeet",
  "Saat Pheras",
  "Reception",
  "Baraat",
  "Udaipur",
  "Jaipur",
  "Jodhpur",
  "Goa",
];

const GALLERY = [
  {
    src: "/images/indian-ceremony.jpg",
    alt: "Indian wedding ceremony with warm floral details",
    mood: "Grand celebrations",
  },
  {
    src: "/images/udaipur-palace2.jpg",
    alt: "Udaipur palace architecture reflected in the lake",
    mood: "Palace weddings",
  },
  {
    src: "/images/wedding-decor.jpg",
    alt: "Wedding decor with florals and warm lighting",
    mood: "Floral tablescapes",
  },
  {
    src: "/images/wedding-dance.jpg",
    alt: "Family celebrating together at an Indian wedding",
    mood: "Open-air mandaps",
  },
];

const CATEGORIES: Category[] = [
  { icon: Castle, t: "Palaces & heritage", d: "Royal palaces and heritage properties for weddings and receptions.", href: "/venues?event=Wedding" },
  { icon: Palmtree, t: "Resorts & lawns", d: "Green resorts, farmhouses and open lawns for haldi, sangeet and pheras.", href: "/venues" },
  { icon: Landmark, t: "Banquets & ballrooms", d: "Premium indoor halls for receptions, anniversaries and large guest lists.", href: "/venues" },
  { icon: TentTree, t: "Beach & destination", d: "Goa, Udaipur, Jaipur and beyond — venues worth travelling for.", href: "/cities" },
  { icon: Building2, t: "Corporate venues", d: "Conferences, offsites and annual days with rooms, AV and banquets.", href: "/venues?event=Corporate event" },
  { icon: Users, t: "Private party venues", d: "Birthdays, anniversaries and intimate gatherings at verified venues.", href: "/venues?event=Birthday / Anniversary" },
];

const FEATURES: Feature[] = [
  { icon: BadgePercent, t: "Exclusive pricing", d: "Get a private quote-led proposal shaped around date, guest count, rooms, menu preferences, and service level." },
  { icon: Sparkles, t: "Expert insights", d: "Compare venue flow, ceremony zones, guest arrival, privacy, hospitality depth, and visit questions before you go." },
  { icon: PhoneCall, t: "Discreet follow-up", d: "Your enquiry stays request-led. Our team follows up by call to refine fit, options, and next steps." },
];

const STEPS = [
  ["01", "Share your celebration brief", "Tell us your event city, date, guest count, venue mood, room needs, food preferences, and family priorities."],
  ["02", "Receive a bespoke proposal", "Our team shortlists venues that match ambience, logistics, privacy, and hospitality expectations."],
  ["03", "Confirm next steps by call", "Plan visits, compare private quote options, and continue with a human-assisted enquiry."],
];

const FILMS = [
  { src: "/videos/hero-bg.mp4", poster: "/images/indian-ceremony.jpg", startAt: 0, caption: "Haldi mornings" },
  { src: "/videos/hero-bg.mp4", poster: "/images/wedding-decor.jpg", startAt: 7, caption: "Floral details" },
  { src: "/videos/hero-bg.mp4", poster: "/images/wedding-decor.jpg", startAt: 14, caption: "First looks" },
  { src: "/videos/hero-bg.mp4", poster: "/images/wedding-dance.jpg", startAt: 21, caption: "Aisle walks" },
];

const HERO_VIDEO = "/videos/hero-bg.mp4";
const HERO_POSTER = "/images/hero-poster.jpg";

function localMedia(src: string | undefined, fallback: string) {
  return src && src.startsWith("/") ? src : fallback;
}

function localVideo(src: string | undefined) {
  return src && src.startsWith("/") && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src) ? src : HERO_VIDEO;
}

const HEADING_FALLBACKS: Record<string, Heading> = {
  highlights: {
    eyebrow: "This season's highlights",
    title: "Every celebration starts with the right venue",
    copy: "Switch by occasion — the same private, quote-led discovery behind every option.",
  },
  about: {
    eyebrow: "About us",
    title: "Luxury venue access shaped around your family",
    copy: "Venue On My Plate brings private venue intelligence, high-touch shortlisting, and discreet proposal support for weddings and landmark celebrations that deserve more than a generic listing page.",
  },
  cities: {
    eyebrow: "Destinations",
    title: "Explore destinations",
    copy: "Udaipur, Jaipur, Goa and beyond — each circuit has its own season, scale and mood.",
    linkLabel: "View all",
    linkHref: "/cities",
  },
  categories: {
    eyebrow: "Venue categories",
    title: "Venues only — picked for your occasion",
    copy: "We provide the venue itself. Choose a category to browse palaces, resorts, banquets and destination venues.",
  },
  why: {
    eyebrow: "Why we are better",
    title: "Why families trust us",
    copy: "Exclusive pricing, private proposal support, and practical venue signals — compare more than photographs.",
  },
  steps: {
    eyebrow: "How it works",
    title: "Your venue in 3 easy steps",
  },
  gallery: {
    eyebrow: "Events gallery",
    title: "Steal-worthy celebration inspiration",
    copy: "Browse by mood, guest experience, and the level of occasion you want to create.",
  },
  films: {
    eyebrow: "Films",
    title: "Celebrations in motion",
    copy: "Haldi mornings, floral details and first looks — the moments venues are made for.",
  },
  testimonials: {
    eyebrow: "Client testimonials",
    title: "Loved by families across India",
    copy: "Families value a calmer way to compare ambience, hospitality, privacy, and the final proposal.",
  },
  journal: {
    eyebrow: "Journal",
    title: "Ideas worth stealing",
    linkLabel: "View all blogs",
    linkHref: "/blogs",
  },
  support: {
    eyebrow: "Support",
    title: "Get venues picked for you",
    copy: "Two minutes now saves two weeks of calling venues. We reply within one business day — by call.",
  },
};

const ABOUT_FALLBACK = {
  eyebrow: "About us",
  title: "Luxury venue access shaped around your family",
  body: "Venue On My Plate brings private venue intelligence, high-touch shortlisting, and discreet proposal support for weddings and landmark celebrations that deserve more than a generic listing page.",
  image: "/images/wedding-decor.jpg",
  alt: "Wedding reception decor with florals and warm lighting",
  linkLabel: "More about us",
  linkHref: "/about",
  phone: "+91 94624 60555",
  badge: "Private, quote-led shortlists",
  stats: [
    { value: "Venue-only", label: "No decor or catering commissions" },
    { value: "Human", label: "Assisted follow-up" },
    { value: "Private", label: "Quote-led proposals" },
  ],
};

const BAND_FALLBACK = {
  src: "/videos/hero-bg.mp4",
  poster: "/images/hero-poster.jpg",
  eyebrow: "Signature stages",
  title: "Drapes, blooms and morning light.",
  linkLabel: "Explore venues",
  linkHref: "/venues",
};

const SEO_FALLBACK = {
  title: "Finding wedding and party venues in India, without the legwork.",
  paragraphs: [
    "Venue On My Plate helps you discover venues for weddings, receptions, birthdays, corporate events and private celebrations across India — from heritage palaces in Udaipur and garden resorts in Jaipur to desert forts in Jaisalmer, palace courtyards in Jodhpur and beach venues in Goa.",
    "We focus only on venues — not decor, catering, or photography. Our team helps you compare venue flow, ceremony zones, guest movement, rooms and private quote options, so haldi mornings, sangeet evenings and the wedding day itself start from the right venue choice.",
    "Start by browsing all venues or pick a destination such as Udaipur, Jaipur or Goa. Want ideas first? The journal covers costs, seasonality and visit checklists.",
  ],
};

const CTA_FALLBACK = {
  title: "Are you a luxury venue partner?",
  copy: "List your venue, showcase your signature spaces, and receive relevant enquiry leads from families planning premium celebrations.",
  primaryHref: "/partner",
  primaryLabel: "Join us",
  secondaryHref: "/venues",
  secondaryLabel: "Explore venues",
};

interface Heading {
  eyebrow: string;
  title: string;
  copy?: string;
  linkLabel?: string;
  linkHref?: string;
}

interface Category {
  icon: LucideIcon;
  t: string;
  d: string;
  href: string;
}

interface Feature {
  icon: LucideIcon;
  t: string;
  d: string;
}

interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
  rating: number;
  image: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  castle: Castle,
  palm: Palmtree,
  landmark: Landmark,
  tent: TentTree,
  building: Building2,
  users: Users,
  badge: BadgePercent,
  sparkles: Sparkles,
  phone: PhoneCall,
};

function bySection(blocks: ContentBlock[], section: ContentBlock["section"]) {
  return blocks.filter((block) => block.section === section);
}

function metaString(meta: Record<string, unknown> | undefined, key: string, fallback: string) {
  const value = meta?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function metaStats(meta: Record<string, unknown> | undefined, fallback: { value: string; label: string }[]) {
  if (!Array.isArray(meta?.stats)) return fallback;
  const stats = meta.stats
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const value = typeof row.value === "string" ? row.value.trim() : "";
      const label = typeof row.label === "string" ? row.label.trim() : "";
      return value && label ? { value, label } : null;
    })
    .filter((item): item is { value: string; label: string } => Boolean(item));
  return stats.length > 0 ? stats : fallback;
}

function headingFor(blocks: ContentBlock[], key: string): Heading {
  const block = blocks.find((item) => item.section === "heading" && item.blockKey === key);
  if (!block) return HEADING_FALLBACKS[key];
  return {
    eyebrow: block.title || HEADING_FALLBACKS[key]?.eyebrow || "",
    title: block.subtitle || HEADING_FALLBACKS[key]?.title || "",
    copy: block.body || HEADING_FALLBACKS[key]?.copy,
    linkLabel: block.linkLabel || HEADING_FALLBACKS[key]?.linkLabel,
    linkHref: block.linkHref || HEADING_FALLBACKS[key]?.linkHref,
  };
}

export default async function HomePage() {
  const [venues, cities, blogs, content, reviewRows] = await Promise.all([
    getVenues(),
    getCities(),
    getBlogs(),
    getContentBlocks(),
    getReviews(),
  ]);

  const heroBlocks = bySection(content, "hero");
  const heroVideoBlock = heroBlocks.find((block) => block.blockKey === "video");
  const heroSlides: HeroSlide[] = heroBlocks
    .filter((block) => block.blockKey !== "video")
    .map((block, index) => ({
      eyebrow: block.subtitle,
      title: block.title,
      copy: block.body,
      image: localMedia(block.image, GALLERY[index % GALLERY.length].src),
      alt: block.imageAlt,
      primary: { label: block.linkLabel || "Explore venues", href: block.linkHref || "/venues" },
      secondary: {
        label: metaString(block.meta, "secondaryLabel", "Get a private quote"),
        href: metaString(block.meta, "secondaryHref", "/contact"),
      },
    }));

  const tickerBlocks = bySection(content, "ticker").map((block) => block.title).filter(Boolean);
  const ticker = tickerBlocks.length > 0 ? tickerBlocks : TICKER;

  const aboutBlock = bySection(content, "about")[0];
  const aboutMeta = aboutBlock?.meta;
  const about = aboutBlock
    ? {
        eyebrow: aboutBlock.subtitle || ABOUT_FALLBACK.eyebrow,
        title: aboutBlock.title || ABOUT_FALLBACK.title,
        body: aboutBlock.body || ABOUT_FALLBACK.body,
        image: localMedia(aboutBlock.image, ABOUT_FALLBACK.image),
        alt: aboutBlock.imageAlt || ABOUT_FALLBACK.alt,
        linkLabel: aboutBlock.linkLabel || ABOUT_FALLBACK.linkLabel,
        linkHref: aboutBlock.linkHref || ABOUT_FALLBACK.linkHref,
        phone: metaString(aboutMeta, "phone", ABOUT_FALLBACK.phone),
        badge: metaString(aboutMeta, "badge", ABOUT_FALLBACK.badge),
        stats: metaStats(aboutMeta, ABOUT_FALLBACK.stats),
      }
    : ABOUT_FALLBACK;

  const categoryBlocks = bySection(content, "category");
  const categories: Category[] = categoryBlocks.length
    ? categoryBlocks.map((block) => ({
        icon: ICON_MAP[block.icon] || Castle,
        t: block.title,
        d: block.body,
        href: block.linkHref || "/venues",
      }))
    : CATEGORIES;

  const featureBlocks = bySection(content, "feature");
  const features: Feature[] = featureBlocks.length
    ? featureBlocks.map((block) => ({
        icon: ICON_MAP[block.icon] || Sparkles,
        t: block.title,
        d: block.body,
      }))
    : FEATURES;

  const stepBlocks = bySection(content, "step");
  const steps = stepBlocks.length
    ? stepBlocks.map((block) => [block.subtitle || "01", block.title, block.body] as const)
    : STEPS;

  const galleryBlocks = bySection(content, "gallery");
  const galleryItems = galleryBlocks.map((block, index) => ({
    src: localMedia(block.image, GALLERY[index % GALLERY.length].src),
    alt: block.imageAlt || block.title,
    mood: block.title,
  }));
  const gallery = galleryItems.length > 0 ? galleryItems : GALLERY;

  const filmBlocks = bySection(content, "film");
  const bandBlock = filmBlocks.find((block) => metaString(block.meta, "placement", "grid") === "band");
  const band = bandBlock
    ? {
        src: localMedia(bandBlock.image, BAND_FALLBACK.src),
        poster: localMedia(bandBlock.meta?.poster as string | undefined, HERO_POSTER),
        eyebrow: bandBlock.subtitle || BAND_FALLBACK.eyebrow,
        title: bandBlock.title || BAND_FALLBACK.title,
        linkLabel: bandBlock.linkLabel || BAND_FALLBACK.linkLabel,
        linkHref: bandBlock.linkHref || BAND_FALLBACK.linkHref,
      }
    : BAND_FALLBACK;
  const filmItems = filmBlocks
    .filter((block) => metaString(block.meta, "placement", "grid") !== "band")
    .map((block, index) => {
      const fallback = FILMS[index % FILMS.length];
      return {
        src: localMedia(block.image, fallback.src),
        poster: localMedia(metaString(block.meta, "poster", fallback.poster), fallback.poster),
        startAt: Number(metaString(block.meta, "startAt", String(fallback.startAt))) || 0,
        caption: block.title,
      };
    })
    .filter((item) => item.src);
  const films = filmItems.length > 0 ? filmItems : FILMS;

  const faqBlocks = bySection(content, "faq");
  const faqs: Faq[] = faqBlocks.length
    ? faqBlocks.map((block) => ({ question: block.title, answer: block.body }))
    : generalFaqs.slice(0, 6);

  const cityCards = cities.map((city) => {
    if (city.image?.startsWith("/")) return city;
    const venue = venues.find((item) => item.citySlug === city.slug && item.image?.startsWith("https://"));
    return venue?.image ? { ...city, image: venue.image } : city;
  });

  const testimonials: Testimonial[] = reviewRows.map((review) => ({
    id: review.id,
    name: review.name,
    context: review.context,
    quote: review.quote,
    rating: review.rating,
    image: review.image,
  }));

  const seoBlock = bySection(content, "seo")[0];
  const seo = seoBlock
    ? {
        title: seoBlock.title || SEO_FALLBACK.title,
        paragraphs: (seoBlock.body || "").split(/\n{2,}/).map((line) => line.trim()).filter(Boolean),
      }
    : SEO_FALLBACK;
  if (seo.paragraphs.length === 0) seo.paragraphs = SEO_FALLBACK.paragraphs;

  const ctaBlock = bySection(content, "cta")[0];
  const cta = ctaBlock
    ? {
        title: ctaBlock.title || CTA_FALLBACK.title,
        copy: ctaBlock.body || CTA_FALLBACK.copy,
        primaryHref: ctaBlock.linkHref || CTA_FALLBACK.primaryHref,
        primaryLabel: ctaBlock.linkLabel || CTA_FALLBACK.primaryLabel,
        secondaryHref: metaString(ctaBlock.meta, "secondaryHref", CTA_FALLBACK.secondaryHref),
        secondaryLabel: metaString(ctaBlock.meta, "secondaryLabel", CTA_FALLBACK.secondaryLabel),
      }
    : CTA_FALLBACK;

  const highlightsHeading = headingFor(content, "highlights");
  const aboutHeading = headingFor(content, "about");
  const citiesHeading = headingFor(content, "cities");
  const categoriesHeading = headingFor(content, "categories");
  const whyHeading = headingFor(content, "why");
  const stepsHeading = headingFor(content, "steps");
  const galleryHeading = headingFor(content, "gallery");
  const filmsHeading = headingFor(content, "films");
  const testimonialsHeading = headingFor(content, "testimonials");
  const journalHeading = headingFor(content, "journal");
  const supportHeading = headingFor(content, "support");

  return (
    <>
      {/* Royal wedding ribbon */}
      <div className="border-y border-[#c6a04a]/60 bg-[#f4e6c9]">
        <div
          aria-label="Wedding celebrations"
          className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2.5 md:gap-x-7"
        >
          {ticker.slice(0, 6).map((t, i) => (
            <span
              key={t}
              className="flex items-center gap-4 font-display text-[11px] font-semibold tracking-[0.24em] text-[#4a0719] uppercase md:gap-7 md:text-[12px]"
            >
              {i > 0 && (
                <span aria-hidden="true" className="text-[8px] leading-none text-[#a67c1a]">
                  ❖
                </span>
              )}
              {t}
            </span>
          ))}
        </div>
      </div>

      <Hero
        slides={heroSlides}
        video={localVideo(heroVideoBlock?.title)}
        poster={localMedia(heroVideoBlock?.image, HERO_POSTER)}
        posterAlt={heroVideoBlock?.imageAlt}
      />

      <CinematicBand
        src={band.src}
        poster={band.poster}
        eyebrow={band.eyebrow}
        title={band.title}
        linkLabel={band.linkLabel}
        linkHref={band.linkHref}
      />

      {/* Tab highlights */}
      <section aria-labelledby="highlights-heading" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow={highlightsHeading.eyebrow} title={highlightsHeading.title} copy={highlightsHeading.copy} />
        <h2 id="highlights-heading" className="sr-only">Highlights by occasion</h2>
        <HomeTabs venues={venues} />
      </section>

      {/* Luxury banner — Samsung split feature */}
      <section aria-label="About Venue On My Plate" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <Reveal scale>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/10 ring-1 ring-[#e8e8ed]">
            <Image
              src={about.image}
              alt={about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={70}
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(18,21,33,0.5)] ring-1 ring-[#e8e8ed] backdrop-blur">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#7f0f2e]" />
              <span className="text-[13px] font-semibold text-[#1d1d1f]">{about.badge}</span>
            </div>
          </div>
          <div>
            <p className="s-eyebrow text-neutral-500">{about.eyebrow || aboutHeading.eyebrow}</p>
            <h2 className="s-headline mt-3 text-[32px] text-balance md:text-[44px]">
              {about.title}
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">{about.body}</p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[#e8e8ed] pt-6">
              {about.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`}>
                  <dt className="text-gold-gradient text-2xl font-bold tracking-tight md:text-3xl">{stat.value}</dt>
                  <dd className="mt-1 text-[13px] text-neutral-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={about.linkHref} className="s-link text-[15px]">{about.linkLabel} &rsaquo;</Link>
              <a href={`tel:${about.phone.replace(/[^\d+]/g, "")}`} className="s-btn-dark btn-sheen px-6 py-2.5 text-[13px] font-semibold">
                {about.phone}
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* Destinations — Samsung horizontal scroll */}
      <section id="cities" aria-labelledby="cities-heading" className="border-t border-black/10">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow={citiesHeading.eyebrow} title={citiesHeading.title} copy={citiesHeading.copy} />
            {citiesHeading.linkLabel && <SectionLink href={citiesHeading.linkHref || "/cities"}>{citiesHeading.linkLabel}</SectionLink>}
          </div>
          <h2 id="cities-heading" className="sr-only">Popular destinations</h2>
          <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {cityCards.map((c) => (
              <div key={c.slug} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <CityCard city={c} />
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Venue categories — we provide venues only */}
      <section aria-label="Venue categories" className="band-sage border-t border-[#eed9a3]">
        <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
          <SectionHeading eyebrow={categoriesHeading.eyebrow} title={categoriesHeading.title} copy={categoriesHeading.copy} />
          <Reveal delay={120}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map(({ icon: Icon, t, d, href }) => (
                <Link key={t} href={href} className="group rounded-[18px] bg-[#f5f5f7] p-7 transition duration-300 hover:bg-[#e8e8ed]">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#5c0a20] text-[#f6de9a]">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-[17px] font-bold tracking-tight text-[#1d1d1f]">{t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#424245]">{d}</p>
                  <span className="mt-3 inline-block text-[14px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 group-hover:decoration-black">Browse venues &rsaquo;</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why — 3 Samsung feature columns */}
      <section aria-label="Why Venue On My Plate" className="band-cream border-t border-[#eed9a3]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <SectionHeading eyebrow={whyHeading.eyebrow} title={whyHeading.title} copy={whyHeading.copy} />
          <Reveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-[18px] bg-white p-8 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.22)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1d1d1f] text-white">
                  <Icon size={22} />
                </span>
                <p className="mt-5 text-[17px] font-bold tracking-tight text-[#1d1d1f]">{t}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#424245]">{d}</p>
                <Link href="/contact" className="s-link mt-4 inline-block text-[15px]">Learn more &rsaquo;</Link>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* How it works — Samsung 3 steps */}
      <section id="how-it-works" aria-label="How it works" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow={stepsHeading.eyebrow} title={stepsHeading.title} copy={stepsHeading.copy} />
        <Reveal delay={120}>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([n, t, d]) => (
            <li key={n} className="s-card p-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f5f5f7]">
                <span className="text-[20px] font-bold text-[#1d1d1f]">{n}</span>
              </span>
              <p className="mt-3 text-[18px] font-bold tracking-tight">{t}</p>
              <p className="mx-auto mt-2 max-w-xs text-[14px] leading-relaxed text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
        </Reveal>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/venues" className="s-btn-dark btn-sheen px-6 py-2.5 text-[15px]">Explore venues</Link>
          <Link href="/contact" className="s-link px-4 py-2.5 text-[15px]">Request bespoke proposal &rsaquo;</Link>
        </div>
      </section>

      {/* Gallery — white mats, champagne frames */}
      <section aria-label="Events gallery" className="band-blush border-t border-[#eed9a3]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <SectionHeading eyebrow={galleryHeading.eyebrow} title={galleryHeading.title} copy={galleryHeading.copy} />
          <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {gallery.map((g) => (
              <figure key={`${g.src}-${g.mood}`} className="gold-frame w-72 shrink-0 snap-center overflow-hidden rounded-2xl p-2 md:w-auto">
                <div className="img-zoom relative h-72 overflow-hidden rounded-xl md:h-80">
                  <Image src={g.src} alt={g.alt || g.mood} fill sizes="400px" loading="lazy" quality={65} className="object-cover" />
                </div>
                <figcaption className="flex items-center justify-between px-2 py-3">
                  <span className="text-[15px] font-semibold text-[#1d1d1f]">{g.mood}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Celebrations in motion */}
      <section aria-label="Celebration films" className="band-cream border-t border-[#eed9a3]">
        <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
          <SectionHeading eyebrow={filmsHeading.eyebrow} title={filmsHeading.title} copy={filmsHeading.copy} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {films.map((v, i) => (
              <Reveal key={`${v.src}-${v.caption}`} delay={(i % 4) * 90} scale>
                <VideoCard src={v.src} poster={v.poster} startAt={v.startAt} caption={v.caption} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — shown only when real reviews are published */}
      {testimonials.length > 0 && (
      <section aria-label="Testimonials" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading eyebrow={testimonialsHeading.eyebrow} title={testimonialsHeading.title} copy={testimonialsHeading.copy} />
        <Reveal delay={120}>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="s-card relative overflow-hidden p-8">
              <span aria-hidden="true" className="pointer-events-none absolute -top-3 right-4 text-[88px] leading-none text-black/10">
                &ldquo;
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f5f5f7]">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} fill sizes="56px" loading="lazy" className="object-cover" />
                  ) : (
                    <span className="grid h-full w-full place-items-center text-[13px] font-semibold text-[#6e6e73]">
                      {t.name.slice(0, 1)}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className={i < t.rating ? "fill-[#86868b] text-[#86868b]" : "fill-neutral-200 text-neutral-200"} />
                  ))}
                </span>
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#1d1d1f]">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-[14px] text-[#1d1d1f]">
                <span className="font-semibold">{t.name}</span>
                {t.context ? <span className="text-[#6e6e73]"> · {t.context}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
        </Reveal>
      </section>
      )}

      {/* Journal */}
      <section aria-labelledby="journal-heading" className="band-blush border-t border-[#eed9a3]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow={journalHeading.eyebrow} title={journalHeading.title} copy={journalHeading.copy} />
            {journalHeading.linkLabel && <SectionLink href={journalHeading.linkHref || "/blogs"}>{journalHeading.linkLabel}</SectionLink>}
          </div>
          <h2 id="journal-heading" className="sr-only">Latest articles</h2>
          <Reveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogs.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Enquiry + FAQ — Samsung support style */}
      <section aria-labelledby="enquiry-heading" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <Reveal>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow={supportHeading.eyebrow} title={supportHeading.title} copy={supportHeading.copy} />
            <h2 id="enquiry-heading" className="sr-only">Enquiry form</h2>
            <div className="mt-8">
              <FAQ faqs={faqs} />
            </div>
          </div>
          <div className="h-fit rounded-[18px] bg-white p-6 shadow-[0_4px_16px_-8px_rgba(0,0,0,0.12)] ring-1 ring-black/5 md:p-8 lg:sticky lg:top-24">
            <EnquiryForm />
          </div>
        </div>
        </Reveal>
      </section>

      {/* SEO content */}
      <section aria-label="About finding venues in India" className="border-t border-black/10">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center md:py-20">
          <Reveal>
          <h2 className="text-[28px] leading-[1.1] font-bold tracking-[-0.022em] text-balance text-[#1d1d1f] md:text-[36px]">
            {seo.title}
          </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#424245]">
            {seo.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={cta.title}
        copy={cta.copy}
        primaryHref={cta.primaryHref}
        primaryLabel={cta.primaryLabel}
        secondaryHref={cta.secondaryHref}
        secondaryLabel={cta.secondaryLabel}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
    </>
  );
}
