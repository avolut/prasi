import { join, resolve } from "path";
import { apiContext } from "service-srv";
import { existsAsync } from "fs-jetpack";
export const _ = {
  url: "/_file/*",
  async api() {
    const { req, res } = apiContext(this);
    const rpath = req.params._;
    const upath = join(process.cwd(), "..", "content", "upload");
    const path = resolve(join(upath, rpath));
    if (path.startsWith(upath)) {
      if (await existsAsync(path)) {
        res.sendFile(path);
        return;
      }
    } 
    res.sendStatus(404);
    res.json({ response: "not found" });
  },
};
