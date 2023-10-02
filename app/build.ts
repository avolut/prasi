import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { dir } from "dir";
import { context } from "esbuild";
import { copyAsync, existsAsync, removeAsync } from "fs-jetpack";

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
};

const buildSPARaw = async (mode: string) => {
  await removeAsync(dir.root(".output/app/srv/spa-raw"));
  const ctx = await context({
    bundle: true,
    absWorkingDir: dir.root(""),
    entryPoints: [dir.root("app/web/src/render/spa/spa-raw.tsx")],
    outdir: dir.root(".output/app/srv/spa-raw"),
    format: "iife",
    jsx: "transform",
    minify: true,
    sourcemap: true,
    logLevel: "error",
    define: {
      "process.env.NODE_ENV": `"production"`,
    },
    external: ["react"],
    plugins: [
      globalExternals({
        react: {
          varName: "window.React",
          type: "cjs",
        },
        "react-dom/server": {
          varName: "window.ReactDOMServer",
          type: "cjs",
        },
        "react/jsx-runtime": {
          varName: "window.JSXRuntime",
          type: "cjs",
        },
      }),
    ],
  });
  if (mode === "dev") {
    await ctx.watch({});
  } else {
    await ctx.rebuild();
  }
};

const buildSPA = async (mode: string) => {
  await removeAsync(dir.root(".output/app/srv/spa"));
  const ctx = await context({
    bundle: true,
    absWorkingDir: dir.root(""),
    entryPoints: [dir.root("app/web/src/render/spa/spa.tsx")],
    outdir: dir.root(".output/app/srv/spa"),
    splitting: true,
    format: "esm",
    jsx: "transform",
    minify: true,
    sourcemap: true,
    logLevel: "error",
    define: {
      "process.env.NODE_ENV": `"production"`,
    },
  });
  if (mode === "dev") {
    await ctx.watch({});
  } else {
    await ctx.rebuild();
  }
};

const buildSSR = async (mode: string) => {
  const ctx = await context({
    bundle: true,
    absWorkingDir: dir.root(""),
    entryPoints: [dir.root("app/web/src/render/ssr/ssr.tsx")],
    outfile: dir.root(".output/app/srv/ssr/index.jsx"),
    format: "iife",
    jsx: "transform",
    logLevel: "error",
    define: {
      "process.env.NODE_ENV": `"production"`,
    },
    external: ["react"],
    plugins: [
      globalExternals({
        react: {
          varName: "window.React",
          type: "cjs",
        },
        "react-dom/server": {
          varName: "window.ReactDOMServer",
          type: "cjs",
        },
        "react/jsx-runtime": {
          varName: "window.JSXRuntime",
          type: "cjs",
        },
      }),
    ],
    banner: {
      js: `window.isSSR = true;`,
    },
  });
  if (mode === "dev") {
    await ctx.watch({});
  } else {
    await ctx.rebuild();
  }
};
