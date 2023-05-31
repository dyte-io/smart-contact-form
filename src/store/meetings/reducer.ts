import {MEETINGS, NOTIF} from "./actionTypes";

const INIT_STATE = {
  meetings: null,
  err: null,
  showNotification: false,
};

function meetingsReducer(state = INIT_STATE, action: any) {
  switch (action.type) {

    case MEETINGS.GET_SUCCESS:
      return {...state, meetings: action.payload || []};

    case MEETINGS.GET_FAIL:
      return {...state, meetings: [], err: action.payload};

    case NOTIF.SHOW:
      return {...state, showNotification: true};

    case NOTIF.HIDE:
      return {...state, showNotification: false};

    default: {
      return state;
    }
  }
}

export default meetingsReducer;
