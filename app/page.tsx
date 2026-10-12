import Image from "next/image";
import Link from "next/link";
import { BadgePercent, Building2, CalendarCheck, Camera, Flower2, PhoneCall, Sparkles, Star, UtensilsCrossed, Wallet } from "lucide-react";
import BlogCard from "@/components/venues/BlogCard";
import CTASection from "@/components/home/CTASection";
import CityCard from "@/components/venues/CityCard";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FAQ from "@/components/forms/FAQ";
import Hero from "@/components/home/Hero";
import HomeTabs from "@/components/home/HomeTabs";
import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/home/VideoCard";
import CinematicBand from "@/components/home/CinematicBand";
import SectionHeading, { SectionLink } from "@/components/home/SectionHeading";
import { getBlogs, getCities, getVenues } from "@/lib/api";
import { generalFaqs } from "@/lib/data";
import { faqJsonLd } from "@/lib/seo";

const TICKER = [
  "Udaipur",
  "Jaipur",
  "Goa",
  "Delhi NCR",
  "Mumbai",
  "Weddings",
  "Sangeet",
  "Haldi",
  "Receptions",
  "Corporate",
];

const GALLERY = [
  {
    src: "https://images.pexels.com/photos/35985256/pexels-photo-35985256.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "White floral decoration with golden table outdoors",
    mood: "Grand celebrations",
  },
  {
    src: "https://images.pexels.com/photos/38254676/pexels-photo-38254676.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Cream wedding mandap with marigold hangings",
    mood: "Palace weddings",
  },
  {
    src: "https://images.pexels.com/photos/32476128/pexels-photo-32476128.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "White floral bouquets on a wedding table",
    mood: "Floral tablescapes",
  },
  {
    src: "https://images.pexels.com/photos/37828118/pexels-photo-37828118.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "White canopy mandap in daylight",
    mood: "Open-air mandaps",
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya & Reyansh",
    meta: "Udaipur · Dec '25",
    copy: "The shortlist felt personal from the first call. We compared palace venues and private estates without losing sight of what our families actually needed.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=180&auto=format&fit=crop",
  },
  {
    name: "Karan & Meera Iyer",
    meta: "Goa · Feb '26",
    copy: "We wanted discretion, rooms, arrival experience, and a venue that could carry multiple functions. The proposal saved weeks of back-and-forth.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=180&auto=format&fit=crop",
  },
  {
    name: "Sana & Thomas",
    meta: "Jaipur · Nov '25",
    copy: "The team helped us ask better questions before each visit, from guest movement to service depth and private quote options.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=180&auto=format&fit=crop",
  },
];

export default async function HomePage() {
  const [venues, cities, blogs] = await Promise.all([getVenues(), getCities(), getBlogs()]);

  return (
    <>
      {/* Golden marquee ticker */}
      <div aria-hidden="true" className="marquee marquee-band overflow-hidden py-2.5">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-10 text-[12px] font-semibold tracking-[0.3em] text-[#f7ebce] uppercase">
              {t}
              <span className="h-[6px] w-[6px] rotate-45 rounded-[1px] bg-[#f7ebce]/70" />
            </span>
          ))}
        </div>
      </div>

      <Hero />

      <CinematicBand
        src="https://videos.pexels.com/video-files/20697239/20697239-hd_1280_720_25fps.mp4"
        eyebrow="Signature stages"
        title="Drapes, blooms and morning light."
        linkLabel="Explore venues"
        linkHref="/venues"
      />

      {/* Tab highlights */}
      <section aria-labelledby="highlights-heading" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="This season's highlights"
          title="Every celebration starts with the right venue"
          copy="Switch by occasion — the same private, quote-led discovery behind every option."
        />
        <h2 id="highlights-heading" className="sr-only">Highlights by occasion</h2>
        <HomeTabs venues={venues} />
      </section>

      {/* Luxury banner — Samsung split feature */}
      <section aria-label="About Venue On My Plate" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <Reveal scale>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-3xl bg-black/10 ring-1 ring-[#e8e8ed]">
            <Image
              src="https://images.pexels.com/photos/35985196/pexels-photo-35985196.jpeg?auto=compress&cs=tinysrgb&w=1100"
              alt="Bright white wedding reception tablescape"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
              quality={70}
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(18,21,33,0.5)] ring-1 ring-[#e8e8ed] backdrop-blur">
              <span className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-[#86868b] text-[#86868b]" />
                ))}
              </span>
              <span className="text-[13px] font-bold text-[#1d1d1f]">
                4.9 <span className="font-medium text-neutral-500">· 1,000+ shortlists</span>
              </span>
            </div>
          </div>
          <div>
            <p className="s-eyebrow text-neutral-500">About us</p>
            <h2 className="s-headline mt-3 text-[32px] text-balance md:text-[44px]">
              Luxury venue access shaped around your family
            </h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Venue On My Plate brings private venue intelligence, high-touch shortlisting, and
              discreet proposal support for weddings and landmark celebrations that deserve more
              than a generic listing page.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[#e8e8ed] pt-6">
              {[
                ["1000+", "Shortlists curated"],
                ["17+", "Years of experience"],
                ["Private", "Quote support"],
              ].map(([t, d]) => (
                <div key={t}>
                  <dt className="text-gold-gradient text-2xl font-bold tracking-tight md:text-3xl">{t}</dt>
                  <dd className="mt-1 text-[13px] text-neutral-500">{d}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="/about" className="s-link text-[15px]">More about us &rsaquo;</Link>
              <a href="tel:+919462460555" className="s-btn-dark btn-sheen px-6 py-2.5 text-[13px] font-semibold">
                +91 94624 60555
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
            <SectionHeading
              align="left"
              eyebrow="Destinations"
              title="Explore destinations"
              copy="Udaipur, Jaipur, Goa and beyond — each circuit has its own season, scale and mood."
            />
            <SectionLink href="/cities">View all</SectionLink>
          </div>
          <h2 id="cities-heading" className="sr-only">Popular destinations</h2>
          <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {cities.map((c) => (
              <div key={c.slug} className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <CityCard city={c} />
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* Services — end-to-end celebration support */}
      <section aria-label="Celebration services" className="band-sage border-t border-[#e7ce9c]">
        <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="End-to-end services"
            title="Your entire wedding, handled"
            copy="One team for venues, decor, catering, photography and planning — booked together, managed together."
          />
          <Reveal delay={120}>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Building2, t: "Venue booking", d: "Palaces, resorts, lawns and ballrooms matched to date, guests and budget." },
                { icon: Flower2, t: "Decor & mandaps", d: "Floral stages, entries and tablescapes with trusted decor panels." },
                { icon: Camera, t: "Photography", d: "Candid and traditional teams briefed on your venues and light." },
                { icon: UtensilsCrossed, t: "Catering", d: "Menus, tastings and live counters planned per function." },
                { icon: CalendarCheck, t: "Planning support", d: "Timelines, vendor sequencing and on-day coordination." },
                { icon: Wallet, t: "Budget optimisation", d: "Benchmarked quotes and negotiated inclusions, in writing." },
              ].map(({ icon: Icon, t, d }) => (
                <Link key={t} href="/contact" className="group rounded-[18px] bg-[#f5f5f7] p-7 transition duration-300 hover:bg-[#e8e8ed]">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1d1d1f] text-white">
                    <Icon size={20} />
                  </span>
                  <p className="mt-4 text-[17px] font-bold tracking-tight text-[#1d1d1f]">{t}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#424245]">{d}</p>
                  <span className="mt-3 inline-block text-[14px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 group-hover:decoration-black">Enquire &rsaquo;</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why — 3 Samsung feature columns */}
      <section aria-label="Why Venue On My Plate" className="band-cream border-t border-[#e7ce9c]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Why we are better"
            title="Why families trust us"
            copy="Exclusive pricing, private proposal support, and practical venue signals — compare more than photographs."
          />
          <Reveal delay={120}>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: BadgePercent, t: "Exclusive pricing", d: "Get a private quote-led proposal shaped around date, guest count, rooms, menu preferences, and service level." },
              { icon: Sparkles, t: "Expert insights", d: "Compare venue flow, ceremony zones, guest arrival, privacy, hospitality depth, and visit questions before you go." },
              { icon: PhoneCall, t: "Discreet follow-up", d: "Your enquiry stays request-led. Our team follows up by call to refine fit, options, and next steps." },
            ].map(({ icon: Icon, t, d }) => (
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
        <SectionHeading
          eyebrow="How it works"
          title="Your venue in 3 easy steps"
        />
        <Reveal delay={120}>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Share your celebration brief", "Tell us your event city, date, guest count, venue mood, room needs, food preferences, and family priorities."],
            ["02", "Receive a bespoke proposal", "Our team shortlists venues that match ambience, logistics, privacy, and hospitality expectations."],
            ["03", "Confirm next steps by call", "Plan visits, compare private quote options, and continue with a human-assisted enquiry."],
          ].map(([n, t, d]) => (
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
      <section aria-label="Events gallery" className="band-blush border-t border-[#e7ce9c]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Events gallery"
            title="Steal-worthy real celebrations"
            copy="Browse by mood, guest experience, and the level of occasion you want to create."
          />
          <Reveal delay={120}>
          <div className="no-scrollbar -mx-5 mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:px-0">
            {GALLERY.map((g) => (
              <figure key={g.src} className="gold-frame w-72 shrink-0 snap-center overflow-hidden rounded-2xl p-2 md:w-auto">
                <div className="img-zoom relative h-72 overflow-hidden rounded-xl md:h-80">
                  <Image src={g.src} alt={g.alt} fill sizes="400px" loading="lazy" quality={65} className="object-cover" />
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
      <section aria-label="Celebration films" className="band-cream border-t border-[#e7ce9c]">
        <div className="mx-auto max-w-[1024px] px-5 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="Films"
            title="Celebrations in motion"
            copy="Real haldi mornings, floral details and first looks — the moments venues are made for."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "https://videos.pexels.com/video-files/35067978/14854574_960_540_50fps.mp4", caption: "Haldi mornings" },
              { src: "https://videos.pexels.com/video-files/35222217/14921664_960_540_50fps.mp4", caption: "Floral details" },
              { src: "https://videos.pexels.com/video-files/34519848/14625946_960_540_24fps.mp4", caption: "First looks" },
              { src: "https://videos.pexels.com/video-files/27979648/12279918_960_540_25fps.mp4", caption: "Aisle walks" },
            ].map((v, i) => (
              <Reveal key={v.src} delay={(i % 4) * 90} scale>
                <VideoCard src={v.src} caption={v.caption} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — Samsung stories */}
      <section aria-label="Testimonials" className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Client testimonials"
          title="Loved by families across India"
          copy="Families value a calmer way to compare ambience, hospitality, privacy, and the final proposal."
        />
        <Reveal delay={120}>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="s-card relative overflow-hidden p-8">
              <span aria-hidden="true" className="pointer-events-none absolute -top-3 right-4 text-[88px] leading-none text-black/10">
                &ldquo;
              </span>
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#f5f5f7]">
                  <Image src={t.image} alt={t.name} fill sizes="56px" loading="lazy" className="object-cover" />
                </div>
                <span className="flex items-center gap-0.5" aria-label="Rated 5 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-[#86868b] text-[#86868b]" />
                  ))}
                </span>
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#1d1d1f]">&ldquo;{t.copy}&rdquo;</blockquote>
              <figcaption className="mt-3 text-[14px] text-[#1d1d1f]">
                <span className="font-semibold">{t.name}</span>
                {"meta" in t && t.meta ? <span className="text-[#6e6e73]"> · {t.meta}</span> : null}
              </figcaption>
            </figure>
          ))}
        </div>
        </Reveal>
      </section>

      {/* Journal */}
      <section aria-labelledby="journal-heading" className="band-blush border-t border-[#e7ce9c]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow="Journal" title="Ideas worth stealing" />
            <SectionLink href="/blogs">View all blogs</SectionLink>
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
            <SectionHeading
              align="left"
              eyebrow="Support"
              title="Get venues picked for you"
              copy="Two minutes now saves two weeks of calling venues. We reply within one business day — by call."
            />
            <h2 id="enquiry-heading" className="sr-only">Enquiry form</h2>
            <div className="mt-8">
              <FAQ faqs={generalFaqs.slice(0, 6)} />
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
            Finding wedding and party venues in India, without the legwork.
          </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#424245]">
            <p>
              Venue On My Plate helps you discover venues for weddings, receptions, birthdays,
              corporate events and private celebrations across India — from heritage palaces in
              Udaipur and garden resorts in Jaipur to beach venues in Goa and banquet estates in
              Delhi NCR.
            </p>
            <p>
              Beyond venue discovery, our planners assist with decor, catering menus, photography
              teams and budget optimisation — so haldi mornings, sangeet evenings and the wedding
              day itself run on one coordinated plan instead of five separate vendor threads.
            </p>
            <p>
              Start by browsing <Link className="s-link" href="/venues">all venues</Link> or
              pick a destination such as <Link className="s-link" href="/cities/udaipur">Udaipur</Link>,{" "}
              <Link className="s-link" href="/cities/jaipur">Jaipur</Link> or{" "}
              <Link className="s-link" href="/cities/goa">Goa</Link>. Want ideas first? The{" "}
              <Link className="s-link" href="/blogs">journal</Link> covers costs, seasonality and
              visit checklists.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Are you a luxury venue partner?"
        copy="List your venue, showcase your signature spaces, and receive relevant enquiry leads from families planning premium celebrations."
        primaryHref="/partner"
        primaryLabel="Join us"
        secondaryHref="/venues"
        secondaryLabel="Explore venues"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(generalFaqs.slice(0, 6))) }}
      />
    </>
  );
}
