import { dir } from "dir";
import { $ } from "execa";
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

  // if (mode !== "dev") {
  //   await copyAsync(
  //     dir.root("app/prasi-site"),
  //     dir.root(".output/app/prasi-site"),
  //     {
  //       overwrite: true,
  //     }
  //   );
  // }
};
