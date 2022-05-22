import { useReducer, useState } from "react";
import { Link } from "react-router-dom";

import "./Taskpage.css";

const reducerFn = (state, action) => {
  switch (action.type) {
    case "addToTask": {
      const items = [
        ...state.tasks,
        {
          taskName: action.value,
          taskDesc: action.desc,
          checkTask: false,
          dateCreated: new Date(),
        },
      ];
      localStorage.setItem("theItems", JSON.stringify(items));
      return {
        ...state,
        tasks: [...items],
      };
    }
    case "DeleteTask": {
      const arr = state.tasks.filter(
        (item) => item.taskName !== action.value.taskName
      );
      const items = [...arr];
      localStorage.setItem("theItems", JSON.stringify(items));
      return {
        ...state,
        tasks: [...items],
      };
    }
    case "editTask": {
      const newTask = state.tasks.map((obj) =>
        obj.taskName === action.editTaskValue.taskName
          ? { ...obj, taskName: action.value, taskDesc: action.desc }
          : obj
      );
      const items = [...newTask];
      localStorage.setItem("theItems", JSON.stringify(items));
      return {
        ...state,
        tasks: [...items],
      };
    }
    case "checkTask": {
      const chcTask = state.tasks.map((obj) => {
        console.log("checked");
        console.log("obj.taskname", obj.taskName);
        return obj.taskName === action.value.taskName
          ? { ...obj, checkTask: !action.value.checkTask }
          : obj;
      });
      const items = [...chcTask];
      localStorage.setItem("theItems", JSON.stringify(items));
      return {
        ...state,
        tasks: [...items],
      };
    }
    case "Timer": {
      return {
        ...state,
        tasks: [...state.tasks],
      };
    }
    default:
      return state;
  }
};

const Taskpage = () => {
  const [isModalOne, setisModalOne] = useState(false);
  const [isModalTwo, setisModalTwo] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskToEdit, setTaskToEdit] = useState({});

  const [state, dispatch] = useReducer(reducerFn, {
    tasks: JSON.parse(localStorage.getItem("theItems")),
  });
  const TaskHandlerOne = () => {
    setisModalOne(!isModalOne);
  };
  const userName = localStorage.getItem("user-name");

  const TaskHandlerTwo = () => {
    setisModalTwo(!isModalTwo);
  };

  const addTimerTask = (ele) => {
    localStorage.setItem("TaskToSetTimer", ele.taskName);
    dispatch({ type: "Timer", value: ele });
  };

  return (
    <div className="background">
      <nav className="navbar">
        <p className="nav-brand">Time It.</p>
      </nav>
      <h1 className="greeting-text">Welcome {userName}! Let's get to work !</h1>
      <h2 className="greeting-text">
        {state.tasks.length === 0
          ? "You have no tasks to work on"
          : `You have ${state.tasks.length} tasks to work on. Good luck! `}
      </h2>
      <section className="task-section">
        <div className="task-section-header">
          <h3 className="task-heading">Tasks in hand</h3>
          <button disabled={isModalOne} onClick={TaskHandlerOne}>
            Add Task
          </button>
        </div>
        {state.tasks.map((ele) => (
          <div key={ele.taskName} className="task-details">
            <div className="check">
              <input
                className="check-box"
                checked={ele.checkTask}
                type="checkbox"
                onChange={() => dispatch({ type: "checkTask", value: ele })}
              />
              <p
                style={{
                  textDecoration: ele.checkTask ? "line-through" : "none",
                }}
              >
                {ele.taskName}
              </p>
            </div>

            <div className="task-buttons">
              <button
                className="timer-btn"
                title="Timer"
                onClick={() => addTimerTask(ele)}
              >
                <Link className="timer-text" to="/Timerpage">
                  Timer
                </Link>
              </button>
              <button
                title="Edit"
                disabled={isModalTwo}
                onClick={() => {
                  TaskHandlerTwo();
                  setTaskToEdit({
                    taskName: ele.taskName,
                    taskDesc: ele.taskDesc,
                  });
                }}
              >
                Edit
              </button>
              <button
                title="Delete"
                onClick={() => dispatch({ type: "DeleteTask", value: ele })}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {isModalOne && (
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
            <button onClick={TaskHandlerOne}>Cancel</button>
            <button
              type="submit"
              onClick={() => {
                if (title.length === 0) {
                  alert("No Task Found.Enter Task");
                } else {
                  TaskHandlerOne();
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

      {isModalTwo && (
        <form className="form">
          <p className="modal-heading">Edit Task :)</p>
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
            <button onClick={TaskHandlerTwo}>Cancel</button>
            <button
              type="submit"
              onClick={() => {
                console.log(title);
                if (title.length === 0) {
                  alert("No Task Found.Enter Task");
                } else {
                  TaskHandlerTwo();
                  dispatch({
                    type: "editTask",
                    value: title,
                    desc: description,
                    editTaskValue: taskToEdit,
                  });
                }
                setTitle("");
              }}
            >
              Edit Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Taskpage;
