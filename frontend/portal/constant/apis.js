const apiServer = API_HOST;
const apiPrefix = API_PREFIX;

export const BASE_URL = apiServer;
export const PREFIX = apiPrefix;

export const LANGUAGE_CODE =
  location.pathname.indexOf("/zh-hans/") !== -1 ? "zh-hans" : "en-us";

const languagePrefix = BASE_URL + "/" + LANGUAGE_CODE;
const langApiPrefix = languagePrefix + PREFIX;
const basePrefix = BASE_URL + PREFIX;

export const USER_LOGIN = langApiPrefix  + "/account/login/"
export const USER_SIGN_OUT = langApiPrefix + "/account/signout/"
export const USER_VALIDATE = langApiPrefix + "/account/validate/"

export const API_UPLOAD = langApiPrefix + "/attachment/upload/"
export const API_IMAGE = (name, w, h) => basePrefix + `/attachment/image/${name}/${w}/${h}/`
export const MEDIA_STATIC = (name) => `/media/${name}`
export const API_AVATAR_UPLOAD = basePrefix + "/attachment/upload-avatar"
export const API_AVATAR = (path, size) => basePrefix + `/attachment/avatar/${path}/${size}/`
