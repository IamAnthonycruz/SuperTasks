// sagas/index.ts
import { all, delay, put, select, takeEvery } from "redux-saga/effects";
import { tick, reset } from "../slices/pomodoroSlice";

const selectTimeLeft = (state: any) => state.pomodoro.timeLeft;

function* handleTick() {
  const timeLeft: number = yield select(selectTimeLeft);

  if (timeLeft === 0) {
    yield delay(1000);

    yield put(reset());
    console.log("timer reset");
  }
}

function* watchTick() {
  yield takeEvery(tick.type, handleTick);
}

export default function* rootSaga() {
  yield all([watchTick()]);
}
