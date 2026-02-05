import { NextResponse, NextRequest } from 'next/server'
import { authClient } from "@/app/lib/auth-client";

export default async function BookingPage(request: NextRequest) {
  return (
    <main className="pt-30 bg-black text-white min-h-screen p-20">
      <h1 className="font-serif text-5xl uppercase">Book Your Session</h1>
      {/* Your scheduling logic goes here */}
    </main>
  );
}