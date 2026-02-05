// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
// Change from 'better-auth/next-js' to 'better-auth/cookies'
import { getSessionCookie } from "better-auth/cookies"; 

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie && request.nextUrl.pathname.startsWith("/booking")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/booking/:path*"],
};