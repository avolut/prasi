import { runner } from "bundler/runner";
import chalk from "chalk";
import { dir } from "dir";
import { removeAsync, writeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname, join } from "path";
import { pkg, scanDir } from "pkg";
import { connectRPC, createRPC } from "rpc";
import { rootAction as RootAction } from "../../service/src/action";
import { action, baseGlobal } from "./action";
import { buildMainApp } from "./builder/build-app";
import { buildServiceMain } from "./builder/service-main";
import { postRun } from "./builder/service/postrun";
import { prepareBuild } from "./builder/service/prepare";
import { attachCleanUp } from "./cleanup";
import { commitHook } from "./commit-hook";
import { prepareApp } from "./scaffold/app";
import { upgradeHook } from "./upgrade";
import { versionCheck } from "./version-check";
import { vscodeSettings } from "./vscode";
import { watchNewService } from "./watcher/new-service";

const g = global as unknown as {
  afterBuild?: () => Promise<void>;
};

const args = process.argv.slice(2);

const baseMain = async () => {
  process.removeAllListeners("warning");
  attachCleanUp();
  vscodeSettings();

  await pkg.install(dir.root(), {
    deep: { exclude: [dir.root(".output"), dir.root("pkgs/template")] },
  });

  if (await commitHook(args)) return;
  if (await upgradeHook(args)) return;

  if (args.includes("clean")) {
    console.log("Cleaning node_modules");
    const dirs = await scanDir([dir.root()]);
    await removeAsync(dir.root(".output"));
    await Promise.all(
      dirs.map((e) => removeAsync(join(dirname(e), "node_modules")))
    );
    await removeAsync(dir.root("node_modules"));
    return;
  }

  console.log(`── ${padEnd(chalk.yellow(`BASE`) + " ", 47, "─")}`);

  baseGlobal.parcels = new Set();

  await createRPC("base", action, { isMain: true });

  if (
    args.includes("build") ||
    args.includes("deploy") ||
    args.includes("prod") ||
    args.includes("staging")
  ) {
    await removeAsync(dir.root(`.output/app`));

    const app = await prepareApp();
    baseGlobal.app = app;

    baseGlobal.mode = "prod";
    if (args.includes("staging")) {
      baseGlobal.mode = "staging";
    }

    await buildMainApp(app);
    await Promise.all(app.serviceNames.map(async (e) => await prepareBuild(e)));
    await Promise.all(
      app.serviceNames.map(
        async (e) => await buildServiceMain(e, { watch: false })
      )
    );

    if (g.afterBuild) {
      await g.afterBuild();
    }

    await Promise.all(app.serviceNames.map(async (e) => await postRun(e)));
    // await zip(dir.root(".output/app"), dir.root(".output/app.zip"));

    await writeAsync(dir.root(`.output/app/${baseGlobal.mode}`), "");
    console.log(`\nBuild done: ${chalk.green(`.output/app`)}`);
    process.exit(1);
  } else {
    baseGlobal.mode = "dev";

    await removeAsync(dir.root(`.output/app/prod`));
    await removeAsync(dir.root(`.output/app/staging`));

    connectRPC<typeof RootAction>("root", {
      waitConnection: true,
    }).then((e) => {
      if (process.send) process.send("base-restartable");
      baseGlobal.rpc = {
        service: e,
      };
    });

    const app = await prepareApp();
    baseGlobal.app = app;

    watchNewService();
    await buildMainApp(app);
    await Promise.all(app.serviceNames.map(async (e) => await prepareBuild(e)));
    await Promise.all(
      app.serviceNames.map(
        async (e) => await buildServiceMain(e, { watch: true })
      )
    );

    if (g.afterBuild) {
      await g.afterBuild();
    }

    await runner.run({
      path: app.output,
      cwd: app.cwd,
    });

    await Promise.all(app.serviceNames.map(async (e) => await postRun(e)));

    await new Promise(() => {});
  }
};

baseMain();
