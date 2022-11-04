import { useState } from "react";

import addEntryToDatabase from "../../utilties/addEntryToDatabase";
import "./stickButton.styles.scss";

function StickButton(props) {
  const [stickNumber, setStickNumber] = useState(1);

  function clickHandler() {
    const finishTime = Date.now();
    const rawRaceTime = finishTime - props.currentRace.startTime;
    const currentRaceDeepCopy = JSON.parse(JSON.stringify(props.currentRace));
    if (!currentRaceDeepCopy.hasOwnProperty("finishers")) {
      currentRaceDeepCopy["finishers"] = {};
    }
    currentRaceDeepCopy["finishers"][stickNumber] = {};
    currentRaceDeepCopy["finishers"][stickNumber]["time"] = rawRaceTime;
    currentRaceDeepCopy["finishers"][stickNumber]["hours"] = Math.floor(
      rawRaceTime / (1000 * 60 * 60)
    );
    currentRaceDeepCopy["finishers"][stickNumber]["minutes"] =
      Math.floor(rawRaceTime / (1000 * 60)) % 60;
    currentRaceDeepCopy["finishers"][stickNumber]["seconds"] =
      (rawRaceTime / 1000) % 60;
    props.setCurrentRace(currentRaceDeepCopy);
    addEntryToDatabase(
      props.currentRace.name,
      stickNumber,
      currentRaceDeepCopy["finishers"][stickNumber]
    );
    setStickNumber(stickNumber + 1);
  }

  return (
    <div>
      <button onClick={clickHandler}>{stickNumber}</button>
    </div>
  );
}

export default StickButton;
