import { dir } from "dir";
import { apiContext } from "service-srv";
export const _ = {
  url: "/spa",
  async api() {
    const { req, res } = apiContext(this);
    res.sendFile(dir.path("srv/spa/index.jsx"));
  },
};
