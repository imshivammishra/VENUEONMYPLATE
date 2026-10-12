"use client";

import { useEffect, useRef } from "react";

export default function VideoCard({ src, caption }: { src: string; caption: string }) {
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
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="group overflow-hidden rounded-[28px] bg-white shadow-[0_20px_50px_-24px_rgba(143,108,34,0.4)] ring-1 ring-[#e7ce9c] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-24px_rgba(143,108,34,0.5)]">
      <div className="relative overflow-hidden bg-black/5">
        <video
          ref={ref}
          className="aspect-video w-full object-cover"
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={caption}
        />
      </div>
      <figcaption className="px-5 py-4 text-center text-[15px] font-semibold text-[#1d1d1f]">
        {caption}
      </figcaption>
    </figure>
  );
}
