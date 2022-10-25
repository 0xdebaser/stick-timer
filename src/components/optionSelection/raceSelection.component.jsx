import "./raceSelection.styles.scss";

const raceList = ["none", "Race Judicata", "2022 Wobble Gobble"];

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
        {raceList.map((race, index) => {
          return (
            <option value={race} key={index}>
              {race}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default RaceSelection;
