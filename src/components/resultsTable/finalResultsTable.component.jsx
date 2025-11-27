import "./finalResultsTable.styles.scss";

function FinalResultsTable(props) {
  let finisherNumber = 0;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.sortedRaceResults &&
            props.sortedRaceResults.map((record, index) => {
              if (record.distance === props.distance) {
                finisherNumber++;
                return (
                  <tr key={index}>
                    <td>{finisherNumber}</td>
                    <td>{record.name || "Mystery Gobbler"}</td>
                    <td>
                      {record.gender
                        ? record.gender.slice(0, 1).toUpperCase()
                        : ""}
                    </td>
                    <td>
                      {record.hours}:{record.minutes < 10 && 0}
                      {record.minutes}:{record.seconds < 10 && 0}
                      {record.seconds.toFixed(1)}
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </table>
    </div>
  );
}

export default FinalResultsTable;
