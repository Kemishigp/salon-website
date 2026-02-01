import { NextResponse, type NextRequest } from "next/server";
// import { getSessionCookie } from "better-auth";
import {BetterAuthCookie} from "better-auth"

export default async function middleware(request: NextRequest) {
  // Check for the Better Auth session cookie directly
  const sessionCookie = BetterAuthCookie(request);

  const isBookingPage = request.nextUrl.pathname.startsWith("/booking");

  // If there's no cookie and they want to book, send them to login
  if (!sessionCookie && isBookingPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/booking/:path*"],
};