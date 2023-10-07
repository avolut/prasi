export const _dbs = {
  url: "/_dbs/:dbName/:action",
  args: ["dbName","action"],
}
export const _delete = {
  url: "/_delete",
  args: ["path"],
}
export const _file = {
  url: "/_file/**",
  args: [],
}
export const _img = {
  url: "/_img/**",
  args: [],
}
export const _parse_db = {
  url: "/_parse/db",
  args: ["js"],
}
export const _upload = {
  url: "/_upload/:site",
  args: ["site"],
}
export const change_password = {
  url: "/change-password",
  args: ["data"],
}
export const choose_template = {
  url: "/choose-template",
  args: ["user"],
}
export const login = {
  url: "/_login",
  args: ["username","password"],
}
export const logout = {
  url: "/_logout",
  args: [],
}
export const register = {
  url: "/register",
  args: ["user"],
}
export const session = {
  url: "/_session",
  args: [],
}
export const verification = {
  url: "/verification",
  args: ["phone"],
}
export const callback_payment = {
  url: "/callback-payment",
  args: [],
}
export const payment = {
  url: "/_payment",
  args: ["info"],
}
export const user_create = {
  url: "/user-create",
  args: ["user"],
}
export const check = {
  url: "/check",
  args: [],
}
export const comp_attach = {
  url: "/comp-attach",
  args: ["arg"],
}
export const comp_create = {
  url: "/comp-create",
  args: ["arg"],
}
export const comp_scan = {
  url: "/comp-scan/:page_id",
  args: ["page_id"],
}
export const compile_js = {
  url: "/compile-js",
  args: ["alljs"],
}
export const local_ip = {
  url: "/local-ip",
  args: [],
}
export const npm_bundle = {
  url: "/npm-bundle/:mode/:id",
  args: ["mode","id"],
}
export const npm_size = {
  url: "/npm-size/:mode/:id",
  args: ["mode","id"],
}
export const npm = {
  url: "/npm/:mode/:id/*",
  args: ["mode","id"],
}
export const page_reload = {
  url: "/page-reload/:page_id",
  args: ["page_id"],
}
export const site_bundle = {
  url: "/site-bundle/:mode",
  args: ["mode"],
}
export const site_dts = {
  url: "/site-dts/:site_id",
  args: ["site_id"],
}
export const site_edit_js = {
  url: "/site-edit-js/:site_id",
  args: ["site_id","src","compiled"],
}
export const site_export = {
  url: "/site-export/:site_id",
  args: ["site_id"],
}
export const site = {
  url: "/site/**",
  args: [],
}
export const spa_comp = {
  url: "/spa-comp/:comp_id",
  args: ["comp_id"],
}
export const spa_export = {
  url: "/spa-export/:site_id",
  args: ["site_id"],
}
export const spa_page = {
  url: "/spa-page/:page_id",
  args: ["page_id"],
}
export const spa_raw = {
  url: "/spa-raw/**",
  args: [],
}
export const spa = {
  url: "/spa/**",
  args: [],
}
export const srv_image_gallery = {
  url: "/get-gallery/:site_id",
  args: ["site_id"],
}
export const srvapi_check = {
  url: "/srvapi-check/:site_id",
  args: ["site_id"],
}
export const srvapi_dbpull = {
  url: "/srvapi-dbpull",
  args: ["site_id","dburl"],
}
export const srvapi_destroy = {
  url: "/srvapi-destroy",
  args: ["site_id"],
}
export const srvapi_new = {
  url: "/srvapi-new/:site_id",
  args: ["site_id"],
}
export const srvapi_op = {
  url: "/srvapi-op",
  args: ["site_id","op"],
}
export const ssr = {
  url: "/ssr/:site_id/:page_id",
  args: ["site_id","page_id","options","exports"],
}