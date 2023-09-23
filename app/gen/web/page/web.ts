export const all = {
  name: "all",
  url: "*",
  path: "app/web/src/base/page/all.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/all")
}
export const auth_login = {
  name: "auth_login",
  url: "/login",
  path: "app/web/src/base/page/auth/login.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/login")
}
export const auth_logout = {
  name: "auth_logout",
  url: "/logout",
  path: "app/web/src/base/page/auth/logout.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/logout")
}
export const auth_register = {
  name: "auth_register",
  url: "/register",
  path: "app/web/src/base/page/auth/register.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/auth/register")
}
export const ed = {
  name: "ed",
  url: "/ed/:site_id/:page_id",
  path: "app/web/src/base/page/ed.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/ed")
}
export const editor = {
  name: "editor",
  url: "/editor/:site_id/:page_id",
  path: "app/web/src/base/page/editor.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/editor")
}
export const live = {
  name: "live",
  url: "/live/:domain/**",
  path: "app/web/src/base/page/live.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/live")
}
export const preview = {
  name: "preview",
  url: "/preview/:domain/**",
  path: "app/web/src/base/page/preview.tsx",
  ssr: false,
  layout: undefined,
  component: () => import("../../../web/src/base/page/preview")
}