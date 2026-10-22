import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOST = "vomp-media.s3.ap-south-1.amazonaws.com";
const FALLBACK_IMAGE = "/images/hero-poster.jpg";

function fallback(request: NextRequest) {
  return NextResponse.redirect(new URL(FALLBACK_IMAGE, request.url));
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("src");
  if (!raw) return new NextResponse("Missing image source", { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new NextResponse("Invalid image source", { status: 400 });
  }

  if (target.protocol !== "https:" || target.hostname !== ALLOWED_HOST) {
    return new NextResponse("Image source not allowed", { status: 403 });
  }

  try {
    const upstream = await fetch(target, {
      next: { revalidate: 31_536_000 },
      signal: AbortSignal.timeout(15_000),
    });

    const contentType = upstream.headers.get("content-type") || "";
    if (!upstream.ok || !contentType.startsWith("image/")) {
      return fallback(request);
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return fallback(request);
  }
}
