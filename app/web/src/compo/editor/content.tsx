import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { CEGlobal } from "../../base/global/content-editor";
import { component } from "../page/component";
import { CEPage } from "../page/content-edit/ce-page";
import { MContent } from "../types/general";
import { Loading } from "../ui/loading";
import { CECompEdit } from "./comp/comp-edit";
import { CompManager } from "./comp/comp-manager";
import { PageManager } from "./content/manager/page/PageManager";
import { SiteManager } from "./content/manager/site/SiteManager";
import { CEScriptElement } from "./content/script/script-element";
import { CESide } from "./content/side/Side";
import { CETree } from "./content/tree/tree";
import { wsdoc } from "./ws/wsdoc";
import { MItem } from "../types/item";

export const ContentEditor: FC<{ id: string }> = ({ id }) => {
  const c = useGlobal(CEGlobal, id);
  const local = useLocal({ init: false });

  useEffect(() => {
    if (c.editor.active) {
      localStorage.setItem(
        `prasi-active-${id}`,
        c.editor.active.get("id") || ""
      );

      let item = c.editor.active as MItem;
      let oldCompID = c.editor.componentActiveID;
      c.editor.componentActiveID = "";
      while (item.parent) {
        if (item) {
          const isProp = item.get("isPropContent");
          if (isProp) break;

          const comp = item.get("component");
          if (comp) {
            const compid = comp.get("id");
            if (compid) {
              c.editor.componentActiveID = compid;
              break;
            }
          }
        }
        item = item.parent as any;
      }

      if (oldCompID !== c.editor.componentActiveID) {
        c.render();
      }
    }
  }, [c.editor.active]);

  if (!local.init) {
    const active_id = localStorage.getItem(`prasi-active-${id}`);
    if (active_id) {
      const active = findID(c.root as any, active_id);
      if (active) {
        c.editor.active = active;
      }
    }

    if (wsdoc.site) {
      db.site
        .findFirst({
          where: { id: wsdoc.site.id },
          select: { js: true, js_compiled: true },
        })
        .then((e) => {
          if (e && wsdoc.site) {
            wsdoc.site.js = e.js;
            wsdoc.site.js_compiled = e.js_compiled;
          }
        });
    }
    local.init = true;
  }

  c.editor.page.render = local.render;
  const loading = (
    <div className="relative w-full h-full flex">
      <Loading backdrop={false} />
    </div>
  );

  if (id.startsWith("COMP")) {
    if (wsdoc.page && component.edit.switching) {
      return <Loading backdrop={false} />;
    }

    return (
      <div className={cx("flex flex-1 flex-row", "editor-box")}>
        <CETree id={id} />
        {c.editor.page.reload ? loading : <CEPage ceid={id} />}
        <CESide id={id} />
        <CEScriptElement id={id} />

        {c.editor.manager.showComp && <CompManager id={id} />}
      </div>
    );
  }

  return (
    <div className={cx("flex flex-1 flex-row", "editor-box")}>
      <CETree id={id} />
      {c.editor.page.reload ? loading : <CEPage ceid={id} />}
      <CESide id={id} />
      <CEScriptElement id={id} />
      <CECompEdit id={id} />
      {c.editor.manager.showSite && <SiteManager />}
      {c.editor.manager.showPage && <PageManager />}
      {c.editor.manager.showComp && <CompManager id={id} />}
    </div>
  );
};

const findID = (item: MContent, id: string) => {
  if (item.get("id") === id) {
    return item;
  }

  const childs = item.get("childs");
  if (childs) {
    let found: any = null;
    childs.forEach((e) => {
      const result = findID(e, id);
      if (result) {
        found = result;
      }
    });

    if (found) return found;
  }
};
