import { API_ARCHIVE } from "@admin/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@admin/store/api.js";

const slice = createSlice({
  name: "archive",
  initialState: {
    // public status, fetching and deleting
    loading: null,
    status: null,
    message: null,
    time: Date.now(),

    // For archive list, must be an array
    archives: [],

    // For archive editing
    loadingDetail: null,
    detailStatus: null,
    archive: null,
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

    // Reset state, used in cleanup
    reset: (state) => {
      state.loading = null;
      state.status = null;
      state.message = null;
      state.archives =null;
      state.archive =null;
    },

    // Create request succeed
    creatingSucceed: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.message = action.payload;
    }, // success

    // Fetch archives list succeed
    fetchSucceed: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.archives = action.payload;
      
    },

    archiveRequested: (state) => {
      state.loadingDetail = true;
      state.detailStatus = "loading";
    },
    archiveRequestedFailed: (state) => {
      state.loadingDetail = false;
      state.detailStatus = "error";
    },
    // Get one archive detail
    archiveReceived: (state, action) => {
      state.loadingDetail = false;
      state.detailStatus = "success";
      state.archive = action.payload;
    },
  }, //reducers
}); // createSlice

export const {
  requested,
  requestFailed,
  reset,

  creatingSucceed,
  fetchSucceed,

  archiveRequested,
  archiveRequestedFailed,
  archiveReceived,

  deletingRequested,
  deletingSucceed,
  deletingFailed,
} = slice.actions;

export default slice.reducer;

export const create = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVE,
      method: "POST",
      data: data,
      onStart: requested.type,
      onSuccess: creatingSucceed.type,
      onError: requestFailed.type,
    })
  );
};

export const fetch = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVE,
      method: "GET",
      params: data,
      onStart: requested.type,
      onSuccess: fetchSucceed.type,
      onError: requestFailed.type,
    })
  );
};

export const get = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_ARCHIVE + id + "/",
      method: "GET",
      onStart: archiveRequested.type,
      onSuccess: archiveReceived.type,
      onError: archiveRequestedFailed.type,
    })
  );
};
