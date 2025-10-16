import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // ✅ Allow certain paths to load normally
  if (
    url.pathname.startsWith("/waitlist") ||
    url.pathname.startsWith("/_next") || // internal Next.js
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/static") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.startsWith("/robots") ||
    url.pathname.startsWith("/sitemap") ||
    url.pathname.startsWith("/images") || // ✅ add your public/images folder
    url.pathname.endsWith(".png") || // ✅ allow pngs
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // ✅ Redirect all other routes to /waitlist
  url.pathname = "/waitlist";
  return NextResponse.redirect(url);
}

// Apply globally except static routes
export const config = {
  matcher: [
    "/((?!_next|api|static|waitlist|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
