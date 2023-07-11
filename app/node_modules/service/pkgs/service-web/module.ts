import { Request, Response } from "hyper-express";
import { g } from "web-init/src/types";
import { web } from "./src/glb-web";
import { renderSSR } from "./src/render-ssr";
export * from "./src/init-ssr";

export const serve = async (
  req: Request,
  res: Response,
  mode: "dev" | "staging" | "prod"
) => {
  try {
    const foundSSR = g.routerSSR.lookup(req.url);
    if (foundSSR) {
      foundSSR.ssr({
        req,
        res,
        asset: web.asset,
        ssr: {
          async render(props) {
            return await renderSSR(req, res, 200, "render")(props);
          },
          async stream(props) {
            return await renderSSR(req, res, 200, "stream")(props);
          },
        },
        mode,
      });
    } else {
      const result = await renderSSR(req, res, 200, web.ssrMode)({});
      if (web.ssrMode === "render") res.send(result);
    }
  } catch (e) {
    console.error(e);
  }
};
