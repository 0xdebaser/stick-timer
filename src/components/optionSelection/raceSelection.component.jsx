import "./raceSelection.styles.scss";
import { allRaces, upcomingRaces } from "../../data/races";
import fetchEntry from "../../utilties/fetchEntry";

function RaceSelection(props) {
  async function setRace() {
    let passwordMatches = false;
    const race = document.getElementById("raceSelection").value;
    // check password
    if (race !== "Please select a race") {
      const enteredPassword = prompt(`Please enter password for ${race}`);
      upcomingRaces.every(async (raceObject) => {
        if (
          race === raceObject.name &&
          enteredPassword === raceObject.password
        ) {
          passwordMatches = true;
          return false;
        } else return true;
      });
      if (!passwordMatches) {
        alert("Password is incorrect. Please try again.");
      } else {
        // If password is correct, check to see if race has already begun
        const startEntry = await fetchEntry(race, 0);
        console.log(startEntry);
        //If race hasn't started, set only name, otherwise set start time as well
        if (startEntry.hasOwnProperty("message")) {
          props.setCurrentRace({ name: race });
        } else
          props.setCurrentRace({ name: race, startTime: startEntry.data.time });
      }
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
