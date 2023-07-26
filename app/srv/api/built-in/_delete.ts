import { appendFile } from "fs/promises";
import { dirname, join } from "path";
const fs = require("node:fs");
export const _ = {
  url: "/_delete",
  async api(path: string) {
    let root = join(process.cwd(), "..", "content", "upload", path);
    if (fs.existsSync(root)) {
      let isDirectory = fs.lstatSync(root).isDirectory();
      if (isDirectory) {
        fs.rmSync(root, { recursive: true, force: true });
      } else {
        fs.unlinkSync(root);
      }
      return { status: "ok" };
    } else {
      return { status: "ok" };
    }
  },
};
