import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({
  tone = "dark",
  compact = false,
  full = false,
  align = "start",
}: {
  tone?: "dark" | "light";
  compact?: boolean;
  full?: boolean;
  align?: "start" | "center";
}) {
  const src = full ? "/images/brand-logo.png" : "/images/brand-logo-256.png";

  return (
    <Link
      href="/"
      aria-label="Venue On My Plate — home"
      className={cn(
        "group inline-flex items-center leading-none",
        compact ? "gap-0" : "gap-2.5 md:gap-3.5",
        align === "center" && "justify-center text-center"
      )}
    >
      <span className="relative shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[#d4a437]/18 blur-xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[#d4a437]/35 shadow-[inset_0_0_0_3px_rgba(255,253,248,0.55)]"
        />
        <Image
          src={src}
          alt="Venue On My Plate"
          width={full ? 480 : 420}
          height={full ? 480 : 420}
          priority
          unoptimized
          className={cn(
            "relative shrink-0 object-contain transition-transform duration-500 ease-out group-hover:scale-[1.035]",
            full
              ? "h-24 w-24 md:h-[116px] md:w-[116px]"
              : compact
                ? "h-11 w-11"
                : "h-[58px] w-[58px] md:h-[80px] md:w-[80px]"
          )}
        />
      </span>

      {!compact && (
        <span
          className={cn(
            "flex min-w-0 flex-col",
            align === "center" ? "items-center" : "items-start"
          )}
        >
          <span
            className={cn(
              "font-display leading-[0.8] font-semibold tracking-[0.01em] whitespace-nowrap transition-colors duration-300",
              full ? "text-[38px] md:text-[48px]" : "text-[29px] md:text-[38px]",
              tone === "light" ? "text-white" : "text-[#5c0a20] group-hover:text-[#7f0f2e]"
            )}
          >
            Venue
          </span>

          <span
            className={cn(
              "flex w-full items-center",
              full ? "mt-2.5 gap-3" : "mt-1 gap-1.5 md:mt-1.5 md:gap-2"
            )}
          >
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4a437]/70"
            />
            <span
              className={cn(
                "font-semibold uppercase leading-none whitespace-nowrap",
                full
                  ? "text-[11px] tracking-[0.38em] md:text-[13px] md:tracking-[0.4em]"
                  : "text-[8px] tracking-[0.3em] md:text-[9px] md:tracking-[0.34em]",
                tone === "light" ? "text-[#f6de9a]" : "text-[#a67c1a]"
              )}
            >
              On My Plate
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4a437]/70"
            />
          </span>
        </span>
      )}
    </Link>
  );
}
