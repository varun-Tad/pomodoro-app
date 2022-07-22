export const reducerFn = (state, action) => {
  switch (action.type) {
    case "addToTask": {
      const items = [
        {
          taskName: action.value,
          taskDesc: action.desc,
        },
        ...state.tasks,
      ];

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

      return {
        ...state,
        tasks: [...items],
      };
    }
    case "checkTask": {
      const chcTask = state.tasks.map((obj) => {
        return obj.taskName === action.value.taskName
          ? { ...obj, checkTask: !action.value.checkTask }
          : obj;
      });
      const items = [...chcTask];

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
