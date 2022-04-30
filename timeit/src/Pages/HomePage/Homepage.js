import { Link } from "react-router-dom";
import { useState } from "react";

import "./Homepage.css";

const Homepage = () => {
  const [enteredName, setEnteredName] = useState("");
  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const clickHandler = () => {
    console.log(enteredName);
    localStorage.setItem("user-name", enteredName);
  };

  return (
    <div className="home-container">
      <h1 className="hero-heading">Time It. </h1>
      <div className="hero-center">
        <h2 className="hero-para">It's about Time !</h2>
        <div className="input-name">
          <input
            onChange={nameChangeHandler}
            className="inputName-text"
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>
        <button onClick={clickHandler} className="hero-btn">
          <Link className="hero-btn-text" to="/Taskpage">
            Jump in
          </Link>
        </button>
      </div>

      <div className="side"></div>
    </div>
  );
};

export default Homepage;
