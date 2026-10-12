"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { CITIES, EVENT_TYPES, GUEST_BANDS } from "@/lib/validations";

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (eventType) params.set("event", eventType);
    if (guests) params.set("guests", guests);
    if (date) params.set("date", date);
    const qs = params.toString();
    router.push(`/venues${qs ? `?${qs}` : ""}`);
  }

  const field =
    "w-full bg-transparent text-[15px] text-[#1d1d1f] focus:outline-none cursor-pointer";
  const labelCls = "block text-[12px] font-medium text-[#6e6e73]";

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Search venues"
      className="w-full rounded-[20px] bg-white p-2 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] ring-1 ring-black/5 md:rounded-full"
    >
      <div className="grid gap-1 md:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] md:items-center md:divide-x md:divide-black/10">
        <label className="rounded-2xl px-5 py-3 transition hover:bg-black/5 md:rounded-full">
          <span className={labelCls}>Location</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City" className={`${field} mt-0.5`}>
            <option value="">Select city</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-5 py-3 transition hover:bg-black/5 md:rounded-full">
          <span className={labelCls}>Occasion</span>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)} aria-label="Event type" className={`${field} mt-0.5`}>
            <option value="">Wedding, corporate…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-5 py-3 transition hover:bg-black/5 md:rounded-full">
          <span className={labelCls}>Guests</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} aria-label="Guests" className={`${field} mt-0.5`}>
            <option value="">Any size</option>
            {GUEST_BANDS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-5 py-3 transition hover:bg-black/5 md:rounded-full">
          <span className={labelCls}>Dates</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} aria-label="Event date" className={`${field} mt-0.5`} />
        </label>
        <div className="p-1.5">
          <button type="submit" className="s-btn-dark btn-sheen flex min-h-[52px] w-full items-center justify-center gap-2 px-8 py-3 text-[15px] whitespace-nowrap md:w-auto">
            <Search size={17} /> Match venues
          </button>
        </div>
      </div>
    </form>
  );
}
