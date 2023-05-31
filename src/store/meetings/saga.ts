import {takeEvery, put, call} from "redux-saga/effects";
import {MEETINGS} from "./actionTypes";
import {_get_meetings} from "../../api";
import {_getMeetingsFail, _getMeetingsSuccess} from "./actions";

function* onGetMeetings() {
  try {
    // @ts-ignore
    const response = yield call(_get_meetings);
    yield put(_getMeetingsSuccess(response.data));
  } catch (e) {
    yield put(_getMeetingsFail(e));
    console.log(e);
    throw e;
  }
}

function* meetingsSaga() {
  yield takeEvery(MEETINGS.GET, onGetMeetings);
}

export default meetingsSaga;
