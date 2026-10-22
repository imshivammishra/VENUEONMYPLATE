import Link from "next/link";
import Logo from "./Logo";
import { getSiteSettings } from "@/lib/api";

const columns = [
  {
    title: "Venues",
    links: [
      { label: "All venues", href: "/venues" },
      { label: "Wedding venues", href: "/wedding-venues" },
      { label: "Corporate venues", href: "/venues?event=Corporate" },
      { label: "Private parties", href: "/venues?event=Birthday" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Udaipur", href: "/cities/udaipur" },
      { label: "Jaipur", href: "/cities/jaipur" },
      { label: "Jodhpur", href: "/cities/jodhpur" },
      { label: "Jaisalmer", href: "/cities/jaisalmer" },
      { label: "Goa", href: "/cities/goa" },
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

export default async function Footer() {
  const settings = await getSiteSettings();
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;
  return (
    <footer className="band-cream text-[#424245]">
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{ backgroundImage: "linear-gradient(90deg, #5c0a20, #7f0f2e 30%, #d4a437 65%, #a67c1a)" }}
      />
      <div className="mx-auto max-w-[1024px] px-5 pt-10 pb-6 md:px-6">
        <div className="flex flex-col items-start pb-10 text-left">
          <Logo tone="dark" full align="start" />
          <p className="mt-5 text-[11px] font-semibold tracking-[0.32em] text-[#6e6e73] uppercase">
            {settings.tagline}
          </p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#6e6e73]">
            {settings.footerNote}
          </p>
          <a href={phoneHref} className="mt-4 inline-block text-[22px] font-bold tracking-tight text-[#1d1d1f] hover:underline">
            {settings.phone}
          </a>
          <p className="mt-1.5 text-[12px] text-[#6e6e73]">{settings.hours} · {settings.responseNote}</p>
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
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7f0f2e]" /> Private shortlists</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7f0f2e]" /> Verified venues</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rotate-45 bg-[#7f0f2e]" /> Expert support</span>
          </p>
          <p className="mt-3">Copyright © {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
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
