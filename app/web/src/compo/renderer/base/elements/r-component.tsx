import { produce } from "immer";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { findScope } from "../../../page/content-edit/render-tools/init-scope";
import { IItem } from "../../../types/item";
import { Loading } from "../../prasi/ui/loading";
import { RendererGlobal } from "../renderer-global";
import { RItem } from "./r-item";
import { RRender } from "./r-render";
import { RText } from "./r-text";

export const RComponent: FC<{
  item: IItem;
}> = ({ item }) => {
  const local = useLocal({ loading: false });
  const rg = useGlobal(RendererGlobal, "PRASI_SITE");

  if (item.hidden === "all" || !item.component) return null;

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
