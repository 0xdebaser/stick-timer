import "./App.styles.scss";
import { useState } from "react";

import RaceClock from "./components/raceClock/raceClock.component";
import RaceSelection from "./components/optionSelection/raceSelection.component";
import ResultsTable from "./components/resultsTable/resultsTable.component";
import StickButton from "./components/stickButton/stickButton.component";

function App() {
  const [currentRace, setCurrentRace] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  function startRace() {
    const raceStartTime = Date.now();
    const currentRaceDeepCopy = JSON.parse(JSON.stringify(currentRace));
    currentRaceDeepCopy["startTime"] = raceStartTime;
    setCurrentRace(currentRaceDeepCopy);
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

export default App;
