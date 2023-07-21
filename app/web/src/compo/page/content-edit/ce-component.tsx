import { createId } from "@paralleldrive/cuid2";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import { CEGlobal } from "../../../base/global/content-editor";
import { getArray } from "../../editor/tools/yjs-tools";
import { wsdoc } from "../../editor/ws/wsdoc";
import { IItem, MItem } from "../../types/item";
import { MText } from "../../types/text";
import { component } from "../component";
import { CEItem } from "./ce-item";
import { CERender } from "./ce-render";
import { CEText } from "./ce-text";
import * as Y from "yjs";
import { fillID } from "../tools/fill-id";

export const CEComponent: FC<{
  ceid: string;
  item: MItem;
  compItem: MItem;
  parentCompIds: string[];
}> = ({ ceid, item, compItem, parentCompIds }) => {
  const c = useGlobal(CEGlobal, ceid);
  const local = useLocal({ instanced: false });
  const compid = item.get("component")?.get("id");
  const props = item.get("component")?.get("props");

  if (local.instanced && compid && wsdoc.reloadComponentId.has(compid)) {
    local.instanced = false;
    wsdoc.reloadComponentId.delete(compid);
  }

  const cprops = compItem.get("component")?.get("props");
  const propNames: string[] = [];
  if (cprops) {
    cprops?.forEach((mprop, name) => {
      if (mprop?.get("meta")?.get("type") === "content-element") {
        propNames.push(name);
      }
    });
  }
  useEffect(() => {
    if (cprops) {
      c.doc.transact(() => {
        cprops?.forEach((_, name) => {
          const mprop = props?.get(name);
          if (mprop?.get("meta")?.get("type") === "content-element") {
            if (!mprop?.get("content")) {
              const json = {
                id: createId(),
                name: name,
                type: "item",
                dim: { w: "fit", h: "fit" },
                isPropContent: true,
                childs: [],
              } as IItem;
              const map = new Y.Map();
              syncronize(map as any, json);
              mprop.set("content", map as any);
            }
          }
        });
      });
    }
  }, [propNames.join("-")]);

  if (compid) {
    if (parentCompIds.includes(compid)) {
      return (
        <div className="border border-red-600 p-2 text-red-600 m-2 text-xs font-bold text-center">
          WARNING: Recursive Component
          <br /> &lt;{item.get("name")}/&gt;
        </div>
      );
    } else {
      parentCompIds.push(compid);
    }
  }
  if (!local.instanced) {
    const newComp = fillID(compItem.toJSON() as any) as IItem;

    newComp.id = item.get("id") as any;
    if (newComp.component) {
      const comp = item.get("component");
      if (comp) {
        newComp.component.name = comp.get("name") || "";
        newComp.component.props = comp.get("props")?.toJSON() as any;
      }
    }
    syncronize(item as any, newComp);
    local.instanced = true;
  }
  if (!item && !compItem) return null;

  return (
    <CERender ceid={ceid} item={item}>
      {getArray<MItem | MText>(item, "childs")?.map((e: MItem | MText) => {
        const type = e.get("type");
        if (type === "item") {
          return (
            <CEItem
              ceid={ceid}
              item={e as MItem}
              preventRenderComponent={true}
              key={e.get("id")}
              parentCompIds={parentCompIds}
            />
          );
        } else if (type === "text") {
          return <CEText ceid={ceid} item={e as MText} key={e.get("id")} />;
        }
      })}
      {c.editor.componentActiveID === compid && (
        <div
          className={cx(
            "absolute inset-0 flex items-center justify-center opacity-0 transition-all",
            "bg-white bg-opacity-90",
            css`
              &:hover {
                opacity: 1;
              }
            `
          )}
        >
          <div
            className={cx(
              "flex items-center border border-slate-500 bg-white rounded-sm text-[13px] px-[2px] min-h-[20px] text-center leading-3 absolute cursor-pointer z-10",
              css`
                font-family: "Source Sans Pro", system-ui, -apple-system,
                  BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
                  Cantarell, Open Sans, Helvetica Neue, sans-serif;
              `
            )}
            onClick={() => {
              let _c = c;
              const compid = item.get("component")?.get("id") || "";
              // console.log("click component");
              if (ceid.startsWith("COMP") && wsdoc.page) {
                _c = wsdoc.page;
                component.edit.switching = true;
                setTimeout(() => {
                  component.edit.switching = false;
                  _c.editor.active = null;
                  component.edit.id = compid;
                  _c.render();
                }, 10);
              } else {
                component.edit.switching = false;
              }
              component.edit.show = true;
              if (!component.edit.tabs) component.edit.tabs = new Set();
              component.edit.tabs?.add(compid);
              _c.editor.lastActive.item = _c.editor.active;
              _c.editor.active = null;
              component.edit.id = compid;
              _c.render();
            }}
          >
            Edit Component
          </div>
        </div>
      )}
    </CERender>
  );
};
