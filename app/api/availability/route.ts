// app/api/availability/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); // e.g., "02"
  const year = searchParams.get('year');   // e.g., "2026"

  const apiKey = process.env.CAL_API;
  const eventTypeId = "4717703"; 

  // We set startTime to the 1st and endTime to the 31st.
  // Cal.com is smart enough to handle months shorter than 31 days.
  const startTime = `${year}-${month}-01T00:00:00Z`;
  const endTime = `${year}-${month}-31T23:59:59Z`;

  const url = `https://api.cal.com/v1/slots?apiKey=${apiKey}&eventTypeId=${eventTypeId}&startTime=${startTime}&endTime=${endTime}`;

  try {
    const response = await fetch(url, { next: { revalidate: 60 } });
    const data = await response.json();
    
    // Return the slots object
    return NextResponse.json(data.slots || {}); 
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch slots' }, { status: 500 });
  }
}