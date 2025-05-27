import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import pomodoroReducer from "./slices/pomodoroSlice";
import { todoApi } from "../api/todoApi";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    pomodoro: pomodoroReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});
