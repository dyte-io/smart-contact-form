import meetingsSaga from "./meetings/saga";
import {all, fork} from "redux-saga/effects";

function* rootSaga() {
  yield all([
    fork(meetingsSaga)
  ]);
}

export default rootSaga;
