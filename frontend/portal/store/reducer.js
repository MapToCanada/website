import { combineReducers } from "redux";
import LoginReducer from "@portal/store/reducers/login";

export default combineReducers({
  login: LoginReducer,
  // ui: uiReducer,
});
