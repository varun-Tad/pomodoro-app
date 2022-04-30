import "./App.css";
import Homepage from "./Pages/HomePage/Homepage";
import { Routes, Route } from "react-router-dom";
import Taskpage from "./Pages/TaskPage/Taskpage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Taskpage" element={<Taskpage />} />
      </Routes>
    </div>
  );
}

export default App;
