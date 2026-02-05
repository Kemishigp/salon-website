import { NextResponse } from "next/server";
// import {prisma} from 
import { prisma } from "../../../lib/auth"; 


export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const eventType = body.triggerEvent;
    const payload = body.payload;

    if (eventType === "BOOKING_CREATED") {
      // 1. Map the Cal.com data to the database
      await prisma.appointment.create({
        data: {
          externalId: payload.bookingId.toString(),
          userEmail: payload.attendees[0].email,
          userName: payload.attendees[0].name,
          startTime: new Date(payload.startTime),
          endTime: new Date(payload.endTime),
          status: "CONFIRMED",
        },
      });
      
      console.log("Booking saved to Neon database");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }
}