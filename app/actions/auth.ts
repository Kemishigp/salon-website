"use server"; // Tells Next.js this code only runs on the server

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";


export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. DATABASE CHECK (Placeholder)
  // In a real app, you would fetch the user from your DB:
  // const user = await db.user.findUnique({ where: { email } });
  
  // 2. PASSWORD VALIDATION (Example: using bcrypt)
  // const isValid = await bcrypt.compare(password, user.passwordHash);

  // For now, let's simulate a success
  if (email === "test@salon.com" && password === "password123") {
    
    // 3. CREATE A SESSION COOKIE
    // This is the "proof" the user is logged in
    (await cookies()).set('session', 'your-secure-token-here', {
      httpOnly: true, // Prevents hackers from stealing the cookie via JS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return { success: true };
  }

  return { error: "Invalid email or password" };
}