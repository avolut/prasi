import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { getArray } from "../../editor/tools/yjs-tools";
import { MItem } from "../../types/item";
import { responsiveMode } from "../tools/responsive-mode";
import { CEItem } from "./ce-item";
import { CESection } from "./ce-section";
import { wsdoc } from "../../editor/ws/wsdoc";
import { createAPI, createDB } from "../scripting/api-db";
import importModule from "../tools/dynamic-import";

const w = window as unknown as {
  prasiEditorPage: Record<
    string,
    {
      el: null | HTMLDivElement;
      scroll: null | { t: number; l: number };
    }
  >;
};
if (!w.prasiEditorPage) {
  w.prasiEditorPage = {};
}

export const CEPage: FC<{ ceid: string }> = ({ ceid }) => {
  const c = useGlobal(CEGlobal, ceid);
  const mode = responsiveMode();
  const local = useLocal({
    init: false,
  });

  if (!local.init) {
    local.init = true;
    const scope = c.scope;
    if (scope && wsdoc.site) {
      if (wsdoc.site.js_compiled) {
        const api_url = wsdoc.site.config.api_url;
        const args: any = {};
        if (api_url) {
          args["api"] = createAPI(api_url);
          args["db"] = createDB(api_url);
        }

        if (!window.exports) {
          window.exports = {};
        }
        const exports = window.exports;
        const types = {};
        const fn = new Function(
          ...Object.keys(args),
          "exports",
          "types",
          "load",
          "render",
          wsdoc.site.js_compiled
        );
        try {
          fn(
            ...Object.values(args),
            exports,
            types,
            importModule,
            local.render
          );
          scope.types.root = types;
          scope.value.root = exports;
        } catch (e) {}
      }
    }
  }

  return (
    <div
      className={cx(
        "w-full h-full relative flex items-center justify-center",
        mode === "mobile" ? mobileCSS : "bg-white"
      )}
    >
      <div
        className={cx(
          "absolute flex flex-col items-stretch flex-1 bg-white  overflow-auto",
          mode === "mobile"
            ? css`
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                width: 420px;
                top: 0px;
                bottom: 0px;
                contain: content;
              `
            : "inset-0",

          css`
            ${c.global.scss}
          `
        )}
        ref={(e) => {
          if (!w.prasiEditorPage[c.id]) {
            w.prasiEditorPage[c.id] = { el: null, scroll: null };
          }
          const p = w.prasiEditorPage[c.id];
          if (p) {
            p.el = e;
            if (p.scroll && e) {
              e.scrollTop = p.scroll.t;
              e.scrollLeft = p.scroll.l;
              p.scroll = null;
            }
          }
        }}
      >
        {ceid.startsWith("COMP") ? (
          <CEItem ceid={ceid} item={c.root as MItem} preventRenderComponent />
        ) : (
          getArray(c.root, "childs")?.map((e) => {
            return <CESection ceid={ceid} item={e} key={e.get("id")} />;
          })
        )}
      </div>
    </div>
  );
};

const mobileCSS = css`
  background-color: white;
  background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
    linear-gradient(-45deg, #fafafa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #fafafa 75%),
    linear-gradient(-45deg, transparent 75%, #fafafa 75%);

  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;
