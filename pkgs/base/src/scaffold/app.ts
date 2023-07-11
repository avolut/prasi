import { dir } from "dir";
import { existsSync, readdirSync, statSync } from "fs";
import { writeAsync } from "fs-jetpack";
import { serviceGen } from "../appgen/service";

export const prepareApp = async () => {
  await writeAsync(
    dir.path(".output/app/pnpm-workspace.yaml"),
    `\
packages:
  - ./*`
  );

  const dirs = readdirSync(dir.path("app"))
    .filter(
      (e) => !["node_modules", "app.ts", "package.json", "gen"].includes(e)
    )
    .map((e) => ({ name: e, stat: statSync(dir.path(`app/${e}`)) }))
    .filter(
      ({ stat, name }) =>
        stat.isDirectory() && existsSync(dir.path(`app/${name}/main.ts`))
    );

  await serviceGen();
  return {
    input: dir.root("app/app.ts"),
    output: dir.root(".output/app/app.js"),
    cwd: dir.root(".output/app"),
    serviceNames: dirs.map((e) => e.name) as string[],
  };
};
