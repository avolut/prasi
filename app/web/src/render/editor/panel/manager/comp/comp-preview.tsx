import { useGlobal, useLocal } from "web-utils";
import { produceCSS } from "../../../../../utils/css/gen";
import { IItem } from "../../../../../utils/types/item";
import { EditorGlobal } from "../../../logic/global";
import { Loading } from "../../../../../utils/ui/loading";
import { loadComponent } from "../../../logic/comp";

export const CItem = ({ item, comp_id }: { item: IItem; comp_id: string }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const className = produceCSS(item, {
    mode: p.mode,
  });
  const local = useLocal({});

  if (p.manager.compPreviewRendered.has(item.id)) {
    return null;
  }
  p.manager.compPreviewRendered.add(item.id);

  if (item.component && item.component.id && item.component.id !== comp_id) {
    if (
      !p.comps.doc[item.component.id] ||
      !!p.comps.pending[item.component.id]
    ) {
      loadComponent(p, item.component.id).then(() => {
        local.render();
      });
      return <Loading backdrop={false} />;
    }

    if (p.comps.doc[item.component.id]) {
      const citem = p.comps.doc[item.component.id]
        .getMap("map")
        .get("content_tree")
        ?.toJSON() as IItem;
      if (citem) {
        return <CItem item={citem} comp_id={comp_id} />;
      }
    }
  }

  return (
    <div className={className}>
      {item.childs.map((e) => {
        if (e.type === "item")
          return <CItem key={e.id} item={e} comp_id={comp_id} />;

        const className = produceCSS(e, {
          mode: p.mode,
        });

        return (
          <div
            key={e.id}
            className={className}
            dangerouslySetInnerHTML={{ __html: e.html }}
          ></div>
        );
      })}
    </div>
  );
};
