
import Link from "next/link"
const bookingOpt = [
  {
    Category: "Service",
    Options: [,"Blowout","Full Custom Blonding","Women's Cut","Hair Extensions","Highlights"]
  },
    {
    Category: "Professional",
    Options: ["Any Professional","Dave","Alison","Ashley","Olivia"]
  }
]

export default async function BookingPage() {
  return (
<main className="flex flex-col items-center pt-30 bg-black/90 text-white min-h-screen p-20 text-center">
  <h1 className="font-serif text-5xl uppercase mb-12">Book Your Session</h1>
  {/* Select boxes */}
  <div className=" md:flex-row gap-6 w-md max-w-2xl rounded-md">
    {/* Service Select */}
    <div className="flex flex-col flex-1 gap-2 text-left">
      <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Select a Service</label>
      <select className="w-full bg-black text-white border border-zinc-800  p-4 outline-none focus:border-white transition-colors appearance-none">
        <option value="" disabled selected>Select...</option>
        {bookingOpt[0].Options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
    <h1 className="font-serif text-xl py-5 uppercase">or</h1>
    {/* Professional Select */}
    <div className="flex flex-col flex-1 gap-2 text-left">
      <label className="text-xs uppercase tracking-widest text-zinc-500 ml-1">Select a Professional</label>
      <select className="w-full bg-black text-white border border-zinc-800  p-4 outline-none focus:border-white transition-colors appearance-none">
        <option value="" disabled selected>Select...</option>
        {bookingOpt[1].Options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
  <Link href="/booking/schedule">
    <button type="button" className="flex bg-zinc-810 py-2 px-6 mt-4 rounded-full font-sans font-bold border-white border hover:bg-white hover:text-black hover:pointer cursor-pointer">
     - Next -
    </button>
  </Link>
</main>
  );
}

// List display with services and Specialist
// Calendar, dates and times available
// 