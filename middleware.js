import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // 1) Allow internal/static assets early
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/images") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // 2) Admin area: allow /admin/login, protect everything else with cookie
  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    const token = request.cookies.get("lm_admin")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3) Allow the waitlist & linktree pages as-is
  if (pathname.startsWith("/waitlist") || pathname.startsWith("/linktree")) {
    return NextResponse.next();
  }

  // 4) Redirect everything else to /waitlist
  url.pathname = "/waitlist";
  return NextResponse.redirect(url);
}

/**
 * Run the middleware on (almost) everything, except the usual static files.
 */
export const config = {
  matcher: [
    "/((?!_next|api|static|waitlist|linktree|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
