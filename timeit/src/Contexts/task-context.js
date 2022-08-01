import { createContext, useContext, useReducer } from "react";
import { reducerFn } from "../Pages/TaskPage/TaskPagereducer";
import React from "react";

const TaskContext = createContext();
const useTask = () => useContext(TaskContext);
const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, {
    tasks: [],
  });

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { useTask, TaskProvider };
