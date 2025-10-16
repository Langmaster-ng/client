import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Allow these paths to load normally
  if (
    url.pathname.startsWith("/waitlist") ||
    url.pathname.startsWith("/_next") || // Next.js internals
    url.pathname.startsWith("/api") || // API routes
    url.pathname.startsWith("/static") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.startsWith("/robots") ||
    url.pathname.startsWith("/sitemap")
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect everything else to /waitlist
  url.pathname = "/waitlist";
  return NextResponse.redirect(url);
}

// Apply middleware to all routes except assets
export const config = {
  matcher: [
    "/((?!_next|api|static|waitlist|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
