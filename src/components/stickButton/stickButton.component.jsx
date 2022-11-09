import { useEffect, useState } from "react";

import addEntryToDatabase from "../../utilties/addEntryToDatabase";
import fetchEntry from "../../utilties/fetchEntry";
import "./stickButton.styles.scss";

function StickButton(props) {
  const [stickNumber, setStickNumber] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Query database to see how many stick entries already exist;
  async function fetchStickNumber() {
    const entryData = await fetchEntry(props.currentRace.name, "*");
    if (entryData) {
      setStickNumber(entryData.count === 0 ? 1 : entryData.count);
      setLoading(false);
    } else alert("Could not load stick number! Please refresh app.");
  }

  useEffect(() => {
    fetchStickNumber();
  }, []);

  return (
    <div>
      {loading && <p>loading...</p>}
      {!loading && <button onClick={clickHandler}>{stickNumber}</button>}
    </div>
  );
}

export default StickButton;
