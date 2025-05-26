import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import pomodoroReducer from "./slices/pomodoroSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    pomodoro: pomodoroReducer,
  },
});
