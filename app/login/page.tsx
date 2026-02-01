"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from "../lib/auth-client"; // Import the client
import Link from 'next/link';


export default function LoginForm() {
  // declare constants
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // Declare authclient object sign in with email
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL: "/booking", // Where to go after success
  }, {
    onRequest: () => setIsLoading(true),
    onSuccess: () => {
      setIsLoading(false);
      router.push("/booking");
    },
    onError: (ctx) => {
      setIsLoading(false);
      alert(ctx.error.message); // Better Auth gives helpful error messages
    }
  });
  // Sign in with social providers
  await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "github",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/booking", 
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * disable the automatic redirect to the provider. 
     * @default false
     */
    disableRedirect: true,
});
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
              <Link href="/register" className="hover:text-white transition-colors cursor-pointer">
              Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}