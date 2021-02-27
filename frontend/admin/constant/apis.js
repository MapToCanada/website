export const PREFIX = API_PREFIX;

export const LANGUAGE_CODE =
  location.pathname.indexOf("/zh-hans/") !== -1 ? "zh-hans" : "en-us";

const languagePrefix = "/" + LANGUAGE_CODE;
const langApiPrefix = languagePrefix + API_PREFIX;
const basePrefix = API_PREFIX;

// User
export const USER_VALIDATE = langApiPrefix + "/account/validate/"

// Article
export const API_CATEGORY = langApiPrefix + "/archive/category/"
export const API_ARCHIVE = langApiPrefix + "/archive/archives/"

// Attachment
export const API_UPLOAD = API_HOST + basePrefix + "/attachment/upload/"
export const API_IMAGE = (name, w, h) => API_HOST + basePrefix + `/attachment/image/${name}/${w}/${h}/`
export const MEDIA_STATIC = (name) => `/media/${name}`
export const API_AVATAR_UPLOAD = API_HOST + basePrefix + "/attachment/upload-avatar"
export const API_AVATAR = (path, size) => API_HOST + basePrefix + `/attachment/avatar/${path}/${size}/`
export const API_MEDIAS = basePrefix + "/attachment/media/"