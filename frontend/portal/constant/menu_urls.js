export const BASE_PATH = PATH_PREFIX || "";

let PORTAL_PREFIX = BASE_PATH + "";

if(NODE_ENV && NODE_ENV == "production"){
  PORTAL_PREFIX = "";
}

export const ADMIN = BASE_PATH + "/admin";

export const HOME = PORTAL_PREFIX + "/";
export const ABOUT = PORTAL_PREFIX + "/about";
export const FAQ = PORTAL_PREFIX + "/faq";
export const PROFILE = PORTAL_PREFIX + "/profile";
export const SIGN_IN = PORTAL_PREFIX + "/signin";
export const SIGN_OUT = PORTAL_PREFIX + "/signout";

// Category
export const CATEGORY = PORTAL_PREFIX + "/c/:code";
export const CATEGORY_ENTITY = (code) => PORTAL_PREFIX + `/c/${code}`;
