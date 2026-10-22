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
      <span className="relative flex shrink-0 items-center justify-center px-1.5 pt-1">
        <span
          aria-hidden="true"
          className="absolute -inset-x-1 -top-2 bottom-0 rounded-t-full border-x border-t border-[#c6962f]/55 md:-inset-x-2 md:-top-3 md:bottom-0"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 h-px w-[calc(100%+14px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4a437]/90 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 border border-[#a67c1a]/85 bg-[#fff8e7] md:-top-4"
        />
        <span
          aria-hidden="true"
          className="absolute inset-1 rounded-full bg-[#d4a437]/16 blur-lg transition-opacity duration-500 group-hover:opacity-100 md:opacity-70"
        />
        <Image
          src={src}
          alt="Venue On My Plate"
          width={full ? 480 : 420}
          height={full ? 480 : 420}
          priority
          unoptimized
          className={cn(
            "relative shrink-0 object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]",
            full
              ? "h-24 w-24 md:h-[116px] md:w-[116px]"
              : compact
                ? "h-11 w-11"
                : "h-[58px] w-[58px] md:h-[76px] md:w-[76px]"
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
              "font-display leading-[0.78] font-semibold tracking-[0.005em] whitespace-nowrap transition-colors duration-300",
              full ? "text-[38px] md:text-[48px]" : "text-[29px] md:text-[40px]",
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
              className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4a437]/80"
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
              className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4a437]/80"
            />
          </span>
          <span
            className={cn(
              "mt-1.5 hidden text-[7px] font-semibold tracking-[0.28em] uppercase md:block",
              tone === "light" ? "text-[#f6de9a]/70" : "text-[#a67c1a]/75"
            )}
          >
            Royal wedding atelier
          </span>
        </span>
      )}
    </Link>
  );
}
