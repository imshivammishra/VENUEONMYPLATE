import type { BlogPost, City, Venue } from "@/types";
import { blogPosts, cities, venues } from "./data";

/**
 * API layer — single place for all data access.
 *
 * Today this reads the local placeholder catalogue so the site builds
 * and renders without a backend. When the backend is ready, replace the
 * bodies below with fetch() calls against NEXT_PUBLIC_API_URL.
 *
 * Frontend must NEVER connect directly to MongoDB.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

async function backend<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
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

export async function submitEnquiry(payload: Record<string, string>): Promise<{ ok: boolean }> {
  // Always forward to VOMP Workspace live server so admin sees it in realtime.
  // NEXT_PUBLIC_VOMP_API defaults to local workspace server; silent if offline.
  const VOMP_LIVE =
    process.env.NEXT_PUBLIC_VOMP_API?.replace(/\/$/, "") || "http://localhost:8081";
  try {
    fetch(`${VOMP_LIVE}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "website" }),
    }).catch(() => {});
  } catch {
    /* offline workspace — ignore */
  }
  if (!API_BASE) {
    // No backend configured yet — simulate success so UX can be reviewed.
    // Remove this fallback once the real backend exists.
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true };
  }
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
