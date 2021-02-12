/* eslint-disable no-undef */
import { USER_VALIDATE } from "@admin/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@admin/store/api.js";

const slice = createSlice({
  name: "login",
  initialState: {
    loading: null,
    loggedIn: null,
    isStaff: null,
    avatar: null,
    status: "",
    message: "",
    username: "",
    token: "",
    time: Date.now()
  },
  reducers: {
    // Login request started
    loginRequested: (state) => {
      state.loading = true;
    },

    // User token is available
    authtokenRequestSucceed: (state, action) => {
      state.loading = false;
      
      const data = action.payload;
      state.loggedIn = true;
      state.status = "success";
      state.username = data.username;
      state.token = data.token;
      // If user is staff, he(she) could access admin site
      if(data.is_staff === true){
        state.isStaff = data.is_staff;
      }
      // User profile
      if(data["profile"] && data["profile"]["avatar"]){
        state.avatar = data["profile"]["avatar"]
      }

      // Save base info to session storage of browser
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("token", data.token);
    },

    // Login failed
    loginRequestFailed: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.status = "error";
      state.message = action.payload.message;
    },
  },
});

export const {
  loginRequested,
  loginRequestFailed,
  authtokenRequestSucceed,
} = slice.actions;

export default slice.reducer;

export const authToken = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: USER_VALIDATE,
      method: "GET",
      data: data,
      onStart: loginRequested.type,
      onSuccess: authtokenRequestSucceed.type,
      onError: loginRequestFailed.type,
    })
  );
};
