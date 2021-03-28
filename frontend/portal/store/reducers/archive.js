import { API_ARCHIVES } from "@portal/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@portal/store/api.js";

const slice = createSlice({
  name: "archive",
  initialState: {
    // public status, fetching and deleting
    loading: null,
    status: null,
    time: Date.now(),

    archives: null,
    archive: null,
  }, // initialState
  reducers: {
    // Archive api request started
    fetchRequested: (state) => {
      state.loading = true;
      state.status = "loading";
    },

    // Api request failed
    fetchFailed: (state, action) => {
      state.loading = false;
      state.status = "error";
      state.message = action.payload;
    },

    // Fetch archives list succeed
    fetchSucceed: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.archives = action.payload;
    },

    // get one archive
    getRequested: (state) => {
      state.loading = true;
      state.archive = null;
    },

    getSucceed: (state, action) => {
      state.loading = false;
      state.archive = action.payload;
    },

    getFailed: (state) => {
      state.loading = false;
      state.status == "error";
    },
  }, //reducers
}); // createSlice

export const {
  fetchRequested,
  fetchFailed,
  fetchSucceed,
  getRequested,
  getSucceed,
  getFailed
} = slice.actions;

export default slice.reducer;

export const fetch = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVES,
      method: "GET",
      params: params,
      onStart: fetchRequested.type,
      onSuccess: fetchSucceed.type,
      onError: fetchFailed.type,
    })
  );
};

export const get = (code) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVES + "a/" + code + "/",
      method: "GET",
      onStart: getRequested.type,
      onSuccess: getSucceed.type,
      onError: getFailed.type,
    })
  )
}