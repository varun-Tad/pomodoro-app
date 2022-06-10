import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BreakTimerPage.css";

const BreakTimerPage = () => {
  const navigate = useNavigate();
  const [minute, setMinute] = useState("05");
  const [second, setSecond] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(300);

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
          navigate("/Taskpage");
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
    setTotalSeconds(300);
    setMinute("05");
    setSecond("00");
  };

  return (
    <div className="timer-container">
      <nav className="navbar">
        <p className="nav-brand">Time It.</p>
      </nav>
      <div className="heading-div">Time for a breather !</div>
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
      </section>
    </div>
  );
};

export default BreakTimerPage;
