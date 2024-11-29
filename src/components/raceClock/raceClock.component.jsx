import { useEffect } from "react";

import "./raceClock.styles.scss";

function RaceClock(props) {
  function updateClock() {
    const currentTime = Date.now();
    const timeDelta = currentTime - props.currentRace.startTime;
    props.setElapsedTime({
      hours: Math.floor(timeDelta / (1000 * 60 * 60)),
      minutes: Math.floor(timeDelta / (1000 * 60)) % 60,
      seconds: (timeDelta / 1000) % 60,
    });
  }

  useEffect(() => {
    const interval = setInterval(() => updateClock(), 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>
        {props.elapsedTime.hours}:{props.elapsedTime.minutes < 10 && "0"}
        {props.elapsedTime.minutes}:{props.elapsedTime.seconds < 10 && "0"}
        {props.elapsedTime.hasOwnProperty("seconds") &&
          props.elapsedTime.seconds.toFixed(1)}
      </h2>
    </div>
  );
}

export default RaceClock;
