import { useEffect } from "react";
import { useLocal } from "web-utils";
import { Page, w } from "../../types/general";
import { createAPI, createDB } from "./api-db";
import { consoleOverride } from "./console-override";

export const execPage = (page: Page, globalScope: any, api_url?: string) => {
  if (page.js_compiled) {
    try {
      const module: any = {};
      const evalArgs = produceEvalArgs(module, globalScope, api_url);
      const scriptEval = new Function(
        ...Object.keys(evalArgs),
        ` ${page.js_compiled}`
      );

      return scriptEval(...Object.values(evalArgs));
    } catch (e) {
      console.log(e);
    }
  }

  return {};
};

const produceEvalArgs = (module: any, globalScope: any, api_url?: string) => {
  const result: any = {
    ...globalScope,
    module,
    console: w.isEditor ? consoleOverride : console,
    useLocal: useLocal,
    useEffect: useEffect,
  };

  if (api_url) {
    result["api"] = createAPI(api_url);
    result["db"] = createDB(api_url);
  }

  return result;
};
