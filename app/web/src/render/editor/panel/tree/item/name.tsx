import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IContent } from "../../../../../utils/types/general";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { EditorGlobal } from "../../../logic/global";

export const ETreeItemName: FC<{
  item: IContent;
  name: string;
  renaming: boolean;
  isComponent: boolean;
  doneRenaming: () => void;
}> = ({ name, item, renaming, doneRenaming, isComponent }) => {
  if (renaming) {
    return (
      <Renaming
        doneRenaming={doneRenaming}
        isComponent={isComponent}
        name={name}
        id={item.id}
      />
    );
  }

  return (
    <div className={cx("text-sm flex-1 ")}>
      <>{name}</>
    </div>
  );
};

const Renaming: FC<{
  name: string;
  doneRenaming: () => void;
  isComponent: boolean;
  id: string;
}> = ({ name, doneRenaming, isComponent, id }) => {
  const local = useLocal({ newname: name });
  const p = useGlobal(EditorGlobal, "EDITOR");
  const item = p.treeMeta[id].mitem;
  if (!item) return null;

  const rootComponentID = p.comp?.id;
  const itemComponent = item.get("component")?.toJSON() as FNComponent;
  let isRootComponent = false;
  if (itemComponent.id === rootComponentID) {
    isRootComponent = true;
  }

  return (
    <input
      type="text"
      title="Rename"
      value={local.newname}
      className="border px-1 text-sm flex-1 rounded-none outline-none border-2 border-blue-500"
      spellCheck={false}
      onChange={(e) => {
        local.newname = e.currentTarget.value;
        local.render();
      }}
      onFocus={(e) => {
        e.currentTarget.select();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
      onBlur={() => {
        doneRenaming();
        if (isComponent) {
          const comp = item.get("component");
          if (comp) comp.set("name", local.newname);
        } else {
          item.set("name", local.newname);
        }

        if (isRootComponent && rootComponentID) {
          const doc = p.comps.doc[rootComponentID];
          if (doc) {
            doc.transact(() => {
              const comp = doc.getMap("map");
              comp.set("name", local.newname);
              const ctree = comp.get("content_tree");
              if (ctree) {
                const ccomp = ctree.get("component");
                if (ccomp) {
                  ccomp.set("name", local.newname);
                }
              }
            });
          }
        }
      }}
      autoFocus
    />
  );
};
