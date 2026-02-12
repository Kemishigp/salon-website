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

  const userEmail = session.user.email;
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

    const data = await response.json();

    if (response.ok) {
      // 3. Save to your Appointment table using your schema fields
      await prisma.appointment.create({
        data: {
          externalId: String(data.data.id), // Storing Cal.com ID
          userEmail: userEmail,
          userName: session.user.name || "Guest",
          startTime: new Date(start),
          // Cal.com V2 usually returns end time, or you can estimate +30/60 mins
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