import { createSlice } from "@reduxjs/toolkit";

const POMODORO_DURATION = 25 * 60;

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState: {
    timeLeft: POMODORO_DURATION,
    isRunning: false,
    activeTaskId: null,
  },
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    pause: (state) => {
      state.isRunning = false;
    },
    reset: (state) => {
      state.timeLeft = POMODORO_DURATION;
      state.isRunning = false;
    },
    tick: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    setActiveTask: (state, action) => {
      state.activeTaskId = action.payload;
    },
  },
});

export const { start, pause, reset, tick, setActiveTask } =
  pomodoroSlice.actions;
export default pomodoroSlice.reducer;
