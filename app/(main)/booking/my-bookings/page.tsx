import { prisma } from "../../../lib/auth";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { FadeIn } from "../../../src/components/animations/FadeIn";
import CancelButton from "../../../src/components/CancelButton";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const now = new Date();
  
  const bookings = await prisma.appointment.findMany({
where: { 
    userEmail: session?.user.email,
    startTime: {
      gt: now }
  }
});

  const pastBookings = await prisma.appointment.findMany({
where: { 
    userEmail: session?.user.email,
    startTime: {
      lt: now }
  }
});

  return (
    <main className="bg-white/10 min-h-screen pt-32 px-6 lg:px-16 text-white">
      <FadeIn>
        <h1 className="text-5xl font-serif uppercase mb-12">My Appointments</h1>
      </FadeIn>

      <div className="space-y-6 max-w-2xl">
        <h2 className="font-geist text-lg">Upcoming</h2>
        {bookings.map((booking) => (
          <div key={booking.id} className="border border-white/10 p-6 rounded-2xl bg-zinc-600/50 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{booking.status}</p>
              <h3 className="text-xl font-serif">{booking.userName}</h3>
              <p className="text-sm text-gray-400">
                {new Date(booking.startTime).toLocaleDateString()} at {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
            {booking.status === "CONFIRMED" && (
                <CancelButton bookingId={booking.externalId} />)}
          </div>
        ))}
        <h2 className="font text-lg">Past</h2>
                {pastBookings.map((booking) => (
          <div key={booking.id} className="border border-white/10 p-6 rounded-2xl bg-zinc-800/50 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{booking.status}</p>
              <h3 className="text-xl font-serif">{booking.userName}</h3>
              <p className="text-sm text-gray-400">
                {new Date(booking.startTime).toLocaleDateString()} at {new Date(booking.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}