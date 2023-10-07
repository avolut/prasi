import { dir } from "dir";
import { Plugin, context } from "esbuild";
import { $ } from "execa";
import { copyAsync, existsAsync, removeAsync, writeAsync } from "fs-jetpack";

export const build = async (mode: string) => {
  if (!(await existsAsync(dir.root(".output/app/prasi-api")))) {
    await copyAsync(
      dir.root("app/prasi-api"),
      dir.root(".output/app/prasi-api"),
      {
        overwrite: true,
      }
    );
  }

  await new Promise<void>(async (resolve) => {
    if (await existsAsync(dir.root("app/gen/srv/api/srv-args.ts"))) {
      resolve();
    } else {
      const retry = () => {
        setTimeout(async () => {
          if (await existsAsync(dir.root("app/gen/srv/api/srv-args.ts"))) {
            resolve();
          } else {
            retry();
          }
        }, 300);
      };
      retry();
    }
  });

  await buildSite(mode);
};

const buildSite = async (mode: string) => {
  await removeAsync(dir.root(".output/app/srv/site"));
  const onEndPlugin: Plugin = {
    name: "on-end",
    setup(build) {
      build.onEnd(async (result) => {
        await removeAsync(dir.root(".output/app/srv/site.zip"));
        await $({ cwd: dir.root(".output/app/srv") })`zip -r site.zip site`;
      });
    },
  };

  const ctx = await context({
    bundle: true,
    absWorkingDir: dir.root(""),
    entryPoints: [dir.root("app/web/src/render/site/site.tsx")],
    outdir: dir.root(".output/app/srv/site"),
    splitting: true,
    format: "esm",
    jsx: "transform",
    minify: true,
    sourcemap: true,
    logLevel: "error",
    plugins: [onEndPlugin],
    define: {
      "process.env.NODE_ENV": `"production"`,
    },
  });
  if (mode === "dev") {
    await ctx.watch({});
  } else {
    await ctx.rebuild();
  }
  await writeAsync(
    dir.root(".output/app/srv/site/index.html"),
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="https://prasi.app/index.css">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script src="/site.js" type="module"></script>
</body>
</html>`
  );
};
