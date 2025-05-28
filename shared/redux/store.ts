import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import pomodoroReducer from "./slices/pomodoroSlice";
import { todoApi } from "../api/todoApi";
import rootSaga from "./sagas";

const createSagaMiddleware = require("redux-saga").default;
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    pomodoro: pomodoroReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
