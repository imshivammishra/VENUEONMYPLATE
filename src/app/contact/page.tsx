import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FAQ from "@/components/forms/FAQ";
import Reveal from "@/components/ui/Reveal";
import { getContentBlocks, getSiteSettings } from "@/lib/api";
import { generalFaqs } from "@/lib/data";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/types";

export const metadata: Metadata = buildMetadata({
  title: "Contact — request your personal venue shortlist",
  description:
    "Tell Venue On My Plate your city, event type, date and guest count. Our team replies within one business day with curated venue options.",
  path: "/contact",
});

export default async function ContactPage() {
  const [settings, content] = await Promise.all([getSiteSettings(), getContentBlocks()]);
  const faqBlocks = content.filter((block) => block.section === "faq" && block.title && block.body);
  const faqs: Faq[] = faqBlocks.length
    ? faqBlocks.map((block) => ({ question: block.title, answer: block.body }))
    : generalFaqs;
  const phoneHref = `tel:${settings.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-black p-8 text-white md:p-10">
                <div className="relative">
                  <p className="s-eyebrow text-white/60">Expert help · Find my venue</p>
                  <h1 className="s-headline font-display mt-3 text-3xl leading-tight text-balance md:text-4xl">
                    Tell us the occasion.
                  </h1>
                  <div aria-hidden="true" className="mt-5 h-px w-32 bg-white/20" />
                  <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                    Share the essentials below. For anything urgent, write to {settings.email} with
                    your event date in the subject.
                  </p>
                  <dl className="mt-8 space-y-5 text-sm">
                    <div className="border-t border-white/15 pt-4">
                      <dt className="text-[13px] font-semibold text-white/60">Email</dt>
                      <dd className="mt-1 font-medium break-all text-white">{settings.email}</dd>
                    </div>
                    <div className="border-t border-white/15 pt-4">
                      <dt className="text-[13px] font-semibold text-white/60">Phone</dt>
                      <dd className="mt-1">
                        <a href={phoneHref} className="font-medium text-white hover:underline">
                          {settings.phone}
                        </a>
                      </dd>
                    </div>
                    <div className="border-t border-white/15 pt-4">
                      <dt className="text-[13px] font-semibold text-white/60">Hours</dt>
                      <dd className="mt-1 text-white/80">{settings.hours}</dd>
                    </div>
                  </dl>
                  <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur">
                    <p className="text-[13px] font-medium text-white">{settings.responseNote}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8">
                <h2 className="font-display text-2xl text-[#1d1d1f]">Good to know</h2>
                <div className="mt-4">
                  <FAQ faqs={faqs} />
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} scale className="md:sticky md:top-28 md:self-start">
            <div className="rounded-[18px] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-10">
              <p className="s-eyebrow text-[#6e6e73]">Request proposal</p>
              <h2 className="font-display mt-2 text-2xl text-[#1d1d1f]">Your celebration, in brief</h2>
              <div aria-hidden="true" className="mt-4 h-px w-32 bg-[#e8e8ed]" />
              <div className="mt-6">
                <Suspense fallback={<p className="text-sm text-[#6e6e73]">Loading form…</p>}>
                  <EnquiryForm />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      </div>
    </div>
  );
}
