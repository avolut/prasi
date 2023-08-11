import { dir } from "dir";
import { readAsync } from "fs-jetpack";
import { JSDOM } from "jsdom";
import get from "lodash.get";
import React from "react";
import ReactDOMServer from "react-dom/server";
import JSXRuntime from "react/jsx-runtime";
import { apiContext } from "service-srv";
import stream from "stream";
import vm from "vm";

const ssr = {
  script: "",
  vms: {} as Record<string, vm.Script>,
};

export const _ = {
  url: "/ssr/:domain/**",
  async api(domain: string, options: { timeout?: number; waitDone?: boolean }) {
    const { req, res, mode } = apiContext(this);

    const pathname = `/${req.params._}`;

    if (!ssr.vms[domain] || mode === "dev") {
      if (!ssr.script || mode === "dev") {
        const script = await readAsync(dir.path("srv/ssr/index.jsx"));
        if (script) {
          ssr.script = script;
        }
      }

      ssr.vms[domain] = new vm.Script(ssr.script);
    }

    const v = ssr.vms[domain];
    const dom = new JSDOM();
    dom.window.prasi = {
      pathname,
      domain,
    };
    dom.window.process = process;
    dom.window.React = React;
    dom.window.ReactDOMServer = ReactDOMServer;
    dom.window.JSXRuntime = JSXRuntime;
    dom.window.stream = stream;
    dom.window.TextEncoder = TextEncoder;
    dom.window.TextDecoder = TextDecoder;
    const waitDone = get(options, "waitDone");
    dom.window.ssrConfig = {
      timeout: get(options, "timeout", 1000),
      waitDone: typeof waitDone === "undefined" ? true : waitDone,
    };

    vm.createContext(dom.window);
    try {
      v.runInContext(dom.window);
    } catch (e) {}

    const result = await dom.window.ssrResult;

    return result || "";
  },
};
