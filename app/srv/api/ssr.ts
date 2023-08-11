import { dir } from "dir";
import { existsAsync, readAsync } from "fs-jetpack";
import { JSDOM } from "jsdom";
import { renderToPipeableStream } from "react-dom/server";
import React from "react";
import ReactDOMServer from "react-dom/server";
import JSXRuntime from "react/jsx-runtime";
import { apiContext } from "service-srv";
import stream from "stream";
import vm from "vm";
import { scanComponent } from "./comp-scan";
const ssr = {
  script: "",
  vms: {} as Record<string, vm.Script>,
};

export const _ = {
  url: "/ssr/:site_id/**",
  async api(site_id: string) {
    const { req, res, mode } = apiContext(this);

    return req.params;
    // if (!ssr.vms[site_id] || mode === "dev") {
    //   if (!ssr.script || mode === "dev") {
    //     const script = await readAsync(dir.path("srv/ssr/index.jsx"));
    //     if (script) {
    //       ssr.script = script;
    //     }
    //   }

    //   ssr.vms[site_id] = new vm.Script(ssr.script);
    // }

    // const v = ssr.vms[site_id];
    // const dom = new JSDOM();
    // dom.window.prasi = {};

    // if (dom.window.prasi.page) {
    //   await scanComponent(
    //     dom.window.prasi.page.content_tree,
    //     dom.window.prasi.comps
    //   );
    // }
    // dom.window.exports = {};
    // dom.window.npm = {};

    // const npm_site_path = dir.path(`../npm/site/${site_id}/index.js`);
    // const npm_page_path = dir.path(`../npm/page/${page_id}/index.js`);

    // try {
    //   console.log(npm_site_path);

    //   dom.window.npm.site = require(npm_site_path);
    // } catch (e) {}

    // try {
    //   dom.window.npm.page = require(npm_page_path);
    // } catch (e) {}

    // dom.window.process = process;
    // dom.window.React = React;
    // dom.window.ReactDOMServer = ReactDOMServer;
    // dom.window.JSXRuntime = JSXRuntime;
    // dom.window.stream = stream;
    // dom.window.TextEncoder = TextEncoder;
    // dom.window.TextDecoder = TextDecoder;

    // vm.createContext(dom.window);
    // v.runInContext(dom.window);

    // const result = await dom.window.ssrResult;
    // return result || "";
  },
};
