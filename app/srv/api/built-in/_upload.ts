import { appendFile } from "fs/promises";
import { dirname, join } from "path";
import { apiContext, generateUploadPath, UploadedFile } from "service-srv";
import { dirAsync } from "fs-jetpack";
const { pipeline } = require("node:stream/promises");
const fs = require("node:fs");
import mime from "mime-types";
export const _ = {
  url: "/_upload/:site",
  async api(site: string) {
    // console.log('in')
    const { req, res } = await apiContext(this);
    const result: string[] = [];
    try {
      await req.multipart(async (field) => {
        if (field.file) {
          const path = join(process.cwd(), "..", "content", "upload");
          const file = {
            name: field.file.name || "",
            filename: field.file.name || "",
            type: mime.lookup(field.file.name || "") || "",
            fieldname: field.name
          };
          const upath = generateUploadPath(file, path, site);
          // console.log(upath.path)
          await dirAsync(dirname(upath.path));
          // await field.write(upath.path)
          await pipeline(field.file.stream, fs.createWriteStream(upath.path));
          result.push([upath.url].join("/"));
        }
      });
    } catch (error) {
      console.log('error', error)
    }      
    return result;
  },
};
