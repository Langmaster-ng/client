import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Always allow the waitlist page itself
  if (url.pathname.startsWith("/waitlist")) {
    return NextResponse.next();
  }

  // Otherwise, redirect everything to /waitlist
  url.pathname = "/waitlist";
  return NextResponse.redirect(url);
}

// Define the paths this middleware applies to
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * - /_next (Next.js internals)
     * - /api (API routes)
     * - /static or /public assets
     * - /waitlist (we keep this accessible)
     */
    "/((?!_next|api|static|waitlist|favicon.ico).*)",
  ],
};
