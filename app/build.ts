import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { dir } from "dir";
import { context } from "esbuild";
import { copyAsync, existsAsync } from "fs-jetpack";

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

  const ctx = await context({
    bundle: true,
    entryPoints: [
      dir.root("app/web/src/compo/renderer/prasi/bundle/ssr/prasi.tsx"),
    ],
    outfile: dir.root(".output/app/srv/ssr/index.jsx"),
    format: "iife",
    jsx: "transform",
    logLevel: "silent",
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
      js: `if (typeof isSSR === 'undefined') window.isSSR = false;`,
    },
  });
  if (mode === "dev") {
    await ctx.watch({});
  } else {
    await ctx.rebuild();
  }
};
