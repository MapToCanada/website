import axios from "axios";
import * as actions from "../api";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;
const token = sessionStorage.getItem("token");

const api = ({ dispatch }) => (next) => async (action) => {
  if (
    action.type !== actions.apiCallBegan.type &&
    action.type !== actions.apiFileUploadCallBegan.type &&
    action.type !== actions.apiServiceCallBegan.type
  )
    return next(action);

  const {
    url,
    method,
    data,
    params,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  let headers = {};

  if (action.type !== actions.apiServiceCallBegan.type && token) {
    headers["Authorization"] = `Token ${token}`;
  }

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: API_HOST,
      url,
      headers,
      method,
      data,
      params,
    });
    // General
    dispatch(actions.apiCallSuccess(response.data));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    if (error.response) {
      // General
      dispatch(actions.apiCallFailed(error.response.data));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.response.data });
    } else {
      // General
      dispatch(actions.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  }
};

export default api;
