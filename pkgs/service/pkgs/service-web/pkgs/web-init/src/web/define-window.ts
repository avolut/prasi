import { css, extractCss } from "goober";
import { waitUntil } from "web-utils";

export const defineWindow = async (awaitServerUrl = true) => {
  let w = typeof window === "object" ? window : (globalThis as any);

  if (awaitServerUrl) await waitUntil(() => w.__SRV_URL__);

  const location = window["location"];

  const host =
      0 === location.protocol.indexOf("http") ? location.hostname : "localhost",
    scheme =
      "https:" != location.protocol || /localhost|127.0.0.1|0.0.0.0/.test(host)
        ? "http"
        : "https";

  if (w.__SRV_URL__) {
    w.serverurl = w.__SRV_URL__;
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
  }

  const port = location.port;
  w.baseurl = scheme + "://" + host + (port ? ":" + port : "") + "/";
  w.basepath = "/";
  w.css = css;
  w.extractCss = extractCss;
  w.pathname = location.pathname;

  w.cx = (...classNames: any[]) => {
    const result: string[] = [];

    classNames
      .filter((e) => {
        if (e) {
          if (typeof e === "string" && e.trim()) return true;
          else return true;
        }
        return false;
      })
      .forEach((e) => {
        if (Array.isArray(e)) {
          for (const f of e) {
            if (typeof f === "string" && f.trim()) {
              result.push(f.trim());
            }
          }
        } else result.push(e.trim());
      });
    return result.join(" ");
  };

  w.navigate = (href: string) => {
    let _href = href;

    if (typeof w.navigateOverride === "function") {
      _href = w.navigateOverride(href);
      if (!_href) return null;
    }

    history.pushState({}, "", _href);
    if (w.rootRes) w.rootRes.pathname = href;
    w.pathname = href;

    if (w.rootRender) {
      w.rootRender();
    }
  };

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
