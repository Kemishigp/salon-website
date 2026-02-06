// import { betterFetch } from "@better-auth/fetch";
import { auth } from "./lib/auth";
import { NextResponse, type NextRequest } from "next/server";

import { headers } from "next/headers";

const session = await auth.api.getSession({
    headers: await headers() // Pass the headers object.
})

