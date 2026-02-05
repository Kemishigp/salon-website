// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; 

export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie && request.nextUrl.pathname.includes("/booking")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// middleware.ts
export const config = {
    // This ensures it matches exactly "/booking" AND any sub-paths "/booking/..."
    matcher: ["/booking", "/booking/:path*"],
};