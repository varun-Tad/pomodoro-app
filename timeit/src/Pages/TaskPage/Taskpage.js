import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import "./Taskpage.css";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "addToTask": {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { taskName: action.value, taskDesc: action.desc },
        ],
      };
    }
    case "DeleteTask": {
      console.log(action.value);
      const arr = state.tasks.filter(
        (item) => item.taskName !== action.value.taskName
      );
      console.log("arr", arr);
      return {
        ...state,
        tasks: [...arr],
      };
    }
    case "Timer": {
      return {
        ...state,
        tasks: [...state.tasks],
      };
    }
  }
};

const Taskpage = () => {
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [state, dispatch] = useReducer(reducerFn, {
    tasks: [],
  });
  const TaskHandler = () => {
    setIsModal(!isModal);
  };
  const userName = localStorage.getItem("user-name");
  return (
    <div className="background">
      <nav className="navbar">
        <p className="nav-brand">Time It.</p>
      </nav>
      <h1 className="greeting-text">Welcome {userName}! Let's get to work !</h1>
      <h2 className="greeting-text">
        You have {state.tasks.length} tasks to work on. Good luck!
      </h2>
      <section className="task-section">
        <div className="task-section-header">
          <h3 className="task-heading">Tasks in hand</h3>
          <button disabled={isModal} onClick={TaskHandler}>
            Add Task
          </button>
        </div>
        {state.tasks.map((ele) => (
          <div key={ele.taskName} className="task-details">
            <p>{ele.taskName}</p>
            <div className="task-buttons">
              <button
                onClick={() => {
                  console.log(ele);
                  dispatch({ type: "Timer", value: ele });
                }}
              >
                <Link className="timer-text" to="/Timerpage">
                  Timer
                </Link>
              </button>
              <button>Edit</button>
              <button
                onClick={() => dispatch({ type: "DeleteTask", value: ele })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {isModal && (
        <form className="form">
          <p className="modal-heading">Add Task :)</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
            type="text"
            placeholder="Enter Title"
            required
          />
          <textarea
            className="modal-textArea"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="10"
            cols="40"
            required
          ></textarea>
          <div className="buttons">
            <button onClick={TaskHandler}>Cancel</button>
            <button
              type="submit"
              onClick={() => {
                if (title.length === 0) {
                  console.log(title.length);
                  console.log("enter text");
                } else {
                  TaskHandler();
                  dispatch({
                    type: "addToTask",
                    value: title,
                    desc: description,
                  });
                }
                setTitle("");
              }}
            >
              Add Task
            </button>
          </div>
        </form>
      )}
      {/* {isModal || isModal} */}
    </div>
  );
};

export default Taskpage;
