"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CinematicBand({
  src,
  eyebrow,
  title,
  linkLabel,
  linkHref,
}: {
  src: string;
  eyebrow: string;
  title: string;
  linkLabel: string;
  linkHref: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label={title} className="relative overflow-hidden bg-black text-white">
      <video
        ref={ref}
        aria-hidden="true"
        tabIndex={-1}
        className="h-[62vh] min-h-[420px] w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="metadata"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-[13px] font-semibold tracking-[0.24em] text-[#f3e5c3] uppercase">{eyebrow}</p>
        <p className="font-display mt-3 max-w-3xl text-[34px] leading-[1.05] font-semibold text-balance text-white md:text-[52px]">
          {title}
        </p>
        <Link href={linkHref} className="mt-5 rounded-full bg-white px-7 py-2.5 text-[15px] font-semibold text-black transition hover:bg-white/85">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
