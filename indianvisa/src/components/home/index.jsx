"use client";
import { useState, useEffect } from "react";

export default function HomeCountdownPage() {
  const initialTime = 11 * 24 * 60 * 60; // 11 days in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          return initialTime; // Reset the countdown
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert seconds to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">COMING SOON</h1>
      <p className="text-2xl mb-6">
        {days} days {hours}:{minutes}:{seconds}
      </p>
      <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
        Show Calendar
      </button>
    </div>
  );
}
