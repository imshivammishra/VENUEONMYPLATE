import Image from "next/image";

/**
 * Minimal route preloader — brand mark with a thin progress ring.
 * Shown by Next.js during navigations (see layout). Kept feather-light
 * so it appears instantly.
 */
export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center gap-5"
      aria-busy="true"
      aria-label="Loading page"
      role="status"
    >
      <Image
        src="/images/brand-mark.png"
        alt=""
        width={120}
        height={90}
        priority
        className="h-16 w-auto animate-pulse object-contain"
      />
      <span className="loader-ring" aria-hidden="true" />
      <p className="text-[13px] font-semibold text-[#6e6e73]">Curating venues…</p>
    </div>
  );
}
