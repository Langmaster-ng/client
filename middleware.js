import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1️⃣ Allow internal & static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico)$/)
  ) {
    return NextResponse.next();
  }

  // 2️⃣ Admin routes protection
  if (pathname.startsWith("/admin")) {
    // Allow admin login page
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    // Protect other admin pages
    const token = request.cookies.get("lm_admin")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 3️⃣ Public pages (allowed freely)
  // waitlist, linktree, landing, learners, lessons, dashboard, etc.
  return NextResponse.next();
}

/**
 * Apply middleware broadly, but exclude static filesh
 */
export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
