import { dir } from "dir";
import { copyAsync, existsAsync } from "fs-jetpack";
export const build = async () => {
  if (!(await existsAsync(dir.root(".output/app/stencil/prasi-api")))) {
    await copyAsync(dir.root("stencil"), dir.root(".output/app/stencil"), {
      overwrite: true,
    });
  }
};
