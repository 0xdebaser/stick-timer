import "./raceSelection.styles.scss";
import { upcomingRaces } from "../../data/races";

function RaceSelection(props) {
  function setRace() {
    const race = document.getElementById("raceSelection").value;
    if (race !== "none") {
      props.setCurrentRace({ name: race });
    }
  }

  return (
    <div className="RaceSelection">
      <label htmlFor="raceSelection">Select race: </label>
      <select id="raceSelection" name="raceSelection" onChange={setRace}>
        {upcomingRaces.map((race, index) => {
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

export default RaceSelection;
