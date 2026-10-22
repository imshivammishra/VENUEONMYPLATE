"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => {
    const base = href.split("?")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };
}

const navLinkClass = (active: boolean) =>
  cn(
    "group relative flex items-center gap-1 rounded-full px-3 py-2 font-display text-[15px] font-semibold tracking-[0.015em] transition-colors duration-200 xl:px-3.5 xl:text-[16px]",
    active ? "text-[#7f0f2e]" : "text-[#2b1218]/70 hover:text-[#7f0f2e]"
  );

function DesktopNav({ items }: { items: typeof NAV_LEFT }) {
  const [drop, setDrop] = useState<string | null>(null);
  const isActive = useIsActive();

  return (
    <nav aria-label="Primary" className="hidden min-w-0 items-center gap-0.5 whitespace-nowrap lg:flex">
      {items.map((item) => {
        const children = "children" in item ? item.children : undefined;
        const hasChildren = Boolean(children);
        const active = isActive(item.href);
        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setDrop(hasChildren ? item.label : null)}
            onMouseLeave={() => setDrop(null)}
            onFocus={() => setDrop(hasChildren ? item.label : null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDrop(null);
            }}
          >
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={navLinkClass(active)}
            >
              {item.label}
              {hasChildren && (
                <ChevronDown
                  size={12}
                  strokeWidth={2.4}
                  className={cn(
                    "opacity-45 transition-transform duration-300",
                    drop === item.label && "rotate-180 opacity-70"
                  )}
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-[3px] h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#d4a437] to-transparent transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>

            {children && drop === item.label && (
              <div className="drop-in absolute top-full left-1/2 w-[286px] -translate-x-1/2 pt-4 whitespace-normal">
                <div className="overflow-hidden rounded-[18px] border border-[#d4a437]/25 bg-white/95 p-2.5 shadow-[0_26px_60px_-24px_rgba(92,10,32,0.38)] ring-1 ring-black/[0.03] backdrop-blur-xl">
                  <p className="px-3 pt-1 pb-2 text-[9px] font-bold tracking-[0.26em] text-[#a67c1a] uppercase">
                    {item.label}
                  </p>
                  <div aria-hidden="true" className="mx-3 mb-1 h-px bg-gradient-to-r from-[#d4a437]/50 via-[#d4a437]/25 to-transparent" />
                  {children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium text-[#2b1218]/80 transition hover:bg-[#fdf8ec] hover:text-[#5c0a20]"
                    >
                      {c.label}
                      <ArrowRight
                        size={14}
                        className="-translate-x-1 text-[#a67c1a] opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip — official maroon + gold */}
      <div className="relative overflow-hidden bg-[#5c0a20] text-center text-[#f6de9a]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_160%_at_50%_0%,rgba(212,164,55,0.16),transparent_70%)]"
        />
        <p className="relative mx-auto max-w-[1200px] px-4 py-2 text-[10px] font-semibold tracking-[0.22em] uppercase sm:text-[11px]">
          Shaadi season 2026–27
          <span aria-hidden="true" className="mx-2 text-[#d4a437] sm:mx-3">◆</span>
          Private venue tours now open
          <span aria-hidden="true" className="mx-2 hidden text-[#d4a437] sm:inline sm:mx-3">◆</span>
          <a
            href="tel:+919462460555"
            className="hidden underline decoration-[#d4a437]/60 underline-offset-4 transition hover:text-white sm:inline"
          >
            +91 94624 60555
          </a>
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-gradient-to-b from-white via-[#fffdf9] to-[#fdf8ec]/90 backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "border-[#d4a437]/45 shadow-[0_16px_44px_-26px_rgba(92,10,32,0.42)]"
            : "border-[#eed9a3]/80"
        )}
      >
        <div className="mx-auto grid h-[72px] max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 md:h-[86px] md:px-6">
          {/* Left — menu button (mobile) + primary nav */}
          <div className="flex min-w-0 items-center justify-start gap-1.5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#5c0a20] ring-1 ring-transparent transition hover:bg-[#fdf8ec] hover:ring-[#d4a437]/30 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
            <DesktopNav items={NAV_LEFT} />
          </div>

          {/* Center — brand logo, always optically centred */}
          <div className="flex items-center justify-center">
            <Logo tone="dark" align="center" textOnly />
          </div>

          {/* Right — secondary nav + actions */}
          <div className="flex min-w-0 items-center justify-end gap-1">
            <nav aria-label="Secondary" className="hidden items-center gap-0.5 whitespace-nowrap lg:flex">
              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navLinkClass(isActive(item.href))}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-[3px] h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#d4a437] to-transparent transition-transform duration-300",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </nav>

            <span aria-hidden="true" className="mx-1.5 hidden h-5 w-px bg-[#d4a437]/35 lg:block" />

            <Link
              href="/venues"
              aria-label="Search venues"
              className="grid h-9 w-9 place-items-center rounded-full text-[#2b1218]/65 ring-1 ring-transparent transition hover:bg-[#fdf8ec] hover:text-[#7f0f2e] hover:ring-[#d4a437]/35 sm:h-10 sm:w-10"
            >
              <Search size={17} strokeWidth={1.8} />
            </Link>
            <a
              href="tel:+919462460555"
              aria-label="Call our experts"
              className="hidden h-10 w-10 place-items-center rounded-full text-[#2b1218]/65 ring-1 ring-transparent transition hover:bg-[#fdf8ec] hover:text-[#7f0f2e] hover:ring-[#d4a437]/35 sm:grid"
            >
              <Phone size={16} strokeWidth={1.8} />
            </a>
            <Link
              href="/contact"
              className="s-btn-dark btn-sheen ml-1.5 hidden px-4 py-2.5 font-display text-[15px] font-semibold tracking-[0.02em] whitespace-nowrap shadow-[0_10px_24px_-14px_rgba(92,10,32,0.65)] lg:inline-flex xl:px-5"
            >
              Get a quote
            </Link>
          </div>
        </div>

        {/* Official maroon → gold hairline */}
        <div
          aria-hidden="true"
          className="h-[2px]"
          style={{ backgroundImage: "linear-gradient(90deg, #5c0a20, #7f0f2e 35%, #d4a437 70%, #a67c1a)" }}
        />
      </header>

      {/* Mobile menu — elegant frosted */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-[#fffaf0]/95 backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3">
              <Logo tone="dark" textOnly />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-[#5c0a20] ring-1 ring-[#d4a437]/30 transition hover:bg-[#7f0f2e]/5"
              >
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>
            <div aria-hidden="true" className="mx-6 h-px bg-gradient-to-r from-transparent via-[#d4a437]/70 to-transparent" />
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
              {MOBILE_LINKS.map((l, i) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="group flex items-center justify-between border-b border-[#7f0f2e]/8 py-4"
                >
                  <span
                    className={cn(
                      "font-display text-[24px] font-semibold tracking-[0.01em] transition-colors group-hover:text-[#7f0f2e]",
                      isActive(l.href) ? "text-[#7f0f2e]" : "text-[#2b1218]"
                    )}
                  >
                    <span className="mr-3 text-[11px] font-bold text-[#a67c1a]">0{i + 1}</span>
                    {l.label}
                  </span>
                  <ArrowRight size={17} className="text-[#a67c1a] transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </nav>
            <div className="p-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="s-btn-dark btn-sheen block px-6 py-3.5 text-center font-display text-[16px] font-semibold tracking-[0.02em]"
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
