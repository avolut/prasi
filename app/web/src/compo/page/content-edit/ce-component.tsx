import { FC } from "react";
import { useGlobal } from "web-utils";
import { CEGlobal } from "../../../base/global/content-editor";
import { wsdoc } from "../../editor/ws/wsdoc";
import { IItem, MItem } from "../../types/item";
import { IText } from "../../types/text";
import { Loading } from "../../ui/loading";
import { component } from "../component";
import { CERender } from "./ce-render";
import { instantiateComp } from "../../editor/comp/load-comp";
import { fillID } from "../tools/fill-id";
import { FNCompDef, FNComponent } from "../../types/meta-fn";

export const CEComponent: FC<{
  ceid: string;
  item: MItem;
}> = ({ ceid, item }) => {
  const c = useGlobal(CEGlobal, ceid);
  const compid = item.get("component")?.get("id");

  if (compid && wsdoc.reloadComponentId.has(compid)) {
    const id = item.get("id") || "";
    delete c.instances[id];
    instantiateComp(c, item);

    const ids = [];
    const walk = (s: Set<string>) => {
      s.forEach((e) => {
        ids.push(e);
        if (c.scope.tree[e]) {
          walk(c.scope.tree[e].childs);
        }
      });
    };
    ids.push(id);
    walk(c.scope.tree[id].childs);
    for (const i of ids) {
      delete c.scope.value[i];
      delete c.scope.tree[i];
    }
    wsdoc.reloadComponentId.delete(compid);
  }

  const loading = (
    <div className="flex relative w-[80px] h-[20px]">
      <Loading backdrop={false} />
    </div>
  );

  if (item.get("hidden")) return null;
  if (!item) return loading;
  const id = item.get("id");
  if (!id || (id && !c.instances[id])) return loading;

  const instance = c.instances[id];

  let shouldOver = false;
  if (c.editor.componentActiveID === compid) {
    shouldOver = true;
    const comp = component.docs[c.editor.componentActiveID]
      ?.getMap("map")
      .get("content_tree")
      ?.get("component")
      ?.toJSON() as FNComponent;

    if (comp && comp.props) {
      for (const prop of Object.values(comp.props)) {
        if (prop.meta?.type === "content-element") {
          shouldOver = false;
        }
      }
    }
  }

  return (
    <CERender ceid={ceid} item={item} citem={instance}>
      {instance.childs.map((e) => {
        if (e.type === "item")
          return <CCItem key={e.id} ceid={ceid} item={e} />;
        if (e.type === "text")
          return <CCText key={e.id} ceid={ceid} item={e} />;
      })}
      {shouldOver && (
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
              "flex items-center border border-slate-500 bg-white text-black rounded-sm text-[13px] px-[2px] min-h-[20px] text-center leading-3 absolute cursor-pointer z-10",
              css`
                font-family: "Source Sans 3", system-ui, -apple-system,
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
            Edit
          </div>
        </div>
      )}
    </CERender>
  );
};

const CCComp: FC<{ ceid: string; item: IItem }> = ({ ceid, item }) => {
  const c = useGlobal(CEGlobal, ceid);
  const compid = item.component?.id;
  const id = item.id;

  if (compid && wsdoc.reloadComponentId.has(compid)) {
    const ids = [];
    const walk = (s: Set<string>) => {
      ids.push(s);
      s.forEach((e) => {
        if (c.scope.tree[e]) {
          walk(c.scope.tree[e].childs);
        }
      });
    };
    ids.push(id);
    walk(c.scope.tree[id].childs);
    for (const i of ids) {
      delete c.scope.value[i];
      delete c.scope.tree[i];
    }

    wsdoc.reloadComponentId.delete(compid);
  }

  if (!c.instances[id] && compid) {
    const comp = component.docs[compid];
    if (comp) {
      const map = comp.getMap("map");
      const compUpdatedAt = new Date(map.get("updated_at") as any).getTime();
      if (id) {
        const compjson = fillID(
          map.get("content_tree")?.toJSON() as any
        ) as IItem;

        c.instances[id] = {
          ...compjson,
          id,
          component: {
            id: compjson.component?.id || "",
            name: compjson.component?.name || "",
            props: {
              ...compjson.component?.props,
              ...item.component?.props,
            },
            updated_at: compUpdatedAt,
          },
        };
      }
    }
  }

  const loading = (
    <div className="flex relative w-[80px] h-[20px]">
      <Loading backdrop={false} />
    </div>
  );

  if (!id || (id && !c.instances[id])) return loading;
  const instance = c.instances[id];

  return (
    <CERender ceid={ceid} citem={instance}>
      {instance.childs.map((e) => {
        if (e.type === "item")
          return <CCItem key={e.id} ceid={ceid} item={e} />;
        if (e.type === "text")
          return <CCText key={e.id} ceid={ceid} item={e} />;
      })}
    </CERender>
  );
};

export const CCItem: FC<{ ceid: string; item: IItem }> = ({ ceid, item }) => {
  if (item.component?.id) {
    return <CCComp ceid={ceid} item={item} />;
  }
  return (
    <CERender ceid={ceid} citem={item}>
      {item.childs.map((e) => {
        if (e.type === "item")
          return <CCItem key={e.id} ceid={ceid} item={e} />;
        if (e.type === "text")
          return <CCText key={e.id} ceid={ceid} item={e} />;
      })}
    </CERender>
  );
};

export const CCText: FC<{ ceid: string; item: IText }> = ({ ceid, item }) => {
  return (
    <CERender ceid={ceid} citem={item}>
      <div
        dangerouslySetInnerHTML={{
          __html: item.html || "",
        }}
      ></div>
    </CERender>
  );
};
