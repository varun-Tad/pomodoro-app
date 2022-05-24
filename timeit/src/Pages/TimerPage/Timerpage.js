import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Timerpage.css";

export const Timerpage = () => {
  const navigate = useNavigate();
  const [minute, setMinute] = useState("25");
  const [second, setSecond] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(1500);

  //Can create Object like this
  // const [TimerStatus, setTimerStatus] = useState({
  //   minute: "25",
  //   second: "00",
  //   isActive: false,
  //   totalSeconds: 1500,
  // });

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = String(totalSeconds % 60);
        const minuteCounter = String(Math.trunc(totalSeconds / 60));
        const computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setTotalSeconds((totalSeconds) => totalSeconds - 1);
        if (totalSeconds === 0) {
          stopTimer();
          navigate("/BreakTimerPage");
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, totalSeconds]);

  useEffect(() => {
    document.title = `${minute}:${second}🧑‍💻 | Pomodoro`;
  }, [isActive, totalSeconds]);

  const stopTimer = () => {
    setIsActive(false);
    setTotalSeconds(1500);
    setMinute("25");
    setSecond("00");
  };

  return (
    <div className="timer-container">
      <nav className="navbar">
        <p className="nav-brand">Time It.</p>
      </nav>

      <section className="main-content">
        <div className="timer">
          <div className="timeCount">
            <span>{minute}</span>
            <span>:</span>
            <span>{second}</span>
          </div>

          <div className="buttons">
            <button onClick={() => setIsActive(!isActive)}>
              {isActive ? "Pause" : "Start"}
            </button>
            <button onClick={stopTimer} className="reset">
              Reset
            </button>
          </div>
        </div>

        <div className="taskToComplete">
          <span>Task to Complete: </span>
          <span className="taskToCompleteHead">
            {localStorage.getItem("TaskToSetTimer")}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Timerpage;
