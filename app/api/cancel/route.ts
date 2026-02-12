// api/cancel/route.ts
// Imports
import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth"; 
import { headers } from "next/headers";
import { prisma } from "../../lib/auth";

// Start function
export async function DELETE(request: Request) {
  // Get user info
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { bookingId } = await request.json();

  try {
    // 1. Tell Cal.com to cancel
    const calRes = await fetch(`https://api.cal.com/v2/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        // MAKE SURE THIS MATCHES YOUR .env VARIABLE (CAL_API vs CAL_API_KEY)
        'Authorization': `Bearer ${process.env.CAL_API}`, 
        'Content-Type': 'application/json',
        'cal-api-version': '2024-06-11' 
      },
      
      body: JSON.stringify({ cancellationReason: "Cancelled by user via website" })
    });

    // CHECK IF CAL.COM ACTUALLY CANCELLED IT
    if (!calRes.ok) {
        const errorText = await calRes.text();
        console.error("Cal.com Error:", errorText);
        return NextResponse.json({ error: "External calendar failed to release slot" }, { status: calRes.status });
    }

    // 2. Only if Cal.com succeeded, update Prisma
    await prisma.appointment.updateMany({
      where: { 
        externalId: bookingId,
        userEmail: session.user.email 
      },
      data: { status: "CANCELLED" }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Cancel Error:", error);
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}