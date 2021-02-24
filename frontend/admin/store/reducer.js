import { combineReducers } from "redux";
import LoginReducer from "@admin/store/reducers/login";
import CategoryReducer from "@admin/store/reducers/category";
import ArchiveReducer from "@admin/store/reducers/archive";

export default combineReducers({
  login: LoginReducer,
  entity: combineReducers({
    category: CategoryReducer,
    archive: ArchiveReducer,
  }),
  // ui: uiReducer,
});
