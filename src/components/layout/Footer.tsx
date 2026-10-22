import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
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
    <footer className="relative overflow-hidden bg-[#3d0617] text-[#fbf3df]">
      <div
        aria-hidden="true"
        className="h-[3px]"
        style={{ backgroundImage: "linear-gradient(90deg, #5c0a20, #7f0f2e 30%, #d4a437 65%, #a67c1a)" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 -right-36 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(212,164,55,0.16),transparent_68%)]" />
        <div className="absolute -bottom-56 left-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(127,15,46,0.55),transparent_66%)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 pt-12 pb-6 md:px-8 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-16">
          <div>
            <Logo tone="light" full align="start" />
            <p className="mt-5 text-[10px] font-semibold tracking-[0.34em] text-[#e7c77e] uppercase">
              {settings.tagline}
            </p>
            <p className="mt-4 max-w-[390px] text-[14px] leading-7 text-[#fbf3df]/60">
              {settings.footerNote}
            </p>

            <div className="mt-7 border-l border-[#c6a04a]/45 pl-4">
              <p className="text-[9px] font-semibold tracking-[0.28em] text-[#e7c77e] uppercase">
                Private venue advisory
              </p>
              <a
                href={phoneHref}
                className="mt-1.5 inline-flex items-center gap-2 font-display text-[27px] leading-none text-[#fff8e8] transition hover:text-[#f1d58c]"
              >
                <Phone size={17} strokeWidth={1.6} className="text-[#e7c77e]" />
                {settings.phone}
              </a>
              <p className="mt-2 text-[11px] tracking-wide text-[#fbf3df]/45">
                {settings.hours} · {settings.responseNote}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <p className="text-[9px] font-semibold tracking-[0.28em] text-[#e7c77e] uppercase">
                    {col.title}
                  </p>
                  <ul className="mt-4 space-y-2.5 text-[13px]">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link
                          className="text-[#fbf3df]/60 underline-offset-4 transition hover:text-[#f8e7b9] hover:underline hover:decoration-[#c6a04a]/60"
                          href={l.href}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            <div className="mt-10 border border-[#c6a04a]/30 bg-white/[0.035] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.3em] text-[#e7c77e] uppercase">
                  Begin the conversation
                </p>
                <p className="mt-1.5 font-display text-[22px] leading-tight text-[#fff8e8]">
                  A private shortlist, shaped around your celebration.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-4 inline-flex shrink-0 items-center gap-2 border border-[#f0d790] bg-[#d9b45b] px-5 py-3 font-display text-[15px] font-semibold text-[#3b0514] transition hover:bg-[#f0d790] sm:mt-0"
              >
                Request a proposal
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#c6a04a]/25 pt-6">
          <div className="flex flex-col gap-3 text-[11px] text-[#fbf3df]/45 md:flex-row md:items-center md:justify-between">
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#d9b45b]" />
                Private shortlists
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#d9b45b]" />
                Verified venues
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-[#d9b45b]" />
                Expert support
              </span>
            </p>
            <p>Copyright © {new Date().getFullYear()} {settings.brandName}. All rights reserved.</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#fbf3df]/45">
            <Link href="/privacy" className="transition hover:text-[#f8e7b9]">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-[#f8e7b9]">Terms of Use</Link>
            <Link href="/contact" className="transition hover:text-[#f8e7b9]">Contact</Link>
            <span
              aria-hidden="true"
              className="ml-auto hidden h-px w-16 bg-gradient-to-r from-transparent to-[#c6a04a]/50 md:block"
            />
            <span className="hidden font-display text-[13px] tracking-wide text-[#e7c77e]/75 md:inline">
              Crafted for celebrations that matter.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
