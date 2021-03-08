import axios from "axios";
import { message } from "antd";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

const token = sessionStorage.getItem("token");

const request = async ({url, method, data, params, headers}) => {
  let requestHeaders = {};

  if (token) {
    requestHeaders["Authorization"] = `Token ${token}`;
  }

  if(typeof(headers) == "object" && headers != null && headers != undefined){
    requestHeaders = Object.assign(requestHeaders, headers);
  }

  try {
    const response = await axios.request({
      baseURL: API_HOST,
      url,
      headers: requestHeaders,
      method,
      data,
      params,
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      message.error(error.response.data);
    } else {
      message.error(error.message);
    }
    return false;
  }
};

export default request;
