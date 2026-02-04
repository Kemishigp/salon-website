"use client";
import React, { useState } from 'react';

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ScheduleManager() {
  const [schedule, setSchedule] = useState(
    DAYS.map((day, index) => ({
      day,
      index,
      active: true,
      start: "09:00",
      end: "17:00"
    }))
  );

  const toggleDay = (idx: number) => {
    const newSched = [...schedule];
    newSched[idx].active = !newSched[idx].active;
    setSchedule(newSched);
  };

  return (
    <div className="bg-black min-h-screen text-white p-8 pt-32">
      <h2 className="text-4xl font-serif uppercase mb-8">My Weekly Schedule</h2>
      
      <div className="max-w-2xl space-y-4">
        {schedule.map((item, idx) => (
          <div key={item.day} className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                checked={item.active} 
                onChange={() => toggleDay(idx)}
                className="w-5 h-5 accent-white"
              />
              <span className={`w-24 ${item.active ? 'text-white' : 'text-gray-600'}`}>
                {item.day}
              </span>
            </div>

            {item.active ? (
              <div className="flex gap-2">
                <input type="time" defaultValue={item.start} className="bg-transparent border border-white/20 p-2 rounded text-sm" />
                <span className="self-center">to</span>
                <input type="time" defaultValue={item.end} className="bg-transparent border border-white/20 p-2 rounded text-sm" />
              </div>
            ) : (
              <span className="text-gray-600 italic text-sm">Off Day</span>
            )}
          </div>
        ))}
        
        <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}