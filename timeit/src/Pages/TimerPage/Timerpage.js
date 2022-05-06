import "./Timerpage.css";

const Timerpage = () => {
  return (
    <div className="timer-container">
      <nav className="navbar">
        <p className="nav-brand">Time It.</p>
      </nav>
      <section className="timer-section">
        <div className="timer"></div>
        <div className="task-details"></div>
      </section>
    </div>
  );
};

export default Timerpage;
