import { dir } from "dir";
import { readAsync } from "fs-jetpack";
import { Request, Response } from "hyper-express";
import { service } from "../../export";

const cache = { index: "" };

export const serve = async (
  req: Request,
  res: Response,
  mode: "dev" | "staging" | "prod"
) => {
  if (!cache.index || mode === "dev") {
    const src = await readAsync(dir.path("web/public/index.html"));
    if (src) {
      cache.index = src;
    }

    cache.index = cache.index.replace(
      "</body>",
      `\
  <script>
    window.__SRV_URL__ = "${await service.srv.publicURL()}"
  </script>
</body>`
    );
    console.log(cache.index);
  }

  res.setHeader("content-type", "text/html");
  res.send(cache.index);
};
