import { useEffect, useReducer, useState } from "react";
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
      const arr = state.tasks.filter(
        (item) => item.taskName !== action.value.taskName
      );

      return {
        ...state,
        tasks: [...arr],
      };
    }
    case "editTask": {
      console.log("Task to be edited:", action.editTaskValue.taskName);
      console.log("Replacement text", action.value, action.desc);

      const newTask = state.tasks.map((obj) =>
        obj.taskName === action.editTaskValue.taskName
          ? { ...obj, taskName: action.value, taskDesc: action.desc }
          : obj
      );
      console.log("newTask", newTask);

      return {
        ...state,
        tasks: [...newTask],
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
  const [theTasks, setTheTasks] = useState();

  const [things, setThings] = useState([]);

  const [state, dispatch] = useReducer(reducerFn, {
    tasks: [],
  });
  const TaskHandlerOne = () => {
    setisModalOne(!isModalOne);
  };
  const userName = localStorage.getItem("user-name");

  const TaskHandlerTwo = () => {
    setisModalTwo(!isModalTwo);
  };

  // const addTaskToLocal = () => {
  //   localStorage.setItem("theTasks", JSON.stringify(theTasks));
  // };

  const addTimerTask = (ele) => {
    localStorage.setItem("TaskToSetTimer", ele.taskName);
    dispatch({ type: "Timer", value: ele });
  };

  useEffect(() => {
    setTheTasks(state.tasks);
  });

  useEffect(() => {
    if (state.tasks) {
      localStorage.setItem("theTasks", JSON.stringify(state.tasks || []));
    }
  });

  useEffect(() => {
    const things = JSON.parse(localStorage.getItem("theTasks")) || [];
    console.log(things);
    setThings(things);
  }, [theTasks]);

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
          <button disabled={isModalOne} onClick={TaskHandlerOne}>
            Add Task
          </button>
        </div>
        {things.map((ele) => (
          <div key={ele.taskName} className="task-details">
            <p>{ele.taskName}</p>
            <div className="task-buttons">
              <button onClick={() => addTimerTask(ele)}>
                <Link className="timer-text" to="/Timerpage">
                  Timer
                </Link>
              </button>
              <button
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
                // addTaskToLocal();
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
      {/* {isModal || isModal} */}

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
