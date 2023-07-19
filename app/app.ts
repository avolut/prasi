/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀
*/

import { dir } from "dir";
import { $ } from "execa";
import { initialize, service } from "service";

initialize(async (mode) => {
  await service.db._process.start();
  await service.srv._process.start();
  await service.web._process.start();

  if (mode === "dev") {
    await $({ cwd: dir.root("app/prasi-site") })`bun i`;
    $({ cwd: dir.root("app/prasi-site"), stdio: "inherit" })`bun run dev`;
  }
});
