export const BASE_PATH = PATH_PREFIX || "";

export const ADMIN_PREFIX = BASE_PATH + "/admin";
export const PORTAL = BASE_PATH + NODE_ENV && NODE_ENV == "production" ? "/" : PATH_PREFIX + "/portal";

export const HOME = ADMIN_PREFIX + "/";

export const ARTICLE = ADMIN_PREFIX + "/article";
export const ARTICLE_LIST = ADMIN_PREFIX + "/article/list";
export const ARTICLE_TRASH = ADMIN_PREFIX + "/article/trash";
export const ARTICLE_NEW = ADMIN_PREFIX + "/article/new";
export const ARTICLE_EDIT = ADMIN_PREFIX + "/article/edit/:id";
export const ARTICLE_EDIT_INSTANCE = (id) => ADMIN_PREFIX + `/article/edit/${id}`;
export const CATEGORY = ADMIN_PREFIX + "/article/category";

