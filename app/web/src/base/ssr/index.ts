import trim from "lodash.trim";
import { OnRequestSSR } from "service-web/pkgs/web-types";
import { ssr } from "web-init";

export default ssr({
  path: "/**",
  onRequest: async ({ req, res, ssr, asset, mode }) => {
    let [_, name, ...pathname] = trim(req.url, "/").split("/");

    try {
      if (!serveAsset(asset, pathname, res)) {
        res.send(await ssr.render());
      }
    } catch (e) {
      console.error(e);
      res.send("NOT FOUND");
    }
    res.end();
  },
});

type SSRParam = Parameters<OnRequestSSR>[0];
export const serveAsset = (
  asset: SSRParam["asset"],
  pathname: string[],
  res: SSRParam["res"]
) => {
  const file = asset.get(pathname.join("/").split("?")[0]);
  if (file) {
    res.setHeader("etag", file.etag);
    if (file.mime) res.setHeader("content-type", file.mime);
    res.send(file.content);
    return true;
  }    
  return false;
};
