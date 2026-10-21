import type { Metadata } from "next";
import localFont from "next/font/local";
import ConciergeChat from "@/components/chat/ConciergeChat";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WelcomeNotice from "@/components/chat/WelcomeNotice";
import { getVenues } from "@/lib/api";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const body = localFont({
  src: "../../public/fonts/inter-latin-var.woff2",
  variable: "--font-inter",
  weight: "400 700",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://venueonmyplate.in"),
  title: {
    default: "Venue On My Plate — Find a venue worthy of your occasion",
    template: "%s | Venue On My Plate",
  },
  description:
    "Discover exceptional wedding and celebration venues across India. Curated palaces, resorts, lawns and ballrooms — plus a personal shortlist on request.",
  alternates: { canonical: "https://venueonmyplate.in/" },
  openGraph: {
    type: "website",
    siteName: "Venue On My Plate",
    locale: "en_IN",
    url: "https://venueonmyplate.in/",
    title: "Venue On My Plate — Find a venue worthy of your occasion",
    description:
      "Discover exceptional wedding and celebration venues across India. Curated palaces, resorts, lawns and ballrooms.",
    images: [{ url: "https://venueonmyplate.in/images/og-cover.svg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/images/brand-logo-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#5c0a20",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const venues = await getVenues();
  return (
    <html lang="en-IN" className={body.variable}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ConciergeChat venues={venues} />
        <WelcomeNotice />
      </body>
    </html>
  );
}
