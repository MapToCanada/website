import { API_ARCHIVES } from "@portal/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@portal/store/api.js";

const slice = createSlice({
  name: "archive",
  initialState: {
    loading: false,
    status: "",
    archives: null,
  },
  reducers: {
    // Archive API requested
    requested: (state) => {
      state.loading = true;
    },

    // Archive API request succeed
    requestSucceed: (state, action) => {
      state.loading = false;
      state.archives = action.payload;
    },

    // Archive API request failed
    requestFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  requested,
  requestSucceed,
  requestFailed,
} = slice.actions;
export default slice.reducer;

export const fetchArchives = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVES,
      method: "GET",
      params: params,
      onStart: requested.type,
      onSuccess: requestSucceed.type,
      onError: requestFailed.type,
    })
  );
};