"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Sparkles, X } from "lucide-react";

interface Booking {
  couple: string;
  venue: string;
  city: string;
}

const BOOKINGS: Booking[] = [
  { couple: "Aarav & Diya", venue: "Lakeside Heritage Palace", city: "Udaipur" },
  { couple: "Kabir & Ananya", venue: "Marigold Gardens", city: "Jaipur" },
  { couple: "Vivaan & Sara", venue: "Cliffside Bay Resort", city: "Goa" },
  { couple: "Arjun & Meera", venue: "The Ivory Pavilion", city: "Delhi NCR" },
  { couple: "Dev & Ishita", venue: "Palm Court House", city: "Mumbai" },
  { couple: "Aditya & Riya", venue: "Banyan Estate", city: "Bangalore" },
  { couple: "Krishna & Pooja", venue: "Lakeside Heritage Palace", city: "Udaipur" },
  { couple: "Rohan & Sneha", venue: "Marigold Gardens", city: "Jaipur" },
  { couple: "Yash & Tanvi", venue: "Cliffside Bay Resort", city: "Goa" },
  { couple: "Nikhil & Aisha", venue: "The Ivory Pavilion", city: "Delhi NCR" },
];

const MINUTES = ["just now", "2 minutes ago", "5 minutes ago", "9 minutes ago", "14 minutes ago"];

export default function SocialProof() {
  const [welcome, setWelcome] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [when, setWhen] = useState("");
  const idx = useRef(0);

  // Premium welcome — once per session
  useEffect(() => {
    let hide: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!sessionStorage.getItem("vomp-welcomed")) {
        const t = setTimeout(() => {
          setWelcome(true);
          sessionStorage.setItem("vomp-welcomed", "1");
          hide = setTimeout(() => setWelcome(false), 9000);
        }, 2500);
        return () => {
          clearTimeout(t);
          if (hide) clearTimeout(hide);
        };
      }
    } catch {
      /* private mode — skip */
    }
  }, []);

  // Couple booking popups — first after 25s, then every 2 minutes
  useEffect(() => {
    let hide: ReturnType<typeof setTimeout> | undefined;
    let first: ReturnType<typeof setTimeout> | undefined;
    let every: ReturnType<typeof setInterval> | undefined;
    const show = () => {
      setBooking(BOOKINGS[idx.current % BOOKINGS.length]);
      setWhen(MINUTES[Math.floor(Math.random() * MINUTES.length)]);
      idx.current += 1;
      if (hide) clearTimeout(hide);
      hide = setTimeout(() => setBooking(null), 7000);
    };
    const start = () => {
      show();
      every = setInterval(show, 120000);
    };
    first = setTimeout(start, 25000);
    const onVis = () => {
      if (document.hidden) {
        if (every) clearInterval(every);
        if (hide) clearTimeout(hide);
        setBooking(null);
      } else if (!every) {
        every = setInterval(show, 120000);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (first) clearTimeout(first);
      if (every) clearInterval(every);
      if (hide) clearTimeout(hide);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      {welcome && (
        <div
          role="status"
          className="chat-pop fixed top-20 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-[#1d1d1f]/95 px-5 py-4 text-center text-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.6)] backdrop-blur"
        >
          <button
            type="button"
            onClick={() => setWelcome(false)}
            aria-label="Dismiss welcome"
            className="absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X size={14} />
          </button>
          <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.24em] text-[#f3e5c3] uppercase">
            <Sparkles size={13} /> Welcome to Venue On My Plate
          </p>
          <p className="font-display mt-1.5 text-[20px] font-semibold text-white">
            India&apos;s private venue concierge.
          </p>
          <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-white/70">
            Palaces, resorts and garden venues — shortlisted for your date, guests and budget within one business day.
          </p>
          <Link
            href="/venues"
            onClick={() => setWelcome(false)}
            className="s-btn-dark btn-sheen mt-3 inline-block rounded-full px-6 py-2 text-[13px]"
          >
            Explore venues
          </Link>
        </div>
      )}

      {booking && (
        <div
          role="status"
          className="chat-pop fixed bottom-6 left-4 z-50 flex max-w-[300px] items-start gap-3 rounded-2xl bg-white p-3.5 pr-4 shadow-[0_20px_50px_-16px_rgba(90,19,14,0.4)] ring-1 ring-[#c19a3f]/50 md:left-6"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#7a1e16]/10">
            <BadgeCheck size={19} className="text-[#7a1e16]" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] leading-snug text-[#1d1d1f]">
              <span className="font-semibold">{booking.couple}</span> just requested a proposal for{" "}
              <span className="font-semibold">{booking.venue}</span>, {booking.city}
            </p>
            <p className="mt-1 text-[11px] text-[#6e6e73]">
              {when} · Verified enquiry
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBooking(null)}
            aria-label="Dismiss notification"
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[#6e6e73] transition hover:bg-black/5 hover:text-black"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </>
  );
}
