export const all = {
  name: "all",
  url: "*",
  path: "app\web\src\base\page\all.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/all")
}
export const auth_login = {
  name: "auth_login",
  url: "/login",
  path: "app\web\src\base\page\auth\login.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/login")
}
export const auth_logout = {
  name: "auth_logout",
  url: "/logout",
  path: "app\web\src\base\page\auth\logout.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/logout")
}
export const auth_register = {
  name: "auth_register",
  url: "/register",
  path: "app\web\src\base\page\auth\register.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/register")
}
export const editor = {
  name: "editor",
  url: "/editor/:site/:page",
  path: "app\web\src\base\page\editor.tsx",
  ssr: false,
  layout: "blank",
  component: () => import("../../../web/src/base/page/editor")
}
export const site = {
  name: "site",
  url: "/site/:name/**",
  path: "app\web\src\base\page\site.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/site")
}