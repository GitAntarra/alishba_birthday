"use client"; // Ensures it's a client component

import { useEffect, useState } from "react";

const timeAgo = (dateString: string): string => {
  const now = new Date();
  const pasts = new Date(dateString);
  const past = new Date(pasts.getTime() - 7 * 60 * 60 * 1000);
  
  console.log({now,past});
  
  
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    y: 31536000, // 1 year = 60 * 60 * 24 * 365
    w: 604800,   // 1 week = 60 * 60 * 24 * 7
    d: 86400,    // 1 day = 60 * 60 * 24
    h: 3600,     // 1 hour = 60 * 60
    m: 60,       // 1 minute = 60
    s: 1         // 1 second
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value > 0) {
      return `${value}${unit} ago`;
    }
  }

  return "Just now";
};

const TimeAgoComponent = ({ createdAt }: { createdAt: string }) => {
  const [time, setTime] = useState(timeAgo(createdAt));

  // Optional: Update every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeAgo(createdAt));
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span className="text-gray-500 text-sm">{time}</span>;
};

export default TimeAgoComponent;
