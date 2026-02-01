"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is where your authentication logic will live
    try {
      // Example: const res = await signIn('credentials', { email, password });
      console.log("Logging in with:", email, password);
      
      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false);
        router.push('/booking'); // Redirect after success
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tighter text-white">
            Welcome Back
          </h2>
          <p className="mt-4 text-gray-500 font-sans text-sm tracking-widest uppercase">
            Sign in to manage your appointments
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-white transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest">
                Email Address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-white transition-colors peer"
                placeholder=" "
              />
              <label className="absolute left-0 top-3 text-gray-500 pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-white peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase tracking-widest">
                Password
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-full uppercase text-xs tracking-[0.2em] font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
            
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500 font-sans">
              <button type="button" className="hover:text-white transition-colors">Forgot Password?</button>
              <button type="button" className="hover:text-white transition-colors">Create Account</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}