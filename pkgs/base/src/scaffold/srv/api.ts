import { dir } from "dir";
import { readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { basename, extname, sep } from "path";
import { traverse } from "../parser/traverse";
import { walkDir } from "../parser/utils";

const scan = async (path: string) => {
  const dirs = (await walkDir(path)).filter(
    (e) => e.endsWith(".ts") || e.endsWith(".tsx")
  );
  return dirs;
};

export const parseAPI = async (filePath: string) => {
  let name = basename(filePath);
  name = name
    .substring(0, name.length - extname(name).length)
    .replace(/\W/gi, "_");
  const result = {
    name,
    url: "",
    file: filePath,
    params: [] as string[],
  };
  const src = await readAsync(filePath, "utf8");

  if (src) {
    await traverse(src, (parent) => ({
      visitObjectExpression(n) {
        for (const p of n.properties) {
          if (p.type === "KeyValueProperty" && p.key.type === "Identifier") {
            if (p.key.value === "url" && p.value.type === "StringLiteral") {
              result.url = p.value.value;
            }
          } else if (
            p.type === "MethodProperty" &&
            p.key.type === "Identifier" &&
            p.key.value === "api"
          ) {
            for (const prm of p.params) {
              if (prm.pat.type === "Identifier") {
                result.params.push(prm.pat.value);
              }
            }
          }
        }
        return parent.visitObjectExpression(n);
      },
    }));
  }
  return result;
};

export const parseAPIEntry = async (path: string) => {
  const src = await readAsync(path, "utf8");

  const result = {} as Record<string, Awaited<ReturnType<typeof parseAPI>>>;
  if (src) {
    await traverse(src, (parent) => ({
      visitExportDeclaration(n) {
        if (n.declaration.type === "VariableDeclaration") {
          const dec = n.declaration.declarations[0];

          if (
            dec.type === "VariableDeclarator" &&
            dec.init &&
            dec.init.type === "ObjectExpression"
          ) {
            const entry: any = {};
            for (const i of dec.init.properties) {
              if (
                i.type === "KeyValueProperty" &&
                i.key.type === "Identifier"
              ) {
                if (i.value.type === "StringLiteral") {
                  entry[i.key.value] = i.value.value;
                } else if (i.value.type === "ArrayExpression") {
                  entry.params = i.value.elements.map((e) => {
                    if (e?.expression.type === "StringLiteral") {
                      return e.expression.value;
                    }
                  });
                }
              }
            }
            result[entry.name] = entry;
          }
        }

        return parent.visitExportDeclaration(n);
      },
    }));
  }

  return result;
};

export const generateAPI = async (name: string, path: string) => {
  const parsed = await Promise.all((await scan(path)).map(parseAPI));

  const content = () => (e: Awaited<ReturnType<typeof parseAPI>>) => {
    const filePath = e.file.substring(path.length + 1);
    const importPath = `"../../../${name}/api/${filePath
      .substring(0, filePath.length - extname(filePath).length)
      .replace(/\\/gi, "/")}"`;

    return `\
export const ${e.name} = {
  name: "${e.name}",
  url: "${e.url}",
  path: "${e.file.replace(/\\/gi, "/").substring(dir.root("").length + 1)}",
  args: ${JSON.stringify(e.params)},
  handler: import(${importPath})
}`;
  };

  await writeAsync(
    dir.root(`app/gen/srv/api/${name}-args.ts`),
    parsed
      .map((e) => {
        let page = basename(e.file);
        page = page
          .substring(0, page.length - extname(page).length)
          .replace(/\W/gi, "_");

        return `\
export const ${page} = {
  url: "${e.url}",
  args: ${JSON.stringify(e.params)},
}`;
      })
      .join("\n")
  );
  await writeAsync(
    dir.root(`app/gen/srv/api/${name}.ts`),
    parsed.map(content()).join("\n")
  );
};

export const generateAPIEntry = async (dirs: string[]) => {
  await removeAsync(dir.root(`app/gen/srv/api`));
  await writeAsync(
    dir.root(`app/gen/srv/api/entry.ts`),
    dirs.map((e) => `export * as ${e} from "./${e}"`).join("\n")
  );
  await writeAsync(
    dir.root(`app/gen/srv/api/entry-args.ts`),
    dirs.map((e) => `export * as ${e} from "./${e}-args"`).join("\n")
  );
};
