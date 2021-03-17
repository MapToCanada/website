import { combineReducers } from "redux";
import LoginReducer from "@portal/store/reducers/login";
import ArchiveReducer from "@portal/store/reducers/archive";
import CategoryReducer from "@portal/store/reducers/category";

export default combineReducers({
  login: LoginReducer,
  archive: ArchiveReducer,
  category: CategoryReducer,
  // ui: uiReducer,
});
