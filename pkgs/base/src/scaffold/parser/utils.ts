import { readdir, stat } from "fs/promises";
import { join } from "path";

export const walkDir = async function (directory: string) {
  let fileList: string[] = [];
  try {
    const files = await readdir(directory);
    for (const file of files) {
      const p = join(directory, file);
      if ((await stat(p)).isDirectory()) {
        fileList = [...fileList, ...(await walkDir(p))];
      } else {
        fileList.push(p);
      }
    }
  } catch (e) {}

  return fileList;
};
