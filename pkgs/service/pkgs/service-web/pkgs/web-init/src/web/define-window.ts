import React from "react";
import JSXDevRuntime from "react/jsx-dev-runtime";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import JSXRuntime from "react/jsx-runtime";
import { apiClient } from "./api";
import { dbClient } from "./db";
import { css } from "goober";
export const defineWindow = async (baseurl?: URL) => {
  const w = typeof window === "object" ? window : (globalThis as any);

  const location = (
    typeof window === "object" ? window["location"] : baseurl
  ) as (typeof window)["location"];

  const host =
      0 === location.protocol.indexOf("http") ? location.hostname : "localhost",
    scheme =
      "https:" != location.protocol || /localhost|127.0.0.1|0.0.0.0/.test(host)
        ? "http"
        : "https";

  w.serverurl = __SRV_URL__;
  const serverURL = new URL(w.serverurl);
  if (
    serverURL.hostname === "localhost" ||
    serverURL.hostname === "127.0.0.1"
  ) {
    serverURL.hostname = location.hostname;
    serverURL.pathname = serverURL.pathname === "/" ? "" : serverURL.pathname;
    w.serverurl = serverURL.toString();
    if (w.serverurl.endsWith("/")) {
      w.serverurl = w.serverurl.substring(0, w.serverurl.length - 1);
    }
  }

  const port = location.port;
  w.baseurl = scheme + "://" + host + (port ? ":" + port : "") + "/";
  w.basepath = "/";
  w.React = React;
  w.css = css;
  w.JSXRuntime = JSXRuntime;
  w.JSXDevRuntime = JSXDevRuntime;
  w.ReactDOMServer = ReactDOMServer;
  w.ReactDOM = ReactDOM;

  w.pathname = location.pathname;

  w.Fragment = React.Fragment;

  w.cx = (...classNames: any[]) => {
    const result: string[] = [];

    classNames
      .filter((e) => !!e)
      .forEach((e) => {
        if (Array.isArray(e)) {
          for (const f of e) {
            result.push(f);
          }
        } else result.push(e);
      });
    return result.join(" ");
  };

  w.db = dbClient("db");
  w.dbClient = dbClient;

  w.navigate = (href: string) => {
    let _href = href;

    if (_href.startsWith("/")) {
      if (w.basepath.length > 1) {
        _href = `${w.basepath}${_href}`;
      }
      if (
        location.hostname === "prasi.app" ||
        location.hostname === "localhost" ||
        location.hostname === "127.0.0.1" ||
        location.hostname === "10.0.2.2" // android localhost
      ) {
        if (
          location.pathname.startsWith("/site") &&
          !_href.startsWith("/site")
        ) {
          const patharr = location.pathname.split("/");
          _href = `/site/${patharr[2]}${_href}`;
        }
      }
    }

    history.pushState({}, "", _href);
    if (w.rootRes) w.rootRes.pathname = href;
    w.pathname = href;

    if (w.rootRender) {
      w.rootRender();
    }
  };

  const apiEntry = import("../../../../../../../../app/gen/srv/api/entry-args");
  await new Promise<void>((resolve) => {
    apiEntry.then((e) => {
      w.apiEntry = e["srv"];
      w.api = apiClient(w.apiEntry);
      w.apiClient = apiClient;
      resolve();
    });
  });

  if (typeof window === "object") {
    window.addEventListener("popstate", () => {
      if (w.preventPopRender) {
        w.preventPopRender = false;
        return;
      }
      if (w.rootRender) {
        w.pathname = location.pathname;
        w.rootRender();
      }
    });
  }
};
