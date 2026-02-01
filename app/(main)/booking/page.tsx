import { getServerSession } from "@/app/lib/get-session";
import { redirect, unauthorized } from "next/navigation";


export default async function BookingPage() {
  const session = await getServerSession();
  const user = session?.user;
  // If the user isn't logged in, send them to the Kinde login page
  if (!user) redirect('/login');


  


  return (
    <main className="pt-30 bg-black text-white min-h-screen p-20">
      <h1 className="font-serif text-5xl uppercase">Book Your Session</h1>
      {/* Your scheduling logic goes here */}
    </main>
  );
}