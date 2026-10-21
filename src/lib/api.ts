import type { BlogPost, City, ContentBlock, Review, SiteSettings, Venue } from "@/types";
import { blogPosts, cities, venues } from "./data";
import { SITE } from "./site";

/**
 * Data access for the public website.
 *
 * Server-side reads use the private API address (never exposed to browsers).
 * Browser submissions use a same-origin `/api` path, which Nginx proxies to
 * the API service. This keeps cookies first-party and avoids public CORS.
 */
const SERVER_BASE = (process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const PUBLIC_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

async function backend<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!SERVER_BASE) return null;
  try {
    const res = await fetch(`${SERVER_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as T | { data: T };
    if (payload && typeof payload === "object" && "data" in payload) {
      return (payload as { data: T }).data;
    }
    return payload as T;
  } catch {
    return null;
  }
}

export async function getVenues(): Promise<Venue[]> {
  const remote = await backend<Venue[]>("/api/v1/public/venues");
  return remote && remote.length > 0 ? remote : venues;
}

export async function getVenueBySlug(slug: string): Promise<Venue | null> {
  const remote = await backend<Venue>(`/api/v1/public/venues/${slug}`);
  if (remote) return remote;
  return venues.find((v) => v.slug === slug) ?? null;
}

export async function getCities(): Promise<City[]> {
  const remote = await backend<City[]>("/api/v1/public/cities");
  return remote && remote.length > 0 ? remote : cities;
}

export async function getCity(slug: string): Promise<City | null> {
  const remote = await backend<City>(`/api/v1/public/cities/${slug}`);
  if (remote) return remote;
  return cities.find((c) => c.slug === slug) ?? null;
}

export async function getBlogs(): Promise<BlogPost[]> {
  const remote = await backend<BlogPost[]>("/api/v1/public/blogs");
  return remote && remote.length > 0 ? remote : blogPosts;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const remote = await backend<BlogPost>(`/api/v1/public/blogs/${slug}`);
  if (remote) return remote;
  return blogPosts.find((b) => b.slug === slug) ?? null;
}

const SETTINGS_FALLBACK: SiteSettings = {
  brandName: SITE.name,
  tagline: "Luxury venues · India",
  email: SITE.email,
  phone: SITE.phoneDisplay,
  whatsapp: SITE.whatsapp,
  address: "Udaipur · Jaipur · Goa · Delhi NCR · Mumbai",
  hours: SITE.hours,
  responseNote: SITE.responseNote,
  instagram: "https://instagram.com/venueonmyplate",
  footerNote: "Luxury venue discovery, bespoke proposal support, and partner onboarding across India.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await backend<{ general?: Partial<SiteSettings> }>("/api/v1/public/settings");
  const general = remote?.general || {};
  const clean = Object.fromEntries(
    Object.entries(general).filter(([, value]) => typeof value === "string" && value.trim())
  ) as Partial<SiteSettings>;
  return { ...SETTINGS_FALLBACK, ...clean };
}

export async function getContentBlocks(): Promise<ContentBlock[]> {
  return (await backend<ContentBlock[]>("/api/v1/public/content")) ?? [];
}

export async function getReviews(venue?: string): Promise<Review[]> {
  const path = venue ? `/api/v1/public/reviews?venue=${encodeURIComponent(venue)}` : "/api/v1/public/reviews";
  return (await backend<Review[]>(path)) ?? [];
}

export async function submitEnquiry(payload: Record<string, string>): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`${PUBLIC_BASE}/api/v1/public/enquiries`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "website" }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
