import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { readdir } from "fs/promises";

export const scaffoldWeb = async () => {
  const webs = (await readdir(dir.root("app"))).filter((e) =>
    e.startsWith("web")
  );
  await writeAsync(
    dir.path("app/gen/web/entry.ts"),
    `
${webs
  .map((e) => `export { App as ${e} } from "../../${e}/src/app";`)
  .join("\n")}`
  );
};
