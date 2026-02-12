// booking/schedule/page.tsx
"use client";
import { useRouter } from 'next/navigation'; // Use 'next/router' if using Pages router


import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
  const router = useRouter();
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  const [currDate, setCurrDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [availability, setAvailability] = useState<any>(null);

  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();
useEffect(() => {
  const getSlots = async () => {
    // Pad the month to ensure it matches the API expectations
    const paddedMonth = String(currMonth + 1).padStart(2, '0');
    try {
      // Call the api route
      const res = await fetch(`/api/availability?month=${paddedMonth}&year=${currYear}`);
      const data = await res.json();
      
      console.log("Frontend received slots:", data);
      setAvailability(data); 
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  getSlots();
}, [currMonth, currYear]);
const handleSlotClick = async (time: string) => {
  // 1. Run your booking logic
  await handleBooking(time);
  
  // 2. Navigate manually after the booking is processed
  router.push('/booking/my-bookings');
};

  const changeMonth = (direction: 'prev' | 'next') => {
    setSelectedDay(null);
    const newDate = new Date(currYear, direction === 'prev' ? currMonth - 1 : currMonth + 1, 1);
    setCurrDate(newDate);
  };

  const renderDays = () => {
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    const days = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(<li key={`prev-${i}`} className="text-zinc-800 p-2 text-sm list-none">{lastDateofLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
// Inside your renderDays loop (for the current month's days)
const dateKey = `${currYear}-${String(currMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

// Check if this specific day has slots in the JSON data
const dayData = availability && availability[dateKey];
const hasSlots = dayData && dayData.length > 0;
      const isSelected = i === selectedDay;

days.push(
  <li 
    key={`curr-${i}`} 
    onClick={() => hasSlots && setSelectedDay(i)}
    className={`py-3 cursor-pointer transition-all list-none rounded-xl font-medium text-center
      ${hasSlots 
        ? (i === selectedDay ? "bg-white text-black" : "bg-zinc-800 text-white hover:bg-zinc-700") 
        : "bg-black text-zinc-700 cursor-not-allowed" 
      }
    `}
  >
    {i}
  </li>
);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(<li key={`next-${i}`} className="text-zinc-800 p-2 text-sm list-none">{i - lastDayofMonth + 1}</li>);
    }
    return days;
  };

  const selectedDateString = selectedDay 
    ? `${currYear}-${String(currMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null;

    // Inside the Calendar component in page.tsx

const handleBooking = async (slotTime: string) => {
  // We no longer need prompt()! 
  // The backend grabs name/email from the Better-Auth session.
  
  try {
    const params = new URLSearchParams(window.location.search);
    const serviceName = params.get('service') || "General Service";
    const stylist = params.get('pro') || "Any";
    const res = await fetch(`/api/book?service=${encodeURIComponent(serviceName)}&pro=${encodeURIComponent(stylist)}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    start: slotTime, 
  }),
});

    const result = await res.json();

    if (result.success) {
      alert(`Confirmed! Check your email for your appointment details.`);
      setAvailability((prev: any) => {
        const newAvail = { ...prev };
        const dateKey = slotTime.split('T')[0];
        newAvail[dateKey] = newAvail[dateKey].filter((s: any) => s.time !== slotTime);
        return newAvail;
      });
    } else {
      // If result.error is "You must be logged in", then redirect to login here
      alert("Error: " + (result.error || "Booking failed"));
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("An unexpected error occurred.");
  }
};

  return (
    <div className="bg-black/90 flex pt-20 flex-col min-h-screen w-full items-center justify-center bg-black p-4 font-sans text-white">
      <h1 className='flex text-5xl p-10 font-serif uppercase'>Select a Date & Time</h1>
      <div className="w-full max-w-md bg-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-2xl">
        <header className="flex items-center justify-between mb-8 px-2">
          <p className="font-bold text-2xl">{months[currMonth]} {currYear}</p>
          <div className="flex gap-2">
            <button onClick={() => changeMonth('prev')} className="p-2 hover:bg-zinc-800 rounded-full"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button onClick={() => changeMonth('next')} className="p-2 hover:bg-zinc-800 rounded-full"><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </header>

        <ul className="grid grid-cols-7 mb-4 text-center text-zinc-500 font-bold text-xs uppercase tracking-widest list-none">
          <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
        </ul>
        <ul className="grid grid-cols-7 text-center gap-2 mb-6">
          {renderDays()}
        </ul>
        
{selectedDay && availability?.[selectedDateString!] && (
  <div className="mt-8 grid grid-cols-3 gap-2 border-t border-zinc-800 pt-6">
    {availability[selectedDateString!].map((slot: any) => (
<button 
  key={slot.time}
  onClick={() => handleSlotClick(slot.time)}
  className="bg-zinc-100 hover:bg-white text-black text-xs font-bold py-2 rounded-lg transition-colors"
>
  {new Date(slot.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</button>
    ))}
  </div>
)}
      </div>
    </div>
  );
};


export default Calendar;