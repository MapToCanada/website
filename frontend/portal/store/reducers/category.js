import { API_CATEGORY } from "@portal/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@portal/store/api.js";

const slice = createSlice({
  name: "category",
  initialState: {
    // public status, fetching and deleting
    loading: null,
    status: null,
    time: Date.now(),

    categories: null,
  }, // initialState
  reducers: {
    // Archive api request started
    requested: (state) => {
      state.loading = true;
      state.status = "loading";
    },

    // Api request failed
    requestFailed: (state, action) => {
      state.loading = false;
      state.status = "error";
      state.message = action.payload;
    },

    // Fetch thumbnails list succeed
    fetchSucceed: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.categories = action.payload;
    },
  }, //reducers
}); // createSlice

export const {
  requested,
  requestFailed,
  fetchSucceed,
} = slice.actions;

export default slice.reducer;

export const fetch = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY,
      method: "GET",
      params: params,
      onStart: requested.type,
      onSuccess: fetchSucceed.type,
      onError: requestFailed.type,
    })
  );
};