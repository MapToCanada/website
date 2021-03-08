import request from "@admin/utils/request";
import { API_ARCHIVE, API_UPLOAD_NONE_HOST } from "@admin/constant/apis.js";

export const del = async (id, params = {}) => {
  return await request({
    url: API_ARCHIVE + id + "/",
    method: "DELETE",
    params,
  });
};

export const edit = async (id, data) => {
  return await request({
    url: API_ARCHIVE + id + "/",
    method: "PUT",
    data: data,
  });
};

export const create = async (data) => {
  return await request({
    url: API_ARCHIVE,
    method: "POST",
    data: data,
  });
};

export const uploadImage = async (data) => {
  const formData = new FormData();

  formData.append("file", data);

  return await request({
    url: API_UPLOAD_NONE_HOST,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
