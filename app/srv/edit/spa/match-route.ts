import trim from "lodash.trim";

export const matchRoute = (pathname: string) => {
  const parts = trim(pathname, "/").split("/");
  let site_id = "";
  if (parts.length >= 1) {
    site_id = parts.shift() || "";
  }

  return { site_id, pathname: `${parts.join("/")}` };
};
