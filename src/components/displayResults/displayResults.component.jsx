import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./displayResults.styles.scss";
import { upcomingRaces, allRaces } from "../../data/races";
import fetchEntry from "../../utilties/fetchEntry";
import FinalResultsTable from "../resultsTable/finalResultsTable.component";

function DisplayResults() {
  const { race } = useParams();
  const [raceIndex, setRaceIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [sortedRaceResults, setSortedRaceResults] = useState(null);
  let numberOfSticks;

  useEffect(() => {
    allRaces.every((raceObject, index) => {
      async function sortByStickNumber(results) {
        const tempArray = [];
        console.log("running sortByStickNumber...");
        for (let n = 1; n <= numberOfSticks; n++) {
          for (let i = 0; i < results.length; i++) {
            if (results[i].stickNumber === n) {
              tempArray.push(results[i]);
            }
          }
        }
        setSortedRaceResults(tempArray);
      }

      async function setNumberOfSticks() {
        const result = await fetchEntry(race, "*");
        numberOfSticks = result.count - 1;
      }

      async function getRaceData() {
        await setNumberOfSticks();
        const raceResults = await fetchEntry(race, "!");
        console.log(raceResults);
        sortByStickNumber(raceResults.data);
        console.log(sortedRaceResults);
      }

      if (raceObject.name === race) {
        setRaceIndex(index);
        getRaceData();
        return false;
      } else return true;
    });
    if (raceIndex === -1) {
      setLoading(false);
    }
  }, []);

  function isRaceFinal(raceName) {
    let isFinal = true;
    upcomingRaces.forEach((raceObj) => {
      if (raceObj.name === raceName) {
        isFinal = false;
      }
    });
    return isFinal;
  }

  return (
    <div className="display-results-container">
      {loading && <h1>please wait while results are loaded!</h1>}
      {!loading && raceIndex < 0 && (
        <p>The specified race ({race}) could not be located! 🙈</p>
      )}
      {raceIndex >= 0 && (
        <div className="results-container">
          {/* Race Name */}
          <h1>{allRaces[raceIndex].name}</h1>
          <h3>{isRaceFinal(race) ? "Final " : "Preliminary "}Results</h3>
          {/* Distance options if > 1 */}
          {allRaces[raceIndex].distances.length > 1 && (
            <p>
              {allRaces[raceIndex].distances.map((distance, index) => {
                return (
                  <span key={index}>
                    <a href={`#${distance}`}>{distance}</a>
                    {index !== allRaces[raceIndex].distances.length - 1 &&
                      " | "}
                  </span>
                );
              })}
            </p>
          )}
          {/* Results for each distance */}
          {allRaces[raceIndex].distances.map((distance, index) => {
            return (
              <div className="distance-results-container" key={index}>
                <h2 id={distance}>{distance} results</h2>
                <FinalResultsTable
                  sortedRaceResults={sortedRaceResults}
                  distance={distance}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DisplayResults;
