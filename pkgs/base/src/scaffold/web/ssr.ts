import { dir } from "dir";
import { readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { extname } from "path";
import { traverse } from "../parser/traverse";
import { walkDir } from "../parser/utils";

const scan = async (path: string) => {
  const dirs = (await walkDir(path)).filter(
    (e) => e.endsWith(".ts") || e.endsWith(".tsx")
  );
  return dirs;
};

const parse = async (filePath: string) => {
  const result = { path: "", file: filePath };
  const src = await readAsync(filePath, "utf8");

  if (src) {
    await traverse(src, (parent) => ({
      visitObjectExpression(n) {
        for (const p of n.properties) {
          if (p.type === "KeyValueProperty" && p.key.type === "Identifier") {
            if (p.key.value === "path" && p.value.type === "StringLiteral") {
              result.path = p.value.value;
            }
          }
        }
        return parent.visitObjectExpression(n);
      },
    }));
  }
  return result;
};

export const generateSSR = async (name: string, path: string) => {
  const parsed = await Promise.all((await scan(path)).map(parse));
  await writeAsync(
    dir.root(`app/gen/web/ssr/${name}.ts`),
    parsed
      .map((e) => {
        const page = e.file
          .substring(0, e.file.length - extname(e.file).length)
          .substring(path.length + 1)
          .replace(/\W/gi, "_");
        const filePath = e.file.substring(path.length + 1);
        return `export const ${page} = ["${
          e.path
        }", import("../../../${name}/src/base/ssr/${filePath.substring(
          0,
          filePath.length - extname(filePath).length
        )}")]`;
      })
      .join("\n")
  );
};

export const generateSSREntry = async (dirs: string[]) => {
  await removeAsync(dir.root(`app/gen/web/ssr`));
  await writeAsync(
    dir.root(`app/gen/web/ssr/entry.ts`),
    dirs.map((e) => `export * as ${e} from "./${e}"`).join("\n")
  );
};
