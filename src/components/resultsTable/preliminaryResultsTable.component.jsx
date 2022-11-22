import { useState, useEffect } from "react";

import "./preliminaryResultsTable.styles.scss";
import ExportButton from "./exportButton.component";

function PreliminaryResultsTable(props) {
  const [sortedRaceResults, setSortedRaceResults] = useState();

  async function sortByStickNumber(results) {
    const tempArray = [];
    const numberOfSticks = results.length;
    for (let n = 1; n <= numberOfSticks; n++) {
      for (let i = 0; i < results.length; i++) {
        console.log(results[i]);
        if (results[i] && results[i].stickNumber === n) {
          tempArray.push(results[i]);
        }
      }
    }
    setSortedRaceResults(tempArray);
  }

  useEffect(() => {
    sortByStickNumber(props.currentRace.finishers);
  }, [props.currentRace.finishers]);

  if (sortedRaceResults) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Stick No.</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedRaceResults
              .slice()
              .reverse()
              .map((finisher, index) => {
                return (
                  <tr key={index}>
                    <td>{finisher.stickNumber}</td>
                    <td>
                      {finisher.hours}:{finisher.minutes < 10 && 0}
                      {finisher.minutes}:{finisher.seconds < 10 && 0}
                      {finisher.seconds.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <ExportButton />
      </div>
    );
  }
}

export default PreliminaryResultsTable;
