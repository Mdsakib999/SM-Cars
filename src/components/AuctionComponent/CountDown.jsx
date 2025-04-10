import React, { useState, useEffect } from "react";

const Countdown = ({ time }) => {
  // Calculate the remaining time as an object with days, hours, minutes, seconds.
  const calculateTimeLeft = () => {
    const difference = new Date(time) - new Date();
    if (difference <= 0) {
      return null;
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(timer);
  }, [time]);

  // Format hours, minutes, and seconds to always show 2 digits.
  const formatNumber = (number) => number.toString().padStart(2, "0");

  return (
    <div>
      {timeLeft ? (
        <span className="p-2">
          {timeLeft.days}D:{formatNumber(timeLeft.hours)}H:
          {formatNumber(timeLeft.minutes)}M:{formatNumber(timeLeft.seconds)}S
        </span>
      ) : (
        <div className="mx-auto text-center">
          <span className="font-semibold text-xl">Auction Ended</span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
