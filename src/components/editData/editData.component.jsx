import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./editData.styles.scss";
import fetchEntry from "../../utilties/fetchEntry";
import { allRaces } from "../../data/races";

function EditData() {
  const [currentEntry, setCurrentEntry] = useState(null);
  const [distances, setDistances] = useState([]);
  const { race, stickNumber } = useParams();

  useEffect(() => {
    async function getData(race, stickNumber) {
      allRaces.forEach((raceObject) => {
        if (race === raceObject.name) {
          setDistances(raceObject.distances);
          console.log(distances);
        }
      });
      setCurrentEntry(await fetchEntry(race, stickNumber));
    }
    getData(race, stickNumber);
  }, []);

  return (
    <div>
      {!currentEntry && <h1>Loading...</h1>}
      {currentEntry && (
        <div>
          <form>
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
                    <div>
                      <input
                        id={distance}
                        value={distance}
                        name="distances"
                        type="radio"
                        key={index}
                      ></input>
                      <label for={distance}>{distance}</label>
                      <br />
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default EditData;
