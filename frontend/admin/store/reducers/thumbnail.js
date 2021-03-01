import { API_MEDIAS } from "@admin/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@admin/store/api.js";

const slice = createSlice({
  name: "media",
  initialState: {
    // public status, fetching and deleting
    loading: null,
    status: null,
    time: Date.now(),

    // For thumbnails list, must be an array
    thumbnails: null,
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
      state.thumbnails = action.payload;
    },
  }, //reducers
}); // createSlice

export const {
  requested,
  requestFailed,
  fetchSucceed,
} = slice.actions;

export default slice.reducer;

export const fetch = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_MEDIAS,
      method: "GET",
      params: data,
      onStart: requested.type,
      onSuccess: fetchSucceed.type,
      onError: requestFailed.type,
    })
  );
};