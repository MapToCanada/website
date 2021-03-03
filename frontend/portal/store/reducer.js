import { combineReducers } from "redux";
import LoginReducer from "@portal/store/reducers/login";
import ArchiveReducer from "@portal/store/reducers/archive";

export default combineReducers({
  login: LoginReducer,
  archive: ArchiveReducer,
  // ui: uiReducer,
});
