import { appendFile } from "fs/promises";
import { dirname, join } from "path";
import { apiContext, generateUploadPath, UploadedFile } from "service-srv";
import { dirAsync } from "fs-jetpack";
import mime from "mime-types";
export const _ = {
  url: "/_delete",
  async api(arg: { path: string }) {
    // const { path } = arg;
    // const result: string[] = [];
    // return { s: path };
    return { status: "ok" };
  },
};
