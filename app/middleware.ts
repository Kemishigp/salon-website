// import { betterFetch } from "@better-auth/fetch";
import { auth } from "./lib/auth";
import { NextResponse, type NextRequest } from "next/server";

import { headers } from "next/headers";

const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})




// type Session = typeof auth.$Infer.Session;

// export default async function middleware(request: NextRequest) {
//   // 1. Check for session using Better Auth's optimized fetch
//   const { data: session } = await betterFetch<Session>(
//     "/api/auth/get-session",
//     {
//       baseURL: request.nextUrl.origin,
//       headers: {
//         // We must pass the cookies from the request so the server knows who the user is
//         cookie: request.headers.get("cookie") || "",
//       },
//     }
//   );

//   // 2. If no session exists and user is trying to access /booking
//   if (!session && request.nextUrl.pathname.startsWith("/booking")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// // 3. Only run middleware on specific routes to save performance
// export const config = {
//   matcher: ["/booking/:path*"],
// };