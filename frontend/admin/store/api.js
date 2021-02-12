import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/callBegan");
export const apiServiceCallBegan = createAction("api/serviceCallBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

export const apiFileUploadCallBegan = createAction("api/fileUploadCallBegan");