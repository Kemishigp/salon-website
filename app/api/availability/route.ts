import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get('month'); 
  const year = searchParams.get('year');  

  if (!month || !year) {
    return NextResponse.json({ error: "Missing month or year" }, { status: 400 });
  }

  const apiKey = process.env.CAL_API;
  const eventTypeId = "4717703";

  // Full ISO Timestamps
  const startTime = `${year}-${month}-01T00:00:00Z`;
  
  // Calculate the last day of the month
  const lastDay = new Date(Number(year), Number(month), 0).getDate();
  const endTime = `${year}-${month}-${lastDay}T23:59:59Z`;

  try {
    // UPDATED TO V2 URL
    const url = `https://api.cal.com/v2/slots/available?eventTypeId=${eventTypeId}&startTime=${startTime}&endTime=${endTime}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`, // V2 often prefers Bearer token or apiKey header
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 } // Disable caching to ensure slots "stick"
    });

    const data = await response.json();
    return NextResponse.json(data.data?.slots || data.slots || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch slots" }, { status: 500 });
  }
}