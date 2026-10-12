export interface Venue {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  area: string;
  type: string;
  setting: "Indoor" | "Outdoor" | "Indoor + Outdoor";
  capacityMin: number;
  capacityMax: number;
  priceHint?: string;
  rating?: never;
  image: string;
  imageAlt: string;
  shortDescription: string;
  amenities: string[];
  eventTypes: string[];
  featured?: boolean;
}

export interface City {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  venueCountLabel: string;
  popularTypes: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedOn: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: string[];
}

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  city: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message?: string;
}

export interface Faq {
  question: string;
  answer: string;
}
