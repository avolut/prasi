import { dir } from "dir";
import { APIContext } from "service-srv";
import { matchRoute } from "./match-route";
import { list } from "fs-jetpack";

const dirs = {
  spa: list(`srv/spa`) || [],
  "spa-raw": list(`srv/spa-raw`) || [],
};

export const serveSPA = ({
  mode,
  ctx,
}: {
  mode: "spa" | "spa-raw";
  ctx: APIContext;
}) => {
  const { res, req } = ctx;
  const { pathname, site_id } = matchRoute(req.params._);

  if (dirs[mode].includes(pathname)) {
    res.file(dir.path(`srv/${mode}/${pathname}`));
  } else {
    res.file(dir.path(`srv/${mode}/${mode}.js`));
  }
};
