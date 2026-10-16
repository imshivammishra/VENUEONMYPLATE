import type { BlogPost, City, Faq, Venue } from "@/types";

/**
 * PLACEHOLDER catalogue.
 * Replace with backend data (see lib/api.ts). Content is intentionally
 * generic-but-realistic — no fake ratings, awards or reviews.
 */
export const venues: Venue[] = [
  {
    slug: "lakeside-heritage-palace-udaipur",
    name: "Lakeside Heritage Palace",
    city: "Udaipur",
    citySlug: "udaipur",
    area: "Lake Pichola",
    type: "Heritage Palace",
    setting: "Indoor + Outdoor",
    capacityMin: 200,
    capacityMax: 1200,
    priceHint: "Premium",
    image:
      "https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Floral mandap with chandeliers at a heritage palace wedding",
    shortDescription:
      "A lakeside heritage palace with courtyards, terraces and a grand durbar hall for large weddings.",
    amenities: ["Bridal suites", "In-house catering", "Valet parking", "Power backup", "Guest rooms"],
    eventTypes: ["Wedding", "Sangeet", "Corporate event"],
    featured: true,
  },
  {
    slug: "marigold-gardens-jaipur",
    name: "Marigold Gardens",
    city: "Jaipur",
    citySlug: "jaipur",
    area: "Kukas",
    type: "Garden Resort",
    setting: "Outdoor",
    capacityMin: 150,
    capacityMax: 900,
    priceHint: "Premium",
    image:
      "https://images.pexels.com/photos/32153629/pexels-photo-32153629.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Indian wedding ceremony on a garden lawn in Jaipur",
    shortDescription:
      "Manicured lawns, a mango orchard and a glass pavilion — made for golden-hour pheras.",
    amenities: ["Lawns", "Pavilion", "In-house decor panel", "Guest rooms", "Ample parking"],
    eventTypes: ["Wedding", "Haldi", "Engagement"],
    featured: true,
  },
  {
    slug: "cliffside-bay-resort-goa",
    name: "Cliffside Bay Resort",
    city: "Goa",
    citySlug: "goa",
    area: "Morjim",
    type: "Beach Resort",
    setting: "Indoor + Outdoor",
    capacityMin: 100,
    capacityMax: 500,
    priceHint: "Luxury",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Beach wedding setup overlooking the sea in Goa",
    shortDescription:
      "A cliff-top resort with sea-facing lawns, suited for intimate destination weddings.",
    amenities: ["Sea-facing lawn", "Pool deck", "Rooms & villas", "Bar licence assistance"],
    eventTypes: ["Wedding", "Cocktail", "Corporate offsite"],
    featured: true,
  },
  {
    slug: "the-ivory-pavilion-delhi-ncr",
    name: "The Ivory Pavilion",
    city: "Delhi NCR",
    citySlug: "delhi-ncr",
    area: "Chattarpur",
    type: "Banquet & Lawns",
    setting: "Indoor + Outdoor",
    capacityMin: 300,
    capacityMax: 1500,
    priceHint: "Premium",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Elegant banquet hall dressed for a wedding dinner",
    shortDescription:
      "A high-capacity Chattarpur estate with a pillarless hall and adjoining lawns.",
    amenities: ["Pillarless hall", "Lawns", "Bridal lounge", "Valet", "Rooms nearby"],
    eventTypes: ["Wedding", "Reception", "Corporate event"],
  },
  {
    slug: "palm-court-house-mumbai",
    name: "Palm Court House",
    city: "Mumbai",
    citySlug: "mumbai",
    area: "Juhu",
    type: "Hotel Venue",
    setting: "Indoor",
    capacityMin: 80,
    capacityMax: 400,
    priceHint: "Luxury",
    image:
      "https://images.pexels.com/photos/31832661/pexels-photo-31832661.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Joyful dance celebration at a sangeet",
    shortDescription:
      "A refined sea-facing ballroom for receptions, sangeets and milestone celebrations.",
    amenities: ["Ballroom", "Pre-function area", "In-house catering", "Suites"],
    eventTypes: ["Reception", "Sangeet", "Engagement"],
  },
  {
    slug: "banyan-estate-bangalore",
    name: "Banyan Estate",
    city: "Bangalore",
    citySlug: "bangalore",
    area: "Devanahalli",
    type: "Resort",
    setting: "Outdoor",
    capacityMin: 120,
    capacityMax: 700,
    priceHint: "Mid-premium",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Floral decor at an outdoor wedding venue",
    shortDescription: "A green 20-acre estate with a century-old banyan as its centrepiece.",
    amenities: ["Lawns", "Amphitheatre", "Cottages", "Bonfire pit"],
    eventTypes: ["Wedding", "Haldi", "Corporate offsite"],
  },
];

export const cities: City[] = [
  {
    slug: "udaipur",
    name: "Udaipur",
    tagline: "Lakes, palaces and golden-hour pheras.",
    description:
      "Udaipur remains India's most loved destination-wedding city — lake-facing palaces, heritage havelis and open courtyards that glow at sunset. Most large weddings here run across 2–3 days with separate venues for haldi, sangeet and pheras.",
    image:
      "/images/udaipur-city.jpg",
    imageAlt: "Lake Palace reflecting on Lake Pichola, Udaipur",
    venueCountLabel: "12+ curated venues",
    popularTypes: ["Heritage Palace", "Lakeside Lawns", "Heritage Haveli", "Resort"],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    tagline: "Rajput grandeur, an hour from Delhi.",
    description:
      "Jaipur pairs Rajput architecture with easy logistics — forts, garden resorts and city palaces that work for both intimate functions and 1000-guest baraats.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Amber Fort overlooking Jaipur",
    venueCountLabel: "18+ curated venues",
    popularTypes: ["Fort Venue", "Garden Resort", "City Palace", "Hotel"],
  },
  {
    slug: "goa",
    name: "Goa",
    tagline: "Barefoot luxury by the sea.",
    description:
      "Goa is for couples who want a relaxed, multi-day celebration — beach lawns, Portuguese villas and cliff-top resorts, best between October and March.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Palm-lined beach in Goa",
    venueCountLabel: "15+ curated venues",
    popularTypes: ["Beach Resort", "Private Villa", "Cliff-top Lawn", "Hotel"],
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    tagline: "High-capacity venues that run on time.",
    description:
      "Chattarpur estates, Manesar resorts and Lutyens hotels — Delhi NCR suits large guest lists and winter weddings.",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "India Gate in New Delhi",
    venueCountLabel: "25+ curated venues",
    popularTypes: ["Banquet", "Farmhouse Lawns", "Resort", "Hotel"],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    tagline: "Ballrooms, rooftops and sea breeze.",
    description:
      "Mumbai venues skew indoor and vertical — ballrooms, rooftops and sea-facing hotels ideal for receptions and sangeets.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Mumbai skyline at dusk",
    venueCountLabel: "14+ curated venues",
    popularTypes: ["Ballroom", "Rooftop", "Hotel", "Waterfront"],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    tagline: "Garden weather, all year.",
    description:
      "Bangalore's estates and resorts suit outdoor functions through most of the year, with strong options for pre-wedding carnivals.",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Green gardens in Bangalore",
    venueCountLabel: "10+ curated venues",
    popularTypes: ["Resort", "Garden", "Villa", "Hotel"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-wedding-venue-india",
    title: "How to choose a wedding venue in India (without regrets)",
    excerpt:
      "Capacity, seasonality, guest logistics and food — the four decisions that matter before you pay an advance.",
    category: "Venue selection",
    author: "Venue On My Plate Studio",
    publishedOn: "2026-08-14",
    readingMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Dressed wedding table with florals and candles",
    body: [
      "Start with your guest count and season, not with photographs. A venue that holds 1200 guests in December may be unusable for the same gathering in May.",
      "Visit with a checklist: power backup, kitchen placement, bridal changing rooms, parking for baraat movement, and noise cut-off timings. These five decide guest comfort more than decor does.",
      "Ask for two quotes — venue-only and venue-plus-catering — and confirm what the advance locks: dates, spaces, rooms and price validity. Get it in writing before you announce dates.",
    ],
  },
  {
    slug: "udaipur-destination-wedding-cost-guide",
    title: "Udaipur destination wedding: a practical cost guide",
    excerpt: "What a 2-day palace wedding actually involves — venues, rooms, logistics and where couples overspend.",
    category: "Destination weddings",
    author: "Venue On My Plate Studio",
    publishedOn: "2026-09-02",
    readingMinutes: 10,
    image:
      "/images/udaipur-palace2.jpg",
    imageAlt: "City Palace architecture in Udaipur",
    body: [
      "Udaipur weddings typically split across a welcome dinner, haldi/sangeet and the wedding day. Room inventory near Lake Pichola sells out first — lock rooms before you lock decor.",
      "The biggest cost surprises are guest transport, sound-and-light after 10 pm permissions, and vendor stay. Ask your venue for all three in writing.",
      "If your list is under 200 guests, consider a haveli or villa buyout instead of a palace — you get privacy at a calmer pace.",
    ],
  },
  {
    slug: "outdoor-vs-indoor-wedding-venue",
    title: "Outdoor vs indoor venue: making the right call",
    excerpt: "Weather risk, sound limits and guest comfort — how to decide between lawns and ballrooms.",
    category: "Planning",
    author: "Venue On My Plate Studio",
    publishedOn: "2026-07-20",
    readingMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Wedding details captured in warm light",
    body: [
      "Outdoor venues photograph beautifully but carry weather and sound-curfew risk. Always ask for a wet-weather plan and the exact music cut-off time.",
      "Indoor venues control climate and timelines. For May–June and peak winter nights in the north, a pillarless hall with an attached lawn is the safest hybrid.",
      "Whatever you choose, walk the guest journey once — entry, seating, food counters, washrooms and exit — before signing.",
    ],
  },
];

export const generalFaqs: Faq[] = [
  {
    question: "What does Venue On My Plate do?",
    answer:
      "We help you discover venues and shortlist the right ones for your date, guest count and budget. Share your requirements once and our team responds with curated options and proposal assistance.",
  },
  {
    question: "Is there a fee for your help?",
    answer:
      "Discovery and shortlisting assistance is free for customers. Venues may share commercial terms directly with you before you confirm — nothing is booked without your written approval.",
  },
  {
    question: "How fast will I hear back?",
    answer:
      "Most enquiries receive a first response within one business day. During peak wedding season it can take slightly longer — include your event date so we can prioritise.",
  },
  {
    question: "Can you help with destination weddings?",
    answer:
      "Yes — Udaipur, Jaipur and Goa are our most requested circuits. We help sequence venues across functions (haldi, sangeet, wedding) and flag room and logistics constraints early.",
  },
  {
    question: "Do you handle decor, catering or planning?",
    answer:
      "No — we provide venues only. Venues may have in-house catering or preferred decor partners, and we flag those options during shortlisting, but you contract any additional vendors directly.",
  },
  {
    question: "How early should we book our venue?",
    answer:
      "For peak-season weekends (November–February), begin 9–12 months ahead — palace venues and lake-facing resorts sell out first. Off-season dates can often be arranged in 6–8 weeks with better negotiating room.",
  },
  {
    question: "Are there hidden costs beyond the quote?",
    answer:
      "No — every proposal we arrange itemises venue rental, catering, decor, sound-and-light, permissions and taxes separately. If a charge appears that was not in your written quote, we take it up with the venue before you pay.",
  },
  {
    question: "How do advance payments work?",
    answer:
      "A 20–30% advance typically locks your date, with the balance on milestones. We make sure your confirmation letter covers dates, spaces, rooms, price validity and postponement terms before any money moves.",
  },
  {
    question: "Can you negotiate better prices for us?",
    answer:
      "Yes — venues quote differently by date, occupancy and function mix. Share any quote you already have and we will benchmark it across 2–3 comparable venues and negotiate the inclusions, not just the headline number.",
  },
];
