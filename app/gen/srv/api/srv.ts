export const _dbs = {
  name: "_dbs",
  url: "/_dbs/:dbName/:action",
  path: "app/srv/api/built-in/_dbs.ts",
  args: ["dbName","action"],
  handler: import("../../../srv/api/built-in/_dbs")
}
export const _delete = {
  name: "_delete",
  url: "/_delete",
  path: "app/srv/api/built-in/_delete.ts",
  args: ["path"],
  handler: import("../../../srv/api/built-in/_delete")
}
export const _file = {
  name: "_file",
  url: "/_file/**",
  path: "app/srv/api/built-in/_file.ts",
  args: [],
  handler: import("../../../srv/api/built-in/_file")
}
export const _img = {
  name: "_img",
  url: "/_img/**",
  path: "app/srv/api/built-in/_img.ts",
  args: [],
  handler: import("../../../srv/api/built-in/_img")
}
export const _parse_db = {
  name: "_parse_db",
  url: "/_parse/db",
  path: "app/srv/api/built-in/_parse-db.ts",
  args: ["js"],
  handler: import("../../../srv/api/built-in/_parse-db")
}
export const _upload = {
  name: "_upload",
  url: "/_upload/:site",
  path: "app/srv/api/built-in/_upload.ts",
  args: ["site"],
  handler: import("../../../srv/api/built-in/_upload")
}
export const change_password = {
  name: "change_password",
  url: "/change-password",
  path: "app/srv/api/built-in/auth/change-password.ts",
  args: ["data"],
  handler: import("../../../srv/api/built-in/auth/change-password")
}
export const choose_template = {
  name: "choose_template",
  url: "/choose-template",
  path: "app/srv/api/built-in/auth/choose-template.ts",
  args: ["user"],
  handler: import("../../../srv/api/built-in/auth/choose-template")
}
export const login = {
  name: "login",
  url: "/_login",
  path: "app/srv/api/built-in/auth/login.ts",
  args: ["username","password"],
  handler: import("../../../srv/api/built-in/auth/login")
}
export const logout = {
  name: "logout",
  url: "/_logout",
  path: "app/srv/api/built-in/auth/logout.ts",
  args: [],
  handler: import("../../../srv/api/built-in/auth/logout")
}
export const register = {
  name: "register",
  url: "/register",
  path: "app/srv/api/built-in/auth/register.ts",
  args: ["user"],
  handler: import("../../../srv/api/built-in/auth/register")
}
export const session = {
  name: "session",
  url: "/_session",
  path: "app/srv/api/built-in/auth/session.ts",
  args: [],
  handler: import("../../../srv/api/built-in/auth/session")
}
export const verification = {
  name: "verification",
  url: "/verification",
  path: "app/srv/api/built-in/auth/verification.ts",
  args: ["phone"],
  handler: import("../../../srv/api/built-in/auth/verification")
}
export const callback_payment = {
  name: "callback_payment",
  url: "/callback-payment",
  path: "app/srv/api/built-in/user/callback-payment.ts",
  args: [],
  handler: import("../../../srv/api/built-in/user/callback-payment")
}
export const payment = {
  name: "payment",
  url: "/_payment",
  path: "app/srv/api/built-in/user/payment.ts",
  args: ["info"],
  handler: import("../../../srv/api/built-in/user/payment")
}
export const user_create = {
  name: "user_create",
  url: "/user-create",
  path: "app/srv/api/built-in/user/user-create.ts",
  args: ["user"],
  handler: import("../../../srv/api/built-in/user/user-create")
}
export const check = {
  name: "check",
  url: "/check",
  path: "app/srv/api/check.ts",
  args: [],
  handler: import("../../../srv/api/check")
}
export const comp_attach = {
  name: "comp_attach",
  url: "/comp-attach",
  path: "app/srv/api/comp-attach.ts",
  args: ["arg"],
  handler: import("../../../srv/api/comp-attach")
}
export const comp_create = {
  name: "comp_create",
  url: "/comp-create",
  path: "app/srv/api/comp-create.ts",
  args: ["arg"],
  handler: import("../../../srv/api/comp-create")
}
export const comp_scan = {
  name: "comp_scan",
  url: "/comp-scan/:page_id",
  path: "app/srv/api/comp-scan.ts",
  args: ["page_id"],
  handler: import("../../../srv/api/comp-scan")
}
export const compile_js = {
  name: "compile_js",
  url: "/compile-js",
  path: "app/srv/api/compile-js.ts",
  args: ["alljs"],
  handler: import("../../../srv/api/compile-js")
}
export const local_ip = {
  name: "local_ip",
  url: "/local-ip",
  path: "app/srv/api/local-ip.ts",
  args: [],
  handler: import("../../../srv/api/local-ip")
}
export const npm_bundle = {
  name: "npm_bundle",
  url: "/npm-bundle/:mode/:id",
  path: "app/srv/api/npm-bundle.ts",
  args: ["mode","id"],
  handler: import("../../../srv/api/npm-bundle")
}
export const npm_size = {
  name: "npm_size",
  url: "/npm-size/:mode/:id",
  path: "app/srv/api/npm-size.ts",
  args: ["mode","id"],
  handler: import("../../../srv/api/npm-size")
}
export const npm = {
  name: "npm",
  url: "/npm/:mode/:id/*",
  path: "app/srv/api/npm.ts",
  args: ["mode","id"],
  handler: import("../../../srv/api/npm")
}
export const page_reload = {
  name: "page_reload",
  url: "/page-reload/:page_id",
  path: "app/srv/api/page-reload.ts",
  args: ["page_id"],
  handler: import("../../../srv/api/page-reload")
}
export const site_bundle = {
  name: "site_bundle",
  url: "/site-bundle",
  path: "app/srv/api/site-bundle.ts",
  args: [],
  handler: import("../../../srv/api/site-bundle")
}
export const site_dts = {
  name: "site_dts",
  url: "/site-dts/:site_id",
  path: "app/srv/api/site-dts.ts",
  args: ["site_id"],
  handler: import("../../../srv/api/site-dts")
}
export const site = {
  name: "site",
  url: "/site/**",
  path: "app/srv/api/site.ts",
  args: [],
  handler: import("../../../srv/api/site")
}
export const spa_raw = {
  name: "spa_raw",
  url: "/spa-raw/**",
  path: "app/srv/api/spa-raw.ts",
  args: [],
  handler: import("../../../srv/api/spa-raw")
}
export const spa = {
  name: "spa",
  url: "/spa/**",
  path: "app/srv/api/spa.ts",
  args: [],
  handler: import("../../../srv/api/spa")
}
export const srv_image_gallery = {
  name: "srv_image_gallery",
  url: "/get-gallery/:site_id",
  path: "app/srv/api/srv-image-gallery.ts",
  args: ["site_id"],
  handler: import("../../../srv/api/srv-image-gallery")
}
export const srvapi_check = {
  name: "srvapi_check",
  url: "/srvapi-check/:site_id",
  path: "app/srv/api/srvapi-check.ts",
  args: ["site_id"],
  handler: import("../../../srv/api/srvapi-check")
}
export const srvapi_dbpull = {
  name: "srvapi_dbpull",
  url: "/srvapi-dbpull",
  path: "app/srv/api/srvapi-dbpull.ts",
  args: ["site_id","dburl"],
  handler: import("../../../srv/api/srvapi-dbpull")
}
export const srvapi_destroy = {
  name: "srvapi_destroy",
  url: "/srvapi-destroy",
  path: "app/srv/api/srvapi-destroy.ts",
  args: ["site_id"],
  handler: import("../../../srv/api/srvapi-destroy")
}
export const srvapi_new = {
  name: "srvapi_new",
  url: "/srvapi-new/:site_id",
  path: "app/srv/api/srvapi-new.ts",
  args: ["site_id"],
  handler: import("../../../srv/api/srvapi-new")
}
export const srvapi_op = {
  name: "srvapi_op",
  url: "/srvapi-op",
  path: "app/srv/api/srvapi-op.ts",
  args: ["site_id","op"],
  handler: import("../../../srv/api/srvapi-op")
}
export const ssr = {
  name: "ssr",
  url: "/ssr/:site_id/:page_id",
  path: "app/srv/api/ssr.ts",
  args: ["site_id","page_id","options","exports"],
  handler: import("../../../srv/api/ssr")
}