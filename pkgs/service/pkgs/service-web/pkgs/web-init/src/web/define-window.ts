import React from "react";
import JSXDevRuntime from "react/jsx-dev-runtime";
import JSXRuntime from "react/jsx-runtime";
import { apiClient } from "./api";
import { dbClient } from "./db";

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

  const port = location.port;
  w.baseurl = scheme + "://" + host + (port ? ":" + port : "") + "/";
  w.basepath = "/";
  w.React = React;
  w.JSXRuntime = JSXRuntime;
  w.JSXDevRuntime = JSXDevRuntime;

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
        location.hostname === "localhost"
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
