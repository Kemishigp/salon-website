"use client"; // REQUIRED for useState
import { useState } from "react";
import Link from "next/link";

const bookingOpt = [
  {
    Category: "Service",
    Options: ["Blowout", "Full Custom Blonding", "Women's Cut", "Hair Extensions", "Highlights"]
  },
  {
    Category: "Professional",
    Options: ["Any Professional", "Dave", "Alison", "Ashley", "Olivia"]
  }
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPro, setSelectedPro] = useState("");

  // Construct the URL with the selections
  const nextUrl = `/booking/schedule?service=${encodeURIComponent(selectedService)}&pro=${encodeURIComponent(selectedPro)}`;

  return (
    <main className="flex flex-col items-center bg-black/90 pt-30 text-white p-20 ">
       {/* flex-col items-center pt-30 bg-black/90 text-white min-h-screen p-20 text-center min-w-screen */}
      <h1 className="font-serif text-5xl uppercase mb-12">Book Your Session</h1>
      
      <div className=" items-center justify-center md:flex-row gap-6 max-w-2xl">
        {/* Service Select */}
        <div className="flex flex-col flex-1 gap-2 text-left">
          <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Select a Service</label>
          <select 
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className=" w-md rounded-md bg-black text-white border border-zinc-800 p-4 outline-none focus:border-white transition-colors appearance-none"
          >
            <option value="" disabled>Select...</option>
            {bookingOpt[0].Options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <h1 className="flex justify-center font-serif text-xl py-5 uppercase">&</h1>

        {/* Professional Select */}
        <div className="flex flex-col flex-1 gap-2 text-left">
          <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Select a Professional</label>
          <select 
            value={selectedPro}
            onChange={(e) => setSelectedPro(e.target.value)}
            className=" rounded-md bg-black text-white border border-zinc-800 p-4 outline-none focus:border-white transition-colors appearance-none"
          >
            <option value="" disabled>Select...</option>
            {bookingOpt[1].Options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Only allow clicking Next if a service is selected */}
      <Link href={selectedService ? nextUrl : "#"}>
        <button 
          type="button" 
          disabled={!selectedService}
          className={`flex py-2 px-10 mt-12 rounded-full font-sans font-bold border border-white transition-all
            ${selectedService 
              ? "bg-transparent hover:bg-white hover:text-black cursor-pointer" 
              : "opacity-30 cursor-not-allowed"}
          `}
        >
          - Next -
        </button>
      </Link>
    </main>
  );
}