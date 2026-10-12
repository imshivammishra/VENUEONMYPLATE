import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { getBlogs } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Journal — wedding & celebration planning guides",
  description:
    "Practical guides to choosing venues, planning destination weddings and designing guest experiences — from the Venue On My Plate studio.",
  path: "/blogs",
});

export default async function BlogsPage() {
  const posts = await getBlogs();
  const [first, ...rest] = posts;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-36">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal" }]} />
        <Reveal className="mt-6">
          <SectionHeading
            eyebrow="Journal"
            title="Notes on celebrating well."
            copy="Venue selection, destination planning and guest experience — written for humans, not algorithms."
          />
        </Reveal>
        {first && (
          <Reveal delay={100} className="mt-10">
            <BlogCard post={first} featured />
          </Reveal>
        )}
        {rest.length > 0 && (
          <>
            <div aria-hidden="true" className="lux-divider mx-auto mt-12 w-40 opacity-80" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
