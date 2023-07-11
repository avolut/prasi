import { dir } from "dir";
import { existsAsync, readAsync, writeAsync } from "fs-jetpack";
import { readdir, stat } from "fs/promises";
import { traverse } from "../scaffold/parser/traverse";

export const serviceGen = async () => {
  const names: string[] = [];

  const actions: { type: "single" | "multi"; name: string }[] = [];
  for (const f of await readdir(dir.root("app"))) {
    const s = await stat(dir.root(`app/${f}`));
    if (s.isDirectory() && (await existsAsync(dir.root(`app/${f}/main.ts`)))) {
      names.push(f);

      if (f.startsWith("web") || f.startsWith("db") || f.startsWith("srv")) {
        actions.push({ type: "single", name: f });
      } else {
        const src = await readAsync(dir.root(`app/${f}/main.ts`), "utf8");

        if (src) {
          await traverse(src, (parent) => ({
            visitObjectExpression(n) {
              for (const p of n.properties) {
                if (
                  p.type === "KeyValueProperty" &&
                  p.key.type === "Identifier" &&
                  p.key.value === "mode" &&
                  p.value.type === "StringLiteral"
                ) {
                  actions.push({ type: p.value.value as "single", name: f });
                }
              }
              return parent.visitObjectExpression(n);
            },
          }));
        }
      }
    }
  }

  await writeAsync(
    dir.root(`app/gen/service/actions.d.ts`),
    `\
${actions
  .map((e) => {
    return `import { main as ${e.name}_action } from "../../${e.name}/main";`;
  })
  .join("\n")}

export type actions = {
${actions
  .map((e) => {
    return `\
  ${e.name}: {
    type: "${e.type}";
    action: Awaited<typeof ${e.name}_action>;
  };`;
  })
  .join("\n")}
}
`
  );

  await writeAsync(
    dir.root(`app/gen/service/name.ts`),
    `export type SERVICE_NAME = "${names.join(`" | "`)}";`
  );
};
