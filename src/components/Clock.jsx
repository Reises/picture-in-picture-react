import { useEffect, useState } from "react";

export default function Clock() {
  const [clockTime, setClockTime] = useState(() => displayTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setClockTime(displayTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center text-[10vmax] font-bold text-cyan-100">
      {clockTime}
    </div>
  );
}

function displayTime() {
  const padZero = (value) => value.toString().padStart(2, '0');
  const now = new Date();
  const hour = padZero(now.getHours());
  const minute = padZero(now.getMinutes());
  const second = padZero(now.getSeconds());
  return `${hour}:${minute}:${second}`;
}
