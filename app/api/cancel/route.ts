import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth"; 
import { headers } from "next/headers";
import { prisma } from "../../lib/auth";

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bookingId } = await request.json();

  try {
    // 1. Tell Cal.com to cancel
    const calRes = await fetch(`https://api.cal.com/v2/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason: "Cancelled by user via website" })
    });

    // 2. Update your local Prisma database to mark as CANCELLED
    await prisma.appointment.updateMany({
      where: { 
        externalId: bookingId,
        userEmail: session.user.email 
      },
      data: { status: "CANCELLED" }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}