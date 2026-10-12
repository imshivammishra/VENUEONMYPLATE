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
  return (
    <Link
      href="/"
      aria-label="Venue On My Plate — home"
      className="group inline-block leading-none"
    >
      <Image
        src="/images/logo.svg"
        alt="Venue On My Plate"
        width={full ? 480 : 420}
        height={full ? 240 : 210}
        priority
        unoptimized
        className={cn(
          "w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]",
          full ? "h-32 md:h-40" : compact ? "h-14" : "h-20 md:h-24"
        )}
      />
    </Link>
  );
}
