import { Route, Routes } from "react-router-dom";

import "./App.styles.scss";
import DisplayResults from "./components/displayResults/displayResults.component";
import EditData from "./components/editData/editData.component";
import Timer from "./components/timer/timer.component";

function App() {
  return (
    <Routes>
      <Route index element={<Timer />} />
      <Route path="/edit/:race/:stickNumber" element={<EditData />} />
      <Route path="/results/:race" element={<DisplayResults />} />
    </Routes>
  );
}

export default App;
