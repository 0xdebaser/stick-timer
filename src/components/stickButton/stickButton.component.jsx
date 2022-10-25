import { useState } from "react";

import "./stickButton.styles.scss";

function StickButton(props) {
  const [stickNumber, setStickNumber] = useState(1);

  function clickHandler() {
    const currentRaceDeepCopy = JSON.parse(JSON.stringify(props.currentRace));
    if (!currentRaceDeepCopy.hasOwnProperty("finishers")) {
      currentRaceDeepCopy["finishers"] = {};
    }
    currentRaceDeepCopy["finishers"][stickNumber] = props.elapsedTime;
    props.setCurrentRace(currentRaceDeepCopy);
    setStickNumber(stickNumber + 1);
  }

  return (
    <div>
      <button onClick={clickHandler}>{stickNumber}</button>
    </div>
  );
}

export default StickButton;
