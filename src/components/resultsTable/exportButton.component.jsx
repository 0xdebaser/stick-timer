import "./exportButton.styles.scss";
import downloadCSVFile from "../../utilties/downloadCSVFile";
import tableToCSV from "../../utilties/tableToCSV";

function ExportButton() {
  function exportToCSV() {
    const CSVdata = tableToCSV();
    console.log(CSVdata);
    downloadCSVFile(CSVdata);
  }

  return (
    <div className="export-button-container">
      <button className="export-button" onClick={exportToCSV}>
        Export Results to CSV
      </button>
    </div>
  );
}

export default ExportButton;
