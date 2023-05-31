import {MEETINGS, NOTIF} from "./actionTypes";

export const _getMeetings = () => ({
  type: MEETINGS.GET,
});

export const _getMeetingsSuccess = (meetings: any) => ({
  type: MEETINGS.GET_SUCCESS,
  payload: meetings,
});

export const _getMeetingsFail = (err: any) => ({
  type: MEETINGS.GET_FAIL,
  payload: err,
});

export const _showNotif = () => ({
  type: NOTIF.SHOW,
});

export const _hideNotif = () => ({
  type: NOTIF.HIDE,
});
