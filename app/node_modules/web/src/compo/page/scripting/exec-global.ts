import { useEffect } from "react";
import { useGlobal } from "web-utils";
import { w } from "../../types/general";
import { consoleOverride } from "./console-override";
import { PageLog } from "./page-log";
import { createAPI, createDB } from "./api-db";

export const execGlobal = (site: {
  id: string;
  js: null | string;
  css: null | string;
  js_compiled: null | string;
  config?: { api_url?: string };
}) => {
  if (PageLog.shouldClear) PageLog.output = "";
  if (site.js_compiled) {
    try {
      const module: any = {};

      const evalArgs = produceEvalArgs(module);
      const scriptEval = new Function(
        ...Object.keys(evalArgs),
        site.js_compiled
      );
      return scriptEval(...Object.values(evalArgs));
    } catch (e) {
      console.log(e);
    }
  }

  return {};
};

const produceEvalArgs = (module: any, api_url?: string) => {
  const result: any = {
    module,
    console: w.isEditor ? consoleOverride : console,
    useGlobal,
    useEffect,
  };

  if (api_url) {
    result["api"] = createAPI(api_url);
    result["db"] = createDB(api_url);
  }

  return result;
};
