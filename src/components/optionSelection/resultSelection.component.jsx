import { Navigate, useNavigate } from "react-router-dom";

import "./resultSelection.styles.scss";
import { allRaces } from "../../data/races";

function ResultSelection(props) {
  const navigate = useNavigate();

  async function gotoResults() {
    const race = document.getElementById("resultSelection").value;
    // check password
    if (race !== "Please select a race") {
      navigate(`/results/${race}`);
    }
  }

  return (
    <div className="RaceSelection">
      <label htmlFor="resultSelection">See results for: </label>
      <select
        id="resultSelection"
        name="resultSelection"
        onChange={gotoResults}
      >
        {allRaces.map((race, index) => {
          return (
            <option value={race.name} key={index}>
              {race.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ResultSelection;
