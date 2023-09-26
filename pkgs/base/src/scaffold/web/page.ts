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

export const parsePage = async (filePath: string) => {
  const result = { url: "", layout: "", file: filePath };
  const src = await readAsync(filePath, "utf8");

  if (src) {
    await traverse(src, (parent) => ({
      visitObjectExpression(n) {
        for (const p of n.properties) {
          if (p.type === "KeyValueProperty" && p.key.type === "Identifier") {
            if (p.key.value === "url" && p.value.type === "StringLiteral") {
              result.url = p.value.value;
            }
            if (p.key.value === "layout" && p.value.type === "StringLiteral") {
              result.layout = p.value.value;
            }
          }
        }
        return parent.visitObjectExpression(n);
      },
    }));
  }
  return result;
};

export const generatePage = async (name: string, path: string) => {
  const parsed = await Promise.all((await scan(path)).map(parsePage));

  const content = () => (e: Awaited<ReturnType<typeof parsePage>>) => {
    const page = e.file
      .substring(0, e.file.length - extname(e.file).length)
      .substring(path.length + 1)
      .replace(/\W/gi, "_");
    const filePath = e.file.substring(path.length + 1);
    const importPath = `"../../../${name}/src/base/page/${filePath.substring(
      0,
      filePath.length - extname(filePath).length
    )}"`;

    return `\
export const ${page} = {
  name: "${page}",
  url: "${e.url}",
  path: "${e.file.substring(dir.root("").length + 1)}",
  layout: ${e.layout ? `"${e.layout}"` : `undefined`},
  component: () => import(${importPath.replace('\\', '/')})
}`;
  };

  await writeAsync(
    dir.root(`app/gen/web/page/${name}.ts`),
    parsed.map(content()).join("\n")
  );
};

export const generatePageEntry = async (dirs: string[]) => {
  await removeAsync(dir.root(`app/gen/web/page`));
  await writeAsync(
    dir.root(`app/gen/web/page/entry.ts`),
    dirs.map((e) => `export * as ${e} from "./${e}"`).join("\n")
  );
};
