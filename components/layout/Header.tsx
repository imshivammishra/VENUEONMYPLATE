"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
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
    <nav aria-label="Primary" className="hidden min-w-0 items-center gap-7 whitespace-nowrap lg:flex">
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => setDrop("children" in item && item.children ? item.label : null)}
          onMouseLeave={() => setDrop(null)}
        >
          <Link
            href={item.href}
            className="flex items-center gap-1.5 py-8 text-[12px] font-semibold tracking-[0.18em] text-[#1d1d1f]/75 uppercase transition hover:text-[#7a1e16]"
          >
            {item.label}
            {"children" in item && item.children && <ChevronDown size={13} className="opacity-60" />}
          </Link>
          {"children" in item && item.children && drop === item.label && (
            <div className="drop-in absolute top-full left-0 w-60 rounded-2xl border border-black/10 bg-white/95 p-2 whitespace-normal shadow-[0_20px_50px_-16px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              {item.children.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="block rounded-xl px-4 py-2.5 text-[13px] text-[#1d1d1f]/80 transition hover:bg-[#7a1e16]/5 hover:text-[#7a1e16]"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-[#c19a3f] text-center text-[#3d0f0b]">
        <p className="mx-auto max-w-[1200px] px-4 py-2 text-[11px] font-bold tracking-[0.22em] uppercase">
          Shaadi season 2026–27 · Private venue tours now open ·{" "}
          <a href="tel:+919462460555" className="underline underline-offset-4 hover:text-[#5a130e]">
            +91 94624 60555
          </a>
        </p>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#e7ce9c] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-[1200px] items-center gap-3 px-4 md:h-28 md:px-6">
          {/* Left — menu button + nav */}
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#1d1d1f] hover:bg-black/5 lg:hidden"
            >
              <Menu size={21} />
            </button>
            <DesktopNav items={NAV_LEFT} />
          </div>

          {/* Center — grand lockup */}
          <div className="flex shrink-0 items-center justify-center">
            <Logo tone="dark" />
          </div>

          {/* Right — nav + actions */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
            <nav aria-label="Secondary" className="mr-3 hidden items-center gap-7 whitespace-nowrap lg:flex">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-8 text-[12px] font-semibold tracking-[0.18em] text-[#1d1d1f]/75 uppercase transition hover:text-[#7a1e16]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/venues"
              aria-label="Search venues"
              className="grid h-11 w-11 place-items-center rounded-full text-[#1d1d1f]/75 transition hover:bg-black/5 hover:text-[#7a1e16]"
            >
              <Search size={18} />
            </Link>
            <a
              href="tel:+919462460555"
              aria-label="Call concierge"
              className="hidden h-11 w-11 place-items-center rounded-full text-[#1d1d1f]/75 transition hover:bg-black/5 hover:text-[#7a1e16] sm:grid"
            >
              <Phone size={17} />
            </a>
            <Link
              href="/contact"
              className="s-btn-dark btn-sheen ml-2 hidden px-6 py-2.5 text-[13px] whitespace-nowrap xl:block"
            >
              Get a quote
            </Link>
          </div>
        </div>
        {/* Wedding double hairline */}
        <div aria-hidden="true" className="h-[3px]" style={{ backgroundImage: "linear-gradient(90deg, #5a130e, #7a1e16 30%, #c19a3f 65%, #8f6c22)" }} />
        <div aria-hidden="true" className="h-px bg-black/10" />
      </header>

      {/* Mobile menu — full-screen frosted */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-2xl lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-full flex-col">
            <div className="grid grid-cols-[48px_1fr_48px] items-center px-4 py-3">
              <span />
              <div className="flex justify-center">
                <Logo tone="dark" compact />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full text-[#1d1d1f] hover:bg-black/5"
              >
                <X size={21} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
              {MOBILE_LINKS.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b border-black/5 py-4 text-[22px] font-bold tracking-tight text-[#1d1d1f]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="s-btn-dark block px-6 py-3.5 text-center text-[15px]"
              >
                Get a quote
              </Link>
              <a
                href="tel:+919462460555"
                className="mt-3 block text-center text-[13px] text-[#1d1d1f] underline decoration-black/30 underline-offset-4"
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
