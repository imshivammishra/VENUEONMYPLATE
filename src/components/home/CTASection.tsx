"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const CTA_VIDEO =
  "https://videos.pexels.com/video-files/35222217/14921664_960_540_50fps.mp4";

export default function CTASection({
  title,
  copy,
  primaryHref = "/contact",
  primaryLabel = "Request bespoke proposal",
  secondaryHref = "/venues",
  secondaryLabel = "Explore venues",
}: {
  title: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section aria-label="Call to action" className="relative overflow-hidden bg-black text-white">
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src={CTA_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="metadata"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
      <div className="relative mx-auto flex max-w-[1024px] flex-col items-center px-5 py-20 text-center md:py-28">
        <h2 className="font-display max-w-2xl text-[34px] leading-[1.06] font-semibold text-balance md:text-[50px]">{title}</h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/70">{copy}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Link href={primaryHref} className="s-btn-dark btn-sheen px-6 py-2.5 text-[15px]">
            {primaryLabel}
          </Link>
          <Link href={secondaryHref} className="px-2 py-2 text-[15px] text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
            {secondaryLabel} &rsaquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
