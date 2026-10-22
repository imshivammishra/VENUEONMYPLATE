"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  delay = 0,
  scale = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  scale?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Keep the server-rendered content visible until hydration, then apply the
    // reveal transition. A timeout is the safety net for mobile browsers that
    // throttle IntersectionObserver during client-side navigation.
    setReady(true);
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const fallback = window.setTimeout(() => setInView(true), 1200);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          window.clearTimeout(fallback);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(ready && "rv", scale && "rv-scale", inView && "rv-in", className)}
    >
      {children}
    </div>
  );
}
