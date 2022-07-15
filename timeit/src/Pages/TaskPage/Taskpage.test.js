import { reducerFn } from "./Taskpage";

describe("testing tasks", () => {
  test("should add to tasks array when a task is created", () => {
    const initialStateOne = {
      tasks: [],
    };
    const addTasks = {
      type: "addToTask",
      value: "This is you first task",
      desc: "This is your tasks description which contains information about your task",
    };
    let stateOne = reducerFn(initialStateOne, addTasks);

    expect(stateOne).toEqual({
      tasks: [
        {
          taskName: "This is you first task",
          taskDesc:
            "This is your tasks description which contains information about your task",
        },
      ],
    });
  });

  test("should remove from task array ", () => {
    const initialStateTwo = {
      tasks: [
        {
          taskName: "This is you first task",
          taskDesc:
            "This is your tasks description which contains information about your first task",
        },
        {
          taskName: "This is your second task",
          taskDesc:
            "This is your tasks description which contains information about your second task",
        },
      ],
    };
    const removeTask = {
      type: "DeleteTask",
      value: {
        taskName: "This is you first task",
        taskDesc:
          "This is your tasks description which contains information about your task",
      },
    };
    let stateTwo = reducerFn(initialStateTwo, removeTask);

    expect(stateTwo).toEqual({
      tasks: [
        {
          taskName: "This is your second task",
          taskDesc:
            "This is your tasks description which contains information about your second task",
        },
      ],
    });
  });
});
