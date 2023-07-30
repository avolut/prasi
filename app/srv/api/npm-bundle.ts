import { npm_page, npm_site } from "dbgen";
import { dir } from "dir";
import * as esbuild from "esbuild";
import { build } from "esbuild";
import { dirAsync, writeAsync } from "fs-jetpack";
import http from "node:http";
import https from "node:https";
import { apiContext } from "service-srv";

export type NPMImportAs = {
  main: { mode: "default" | "*"; name: string };
  names: string[];
};

export const _ = {
  url: "/npm-bundle/:mode/:id",
  async api(mode: "site" | "page", id: string) {
    const { req, res } = apiContext(this);

    let items = [] as npm_page[] | npm_site[];

    if (mode === "site") {
      items = await db.npm_site.findMany({ where: { id_site: id } });
    } else {
      items = await db.npm_page.findMany({ where: { id_page: id } });
    }

    const imports = items
      .map((e) => {
        const import_as = e.import_as as NPMImportAs;

        if (import_as.main.name || import_as.names.length > 0) {
          let main = "";
          let names = import_as.names.map((e) => `__${e}`);

          if (import_as.main.name) {
            main =
              import_as.main.mode === "default"
                ? `__${import_as.main.name}`
                : `* as __${import_as.main.name}`;
          }

          return `import ${main}${
            names.length > 0 ? `{ ${names.join(",")} }` : ""
          } from "https://cdn.jsdelivr.net/npm/${e.module}@${e.version}/+esm";`;
        }
        return "";
      })
      .filter((e) => !!e)
      .join("\n");

    const exports = items
      .map((e) => {
        const import_as = e.import_as as NPMImportAs;

        if (import_as.main.name || import_as.names.length > 0) {
          let main = "";
          let names = import_as.names;

          if (import_as.main.name) {
            main = import_as.main.name;
          }

          const res: string[] = [];
          if (main) {
            res.push(`exports.${main} = __${main};`);
          }

          if (names.length > 0) {
            names.forEach((e) => {
              res.push(`exports.${e} = __${e};`);
            });
          }
          return res.join("\n");
        }
        return "";
      })
      .filter((e) => !!e)
      .join("\n");

    const src = `\
${imports}
${exports}
`.trim();
    await dirAsync(dir.path(`../npm/${mode}/${id}`));
    await writeAsync(dir.path(`../npm/${mode}/${id}/input.js`), src);

    let out: esbuild.BuildResult = null as any;
    try {
      out = await build({
        entryPoints: [dir.path(`../npm/${mode}/${id}/input.js`)],
        bundle: true,
        outfile: dir.path(`../npm/${mode}/${id}/index.js`),
        plugins: [httpPlugin],
        minify: true,
        sourcemap: true,
        logLevel: "silent",
      });
    } catch (e) {
      console.log(e);
    }
    return "ok";
  },
};

let httpPlugin: esbuild.Plugin = {
  name: "http",
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url",
    }));

    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url: string) {
          let lib = url.startsWith("https") ? https : http;
          let req = lib.get(url, (res) => {
            if (
              res.statusCode &&
              res.headers.location &&
              [301, 302, 307].includes(res.statusCode)
            ) {
              fetch(new URL(res.headers.location, url).toString());
              req.destroy();
            } else if (res.statusCode === 200) {
              let chunks: any[] = [];
              res.on("data", (chunk) => chunks.push(chunk));
              res.on("end", () => resolve(Buffer.concat(chunks)));
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`));
            }
          });
        }
        fetch(args.path);
      });
      return { contents } as esbuild.OnLoadResult;
    });
  },
};
