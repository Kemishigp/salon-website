import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function BookingPage() {
  const { isAuthenticated } = getKindeServerSession();
  
  // If the user isn't logged in, send them to the Kinde login page
  if (!(await isAuthenticated())) {
    redirect("/login");
  }

  return (
    <main className="pt-30 bg-black text-white min-h-screen p-20">
      <h1 className="font-serif text-5xl uppercase">Book Your Session</h1>
      {/* Your scheduling logic goes here */}
    </main>
  );
}