import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  tone = "dark",
  compact = false,
  full = false,
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  full?: boolean;
}) {
  void tone;
  const src = full ? "/images/official-logo.png" : "/images/official-logo-256.png";
  return (
    <Link
      href="/"
      aria-label="Venue On My Plate — home"
      className="group inline-flex items-center gap-2.5 leading-none"
    >
      <span className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-[#d4a437]/60 shadow-[0_8px_24px_-10px_rgba(92,10,32,0.45)]">
        <Image
          src={src}
          alt="Venue On My Plate"
          width={full ? 480 : 420}
          height={full ? 480 : 420}
          priority
          unoptimized
          className={cn(
            "object-cover transition-transform duration-300 group-hover:scale-[1.04]",
            full ? "h-24 w-24 md:h-28 md:w-28" : compact ? "h-10 w-10" : "h-11 w-11 md:h-12 md:w-12"
          )}
        />
      </span>
      {!compact && (
        <span className="flex flex-col">
          <span
            className={cn(
              "font-display font-bold tracking-tight text-[#5c0a20]",
              full ? "text-2xl md:text-3xl" : "text-[17px] md:text-[19px]"
            )}
          >
            Venue <span className="text-[#a67c1a]">On My Plate</span>
          </span>
          <span className="mt-0.5 text-[9px] font-bold tracking-[0.3em] text-[#a67c1a] uppercase md:text-[10px]">
            Luxury venues · India
          </span>
        </span>
      )}
    </Link>
  );
}
