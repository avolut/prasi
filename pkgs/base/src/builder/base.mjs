import { buildSync, context } from "esbuild";
import { readFile } from "fs/promises";
import { join } from "path";

(async () => {
  const base = join(process.cwd(), "pkgs", "base");
  try {
    const pkg = JSON.parse(await readFile(join(base, "package.json"), "utf-8"));

    const c = await context({
      entryPoints: [join(base, "src", "main.ts")],
      outfile: join(base, "main.js"),
      platform: "node",
      format: "iife",
      bundle: true,
      sourcemap: true,
      external: ["esbuild", ...pkg.external],
      plugins: [
        {
          name: "root",
          setup(build) {
            build.onEnd(async () => {
              if (process.send) {
                process.send("rebuild");
              }
            });
          },
        },
      ],
    });
    await c.watch();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
