import React, { useState, useEffect } from "react";

const Countdown = ({ time }) => {
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

    return () => clearInterval(timer);
  }, [time]);

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
          <span className="font-semibold text-xl">Auction Details</span>
        </div>
      )}
    </div>
  );
};

export default Countdown;
