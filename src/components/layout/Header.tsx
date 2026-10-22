"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Crown, MapPin, Menu, Phone, Search, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  note?: string;
  children?: Array<{ label: string; href: string; note?: string }>;
};

const NAV_LEFT: NavItem[] = [
  {
    label: "Venues",
    href: "/venues",
    children: [
      { label: "All venues", href: "/venues", note: "The full curated collection" },
      { label: "Wedding venues", href: "/wedding-venues", note: "Palaces, lawns & ballrooms" },
      { label: "Corporate & conferences", href: "/venues?event=Corporate", note: "Retreats, offsites & annual days" },
      { label: "Private parties", href: "/venues?event=Birthday", note: "Birthdays & anniversaries" },
    ],
  },
  {
    label: "Destinations",
    href: "/cities",
    children: [
      { label: "Udaipur", href: "/cities/udaipur", note: "Lakes, palaces & golden pheras" },
      { label: "Jaipur", href: "/cities/jaipur", note: "Rajput grandeur near Delhi" },
      { label: "Jodhpur", href: "/cities/jodhpur", note: "Blue-city rooftops & Mehrangarh" },
      { label: "Jaisalmer", href: "/cities/jaisalmer", note: "Golden forts & desert evenings" },
      { label: "Goa", href: "/cities/goa", note: "Barefoot luxury by the sea" },
      { label: "All destinations", href: "/cities", note: "Explore every venue circuit" },
    ],
  },
  {
    label: "Occasions",
    href: "/wedding-venues",
    children: [
      { label: "Weddings", href: "/wedding-venues", note: "Pheras, receptions & sangeet" },
      { label: "Sangeet & haldi", href: "/venues?event=Wedding", note: "Colour, music & morning light" },
      { label: "Corporate events", href: "/venues?event=Corporate", note: "Conferences & leadership offsites" },
      { label: "Celebrations", href: "/venues?event=Birthday", note: "Birthdays, anniversaries & more" },
    ],
  },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Journal", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MOBILE_LINKS = [
  { label: "Venues", href: "/venues", note: "The complete collection" },
  { label: "Destinations", href: "/cities", note: "Royal circuits across India" },
  { label: "Wedding venues", href: "/wedding-venues", note: "Palaces, resorts & lawns" },
  { label: "Journal", href: "/blogs", note: "Ideas, costs & planning notes" },
  { label: "About us", href: "/about", note: "How we curate" },
  { label: "Contact", href: "/contact", note: "A private shortlist, on request" },
  { label: "Register venue", href: "/partner", note: "Partner with Venue On My Plate" },
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
    "group relative flex items-center gap-1 rounded-full px-3 py-2 font-display text-[16px] font-semibold tracking-[0.01em] transition-colors duration-200 xl:px-3.5",
    active ? "text-[#7f0f2e]" : "text-[#4a1821]/78 hover:text-[#7f0f2e]"
  );

function DesktopNav({ items }: { items: NavItem[] }) {
  const [drop, setDrop] = useState<string | null>(null);
  const isActive = useIsActive();

  return (
    <nav aria-label="Primary" className="hidden min-w-0 items-center gap-0.5 whitespace-nowrap xl:flex">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
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
                  size={13}
                  strokeWidth={2.2}
                  className={cn(
                    "text-[#a67c1a]/70 transition-transform duration-300",
                    drop === item.label && "rotate-180 text-[#7f0f2e]"
                  )}
                />
              )}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 -bottom-0.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#d4a437] to-transparent transition-transform duration-300",
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>

            {item.children && drop === item.label && (
              <div className="drop-in absolute top-full left-1/2 w-[318px] -translate-x-1/2 pt-4 whitespace-normal">
                <div className="overflow-hidden rounded-[14px] border border-[#d4a437]/35 bg-[#fffdf8]/95 shadow-[0_30px_70px_-28px_rgba(92,10,32,0.5)] ring-1 ring-black/[0.03] backdrop-blur-xl">
                  <div className="relative overflow-hidden bg-[#5c0a20] px-5 py-3.5">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#f6de9a_1px,transparent_0)] [background-size:12px_12px]"
                    />
                    <p className="relative text-[9px] font-bold tracking-[0.3em] text-[#f6de9a] uppercase">
                      {item.label}
                    </p>
                    <p className="relative mt-0.5 font-display text-[17px] text-white">
                      Choose your celebration
                    </p>
                  </div>
                  <div className="p-2.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="group/item flex items-center justify-between rounded-[10px] px-3 py-2.5 transition hover:bg-[#fdf3d7]"
                      >
                        <span>
                          <span className="block text-[13px] font-semibold text-[#3c1a23] group-hover/item:text-[#5c0a20]">
                            {child.label}
                          </span>
                          {child.note && (
                            <span className="mt-0.5 block text-[11px] leading-snug text-[#8a757a]">
                              {child.note}
                            </span>
                          )}
                        </span>
                        <ArrowRight
                          size={14}
                          className="-translate-x-1 text-[#a67c1a] opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Royal announcement strip */}
      <div className="relative overflow-hidden border-b border-[#d4a437]/35 bg-[#4a0719] text-center text-[#f6de9a]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#f6de9a_1px,transparent_0)] [background-size:14px_14px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_160%_at_50%_0%,rgba(212,164,55,0.28),transparent_70%)]"
        />
        <p className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-[10px] md:text-[11px]">
          <Crown size={12} strokeWidth={1.8} className="text-[#d4a437]" aria-hidden="true" />
          Padharo Sa
          <span aria-hidden="true" className="text-[#d4a437]">◆</span>
          Royal venue atelier · Rajasthan &amp; beyond
          <span aria-hidden="true" className="hidden text-[#d4a437] sm:inline">◆</span>
          <a
            href="tel:+919462460555"
            className="hidden underline decoration-[#d4a437]/70 underline-offset-4 transition hover:text-white md:inline"
          >
            +91 94624 60555
          </a>
        </p>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-[#fffdf8]/95 backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "border-[#d4a437]/55 shadow-[0_18px_50px_-28px_rgba(92,10,32,0.5)]"
            : "border-[#d4a437]/40"
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_1px_1px,#7f0f2e_1px,transparent_0)] [background-size:18px_18px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#5c0a20,#a67c1a_18%,#f3d98d_50%,#a67c1a_82%,#5c0a20)]"
        />

        <div className="relative mx-auto grid h-[92px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 md:h-[112px] md:px-6 xl:px-8">
          <div className="flex min-w-0 items-center justify-start gap-1">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d4a437]/40 bg-[#fffaf0] text-[#5c0a20] shadow-sm transition hover:border-[#7f0f2e]/30 hover:bg-white xl:hidden"
            >
              <Menu size={21} strokeWidth={1.8} />
            </button>
            <DesktopNav items={NAV_LEFT} />
          </div>

          <div className="relative flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-[88px] w-[244px] -translate-x-1/2 -translate-y-[46%] rounded-t-[130px] border-x border-t border-[#d4a437]/25 md:h-[104px] md:w-[304px]"
            />
            <span
              aria-hidden="true"
              className="absolute top-[2px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-[#d4a437]/70 md:top-[5px]"
            />
            <Logo tone="dark" align="center" />
          </div>

          <div className="flex min-w-0 items-center justify-end gap-1">
            <nav aria-label="Secondary" className="hidden items-center gap-0.5 whitespace-nowrap xl:flex">
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
                      "absolute inset-x-4 -bottom-0.5 h-[2px] origin-center rounded-full bg-gradient-to-r from-transparent via-[#d4a437] to-transparent transition-transform duration-300",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </nav>

            <span aria-hidden="true" className="mx-1.5 hidden h-6 w-px bg-[#d4a437]/40 xl:block" />

            <Link
              href="/venues"
              aria-label="Search venues"
              className="hidden h-10 w-10 place-items-center rounded-full text-[#4a1821]/65 transition hover:bg-[#fdf3d7] hover:text-[#7f0f2e] sm:grid"
            >
              <Search size={18} strokeWidth={1.8} />
            </Link>
            <a
              href="tel:+919462460555"
              aria-label="Call our venue experts"
              className="hidden h-10 w-10 place-items-center rounded-full text-[#4a1821]/65 transition hover:bg-[#fdf3d7] hover:text-[#7f0f2e] md:grid"
            >
              <Phone size={17} strokeWidth={1.8} />
            </a>
            <Link
              href="/contact"
              className="s-btn-dark btn-sheen ml-1.5 hidden items-center gap-1.5 px-5 py-2.5 font-display text-[15px] font-semibold whitespace-nowrap shadow-[0_10px_24px_-14px_rgba(92,10,32,0.7)] xl:inline-flex"
            >
              Plan your event
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative h-[2px] bg-[linear-gradient(90deg,transparent,#d4a437_20%,#7f0f2e_50%,#d4a437_80%,transparent)]"
        >
          <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#7f0f2e]/30 bg-[#d4a437]" />
        </div>
      </header>

      {/* Mobile / tablet royal menu */}
      {open && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#4a0719] text-white xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#f6de9a_1px,transparent_0)] [background-size:16px_16px]"
          />
          <div className="relative min-h-full">
            <div className="h-[3px] bg-[linear-gradient(90deg,#5c0a20,#d4a437,#f6de9a,#d4a437,#5c0a20)]" />
            <div className="mx-auto max-w-3xl px-5 pb-10">
              <div className="flex items-center justify-between gap-3 py-4">
                <div className="rounded-2xl border border-[#d4a437]/45 bg-[#fffaf0] px-3 py-2 shadow-xl">
                  <Logo tone="dark" />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full border border-[#d4a437]/45 text-[#f6de9a] transition hover:bg-white/10"
                >
                  <X size={21} strokeWidth={1.8} />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.28em] text-[#d4a437] uppercase">
                <Crown size={13} />
                Royal menu
                <span className="h-px flex-1 bg-gradient-to-r from-[#d4a437]/60 to-transparent" />
              </div>

              <nav aria-label="Mobile" className="mt-2">
                {MOBILE_LINKS.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="group flex items-center justify-between gap-4 border-b border-[#f6de9a]/15 py-3.5"
                  >
                    <span>
                      <span
                        className={cn(
                          "font-display block text-[24px] leading-tight font-semibold transition-colors group-hover:text-[#f6de9a]",
                          isActive(link.href) ? "text-[#f6de9a]" : "text-white"
                        )}
                      >
                        <span className="mr-2.5 align-middle text-[10px] font-bold tracking-normal text-[#d4a437]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </span>
                      <span className="mt-0.5 block pl-8 text-[11px] tracking-wide text-white/50">
                        {link.note}
                      </span>
                    </span>
                    <ArrowRight
                      size={17}
                      className="shrink-0 text-[#d4a437] transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </nav>

              <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#d4a437]/60 bg-[#fdf3d7] px-6 py-3.5 font-display text-[16px] font-semibold text-[#5c0a20]"
                >
                  Plan your event
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+919462460555"
                  className="flex items-center justify-center gap-2 rounded-full border border-[#f6de9a]/30 px-6 py-3.5 text-[13px] font-semibold text-[#f6de9a]"
                >
                  <Phone size={15} />
                  +91 94624 60555
                </a>
              </div>

              <p className="mt-6 flex items-center justify-center gap-1.5 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                <MapPin size={12} />
                Udaipur · Jaipur · Jodhpur · Jaisalmer · Goa
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
