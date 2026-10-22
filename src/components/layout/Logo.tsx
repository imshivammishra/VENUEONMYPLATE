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
  const light = tone === "light";

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
          className={cn(
            "absolute -inset-1 rounded-full border md:-inset-1.5",
            light ? "border-[#e7c77e]/45" : "border-[#c6a04a]/40"
          )}
        />
        <span
          className={cn(
            "relative grid place-items-center rounded-full border p-[2px] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.45)] md:p-[3px]",
            light
              ? "border-[#e7c77e]/75 bg-[#fff8e8]"
              : "border-[#c6a04a]/65 bg-[#fffaf0]"
          )}
        >
          <Image
            src={src}
            alt="Venue On My Plate"
            width={full ? 480 : 420}
            height={full ? 480 : 420}
            priority
            unoptimized
            className={cn(
              "relative shrink-0 rounded-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]",
              full
                ? "h-[96px] w-[96px] md:h-[112px] md:w-[112px]"
                : compact
                  ? "h-10 w-10"
                  : "h-[56px] w-[56px] md:h-[72px] md:w-[72px]"
            )}
          />
        </span>
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
              light
                ? "text-[#fff8e8] group-hover:text-[#f1d58c]"
                : "text-[#4a0719] group-hover:text-[#7f0f2e]"
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
              className={cn(
                "h-px flex-1",
                light
                  ? "bg-gradient-to-r from-transparent to-[#e7c77e]"
                  : "bg-gradient-to-r from-transparent to-[#c6a04a]"
              )}
            />
            <span
              className={cn(
                "font-semibold uppercase leading-none whitespace-nowrap",
                full
                  ? "text-[11px] tracking-[0.38em] md:text-[13px] md:tracking-[0.4em]"
                  : "text-[8px] tracking-[0.3em] md:text-[9px] md:tracking-[0.34em]",
                light ? "text-[#f1d58c]" : "text-[#a67c1a]"
              )}
            >
              On My Plate
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "h-px flex-1",
                light
                  ? "bg-gradient-to-l from-transparent to-[#e7c77e]"
                  : "bg-gradient-to-l from-transparent to-[#c6a04a]"
              )}
            />
          </span>
          <span
            className={cn(
              "mt-1.5 text-[6.5px] font-semibold tracking-[0.22em] uppercase md:text-[7px]",
              light ? "text-[#e7c77e]/80" : "text-[#a67c1a]/80",
              !full && "hidden md:block"
            )}
          >
            Wedding &amp; celebration venues
          </span>
        </span>
      )}
    </Link>
  );
}
