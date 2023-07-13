export const _dbs = {
  url: "/_dbs/:dbName/:action",
  args: ["dbName","action"],
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