import meetingsReducer from "./meetings/reducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  meetings: meetingsReducer
});

export default rootReducer;
