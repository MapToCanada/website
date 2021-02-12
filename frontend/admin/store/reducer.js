import { combineReducers } from "redux";
import LoginReducer from "@admin/store/reducers/login";

export default combineReducers({
  login: LoginReducer,
  // ui: uiReducer,
});
