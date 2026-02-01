// Import better auth
import { betterAuth } from "better-auth";
// Using prisma
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
// cookies
import { nextCookies } from "better-auth/next-js"

// 1. Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// 2. Create the Prisma 7 adapter
const adapter = new PrismaPg(pool);
// 3. Initialize Prisma with the adapter
const prisma = new PrismaClient({ adapter });

// betterAuth with login logic
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: { 
        enabled: true, 
    },
    // Optional: Add social login for easy onboarding
    socialProviders: { 
       github: { 
         clientId: process.env.GITHUB_CLIENT_ID!, 
         clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
       }, 
              google: { 
         clientId: process.env.GOOGLE_CLIENT_ID!, 
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
       }, 
    },
    plugins: [nextCookies()]
});
