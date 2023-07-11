import { dir } from "dir";
import { removeAsync, writeAsync } from "fs-jetpack";
import { extname } from "path";
import { walkDir } from "../parser/utils";

const scan = async (path: string) => {
  const dirs = (await walkDir(path)).filter(
    (e) => e.endsWith(".ts") || e.endsWith(".tsx")
  );
  return dirs;
};

const parse = async (filePath: string) => {
  const result = { file: filePath };
  return result;
};

export const generateLayout = async (name: string, path: string) => {
  const parsed = await Promise.all((await scan(path)).map(parse));
  await writeAsync(
    dir.root(`app/gen/web/layout/${name}.ts`),
    `\
export default {
${parsed
  .map((e) => {
    const page = e.file
      .substring(0, e.file.length - extname(e.file).length)
      .substring(path.length + 1)
      .replace(/\W/gi, "_");
    const filePath = e.file.substring(path.length + 1);
    const importPath = `"../../../${name}/src/base/layout/${filePath.substring(
      0,
      filePath.length - extname(filePath).length
    )}"`;
    return `  ${page}: import(${importPath})`;
  })
  .join(",\n")}
}`
  );
};

export const generateLayoutEntry = async (dirs: string[]) => {
  await removeAsync(dir.root(`app/gen/web/layout`));
  await writeAsync(
    dir.root(`app/gen/web/layout/entry.ts`),
    dirs.map((e) => `export * as ${e} from "./${e}"`).join("\n")
  );
};
