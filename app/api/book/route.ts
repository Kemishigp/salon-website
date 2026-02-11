import { NextResponse } from 'next/server';
import { auth } from "../../lib/auth"; 
import { headers } from "next/headers";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, error: "You must be logged in to book" }, 
      { status: 401 }
    );
  }

  const body = await request.json();
  const { start } = body; 

  const apiKey = process.env.CAL_API;
  const eventTypeId = 4717703; 

  try {
const response = await fetch(`https://api.cal.com/v1/bookings?apiKey=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventTypeId: eventTypeId,
        start: start,
        timeZone: "UTC",
        language: "en",
        metadata: {},
        responses: {
          name: session.user.name,  
          email: session.user.email, 
          notes: "" 
        }
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      // Log the full error to the terminal so you can see if anything else is missing
      console.error("Cal.com API Error:", data);
      return NextResponse.json({ success: false, error: data.message || "API Error" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Booking failed" }, { status: 500 });
  }
}