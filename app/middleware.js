import { NextResponse } from "next/server";

const isDevBypassEnabled = process.env.ADMIN_DEV_OPEN === "1";
const isProd = process.env.NODE_ENV === "production";

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

  // 2) Admin area handling
  if (pathname.startsWith("/admin")) {
    // Always allow the login page itself
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    // DEV BYPASS: if enabled and NOT in production, auto-set a temporary cookie
    if (isDevBypassEnabled && !isProd) {
      const hasToken = request.cookies.get("lm_admin")?.value;
      if (!hasToken) {
        const res = NextResponse.next();
        // set a simple, temporary cookie (client-side guarded only)
        res.cookies.set({
          name: "lm_admin",
          value: "dev-bypass-token",
          path: "/",
          sameSite: "Lax",
        });
        return res;
      }
      return NextResponse.next();
    }

    // Normal protection (no dev bypass): require cookie for all /admin/* except /admin/login
    const token = request.cookies.get("lm_admin")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3) Allow the waitlist pages as-is
  if (pathname.startsWith("/waitlist")) {
    return NextResponse.next();
  }

  // 4) Redirect everything else to /waitlist
  url.pathname = "/waitlist";
  return NextResponse.redirect(url);
}

/**
 * Run the middleware on (almost) everything, except the usual static files.
 * NOTE: /waitlist is excluded from the matcher (so it loads freely).
 */
export const config = {
  matcher: [
    "/((?!_next|api|static|waitlist|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)",
  ],
};
