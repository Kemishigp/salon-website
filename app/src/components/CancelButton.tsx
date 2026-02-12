"use client";
import { useState } from "react";

export default function CancelButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    setLoading(true);
    
    await fetch("/api/cancel", {
      method: "DELETE",
      body: JSON.stringify({ bookingId }),
    });
    
    window.location.reload(); // Refresh to show updated status
  }

  return (
    <button 
      onClick={handleCancel}
      disabled={loading}
      className="text-xs border border-red-500/50 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
    >
      {loading ? "Cancelling..." : "Cancel"}
    </button>
  );
}