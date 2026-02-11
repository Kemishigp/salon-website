"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// Declare Calendar Function
const Calendar = () => {
  // Declare Consts
  const months = ["January", "February", "March", "April", "May", "June", "July",
                  "August", "September", "October", "November", "December"];
  
  const [currDate, setCurrDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth();

  const changeMonth = (direction: 'prev' | 'next') => {
    // Reset selected day when changing months to avoid confusion
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

    // 1. Previous month's trailing days
    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(
        <li key={`prev-${i}`} className="text-zinc-700 list-none p-2">
          {lastDateofLastMonth - i + 1}
        </li>
      );
    }

    // 2. Current month's days
    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear();
      const isSelected = i === selectedDay;

      days.push(
        <li 
          key={`curr-${i}`} 
          onClick={() => setSelectedDay(i)}
          className={`py-2 cursor-pointer transition-all list-none rounded-full 
            ${isSelected ? "bg-white text-black font-bold" : "hover:bg-zinc-800 text-white"}
            ${isToday && !isSelected ? "border border-white" : ""}
          `}
        >
          {i}
        </li>
      );
    }

    // 3. Next month's leading days
    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(
        <li key={`next-${i}`} className="text-zinc-700 list-none p-2">
          {i - lastDayofMonth + 1}
        </li>
      );
    }
    return days;
  };

  return (
    // This outer div centers the calendar on the page
    <div className="flex min-h-screen w-full items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-zinc-950 p-6 rounded-3xl border border-zinc-800 shadow-2xl">
        <header className="flex items-center justify-between mb-8 px-2">
          <p className="text-white font-bold text-2xl">{months[currMonth]} {currYear}</p>
          <div className="flex gap-2">
            <button 
              onClick={() => changeMonth('prev')}
              className="p-2 text-white hover:bg-zinc-800 rounded-full transition-colors"
            >
            <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button 
              onClick={() => changeMonth('next')}
              className="p-2 text-white hover:bg-zinc-800 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faArrowRight} />
              </button>
          </div>
        </header>

        <div className="calendar">
          <ul className="grid grid-cols-7 mb-4 text-center text-zinc-500 font-bold text-xs uppercase tracking-widest">
            <li>Sun</li><li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li>
          </ul>
          <ul className="grid grid-cols-7 text-center gap-y-2">
            {renderDays()}
          </ul>
        </div>
        
        {selectedDay && (
          <p className="mt-6 text-center text-zinc-400 text-sm">
            Selected: {months[currMonth]} {selectedDay}, {currYear}
          </p>
        )}
      </div>
    </div>
  );
};

export default Calendar;