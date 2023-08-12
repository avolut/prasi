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
  url: "/ssr/:site_id/:page_id",
  async api(
    site_id: string,
    page_id: string,
    options: {
      timeout?: number;
      waitDone?: boolean;
      mode?: "mobile" | "desktop";
    },
    exports: any
  ) {
    const { req, res, mode } = apiContext(this);

    if (!site_id && !page_id) {
      return `NOT FOUND`;
    }
    const site = await db.site.findFirst({ where: { id: site_id } });
    const page = await db.page.findFirst({ where: { id: page_id } });

    if (!site && !page) return `NOT FOUND`;

    (site as any).api_url = get(site, "config.api_url", "");

    if (!ssr.vms[site_id] || mode === "dev") {
      if (!ssr.script || mode === "dev") {
        const script = await readAsync(dir.path("srv/ssr/index.jsx"));
        if (script) {
          ssr.script = script;
        }
      }

      ssr.vms[site_id] = new vm.Script(ssr.script);
    }

    const v = ssr.vms[site_id];
    const dom = new JSDOM();
    dom.window.ssrPrasi = {
      site,
      page,
      mode: get(options, "mode", "desktop"),
    };
    dom.window.process = process;
    dom.window.URL.createObjectURL = (url: any) => {
      return url;
    };
    dom.window.React = React;
    dom.window.fetch = fetch;
    dom.window.ReactDOMServer = ReactDOMServer;
    dom.window.JSXRuntime = JSXRuntime;
    dom.window.stream = stream;
    dom.window.TextEncoder = TextEncoder;
    dom.window.TextDecoder = TextDecoder;
    const waitDone = get(options, "waitDone");
    dom.window.ssrConfig = {
      timeout: get(options, "timeout", 0),
      waitDone: typeof waitDone === "undefined" ? true : waitDone,
    };
    dom.window.exports = { ...(exports || {}) };

    vm.createContext(dom.window);
    try {
      v.runInContext(dom.window);
    } catch (e) {}

    const result = await dom.window.ssrResult;

    return result || "";
  },
};
