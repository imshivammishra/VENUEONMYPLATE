"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../forms/SearchBar";
import { cn } from "@/lib/utils";

const HERO_VIDEO = "/videos/hero-bg.mp4";

const SLIDES = [
  {
    eyebrow: "Venue On My Plate",
    title: "A venue as unforgettable as your love story.",
    copy: "Palaces, lakefront estates and private resorts — curated for families who expect every detail to feel considered.",
    image: "https://images.pexels.com/photos/38951530/pexels-photo-38951530.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "White floral wedding stage on a green lawn",
    primary: { label: "Explore venues", href: "/venues" },
    secondary: { label: "Get a private quote", href: "/contact" },
  },
  {
    eyebrow: "Udaipur · Jaipur · Goa",
    title: "Destination weddings without the drama.",
    copy: "From City Palace sunsets to barefoot luxury in Goa — compare ambience, privacy, rooms and service fit before you visit.",
    image: "/images/udaipur-city.jpg",
    alt: "Lake Palace in Udaipur",
    primary: { label: "View destinations", href: "/cities" },
    secondary: { label: "Get a private quote", href: "/contact" },
  },
  {
    eyebrow: "Shortlist in a day",
    title: "Your dream shortlist, in one day flat.",
    copy: "Share your city, date, guest count and mood. Receive a bespoke shortlist with private quote-led options in one business day.",
    image: "https://images.pexels.com/photos/32854443/pexels-photo-32854443.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "White draped wedding mandap with crystal chandelier",
    primary: { label: "How it works", href: "#how-it-works" },
    secondary: { label: "Talk to an expert", href: "/contact" },
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  const slide = SLIDES[index];

  return (
    <section aria-label="Featured venues" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 38% at 12% 8%, rgba(193,154,63,0.1), transparent 70%), radial-gradient(42% 36% at 88% 12%, rgba(240,200,120,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1024px] px-5 pt-14 pb-10 text-center md:pt-20">
        <p className="text-[13px] font-semibold tracking-[0.2em] text-[#a67c1a] uppercase">{slide.eyebrow}</p>
        <h1
          key={slide.title}
          className="font-display mx-auto mt-2 max-w-3xl text-[44px] leading-[1.02] font-semibold text-balance text-[#1d1d1f] md:text-[72px]"
        >
          {slide.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-[#424245] md:text-[19px]">
          {slide.copy}
        </p>

        <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href={slide.secondary.href} className="s-btn-dark px-6 py-2.5 text-[15px]">
            {slide.secondary.label}
          </Link>
          <Link href={slide.primary.href} className="px-2 py-2 text-[15px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black">
            {slide.primary.label} &rsaquo;
          </Link>
        </div>

        {/* Carousel dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-7 bg-[#1d1d1f]" : "w-2 bg-black/20 hover:bg-black/40"
              )}
            />
          ))}
        </div>
      </div>

      {/* Video feature card */}
      <div className="relative mx-auto max-w-[1200px] px-4 pb-4 md:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-black shadow-[0_40px_90px_-32px_rgba(166,124,26,0.5)] ring-1 ring-[#eed9a3]">
          <video
            ref={videoRef}
            className="aspect-[16/10] w-full object-cover md:aspect-[21/9]"
            src={HERO_VIDEO}
            poster={SLIDES[0].image}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            preload="auto"
            aria-label="Wedding venue highlights video"
          />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#1d1d1f] backdrop-blur transition hover:bg-white">
              <ChevronLeft size={17} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-[#1d1d1f] backdrop-blur transition hover:bg-white">
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mx-auto -mt-0 mt-6 max-w-3xl pb-10">
          <SearchBar />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px]">
            {[
              { label: "Udaipur", href: "/venues?city=Udaipur" },
              { label: "Jaipur", href: "/venues?city=Jaipur" },
              { label: "Goa", href: "/venues?city=Goa" },
              { label: "Delhi NCR", href: "/venues?city=Delhi NCR" },
              { label: "Mumbai", href: "/venues?city=Mumbai" },
            ].map((p) => (
              <Link key={p.label} href={p.href} className="text-[#1d1d1f] underline decoration-black/30 underline-offset-4 hover:decoration-black">
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
