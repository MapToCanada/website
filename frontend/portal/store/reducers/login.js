/* eslint-disable no-undef */
import { USER_LOGIN, USER_SIGN_OUT, USER_VALIDATE } from "@portal/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@portal/store/api.js";

const slice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    loggedIn: false,
    isStaff: false,
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

    // User login
    loginRequestSucceed: (state, action) => {
      if (action.payload && action.payload.err) {
        state.status = "error";
        state.message = action.payload.message;
        state.time = Date.now();
      } else {
        const data = action.payload;
        state.loggedIn = true;
        state.status = "success";
        state.username = data.username;
        state.token = data.token;
        if(data.is_staff === true){
          state.isStaff = data.is_staff;
        }
        if(data["profile"] && data["profile"]["avatar"]){
          state.avatar = data["profile"]["avatar"]
        }
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("token", data.token);
      }
      state.loading = false;
    },

    // User logout
    logoutRequestSucceed: (state) => {
      state.loggedIn = false;
      state.user = {};
      //setAuthorizationToken(false);
      sessionStorage.removeItem("token"); 
      //window.location.href = "/";
      state.loading = false;
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
  loginRequestSucceed,
  loginRequestFailed,
  logoutRequestSucceed,
  authtokenRequestSucceed,
} = slice.actions;
export default slice.reducer;

export const login = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: USER_LOGIN,
      method: "POST",
      data: data,
      onStart: loginRequested.type,
      onSuccess: loginRequestSucceed.type,
      onError: loginRequestFailed.type,
    })
  );
};

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

export const logout = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: USER_SIGN_OUT,
      method: "POST",
      onSuccess: logoutRequestSucceed.type,
    })
  );
};
