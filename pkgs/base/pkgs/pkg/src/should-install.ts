import chalk from "chalk";
import { existsAsync, readAsync, writeAsync } from "fs-jetpack";
import { dirname, join } from "path";

export const shouldInstall = async (path: string, silent: boolean = false) => {
  const dir = dirname(path);

  let pkg = {} as any;
  try {
    pkg = await readAsync(path, "json");
  } catch (e) {
    try {
      pkg = await readAsync(join(path, "package.json"), "json");
    } catch (e) {}
  }

  let install = false;
  for (const e of ["dependencies", "devDependencies"]) {
    if (!pkg || (pkg && !pkg[e])) continue;

    const entries = Object.entries(pkg[e] as Record<string, string>);
    for (const [k, v] of entries) {
      if (k === "hyper-express") continue;
      if (v.startsWith(".") || v.startsWith("/")) {
        continue;
      }

      // if (!(await existsAsync(join(dir, "node_modules", k))) && !install) {
      //   if (!silent)
      //     console.log(
      //       `module ${chalk.cyan(k)} not found in ${join(
      //         dir,
      //         "node_modules"
      //       ).substring(process.cwd().length + 1)}`
      //     );
      //   install = true;
      // }
      if (v === "*") {
        try {
          const res = await fetch(
            `https://data.jsdelivr.com/v1/packages/npm/${k}/resolved`
          );
          const json = await res.json();
          pkg[e][k] = json.version;
          if (!silent && !install)
            console.log(
              `found ${chalk.cyan(`${k} = "*"`)} in ${path.substring(
                process.cwd().length + 1
              )}`
            );

          install = true;
        } catch (e) {}
      }
    }
  }

  if (install) {
    await writeAsync(path, pkg, { jsonIndent: 2 });
  }

  return install;
};
