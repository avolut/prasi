import { subscribe } from "@parcel/watcher";
import { spawn } from "child_process";
import { existsAsync } from "fs-jetpack";
import { dir } from "../pkgs/base/pkgs/dir/export";
import { cwd } from "process";

export const build = async (mode: any) => {
  let timeout: NodeJS.Timeout;
  const gen = (delay?: number) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      spawn(
        "./tsc",
        [
          dir.root("app/gen/srv/api/srv.ts"),
          "--declaration",
          "--emitDeclarationOnly",
          "--outFile",
          dir.root(".output/app/srv/api.d.ts"),
        ],
        {
          cwd: dir.root("app/node_modules/.bin"),
        }
      );
    }, delay);
  };

  if (mode === "dev") {
    gen(2000);
    subscribe(dir.root("app/srv/api"), (err, events) => {
      gen(2000);
    });
  } else {
    const ready = async () => {
      if (await existsAsync(dir.root(".output/app/srv"))) {
        done.unsubscribe();
        gen();
      }
    };
    const done = await subscribe(dir.root(".output"), ready);
  }
};
