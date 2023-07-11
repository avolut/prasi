import { PageLog } from "./page-log";

export const consoleOverride = {
  ...console,
  log(...args: any[]) {
    PageLog.output +=
      "\n" +
      args
        .map((e) => (typeof e === "string" ? e : JSON.stringify(e, null, 2)))
        .join(" ");
    PageLog.render();
    console.log(...args);
  },
};
