"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LEFT = [
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "All venues", href: "/venues" },
      { label: "Wedding venues", href: "/venues?event=Wedding" },
      { label: "Corporate & conferences", href: "/venues?event=Corporate event" },
      { label: "Private parties", href: "/venues?event=Birthday / Anniversary" },
    ],
  },
  {
    label: "Destinations",
    href: "/cities",
    children: [
      { label: "Udaipur", href: "/cities/udaipur" },
      { label: "Jaipur", href: "/cities/jaipur" },
      { label: "Goa", href: "/cities/goa" },
      { label: "All destinations", href: "/cities" },
    ],
  },
  { label: "Occasions", href: "/venues" },
];

const NAV_RIGHT = [
  { label: "Journal", href: "/blogs" },
  { label: "Support", href: "/contact" },
];

const MOBILE_LINKS = [
  { label: "Venues", href: "/venues" },
  { label: "Destinations", href: "/cities" },
  { label: "Wedding Venues", href: "/wedding-venues" },
  { label: "Journal", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Register Venue", href: "/partner" },
];

function DesktopNav({ items }: { items: typeof NAV_LEFT }) {
  const [drop, setDrop] = useState<string | null>(null);
  return (
    <nav aria-label="Primary" className="hidden min-w-0 items-center gap-1 whitespace-nowrap lg:flex">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setDrop("children" in item && item.children ? item.label : null)}
          onMouseLeave={() => setDrop(null)}
        >
          <Link
            href={item.href}
            className={cn(
              "group relative flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[12px] font-semibold tracking-[0.16em] uppercase transition",
              drop === item.label ? "bg-[#7f0f2e]/5 text-[#7f0f2e]" : "text-[#2b1218]/70 hover:bg-[#7f0f2e]/5 hover:text-[#7f0f2e]"
            )}
          >
            {item.label}
            {"children" in item && item.children && (
              <ChevronDown size={13} className={cn("opacity-50 transition-transform duration-300", drop === item.label && "rotate-180")} />
            )}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-4 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-[#7f0f2e] to-[#d4a437] transition-transform duration-300 group-hover:scale-x-100",
                drop === item.label && "scale-x-100"
              )}
            />
          </Link>
          {"children" in item && item.children && drop === item.label && (
            <div className="drop-in absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 whitespace-normal">
              <div className="overflow-hidden rounded-2xl border border-[#d4a437]/25 bg-white/95 p-2 shadow-[0_24px_60px_-20px_rgba(92,10,32,0.35)] backdrop-blur-xl">
                <div aria-hidden="true" className="mx-4 mt-1 h-px bg-gradient-to-r from-transparent via-[#d4a437]/60 to-transparent" />
                {item.children.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="group/item flex items-center justify-between rounded-xl px-4 py-2.5 text-[13px] font-medium text-[#2b1218]/80 transition hover:bg-[#7f0f2e]/5 hover:text-[#7f0f2e]"
                  >
                    {c.label}
                    <ArrowRight size={14} className=" -translate-x-1 opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip — official maroon + gold */}
      <div className="bg-[#5c0a20] text-center text-[#f6de9a]">
        <p className="mx-auto max-w-[1200px] px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase">
          Shaadi season 2026–27 · Private venue tours now open ·{" "}
          <a href="tel:+919462460555" className="underline underline-offset-4 decoration-[#d4a437]/60 hover:text-white">
            +91 94624 60555
          </a>
        </p>
      </div>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-300",
          scrolled ? "border-[#d4a437]/40 shadow-[0_12px_40px_-20px_rgba(92,10,32,0.35)]" : "border-[#eed9a3]"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-3 px-4 md:h-20 md:px-6">
          {/* Left — menu button + logo */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#5c0a20] transition hover:bg-[#7f0f2e]/5 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <Logo tone="dark" />
          </div>

          {/* Center — desktop nav */}
          <div className="hidden min-w-0 items-center lg:flex">
            <DesktopNav items={NAV_LEFT} />
          </div>

          {/* Right — nav + actions */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
            <nav aria-label="Secondary" className="mr-1 hidden items-center gap-1 whitespace-nowrap lg:flex">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-full px-4 py-2.5 text-[12px] font-semibold tracking-[0.16em] text-[#2b1218]/70 uppercase transition hover:bg-[#7f0f2e]/5 hover:text-[#7f0f2e]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/venues"
              aria-label="Search venues"
              className="grid h-10 w-10 place-items-center rounded-full text-[#2b1218]/70 ring-1 ring-transparent transition hover:bg-[#7f0f2e]/5 hover:text-[#7f0f2e] hover:ring-[#d4a437]/30"
            >
              <Search size={17} />
            </Link>
            <a
              href="tel:+919462460555"
              aria-label="Call our experts"
              className="hidden h-10 w-10 place-items-center rounded-full text-[#2b1218]/70 ring-1 ring-transparent transition hover:bg-[#7f0f2e]/5 hover:text-[#7f0f2e] hover:ring-[#d4a437]/30 sm:grid"
            >
              <Phone size={16} />
            </a>
            <Link
              href="/contact"
              className="s-btn-dark btn-sheen ml-2 hidden px-5 py-2.5 text-[13px] font-semibold whitespace-nowrap lg:block"
            >
              Get a quote
            </Link>
          </div>
        </div>
        {/* Official maroon → gold hairline */}
        <div aria-hidden="true" className="h-[2px]" style={{ backgroundImage: "linear-gradient(90deg, #5c0a20, #7f0f2e 35%, #d4a437 70%, #a67c1a)" }} />
      </header>

      {/* Mobile menu — elegant frosted */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#fffaf0]/95 backdrop-blur-2xl lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <Logo tone="dark" compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-[#5c0a20] ring-1 ring-[#d4a437]/30 hover:bg-[#7f0f2e]/5"
              >
                <X size={20} />
              </button>
            </div>
            <div aria-hidden="true" className="mx-6 h-px bg-gradient-to-r from-transparent via-[#d4a437]/70 to-transparent" />
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
              {MOBILE_LINKS.map((l, i) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-[#7f0f2e]/8 py-4"
                >
                  <span className="text-[20px] font-bold tracking-tight text-[#2b1218] group-hover:text-[#7f0f2e]">
                    <span className="mr-3 text-[11px] font-bold text-[#a67c1a]">0{i + 1}</span>
                    {l.label}
                  </span>
                  <ArrowRight size={17} className="text-[#a67c1a]" />
                </Link>
              ))}
            </nav>
            <div className="p-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="s-btn-dark block px-6 py-3.5 text-center text-[15px] font-semibold"
              >
                Get a quote
              </Link>
              <a
                href="tel:+919462460555"
                className="mt-3 block text-center text-[13px] font-medium text-[#5c0a20] underline decoration-[#d4a437]/60 underline-offset-4"
              >
                Call +91 94624 60555
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
