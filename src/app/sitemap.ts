import type { MetadataRoute } from "next";
import { getBlogs, getVenues } from "@/lib/api";
import { cities } from "@/lib/data";
import { absoluteUrl, SITE_URL as base } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [venues, blogs] = await Promise.all([getVenues(), getBlogs()]);

  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/venues`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...venues.map((v) => ({
      url: absoluteUrl(`/venues/${v.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cities.map((c) => ({
      url: absoluteUrl(`/cities/${c.slug}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...["udaipur", "jaipur", "goa"].map((c) => ({
      url: absoluteUrl(`/wedding-venues/${c}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...blogs.map((b) => ({
      url: absoluteUrl(`/blogs/${b.slug}`),
      lastModified: new Date(b.publishedOn),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
