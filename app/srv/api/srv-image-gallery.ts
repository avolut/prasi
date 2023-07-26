import { appendFile } from "fs/promises";
import { dirname, join } from "path";
const fs = require("node:fs");
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser();
export const _ = {
  url: "/get-gallery/:site_id",
  async api(site_id: string) {
    let path = join(process.cwd(), "..", "content", "upload", site_id);
    if (fs.existsSync(path)) {
      let files = fs.readdirSync(path);
      let fileList: any = [];
      files.forEach((file: any) => {
        const fullPath = join(path, file);
        let isDirectory = fs.lstatSync(fullPath).isDirectory();
        let pathFolder = fullPath.replace(/\\/g, "/");
        let pathFile = pathFolder.replace(
          path,
          `${site_id ? `/${site_id}` : ""}`
        );
        let url = pathFolder.replace(
          path,
          `/_file${site_id ? `/${site_id}` : ""}`
        );
        let notZone = file.includes(":Zone.Identifier");
        if (!isDirectory && !notZone)
          fileList.push({
            file,
            fullPath: pathFolder,
            url: `${url}`,
            path: `${pathFile}`,
            directory: isDirectory,
            size: fs.statSync(fullPath).size,
            detail: fs.statSync(fullPath),
          });
      });
      return { status: "ok", data: fileList };
    } else {
      fs.mkdirSync(path);
      return { status: "ok", data: [] };
    }
  },
};
