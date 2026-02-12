// api/book/route.ts
// Create a booking
import { NextResponse } from 'next/server';
import { auth, prisma } from "../../lib/auth"; 
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const service = searchParams.get('service') ?? "General Service";
  const pro = searchParams.get('pro') ?? "Any";
  console.log("Service received from URL:", service);
  const userEmail = session.user.email;
    console.log("Stylist received from URL:", pro);

  const now = new Date();

  try {
    // 1. Check for active (future) appointments in your Appointment model
    const activeAppointmentCount = await prisma.appointment.count({
      where: {
        userEmail: userEmail,
        startTime: {
          // Greater than now = future/active
          gt: now, 
        },
        // Matches your default status
        status: "CONFIRMED", 
      },
    });

    if (activeAppointmentCount >= 2) {
      return NextResponse.json({ 
        success: false, 
        error: "You already have 2 upcoming appointments. Please complete or cancel one before booking again." 
      }, { status: 403 });
    }

    const body = await request.json();
    const { start } = body;

    // 2. Call Cal.com API (V2)
    const response = await fetch(`https://api.cal.com/v2/bookings`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.CAL_API}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        eventTypeId: 4717703,
        start: start,
        timeZone: "UTC",
        language: "en",
        metadata: {},
        responses: {
          name: session.user.name,
          email: userEmail,
        }
      }),
    });

// Inside your POST /api/book route
const data = await response.json();

if (response.ok) {
  const calUid = data.data.uid;
  await prisma.appointment.create({
    data: {
      // CHANGE THIS: Save data.data.uid instead of data.data.id
      externalId: String(calUid), 
      userEmail: userEmail,
      userName: session.user.name || "Guest",
      startTime: new Date(start),
      Service: service,
      Stylist: pro,
      endTime: new Date(new Date(start).getTime() + 60 * 60 * 1000), 
      status: "CONFIRMED"
    }
  });

      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, error: data.message }, { status: 400 });
    }
  } catch (error) {
    console.error("Booking Logic Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}