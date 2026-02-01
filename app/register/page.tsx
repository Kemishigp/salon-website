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
        </form>
      </div>
    </div>
  );
}