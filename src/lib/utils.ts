export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatGuests(min: number, max: number): string {
  if (min >= 1000 || max >= 1000) {
    const f = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `${n}`);
    return `${f(min)}–${f(max)} guests`;
  }
  return `${min}–${max} guests`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://venueonmyplate.in";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
