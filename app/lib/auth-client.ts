import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Better Auth detects your base URL automatically in Next.js
});