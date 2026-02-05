// register/page.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "../lib/auth-client";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New field for registration
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/booking",
    }, {
      onError: (ctx) => {
        alert(ctx.error.message);
        setIsLoading(false);
      },
      onSuccess: () => {
        router.push("/booking");
      }
    });
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/booking",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-serif uppercase tracking-tighter text-white">Join Us</h2>
          <p className="mt-4 text-gray-500 font-sans text-sm tracking-widest uppercase">Create your salon account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-10">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="relative group">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-white transition-colors peer" placeholder=" " />
              <label className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest">Full Name</label>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-white transition-colors peer" placeholder=" " />
              <label className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest">Email Address</label>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-white transition-colors peer" placeholder=" " />
              <label className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest">Password</label>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-white text-black py-4 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-gray-200 transition-all">
            {isLoading ? "Creating Account..." : "Register"}
          </button>
          <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full border border-white/20 text-white py-4 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
            Sign Up With Google
          </button>

        </form>
      </div>
    </div>
  );
}