import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./editData.styles.scss";
import fetchEntry from "../../utilties/fetchEntry";
import handleReset from "./handleReset";
import handleSubmit from "./handleSubmit";
import { allRaces } from "../../data/races";

function EditData() {
  const [currentEntry, setCurrentEntry] = useState(null);
  const [distances, setDistances] = useState([]);
  const { race, stickNumber } = useParams();
  const genderChoices = ["male", "female", "other"];
  const [loading, setLoading] = useState(null);
  let updated = null;

  useEffect(() => {
    async function getData(race, stickNumber) {
      allRaces.forEach((raceObject) => {
        if (race === raceObject.name) {
          setDistances(raceObject.distances);
        }
      });
      setCurrentEntry(await fetchEntry(race, stickNumber));
    }
    getData(race, stickNumber);
  }, []);

  return (
    <div className="edit-data-container">
      {!currentEntry && <h1>Loading...</h1>}
      {currentEntry && currentEntry.hasOwnProperty("message") && (
        <h2>{currentEntry.message}</h2>
      )}
      {currentEntry && !currentEntry.hasOwnProperty("message") && (
        <div>
          <form id="finisher-data-form">
            <h1>{race}</h1>
            <h2>Finisher No. {stickNumber}</h2>
            <h3>
              {currentEntry.data.hours}:{currentEntry.data.minutes < 10 && "0"}
              {currentEntry.data.minutes}:
              {currentEntry.data.seconds < 10 && "0"}
              {currentEntry.data.seconds.toFixed(1)}
            </h3>
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              placeholder={
                currentEntry.data.name
                  ? currentEntry.data.name
                  : "Finisher Name"
              }
            ></input>
            {distances.length > 1 && (
              <div>
                <p>Select distance raced:</p>
                {distances.map((distance, index) => {
                  return (
                    <div key={index}>
                      <input
                        id={distance}
                        value={distance}
                        name="distances"
                        type="radio"
                        //TODO: make radio button "checked" if distance matches
                      ></input>
                      <label htmlFor={distance}>{distance}</label>
                      <br />
                    </div>
                  );
                })}
              </div>
            )}
            <p>Select gender:</p>
            {genderChoices.map((choice, index) => {
              return (
                <div key={index}>
                  <input
                    id={choice}
                    value={choice}
                    name="genders"
                    type="radio"
                  ></input>
                  <label htmlFor={choice}>{choice}</label>
                </div>
              );
            })}
            <br />
            <button
              onClick={async (event) => {
                setLoading("loading");
                updated = await handleSubmit(event, race, stickNumber);
                if (updated) {
                  setLoading("loaded");
                } else {
                  setLoading("failed");
                }
              }}
            >
              Submit
            </button>
            <br />
            <button onClick={handleReset}>Reset</button>
          </form>
        </div>
      )}
      {loading === "loading" && <p>Data submitted...please wait!</p>}
      {loading === "loaded" && <p>Data successfully updated!</p>}
      {loading === "failed" && <p>Data failed to update. Please try again.</p>}
    </div>
  );
}

export default EditData;
