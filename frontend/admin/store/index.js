import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/api";
import toast from "./middleware/toast";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["api/fileUploadCallBegan"],
        },
      }),
      logger,
      toast,
      api,
    ],
  });
}
