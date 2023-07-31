import { produce } from "immer";
import { FC } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../types/item";
import { Loading } from "../../prasi/ui/loading";
import { RendererGlobal } from "../renderer-global";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RComponent: FC<{
  item: IItem;
}> = ({ item }) => {
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  if (!item.component) return null;

  const compid = item.component.id;

  let comp = rg.component.def[compid];
  if (!comp) {
    if (!rg.component.loading[compid]) {
      rg.component.loading[compid] = true;

      rg.component.load([compid]).then((comps) => {
        comps.map((e) => {
          rg.component.def[e.id] = {
            id: e.id,
            content_tree: produce(e.content_tree, () => {}),
          };
        });

        rg.loading = false;
        delete rg.component.loading[compid];
        rg.render();
      });
    }
    return (
      <div
        className={cx(
          "h-[15px] flex items-center",
          css`
            .loadbar {
              width: 50px;
            }
          `
        )}
      >
        <Loading backdrop={false} />
      </div>
    );
  }
  const props = comp.content_tree.component?.props || {};
  const nprops: any = {};
  if (props) {
    const exec = (fn: string, scopes: any) => {
      const f = new Function(...Object.keys(scopes), `return ${fn}`);
      const res = f(...Object.values(scopes));
      return res;
    };

    for (const [key, _prop] of Object.entries(props)) {
      const prop = item.component?.props[key] || _prop;
      let val: any = null;
      let shouldEval = true;
      if (prop.meta?.type === "content-element") {
        if (prop.content) {
          prop.content.nprops = item.nprops;
          val = <RItem item={prop.content} />;
          shouldEval = false;
        }
      }

      if (shouldEval) {
        try {
          val = exec(prop.valueBuilt || prop.value, {
            ...window.exports,
            ...item.nprops,
          });
        } catch (e) {}
      }
      nprops[key] = val;
    }
    if (!item.nprops) item.nprops = nprops;
    else {
      for (const [k, v] of Object.entries(nprops)) {
        item.nprops[k] = v;
      }
    }
  }

  return (
    <RRender item={item}>
      {(childs) =>
        childs.map((e) => {
          if (e.type === "item") return <RItem item={e} key={e.id} />;
          else return <RText item={e} key={e.id} />;
        })
      }
    </RRender>
  );
};
