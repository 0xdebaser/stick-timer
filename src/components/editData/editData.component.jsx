import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./editData.styles.scss";
import fetchEntry from "../../utilties/fetchEntry";
import handleReset from "./handleReset";
import handleSubmit from "./handleSubmit";
import { upcomingRaces, allRaces } from "../../data/races";

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
    <div className="edit-data-container">
      {isRaceFinal(race) && (
        <div>
          <h1>
            Race results for {race} are final; finisher data cannot be edited!
          </h1>
          <h2>
            <a href={`https://stick-timer.vercel.app/results/${race}`}>
              Click here to view final results.
            </a>
          </h2>
        </div>
      )}
      {!isRaceFinal(race) && !currentEntry && <h1>Loading...</h1>}
      {!isRaceFinal(race) &&
        currentEntry &&
        currentEntry.hasOwnProperty("message") && (
          <h2>{currentEntry.message}</h2>
        )}
      {!isRaceFinal(race) &&
        currentEntry &&
        !currentEntry.hasOwnProperty("message") && (
          <div>
            <form id="finisher-data-form">
              <h1>{race}</h1>
              <h2>Finisher No. {stickNumber}</h2>
              <h3>
                {currentEntry.data.hours}:
                {currentEntry.data.minutes < 10 && "0"}
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

              <br />
              {(!loading || loading === "failed") && (
                <div>
                  <button
                    className="submit-button"
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
                  <button className="reset-button" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      {loading === "loading" && <p>Data submitted...please wait!</p>}
      {loading === "loaded" && (
        <p>
          Data successfully updated! <a href={`/results/${race}`}>Click here</a>
          &nbsp;to go to updated results.
        </p>
      )}
      {loading === "failed" && <p>Data failed to update. Please try again.</p>}
    </div>
  );
}

export default EditData;
