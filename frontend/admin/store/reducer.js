import { combineReducers } from "redux";
import LoginReducer from "@admin/store/reducers/login";
import CategoryReducer from "@admin/store/reducers/category";
import ArchiveReducer from "@admin/store/reducers/archive";
import ThumbnailReducer from "@admin/store/reducers/thumbnail";

export default combineReducers({
  login: LoginReducer,
  entity: combineReducers({
    category: CategoryReducer,
    archive: ArchiveReducer,
    thumbnail: ThumbnailReducer,
  }),
  // ui: uiReducer,
});
