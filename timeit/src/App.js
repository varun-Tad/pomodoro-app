import Homepage from "./Pages/HomePage/Homepage";
import { Routes, Route } from "react-router-dom";
import Taskpage from "./Pages/TaskPage/Taskpage";
import Timerpage from "./Pages/TimerPage/Timerpage";
import BreakTimerPage from "./Pages/BreakTimerPage/BreakTimerPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Taskpage" element={<Taskpage />} />
        <Route path="/Timerpage" element={<Timerpage />} />
        <Route path="/BreakTimerPage" element={<BreakTimerPage />} />
      </Routes>
    </div>
  );
}

export default App;
