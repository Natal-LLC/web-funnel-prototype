'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialMinutes: number;
}

export function CountdownTimer({ initialMinutes }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Time in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-2xl font-bold text-red-600 mb-2">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}
