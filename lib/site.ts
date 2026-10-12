/**
 * ONE PLACE TO MANAGE THE SITE.
 * Edit values here — header, footer, contact page and CTAs update everywhere.
 * Leave whatsapp empty ("") to hide the WhatsApp button until you have a number.
 */
export const SITE = {
  name: "Venue On My Plate",
  tagline: "Find a venue worthy of your occasion.",
  email: "hello@venueonmyplate.in",
  phoneDisplay: "+91 94624 60555",
  phoneHref: "tel:+919462460555",
  whatsapp: "",
  hours: "Mon–Sat, 10am–7pm IST",
  responseNote: "Within one business day",
  destinations: ["Udaipur", "Jaipur", "Goa", "Delhi NCR", "Mumbai", "Bangalore"],
  stats: [
    ["06", "Destination circuits"],
    ["90+", "Curated venues"],
    ["01 day", "First shortlist"],
  ] as Array<[string, string]>,
} as const;
