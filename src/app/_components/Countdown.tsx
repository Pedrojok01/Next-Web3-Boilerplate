import React, { useCallback, useEffect, useState } from "react";

import { Tag } from "@chakra-ui/react";

function Countdown(props: { targetDate: Date }) {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  const calculateRemaining = useCallback(calculateRemainingTime, [props.targetDate]);
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [calculateRemaining]);

  function calculateRemainingTime() {
    const currentTime = new Date().getTime();
    const difference = props.targetDate.getTime() - currentTime;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <Tag bg={"gray"} fontSize={"sm"}>
      {remainingTime.days}d-{remainingTime.hours}h-{remainingTime.minutes}m-{remainingTime.seconds}s
    </Tag>
  );
}

export default Countdown;
