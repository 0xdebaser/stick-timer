import { useState } from "react";

import "./timer.styles.scss";
import addEntryToDatabase from "../../utilties/addEntryToDatabase";
import RaceClock from "../raceClock/raceClock.component";
import RaceSelection from "../optionSelection/raceSelection.component";
import ResultsTable from "../resultsTable/resultsTable.component";
import StickButton from "../stickButton/stickButton.component";

function Timer() {
  const [currentRace, setCurrentRace] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  function startRace() {
    const raceStartTime = Date.now();
    const currentRaceDeepCopy = JSON.parse(JSON.stringify(currentRace));
    currentRaceDeepCopy["startTime"] = raceStartTime;
    setCurrentRace(currentRaceDeepCopy);
    addEntryToDatabase(currentRace.name, 0, raceStartTime);
  }

  return (
    <div className="App">
      <div className="top-container">
        <div className="app-title-container">
          <h1>Stick Timer</h1>
        </div>
        {/* Prompt for race selection OR display race name if selection has been made*/}
        {!currentRace && <RaceSelection setCurrentRace={setCurrentRace} />}
        {currentRace && (
          <div className="race-title-container">
            <h2>{currentRace.name}</h2>
          </div>
        )}
        {/* Display start button or race timer */}
        {currentRace && !currentRace.hasOwnProperty("startTime") && (
          <div className="start-button-container">
            <button className="start-button" onClick={startRace}>
              Start Race
            </button>
          </div>
        )}
        {currentRace && currentRace.hasOwnProperty("startTime") && (
          <div className="race-clock-container">
            <RaceClock
              currentRace={currentRace}
              elapsedTime={elapsedTime}
              setElapsedTime={setElapsedTime}
            />
          </div>
        )}
        {/* Display stick button if race has started */}
        {currentRace && currentRace.hasOwnProperty("startTime") && (
          <div className="stick-button-container">
            <StickButton
              currentRace={currentRace}
              setCurrentRace={setCurrentRace}
              elapsedTime={elapsedTime}
            />
          </div>
        )}
      </div>
      <br />
      {/* Display table of results if there is a finisher */}
      {currentRace && currentRace.hasOwnProperty("finishers") && (
        <div className="results-table-container">
          <ResultsTable currentRace={currentRace} />
        </div>
      )}
    </div>
  );
}

export default Timer;
