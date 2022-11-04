import { Route, Routes } from "react-router-dom";

import "./App.styles.scss";
import EditData from "./components/editData/editData.component";
import Timer from "./components/timer/timer.component";

function App() {
  return (
    <Routes>
      <Route index element={<Timer />} />
      <Route path="/edit/:race/:stickNumber" element={<EditData />} />
    </Routes>
  );
}

export default App;
