import request from "@admin/utils/request";
import { API_ARCHIVE } from "@admin/constant/apis.js";

export const del = async (id) => {
  return await request({
    url: API_ARCHIVE + id + "/",
    method: "DELETE",
  });
};

export const edit = async (id, data) => {
  return await request({
    url: API_ARCHIVE + id + "/",
    method: "PUT",
    data: data
  });
};

export const create = async (data) => {
  return await request({
    url: API_ARCHIVE,
    method: "POST",
    data: data
  });
};
