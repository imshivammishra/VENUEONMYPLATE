import Link from "next/link";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

const columns = [
  {
    title: "Venues",
    links: [
      { label: "All venues", href: "/venues" },
      { label: "Wedding venues", href: "/venues?event=Wedding" },
      { label: "Corporate venues", href: "/venues?event=Corporate event" },
      { label: "Private parties", href: "/venues?event=Birthday / Anniversary" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Udaipur", href: "/cities/udaipur" },
      { label: "Jaipur", href: "/cities/jaipur" },
      { label: "Goa", href: "/cities/goa" },
      { label: "Delhi NCR", href: "/cities/delhi-ncr" },
      { label: "Mumbai", href: "/cities/mumbai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Journal", href: "/blogs" },
      { label: "Contact", href: "/contact" },
      { label: "Register venue", href: "/partner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="band-cream text-[#424245]">
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{ backgroundImage: "linear-gradient(90deg, #5a130e, #7a1e16 30%, #c19a3f 65%, #8f6c22)" }}
      />
      <div className="mx-auto max-w-[1024px] px-5 pt-10 pb-6 md:px-6">
        <div className="flex flex-col items-center pb-10 text-center">
          <Logo tone="dark" full />
          <p className="mt-5 text-[11px] font-semibold tracking-[0.32em] text-[#6e6e73] uppercase">
            Luxury venues · India
          </p>
          <p className="mx-auto mt-3 max-w-sm text-[14px] leading-relaxed text-[#6e6e73]">
            Luxury venue discovery, bespoke proposal support, and partner onboarding across India.
          </p>
          <a href="tel:+919462460555" className="mt-4 inline-block text-[22px] font-bold tracking-tight text-[#1d1d1f] hover:underline">
            +91 94624 60555
          </a>
          <p className="mt-1.5 text-[12px] text-[#6e6e73]">{SITE.hours} · {SITE.responseNote}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8 sm:grid-cols-4">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[12px] font-semibold text-[#1d1d1f]">{col.title}</p>
              <ul className="mt-3 space-y-2 text-[12px]">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link className="text-[#424245] hover:text-[#1d1d1f] hover:underline" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-8 border-t border-black/10 pt-5 text-[12px] text-[#6e6e73]">
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7a1e16]" /> Private shortlists</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7a1e16]" /> Verified venues</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7a1e16]" /> Concierge support</span>
          </p>
          <p className="mt-3">Copyright © 1995-2026 Venue On My Plate. All rights reserved.</p>
          <div className="mt-2 flex gap-4">
            <Link href="/privacy" className="hover:text-[#1d1d1f] hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#1d1d1f] hover:underline">Terms of Use</Link>
            <Link href="/contact" className="hover:text-[#1d1d1f] hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
