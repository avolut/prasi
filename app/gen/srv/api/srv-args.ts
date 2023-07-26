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
export const _parsejs = {
  url: "/_parsejs",
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
export const site_load = {
  url: "/site-load",
  args: ["name","_page"],
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