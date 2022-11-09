import "./preliminaryResultsTable.styles.scss";

function PreliminaryResultsTable(props) {
  if (props.currentRace && props.currentRace.hasOwnProperty("finishers")) {
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
            {Object.getOwnPropertyNames(props.currentRace.finishers).map(
              (key) => {
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {props.currentRace.finishers[key]["hours"]}:
                      {props.currentRace.finishers[key]["minutes"] < 10 && 0}
                      {props.currentRace.finishers[key]["minutes"]}:
                      {props.currentRace.finishers[key]["seconds"] < 10 && 0}
                      {props.currentRace.finishers[key]["seconds"].toFixed(1)}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PreliminaryResultsTable;
